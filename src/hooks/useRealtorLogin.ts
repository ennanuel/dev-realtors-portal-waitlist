import { generateGenericOTP, realtorLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type BaseUser = {
  id: number;
  avatar: string | null;
  first_name: string;
  last_name: string;
  referral_id: string;
};

type UseRealtorLoginParams = {
  onUserExists: () => void;
  onUserDoesNotExist: () => void;
  onError: (error: string) => void;
};

export default function useRealtorsLogin({
  onError,
  onUserExists,
  onUserDoesNotExist,
}: UseRealtorLoginParams) {
  const { mutate: realtorLoginMutate, isPending: isCheckingRealtorLogin } =
    useMutation({
      mutationFn: async (email: string) => {
        let action:
          | "login"
          | "signup"
          | "not_customer"
          | "verify_otp"
          | "pending"
          | null = null;

        try {
          const response = await realtorLogin({
            email,
            otp_login: true,
          });
          action = response?.data?.action;
        } catch (err) {
          const error = err as Error &
            AxiosError<{
              message: string;
              error: string;
              action: string;
              data?: Object;
            }>;
          const status = error?.response?.status ?? error?.status;
          const errorAction = error?.response?.data?.action?.toLowerCase();

          if (status === 404 || errorAction === "signup") action = "signup";
        }

        const isLoggingIn = action === "login" || action === "verify_otp";
        const isSigningUp = action === "signup" || action === "not_customer";

        if (isSigningUp) {
          await generateGenericOTP({ email });
        } else if (!isSigningUp && !isLoggingIn) {
          throw new Error("Something went wrong, Please try again");
        }

        return { isLoggingIn, isSigningUp };
      },
      onSuccess: (res) => {
        if (res.isLoggingIn) onUserExists();
        else if (res.isSigningUp) onUserDoesNotExist();
        else throw new Error();
      },
      onError: async (err) => {
        const message = (err as Error)?.message;
        onError(message);
      },
    });

  return {
    isLoading: isCheckingRealtorLogin,
    checkEmail: (email: string) => {
      realtorLoginMutate(email);
    },
  };
}
