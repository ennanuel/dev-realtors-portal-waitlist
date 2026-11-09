import { config } from "@/constants/config";
import { formatDate, fullName, initials, isRecent } from "../../lib/format";
import { AgentDownline } from "@/api/downline";
import { AuthUser } from "@/api/types";

const joinedLine = (m: AgentDownline) =>
  m.status === "suspended"
    ? "Suspended"
    : m.joined_at
      ? ""
      : `Joined ${formatDate(m.joined_at)}`;

interface NodeProps {
  member: AgentDownline;
  subline: string;
  index: number;
  showReferrals?: boolean;
}

function MemberNode({ member, subline, index, showReferrals }: NodeProps) {
  const suspended = member.status === "suspended";
  const referred = member.downline.length;
  const memberNames = {
    firstName: member?.first_name,
    lastName: member?.last_name,
  };
  return (
    <div
      className={`member ${suspended ? "is-suspended" : ""}`}
      style={{ animationDelay: `${0.7 + index * 0.08}s` }}
    >
      <span className="member-avatar" aria-hidden="true">
        {initials(memberNames)}
      </span>
      <div className="member-text">
        <b>{fullName(memberNames)}</b>
        <small>{subline}</small>
      </div>
      {!suspended && isRecent(member.joined_at, config.newMemberDays) && (
        <span className="new-dot">New</span>
      )}
      {showReferrals && referred > 0 && (
        <span className="chip">{referred} referred</span>
      )}
    </div>
  );
}

/** You at the top, the people who joined with your link, and the people they brought in. */
export function DownlineTree({
  realtor,
  members,
}: {
  realtor: AuthUser;
  members: AgentDownline[];
}) {
  const through = members.reduce((n, m) => n + m.downline.length, 0);
  // Position of each person in the list, so they animate in one after another.
  const order = new Map(
    members.flatMap((m) => [m, ...m.downline]).map((m, i) => [m.id, i]),
  );

  return (
    <div>
      <div className="tree-root">
        <span className="tree-root-avatar" aria-hidden="true">
          {initials(realtor)}
        </span>
        <div>
          <b>You</b>
          <small>
            {members.length} joined with your link
            {through > 0 && `, ${through} through them`}
          </small>
        </div>
      </div>

      <ul className="tree-branch">
        {members.map((m) => (
          <li key={m.id}>
            <MemberNode
              member={m}
              index={order.get(m.id) ?? 0}
              showReferrals
              subline={joinedLine(m)}
            />
            {m.downline.length > 0 && (
              <ul className="tree-sub">
                {m.downline.map((r) => (
                  <li key={r.id}>
                    <span className="tree-sub-line" aria-hidden="true" />
                    <MemberNode
                      member={r}
                      index={order.get(r.id) ?? 0}
                      subline={`${joinedLine(r)}, via ${m.first_name}`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
