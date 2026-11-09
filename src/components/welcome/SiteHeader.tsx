import { AuthUser } from "@/api/types";
import { config } from "@/constants/config";
import { AccountMenu } from "./AccountMenu";

export function SiteHeader({
  realtor,
  onLogout,
  privacyUrl,
  termsUrl,
}: {
  realtor: AuthUser;
  onLogout(): void;
  privacyUrl: string | null;
  termsUrl: string | null;
}) {
  return (
    <header className="site-header">
      <span className="brand">{config.brandName} / Realtors</span>
      <AccountMenu
        realtor={realtor}
        onLogout={onLogout}
        privacyUrl={privacyUrl}
        termsUrl={termsUrl}
      />
    </header>
  );
}
