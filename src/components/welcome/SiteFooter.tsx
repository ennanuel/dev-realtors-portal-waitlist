import { config } from "@/constants/config";
import { Wordmark } from "../ui/Wordmark";

/** Legal line, then the giant wordmark stretched across the full width. */
export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="site-footer-row">
          <span>
            &copy; {new Date().getFullYear()} {config.brandName}. Questions?{" "}
            <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
          </span>
          <nav aria-label="Legal">
            <a href={config.termsUrl}>Terms of Service</a>
            <a href={config.privacyUrl}>Privacy Policy</a>
          </nav>
        </div>
      </footer>
      <Wordmark />
    </>
  );
}
