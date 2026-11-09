import { config } from "@/constants/config";

export function TermsNote() {
  return (
    <p className="note">
      By hitting continue, you agree to the{" "}
      <a href={config.termsUrl}>Terms of Service</a> and{" "}
      <a href={config.privacyUrl}>Privacy Policy</a>.
    </p>
  );
}
