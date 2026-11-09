import type { ReactNode } from "react";
import { config } from "@/constants/config";

interface Props {
  /** Left side on desktop (hidden on mobile). */
  aside: ReactNode;
  /** The form card. */
  children: ReactNode;
}

/** Terracotta split layout shared by every signup step. */
export function AuthLayout({ aside, children }: Props) {
  return (
    <div className="auth">
      <aside className="auth-aside">
        <span className="brand">{config.brandName}</span>
        {aside}
      </aside>
      <main className="auth-main">
        <section className="auth-card">
          <span className="brand auth-card-brand">{config.brandName}</span>
          {children}
        </section>
      </main>
      <div className="auth-wordmark" aria-hidden="true">
        {config.wordmark}
      </div>
    </div>
  );
}
