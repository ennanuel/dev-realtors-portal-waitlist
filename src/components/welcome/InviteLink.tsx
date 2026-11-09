import { useCopy } from "../../hooks/useCopy";
import { inviteUrl, inviteUrlLabel } from "../../lib/share";

/** The invite link in a pill with a Copy button. */
export function InviteLink({ inviteCode }: { inviteCode: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className="invite-link">
      <span>{inviteUrlLabel(inviteCode)}</span>
      <button type="button" onClick={() => copy(inviteUrl(inviteCode))}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
