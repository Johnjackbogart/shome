import { AtpAgent } from "@atproto/api";
import { getConnector } from "@shome/connectors";
import { type Db, sources, subscriptions } from "@shome/db";
import { eq } from "drizzle-orm";
import { assertPublicHttpUrl } from "./netguard";

const BLUESKY_SERVICE = "https://bsky.social";
const MASTODON_PAGE_SIZE = 80;

type ImportedSource = {
  kind: "bluesky" | "mastodon";
  config: Record<string, unknown>;
};

interface BlueskyProfile {
  did?: unknown;
  handle?: unknown;
}

interface MastodonAccount {
  id?: unknown;
  acct?: unknown;
}

export interface FollowingImportResult {
  /** Sources newly added to this person's Sources section. */
  imported: number;
  /** Accounts they already had in Sources, left untouched. */
  alreadySubscribed: number;
}

/**
 * Turns a newly linked social account's following list into ordinary, editable
 * sources. Each subscription keeps the connection that discovered it, so a
 * refresh can use that person's token when the platform permits it.
 */
export async function importFollowingSources(
  db: Db,
  userId: string,
  connection: { id: string; provider: string },
  credentials: Record<string, unknown>,
): Promise<FollowingImportResult> {
  const followed =
    connection.provider === "bluesky"
      ? await blueskyFollowing(credentials)
      : connection.provider === "mastodon"
        ? await mastodonFollowing(credentials)
        : [];

  let imported = 0;
  let alreadySubscribed = 0;
  for (const followedSource of followed) {
    const subscribed = await subscribeToImportedSource(db, userId, connection.id, followedSource);
    if (subscribed) imported += 1;
    else alreadySubscribed += 1;
  }
  return { imported, alreadySubscribed };
}

async function blueskyFollowing(credentials: Record<string, unknown>): Promise<ImportedSource[]> {
  const identifier = requiredCredential(credentials, "identifier", "Bluesky identifier");
  const appPassword = requiredCredential(credentials, "appPassword", "Bluesky app password");
  const agent = new AtpAgent({ service: BLUESKY_SERVICE });
  const session = await agent.login({ identifier, password: appPassword });

  const follows: ImportedSource[] = [];
  const seen = new Set<string>();
  let cursor: string | undefined;
  do {
    const page = await agent.getFollows({
      actor: session.data.did,
      limit: 100,
      ...(cursor ? { cursor } : {}),
    });
    for (const profile of page.data.follows as BlueskyProfile[]) {
      if (typeof profile.did !== "string" || typeof profile.handle !== "string") continue;
      const did = profile.did.trim();
      const actor = profile.handle.trim().replace(/^@/, "").toLowerCase();
      if (!did || !actor || seen.has(did)) continue;
      seen.add(did);
      follows.push({ kind: "bluesky", config: { mode: "author", actor, did } });
    }
    cursor = page.data.cursor;
  } while (cursor);
  return follows;
}

async function mastodonFollowing(credentials: Record<string, unknown>): Promise<ImportedSource[]> {
  const server = mastodonServer(credentials);
  const accessToken = requiredCredential(credentials, "accessToken", "Mastodon access token");
  // This is a user-supplied server and every following-list request carries a
  // bearer token, so guard it before making even the first request.
  await assertPublicHttpUrl(server);

  const verified = await mastodonJson<MastodonAccount>(
    `${server}/api/v1/accounts/verify_credentials`,
    accessToken,
  );
  const accountId = requiredAccountField(verified.id, "Mastodon account id");
  const followingUrl = new URL(
    `/api/v1/accounts/${encodeURIComponent(accountId)}/following`,
    server,
  );
  followingUrl.searchParams.set("limit", String(MASTODON_PAGE_SIZE));

  const follows: ImportedSource[] = [];
  const seen = new Set<string>();
  let pageUrl: URL | null = followingUrl;
  while (pageUrl) {
    const res = await mastodonResponse(pageUrl.toString(), accessToken);
    if (!res.ok) throw new Error(`Mastodon following request failed: HTTP ${res.status}`);
    const accounts = (await res.json()) as MastodonAccount[];
    for (const account of accounts) {
      const id = account.id;
      const acct = account.acct;
      if (typeof id !== "string" || typeof acct !== "string") continue;
      const accountId = id.trim();
      const handle = qualifiedMastodonAccount(acct, new URL(server).host);
      if (!accountId || !handle || seen.has(accountId)) continue;
      seen.add(accountId);
      follows.push({
        kind: "mastodon",
        config: { mode: "account", server, account: handle, accountId },
      });
    }
    pageUrl = mastodonNextPage(res.headers.get("link"), server, accountId);
  }
  return follows;
}

