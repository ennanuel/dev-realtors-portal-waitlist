import { config } from "@/constants/config";
import { fullName, initials } from "../../lib/format";
import { Inviter } from "@/api/types";

/** Desktop left side. Personalised when the visitor came through an invite link. */
export function AuthAside({ inviter }: { inviter: Inviter | null }) {
  if (!inviter) {
    return (
      <div
        className="aside-copy"
        style={{
          fontFamily: "var(--font-manrope), var(--font-archivo), Helvetica",
          fontWeight: 500,
          letterSpacing: "-0.02ch",
        }}
      >
        <h2>Sell {config.brandName} homes with your own link.</h2>
        <p>
          Live prices and availability, a sales link with your name on it, and
          every commission tracked to you.
        </p>
      </div>
    );
  }

  return (
    <div
      className="aside-copy is-invite"
      style={{
        fontFamily: "var(--font-manrope), var(--font-archivo), Helvetica",
        letterSpacing: "-0.02ch",
      }}
    >
      <div className="invite-pair" aria-hidden="true">
        <span className="invite-pair-owner">{initials(inviter)}</span>
        <span className="invite-pair-you">?</span>
      </div>
      <h2>
        {inviter.firstName} wants you on {config.shortName}.
      </h2>
      <p>
        {fullName(inviter)} invited you to sell {config.brandName} homes. Sign
        up with your email and you join {inviter.firstName}'s network.
      </p>
    </div>
  );
}

/** Mobile only: the aside is hidden, so the invite shows at the top of the card. */
export function InviterBanner({ inviter }: { inviter: Inviter }) {
  return (
    <div className="inviter-banner">
      <span className="inviter-banner-avatar" aria-hidden="true">
        {initials(inviter)}
      </span>
      <p>
        <b>{fullName(inviter)}</b> invited you to sell for {config.brandName}.
      </p>
    </div>
  );
}
