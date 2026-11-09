import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthUser } from "@/api/types";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchRealtorSettingsInfo } from "@/api/auth";
import { deleteCookies, getSession, setSession } from "@/lib/sessionmanager";
import {
  REALTOR_SESSION_KEY,
  REALTOR_TOKEN_SESSION_KEY,
} from "@/constants/routes";
import { isAxiosError } from "axios";

interface SessionState {
  realtor: AuthUser | null;
  token: string | null;
  restoring: boolean;
  isNewAccount: boolean;
  signOut(): Promise<void>;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const [realtor, setRealtor] = useState<AuthUser | null>(null);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const {
    isLoading: restoring,
    data,
    error,
  } = useQuery({
    queryKey: ["user-data"],
    enabled: !!token,
    queryFn: async () => {
      const result = await fetchRealtorSettingsInfo();
      const user = result?.message?.user;
      const referralId = result?.message?.referral_id;

      const res: AuthUser = {
        id: user?.id?.toString(),
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email,
        phone: user?.phone,
        country: user?.country,
        avatar: null,
        referralId,
      };

      return res;
    },
  });

  const clear = useCallback(() => {
    setRealtor(null);
    setIsNewAccount(false);
  }, []);

  // Restore a saved session on first load.
  useEffect(() => {
    if (isAxiosError(error) && error.status === 401) signOut();
  }, [error]);

  useEffect(() => {
    if (data) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      setRealtor(data);
      setSession(data, REALTOR_SESSION_KEY, expires);
    } else {
      getSession<AuthUser>(REALTOR_SESSION_KEY).then((storedUser) => {
        if (storedUser) setRealtor(storedUser);
      });
    }
    if (!token) {
      getSession<string>(REALTOR_TOKEN_SESSION_KEY).then((storedToken) => {
        if (storedToken) setToken(storedToken);
        setIsAuthenticating(false);
      });
    }
  }, [data]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("is_new_user") === "true") {
      searchParams.delete("is_new_user");
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${searchParams.toString()}`,
      );
    }
  }, [pathname]);

  const signOut = useCallback(async () => {
    location.assign("/");
    deleteCookies([REALTOR_SESSION_KEY, REALTOR_TOKEN_SESSION_KEY]);
  }, [clear]);

  const value = useMemo(
    () => ({
      realtor,
      restoring: restoring || isAuthenticating,
      token,
      isNewAccount,
      signOut,
    }),
    [realtor, restoring, isAuthenticating, token, isNewAccount, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}
