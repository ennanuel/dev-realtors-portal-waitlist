import { config } from "@/constants/config";
import { Wordmark } from "../ui/Wordmark";

/** Legal line, then the giant wordmark stretched across the full width. */
export function SiteFooter({
  termsUrl,
  privacyUrl,
}: {
  termsUrl: string | null;
  privacyUrl: string | null;
}) {
  return (
    <>
      <footer className="site-footer">
        <div className="site-footer-row">
          <span>
            &copy; {new Date().getFullYear()} {config.brandName}. Questions?{" "}
            <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
          </span>
          <nav aria-label="Legal">
            {termsUrl && <a href={termsUrl}>Terms of Service</a>}
            {privacyUrl && <a href={privacyUrl}>Privacy Policy</a>}
          </nav>
        </div>
      </footer>
      <Wordmark />
    </>
  );
}
