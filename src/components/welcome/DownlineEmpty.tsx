import { config } from "@/constants/config";
import { useCopy } from "../../hooks/useCopy";
import { initials } from "../../lib/format";
import { emailUrl, inviteUrl, smsUrl, whatsappUrl } from "../../lib/share";
import { InviteLink } from "./InviteLink";
import { AuthUser } from "@/api/types";

/**
 * "It's just you for now" with the invite link and share buttons.
 * When `paused` (suspended account) the link and buttons are left out.
 */
export function DownlineEmpty({
  realtor,
  paused,
}: {
  realtor: AuthUser;
  paused?: boolean;
}) {
  const { copied, copy } = useCopy();
  const code = realtor.referralId;

  return (
    <div className="card downline-empty">
      <div className="seats" aria-hidden="true">
        <span className="seat is-far">+</span>
        <span className="seat">+</span>
        <span className="seat">+</span>
        <span className="seat-you">{initials(realtor)}</span>
        <span className="seat">+</span>
        <span className="seat">+</span>
        <span className="seat is-far">+</span>
      </div>
      <h3>It's just you for now.</h3>
      {paused ? (
        <p>Your invite link is paused while your account is suspended.</p>
      ) : (
        <>
          <p>
            Bring the realtors you work with. Bring them before{" "}
            {config.event.longLabel} and they'll be at the reveal with you.
          </p>
          <InviteLink inviteCode={code} />
          <div className="share-grid">
            <a
              className="btn-outline"
              href={whatsappUrl(code)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <button
              type="button"
              className="btn-outline"
              onClick={() => copy(inviteUrl(code))}
            >
              {copied ? "Copied" : "Copy link"}
            </button>
            <a className="btn-outline" href={emailUrl(code)}>
              Email
            </a>
            <a className="btn-outline" href={smsUrl(code)}>
              SMS
            </a>
          </div>
        </>
      )}
    </div>
  );
}
