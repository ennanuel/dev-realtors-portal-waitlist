interface Named {
  firstName: string;
  lastName: string;
}

export const fullName = (p: Named) => `${p.firstName} ${p.lastName}`.trim();

export const initials = (p: Named) => `${p.firstName[0] ?? ""}${p.lastName[0] ?? ""}`.toUpperCase();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10-12T..." -> "12 Oct 2026" (same output in every browser and locale). */
export function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function isRecent(iso: string, days: number) {
  return Date.now() - new Date(iso).getTime() < days * 86_400_000;
}

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/**
 * Groups phone digits as the user types.
 *   8031124410  -> "803 112 4410"
 *   08031124410 -> "0803 112 4410"
 */
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const groups = digits.startsWith("0") ? [4, 3, 4] : [3, 3, 4];
  const parts: string[] = [];
  let i = 0;
  for (const size of groups) {
    if (i >= digits.length) break;
    parts.push(digits.slice(i, i + size));
    i += size;
  }
  if (i < digits.length) parts.push(digits.slice(i));
  return parts.join(" ");
}

export const phoneDigits = (value: string) => value.replace(/\D/g, "");
