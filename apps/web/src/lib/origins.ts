/**
 * Browser origins allowed to call the API cross-origin.
 *
 * The native app talks to the API from the `shome://` scheme, which browsers
 * never police. `expo start --web` is different: it serves the same app from
 * the Metro dev server (a real http origin on :8081), so every request to the
 * API on :3000 is a genuine cross-origin request and needs CORS headers plus a
 * Better Auth trusted origin.
 */

/** Extra origins for deployed builds, e.g. "https://app.example.com". */
const configuredOrigins = (process.env.WEB_CLIENT_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** Metro serves on :8081, on localhost or the LAN address of the dev machine. */
const METRO_DEV_ORIGIN = /^http:\/\/[\w.-]+:8081$/;

export function isAllowedOrigin(origin: string): boolean {
  if (configuredOrigins.includes(origin)) return true;
  return process.env.NODE_ENV !== "production" && METRO_DEV_ORIGIN.test(origin);
}
