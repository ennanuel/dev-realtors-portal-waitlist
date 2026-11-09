import React, { useState, type FormEvent } from "react";
import { isValidEmail } from "../../lib/format";
import { Button } from "../ui/Button";
import { InviterBanner } from "./AuthAside";
import { TermsNote } from "./TermsNote";
import useRealtorsLogin from "@/hooks/useRealtorLogin";
import { Inviter } from "@/api/types";
import { useSession } from "@/auth/SessionContext";

interface Props {
  inviter: Inviter | null;
  email?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  emailIsInvalid: boolean;
  emailErrorMessage: string | null;
  onCodeSent(isSigningIn: boolean): void;
}

/** Step 1: collect the email and send a code to it. */
export function EmailStep({
  inviter,
  email = "",
  onChange,
  onBlur,
  emailIsInvalid,
  emailErrorMessage,
  onCodeSent,
}: Props) {
  const [error, setError] = useState("");
  const { storeData } = useSession();

  const termsUrl = storeData?.agent_document ?? null;
  const privacyUrl = storeData?.agent_privacy_policy ?? null;

  const isInvalid = !!error || emailIsInvalid;

  const { isLoading, checkEmail } = useRealtorsLogin({
    onError: setError,
    onUserDoesNotExist: () => onCodeSent(false),
    onUserExists: () => onCodeSent(true),
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!isValidEmail(value)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    checkEmail(value);
  }

  return (
    <div className="step">
      {inviter && <InviterBanner inviter={inviter} />}
      <h1>Start with your email</h1>
      <p className="lede">
        {inviter
          ? "We'll send you a code to confirm it."
          : "Enter your email to sign up or to sign in."}
      </p>

      <form onSubmit={submit} noValidate>
        <div className={`field ${error ? "is-invalid" : ""}`}>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            className="input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={isInvalid}
            aria-describedby={error ? "email-error" : undefined}
            autoFocus
          />
          {Boolean((emailIsInvalid && emailErrorMessage) || error) && (
            <span className="field-error" id="email-error">
              {error ?? emailErrorMessage}
            </span>
          )}
        </div>

        <div className="actions">
          <Button
            type="submit"
            loading={isLoading}
            disabled={!!emailIsInvalid}
            loadingLabel="Sending code"
          >
            Continue
          </Button>
          <TermsNote privacyUrl={privacyUrl} termsUrl={termsUrl} />
        </div>
      </form>
    </div>
  );
}
