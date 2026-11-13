export const BaseURL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://dev.matadortrust.com";
export const BaseURL_ONE = `${BaseURL}/v1`;
export const BaseURL_TWO = `${BaseURL}/v2`;

export const DEFAULT_STORE_NAME = "annuvahomes-dev";

export const REALTOR_SESSION_KEY = "realtor-waitlist-session-key";
export const REALTOR_TOKEN_SESSION_KEY = "realtor-waitlist-token-session-key";

export const getStoreName = () => DEFAULT_STORE_NAME;
