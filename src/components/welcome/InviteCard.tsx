import { whatsappUrl } from "../../lib/share";
import { WhatsAppIcon } from "../ui/icons";
import { InviteLink } from "./InviteLink";

/** Shown under the ticket once the realtor has at least one person in their downline. */
export function InviteCard({ inviteCode }: { inviteCode: string }) {
  return (
    <div className="card invite-card rise" style={{ animationDelay: ".9s" }}>
      <div className="row-between">
        <span className="kicker">Till then, invite realtors</span>
        <span className="invite-code">{inviteCode}</span>
      </div>
      <InviteLink inviteCode={inviteCode} />
      <a className="btn-outline" href={whatsappUrl(inviteCode)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon /> Share on WhatsApp
      </a>
    </div>
  );
}
