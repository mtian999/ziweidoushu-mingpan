export const IS_DEV = process.env.NODE_ENV === "development";

export const BASE_URL =
  process.env.SITE_URL || `https://${process.env.VERCEL_URL}`;

export const DEV_BASE_URL = "http://localhost:3000";

export const { GOOGLE_TRACKING_ID, GOOGLE_ADSENSE_URL, CONTACT_US_EMAIL } =
  process.env as Record<string, string>;
