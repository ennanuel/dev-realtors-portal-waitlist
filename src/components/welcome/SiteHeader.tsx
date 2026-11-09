import { AuthUser } from "@/api/types";
import { config } from "@/constants/config";
import { AccountMenu } from "./AccountMenu";

export function SiteHeader({
  realtor,
  onLogout,
}: {
  realtor: AuthUser;
  onLogout(): void;
}) {
  return (
    <header className="site-header">
      <span className="brand">{config.brandName} / Realtors</span>
      <AccountMenu realtor={realtor} onLogout={onLogout} />
    </header>
  );
}
