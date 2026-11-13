/**
 * Everything brand or campaign specific lives here, so the same code can be
 * reused for another developer by changing one file.
 */

import { MONTHS } from "@/constants/date";

const EVENT_DATE = new Date("2026-12-19T10:00:00+01:00");

const getEventDate = () => EVENT_DATE;
const getEventDateLabel = (options?: { isShort?: boolean }) => {
  const { isShort } = options ?? {};
  const eventDate = getEventDate();
  const monthIndex = eventDate.getMonth();
  const day = eventDate.getDate();
  const month = MONTHS[monthIndex];

  return `${day} ${isShort ? `${month.substring(0, 3)}.` : month}`;
};

export const config = {
  brandName: "Annuva Homes",
  /** Short name used in casual copy, e.g. "Tolu wants you on Annuva." */
  shortName: "Annuva",
  /** Large decorative word at the bottom of pages. */
  wordmark: "Annuva",
  supportEmail: "realtors@Annuvahomes.ng",
  termsUrl: "/terms",
  privacyUrl: "/privacy",

  /** The surprise event every realtor is counting down to. */
  event: {
    date: getEventDate(),
    label: getEventDateLabel({ isShort: true }),
    longLabel: getEventDateLabel(),
  },

  /** Public base for invite links, e.g. "https://realtors.annuvahomes.ng". Defaults to the current site. */
  inviteBaseUrl:
    typeof window === "undefined"
      ? ""
      : process.env.NEXT_PUBLIC_INVITE_BASE_URL || window.location.origin,

  /** Shown as "New" in the downline for this many days after someone joins. */
  newMemberDays: 7,

  countryCodes: [
    { code: "+234", label: "Nigeria" },
    { code: "+233", label: "Ghana" },
    { code: "+254", label: "Kenya" },
    { code: "+27", label: "South Africa" },
    { code: "+212", label: "Morocco" },
    { code: "+44", label: "United Kingdom" },
    { code: "+1", label: "United States" },
  ],
} as const;

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_INVITE_BASE_URL ?? "",
};