function requiredCredential(
  credentials: Record<string, unknown>,
  field: string,
  label: string,
): string {
  const value = credentials[field];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} is required`);
  }
  return value.trim();
}

function mastodonServer(credentials: Record<string, unknown>): string {
  const raw = requiredCredential(credentials, "server", "Mastodon server");
  let server: URL;
  try {
    server = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    throw new Error("Mastodon server is invalid");
  }
  if (server.protocol !== "https:") throw new Error("Mastodon server must use https");
  return server.origin;
}

async function mastodonJson<T>(url: string, accessToken: string): Promise<T> {
  const res = await mastodonResponse(url, accessToken);
  if (!res.ok) throw new Error(`Mastodon following request failed: HTTP ${res.status}`);
  return (await res.json()) as T;
}

function mastodonResponse(url: string, accessToken: string): Promise<Response> {
  return fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      accept: "application/json",
    },
    signal: AbortSignal.timeout(20_000),
  });
}

function requiredAccountField(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim().length === 0)
    throw new Error(`${label} is missing`);
  return value.trim();
}

function qualifiedMastodonAccount(raw: string, host: string): string | null {
  const account = raw.trim().replace(/^@/, "").toLowerCase();
  if (!account) return null;
  return account.includes("@") ? account : `${account}@${host}`;
}

/** Gets the server-supplied rel="next" page, rejecting cross-origin links. */
function mastodonNextPage(link: string | null, server: string, accountId: string): URL | null {
  if (!link) return null;
  const next = link
    .split(",")
    .map((part) => part.trim())
    .find((part) => /\brel="?next"?/i.test(part));
  const match = next?.match(/^<([^>]+)>/);
  if (!match?.[1]) return null;
  let url: URL;
  try {
    url = new URL(match[1], server);
  } catch {
    throw new Error("Mastodon returned an invalid following page");
  }
  const expectedPath = `/api/v1/accounts/${encodeURIComponent(accountId)}/following`;
  if (url.origin !== server || url.pathname !== expectedPath) {
    throw new Error("Mastodon returned an unsafe following page");
  }
  return url;
}

async function subscribeToImportedSource(
  db: Db,
  userId: string,
  connectionId: string,
  imported: ImportedSource,
): Promise<boolean> {
  const connector = getConnector(imported.kind);
  if (!connector) throw new Error(`no connector for ${imported.kind}`);
  const config = connector.parseConfig(imported.config);
  const canonicalKey = connector.canonicalKey(config);

  let [source] = await db
    .insert(sources)
    .values({ kind: imported.kind, canonicalKey, config })
    .onConflictDoNothing()
    .returning({ id: sources.id });
  if (!source) {
    [source] = await db
      .select({ id: sources.id })
      .from(sources)
      .where(eq(sources.canonicalKey, canonicalKey))
      .limit(1);
  }
  if (!source) throw new Error("failed to create followed source");

  const [subscription] = await db
    .insert(subscriptions)
    .values({ userId, sourceId: source.id, connectionId })
    .onConflictDoNothing()
    .returning({ sourceId: subscriptions.sourceId });
  if (subscription) return true;

  // Do not overwrite a connection the person deliberately chose for an
  // existing source. The following import is additive and idempotent.
  return false;
}
