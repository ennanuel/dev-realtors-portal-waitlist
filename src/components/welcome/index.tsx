"use client";

import { useSession } from "@/auth/SessionContext";
import { config } from "@/constants/config";
import { DownlineEmpty } from "@/components/welcome/DownlineEmpty";
import { DownlineTree } from "@/components/welcome/DownlineTree";
import { EventTicket } from "@/components/welcome/EventTicket";
import { InviteCard } from "@/components/welcome/InviteCard";
import { SiteFooter } from "@/components/welcome/SiteFooter";
import { SiteHeader } from "@/components/welcome/SiteHeader";
import { useDownline } from "@/hooks/useDownline";
import { useRouter } from "next/navigation";

/**
 * Where every realtor lands after signing in or signing up:
 * a welcome, the event ticket with its countdown, their invite link and their downline.
 */
export function WelcomePage() {
  const { realtor, isNewAccount, storeData, signOut } = useSession();
  const downline = useDownline();
  const router = useRouter();

  const termsUrl = storeData?.agent_document ?? null;
  const privacyUrl = storeData?.agent_privacy_policy ?? null;

  if (!realtor) return null;

  const suspended = false;
  const inviteIgnored = false;
  const members = downline.status === "ready" ? downline.members : [];
  const total = members.reduce((n, m) => n + 1 + m.downline.length, 0);

  async function logout() {
    await signOut();
    router.replace("/");
  }

  return (
    <div className="welcome">
      <div className="welcome-inner">
        <SiteHeader
          realtor={realtor}
          onLogout={logout}
          privacyUrl={privacyUrl}
          termsUrl={termsUrl}
        />

        {inviteIgnored && (
          <p className="banner">
            You already have an account, so the invite link you opened wasn't
            applied. Each realtor can only join one network.
          </p>
        )}
        {suspended && (
          <p className="banner is-warning">
            Your account is suspended, so your invite link is paused and new
            realtors can't join through it. Contact {config.supportEmail}.
          </p>
        )}

        <div className="welcome-grid">
          <div className="welcome-col">
            <h1 className="display rise">
              {isNewAccount ? "Welcome, " : "Welcome back, "}
              {realtor.firstName}.
            </h1>
            <EventTicket />
            {total > 0 && !suspended && (
              <InviteCard inviteCode={realtor.referralId} />
            )}
          </div>

          <section
            className="welcome-col rise"
            style={{ animationDelay: ".3s" }}
            aria-labelledby="downline-title"
          >
            <div className="row-between downline-head">
              <h2 id="downline-title" className="display-sm">
                Your downline
              </h2>
              {total > 0 && (
                <span className="kicker">
                  {total} {total === 1 ? "realtor" : "realtors"}
                </span>
              )}
            </div>

            {downline.status === "loading" && (
              <div className="card skeleton" aria-busy="true" />
            )}

            {downline.status === "error" && (
              <div className="card downline-error" role="alert">
                <p>{downline.message}</p>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={downline.retry}
                >
                  Try again
                </button>
              </div>
            )}

            {downline.status === "ready" &&
              (members.length === 0 ? (
                <DownlineEmpty realtor={realtor} paused={suspended} />
              ) : (
                <DownlineTree realtor={realtor} members={members} />
              ))}
          </section>
        </div>
      </div>

      <SiteFooter termsUrl={termsUrl} privacyUrl={privacyUrl} />
    </div>
  );
}
