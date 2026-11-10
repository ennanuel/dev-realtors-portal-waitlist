import { config } from "@/constants/config";

export function TermsNote({
  termsUrl,
  privacyUrl,
}: {
  termsUrl: string | null;
  privacyUrl: string | null;
}) {
  if (!termsUrl && privacyUrl) return;
  return (
    <p className="note">
      By hitting continue, you agree to the
      {termsUrl && (
        <>
          {" "}
          <a href={termsUrl}>Terms of Service</a>
        </>
      )}
      {termsUrl && privacyUrl ? "and" : ""}
      {privacyUrl && (
        <>
          {" "}
          <a href={privacyUrl}>Privacy Policy</a>
        </>
      )}
      .
    </p>
  );
}
