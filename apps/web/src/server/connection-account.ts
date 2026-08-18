import { assertPublicHttpUrl } from "./netguard";

/**
 * The account a connection acts as, for display next to its label — so a user
 * can tell two Bluesky or Mastodon connections apart without opening either.
 *
 * Bluesky logins carry the handle in the credentials themselves. Mastodon only
 * stores a server and a token, so the account has to be asked for; that call is
 * best effort, since a connection is still usable when the instance is slow or
 * the token was minted without the `read:accounts` scope.
 */
export async function resolveConnectionAccount(
  provider: string,
  credentials: Record<string, unknown>,
): Promise<string | null> {
  if (provider === "bluesky") return blueskyAccount(credentials);
  if (provider === "mastodon") return await mastodonAccount(credentials);
  return null;
}

function blueskyAccount(credentials: Record<string, unknown>): string | null {
  const { identifier } = credentials;
  if (typeof identifier !== "string") return null;
  const handle = identifier.trim().replace(/^@/, "");
  // Bluesky also accepts an email address as the login identifier; that is not
  // a handle, and resolving it would need a full login, so leave it unnamed.
  if (handle.length === 0 || handle.includes("@")) return null;
  return handle;
}

async function mastodonAccount(credentials: Record<string, unknown>): Promise<string | null> {
  const { server, accessToken } = credentials;
  if (typeof server !== "string" || typeof accessToken !== "string") return null;
  let origin: URL;
  try {
    origin = new URL(server.includes("://") ? server : `https://${server}`);
  } catch {
    return null;
  }
  if (origin.protocol !== "https:") return null;

  try {
    // The server is user supplied and this request carries a bearer token.
    await assertPublicHttpUrl(origin.origin);
    const res = await fetch(`${origin.origin}/api/v1/accounts/verify_credentials`, {
      headers: { authorization: `Bearer ${accessToken}`, accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { acct?: unknown };
    if (typeof data.acct !== "string" || data.acct.length === 0) return null;
    // `acct` is bare for local accounts; qualify it so the instance shows too.
    return data.acct.includes("@") ? `@${data.acct}` : `@${data.acct}@${origin.host}`;
  } catch {
    return null;
  }
}
