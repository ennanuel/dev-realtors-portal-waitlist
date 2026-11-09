import { useCallback, useId, useRef, useState } from "react";
import { config } from "@/constants/config";
import { useCopy } from "../../hooks/useCopy";
import { useDismiss } from "../../hooks/useDismiss";
import { fullName, initials } from "../../lib/format";
import { DocumentIcon, LockIcon, LogoutIcon } from "../ui/icons";
import { AuthUser } from "@/api/types";

interface Props {
  realtor: AuthUser;
  onLogout(): void;
}

/** Avatar button that opens the account card: name, reference ID, email, legal links, log out. */
export function AccountMenu({ realtor, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const { copied, copy } = useCopy();

  const close = useCallback((reason: "outside" | "escape") => {
    setOpen(false);
    if (reason === "escape") buttonRef.current?.focus();
  }, []);
  useDismiss(wrapRef, open, close);

  return (
    <div className="account" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="account-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Your account"
        onClick={() => setOpen((v) => !v)}
      >
        {initials(realtor)}
      </button>

      {open && (
        <div className="account-menu" id={menuId}>
          <div className="account-menu-top">
            <div className="account-who">
              <span className="account-avatar" aria-hidden="true">
                {initials(realtor)}
              </span>
              <div>
                <b>{fullName(realtor)}</b>
                <span>{realtor.email}</span>
              </div>
            </div>
            <div className="account-ref">
              <div>
                <span>Reference ID</span>
                <b>{realtor.referralId}</b>
              </div>
              <button type="button" onClick={() => copy(realtor.referralId)}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <nav className="account-links" aria-label="Account">
            <a className="account-item" href={config.termsUrl}>
              <DocumentIcon />
              Terms and Conditions
            </a>
            <a className="account-item" href={config.privacyUrl}>
              <LockIcon />
              Privacy Policy
            </a>
            <hr />
            <button
              type="button"
              className="account-item is-danger"
              onClick={onLogout}
            >
              <LogoutIcon />
              Log out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
