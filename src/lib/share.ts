import { config } from "@/constants/config";

export function inviteUrl(inviteCode: string) {
  return `${config.inviteBaseUrl}/join/${inviteCode}`;
}

/** Link text without the protocol, for display. */
export function inviteUrlLabel(inviteCode: string) {
  return inviteUrl(inviteCode).replace(/^https?:\/\//, "");
}

export function inviteMessage(inviteCode: string) {
  return (
    `Hi! I've joined ${config.brandName}'s realtor network and they've got a surprise coming on ` +
    `${config.event.longLabel}. Join with my link so we're in it together: ${inviteUrl(inviteCode)}`
  );
}

export const whatsappUrl = (inviteCode: string) =>
  `https://wa.me/?text=${encodeURIComponent(inviteMessage(inviteCode))}`;

export const emailUrl = (inviteCode: string) =>
  `mailto:?subject=${encodeURIComponent(`Join me on the ${config.brandName} Realtors Portal`)}` +
  `&body=${encodeURIComponent(inviteMessage(inviteCode))}`;

export const smsUrl = (inviteCode: string) =>
  `sms:?&body=${encodeURIComponent(inviteMessage(inviteCode))}`;
