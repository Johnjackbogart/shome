/**
 * The same world as seed.mts, built by driving the running app's HTTP API
 * instead of writing rows. Nothing here knows the schema: accounts are created
 * through Better Auth's sign-up endpoint, so the app does its own password
 * hashing, and sources go through POST /api/sources, so the app derives its own
 * canonical keys and fetches the feeds for real.
 *
 *   npm run dev                        # in another terminal, first
 *   npm run db:seed:http               # from the repo root
 *   SHOME_BASE_URL=http://localhost:3001 npm run db:seed:http
 *
 * Use this when you want the seed to exercise the API exactly as a client
 * would — after changing sign-up, styles, posting or subscribing — or when the
 * app is running against a database this machine cannot open directly.
 * seed.mts remains the faster and more complete one for everyday work.
 *
 * Four things it cannot reproduce, because no endpoint exposes them:
 *
 *   · Timestamps. Everything is created now, so the staggered fortnight of
 *     posts and items collapses into one flat instant.
 *   · Saved feeds. `feeds` has no route at all, so those rules go unwritten.
 *   · Cross-post links. `blueskyUrl` / `mastodonUrl` are only set by a real
 *     delivery through a linked connection.
 *   · Item content. POST /api/sources fetches each feed live, so items are
 *     whatever the internet returns — not the fixed set in seed-data.mts.
 *
 * Re-running is partly safe. Styles, profiles, subscriptions and follows are
 * idempotent (they are PUTs or upserts server-side), and an account that
 * already exists is signed into rather than recreated. Posts are the exception:
 * there is no way to delete or dedupe them over HTTP, so they are written only
 * for accounts this run created, and skipped for accounts that already existed.
 */

import process from "node:process";
import type { AppStyle, PostStyle } from "@shome/core";
import { FOLLOW_PAIRS, PASSWORD, SEED_SOURCES, SEED_USERS, type SeedUser } from "./seed-data.mjs";

const BASE_URL = (process.env.SHOME_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// ---------------------------------------------------------------------------
// A very small client
// ---------------------------------------------------------------------------

/** Raised for a response the app itself rejected, carrying what it said. */
class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly method: string,
    readonly path: string,
    detail: string,
  ) {
    super(`${method} ${path} → ${status}${detail ? `: ${detail}` : ""}`);
  }
}

interface Session {
  userId: string;
  /** The Cookie header value carrying this account's Better Auth session. */
  cookie: string;
  /** False when the account already existed and this run signed in instead. */
  created: boolean;
}

async function readError(res: Response): Promise<string> {
  const body = await res.text();
  try {
    const parsed = JSON.parse(body) as { error?: string; message?: string };
    return parsed.error ?? parsed.message ?? body.slice(0, 200);
  } catch {
    return body.slice(0, 200);
  }
}

/**
 * One request. The Origin header is required, not optional: Better Auth
 * rejects a request with a missing or null Origin outright ("Missing or null
 * Origin", 403). Claiming the app's own base URL makes this a same-origin
 * request, which it trusts without needing an entry in `trustedOrigins` —
 * so pointing SHOME_BASE_URL at a different host works with no config change.
 */
async function call<T>(
  method: string,
  path: string,
  options: { body?: unknown; cookie?: string } = {},
): Promise<{ data: T; res: Response }> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "content-type": "application/json",
        origin: BASE_URL,
        ...(options.cookie ? { cookie: options.cookie } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch (cause) {
    throw new Error(
      `cannot reach the app at ${BASE_URL}. Start it with \`npm run dev\`, or point ` +
        `SHOME_BASE_URL at wherever it is listening.`,
      { cause },
    );
  }
  if (!res.ok) throw new ApiError(res.status, method, path, await readError(res));
  const text = await res.text();
  return { data: (text ? JSON.parse(text) : {}) as T, res };
}

/** Better Auth returns the session as Set-Cookie; hand it back on later calls. */
function sessionCookie(res: Response): string {
  return res.headers
    .getSetCookie()
    .map((cookie) => cookie.split(";", 1)[0])
    .filter((pair): pair is string => Boolean(pair))
    .join("; ");
}

// ---------------------------------------------------------------------------
// The steps, in the order a person would do them
// ---------------------------------------------------------------------------

interface AuthResponse {
  user: { id: string };
}

/** A duplicate email or username, i.e. an account an earlier run created. */
function isAlreadyRegistered(error: unknown): error is ApiError {
  return error instanceof ApiError && /already|taken|exists/i.test(error.message);
}

/**
 * Signs the account up, or signs in when it is already there. Better Auth
 * hashes the password itself, which is the whole point of seeding this way.
 */
async function authenticate(seedUser: SeedUser): Promise<Session> {
  const credentials = {
    email: `${seedUser.handle}@example.com`,
    password: PASSWORD,
    name: seedUser.displayName,
    username: seedUser.handle,
  };
  try {
    const { data, res } = await call<AuthResponse>("POST", "/api/auth/sign-up/email", {
      body: credentials,
    });
    return { userId: data.user.id, cookie: sessionCookie(res), created: true };
  } catch (error) {
    // Only one sign-up failure means "already seeded": the account exists.
    // Anything else — a rejected origin, a validation change — is reported as
    // itself, rather than being hidden behind a second failing request.
    if (!isAlreadyRegistered(error)) throw error;
    const { data, res } = await call<AuthResponse>("POST", "/api/auth/sign-in/email", {
      body: { email: credentials.email, password: credentials.password },
    });
    return { userId: data.user.id, cookie: sessionCookie(res), created: false };
  }
}

async function applyStyles(session: Session, seedUser: SeedUser): Promise<void> {
  // Both endpoints take the style as one whole object and overwrite it, so
  // these are naturally idempotent.
  await call<unknown>("PUT", "/api/post-style", {
    cookie: session.cookie,
    body: {
      defaultPostStyle: seedUser.style satisfies PostStyle,
    },
  });
  await call<unknown>("PUT", "/api/app-style", {
    cookie: session.cookie,
    body: { appStyle: seedUser.appStyle satisfies AppStyle },
  });
}

async function applyProfile(session: Session, seedUser: SeedUser): Promise<void> {
  // Accounts without custom HTML keep the document sign-up generated for them.
  if (!seedUser.profileHtml) return;
  await call<unknown>("PUT", "/api/profile", {
    cookie: session.cookie,
    body: { html: seedUser.profileHtml },
  });
}

async function writePosts(session: Session, seedUser: SeedUser): Promise<number> {
  // Oldest first, so at least the relative order survives even though every
  // createdAt lands in the same instant.
  const drafts = [...seedUser.posts].sort((a, b) => b.hoursAgo - a.hoursAgo);
  for (const draft of drafts) {
    await call<unknown>("POST", "/api/posts", {
      cookie: session.cookie,
      // Per-post styling goes in the same body the composer sends; anything
      // omitted is filled from the account's saved style by the server.
      body: { text: draft.text, ...draft.style },
    });
  }
  return drafts.length;
}

interface SourceResponse {
  source: { id: string };
  refreshError?: string;
}

/**
 * Subscribes the account to its sources. The route dedupes on the canonical
 * key the connector derives, so re-running attaches to the same rows — and it
 * fetches each feed for real, which is where the wall-clock time goes.
 */
async function subscribe(
  session: Session,
  seedUser: SeedUser,
): Promise<{ count: number; failures: string[] }> {
  const failures: string[] = [];
  for (const subscription of seedUser.subscriptions) {
    const source = SEED_SOURCES.find((candidate) => candidate.slug === subscription.source);
    if (!source) throw new Error(`seed references unknown source "${subscription.source}"`);

    const { data } = await call<SourceResponse>("POST", "/api/sources", {
      cookie: session.cookie,
      body: { kind: source.kind, config: source.config },
    });
    // A feed that would not fetch is still a subscription; the app records the
    // error on the source and shows it. Worth reporting, not worth stopping.
    if (data.refreshError) failures.push(`${source.slug}: ${data.refreshError}`);

    if (subscription.customTitle) {
      await call<unknown>("PATCH", `/api/sources/${data.source.id}`, {
        cookie: session.cookie,
        body: { customTitle: subscription.customTitle },
      });
    }
  }
  return { count: seedUser.subscriptions.length, failures };
}

/** Follows are per-follower, so this runs once every account exists. */
async function applyFollows(sessions: Map<string, Session>): Promise<number> {
  let created = 0;
  for (const [follower, following] of FOLLOW_PAIRS) {
    const session = sessions.get(follower);
    const target = sessions.get(following);
    if (!session || !target) continue;
    const { res } = await call<unknown>("POST", "/api/follows", {
      cookie: session.cookie,
      body: { userId: target.userId },
    });
    // The route answers 201 for a new edge and 200 for one already there.
    if (res.status === 201) created += 1;
  }
  return created;
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code: number) => (s: string) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = paint(1);
const dim = paint(2);
const green = paint(32);
const yellow = paint(33);
const red = paint(31);

async function main(): Promise<void> {
  console.log(`${bold("db:seed:http")} → ${BASE_URL}`);
  console.log(dim(`  ${SEED_USERS.length} accounts, each signing up and posting for itself`));

  const sessions = new Map<string, Session>();
  let posted = 0;
  let skippedPosts = 0;
  let subscriptions = 0;
  const refreshFailures: string[] = [];

  const started = Date.now();
  try {
    for (const seedUser of SEED_USERS) {
      const session = await authenticate(seedUser);
      sessions.set(seedUser.handle, session);
      await applyStyles(session, seedUser);
      await applyProfile(session, seedUser);

      // Posting is the one step with no server-side dedupe, so it happens only
      // for accounts this run created.
      if (session.created) posted += await writePosts(session, seedUser);
      else skippedPosts += seedUser.posts.length;

      const subscribed = await subscribe(session, seedUser);
      subscriptions += subscribed.count;
      refreshFailures.push(...subscribed.failures);

      console.log(
        dim(
          `  ${seedUser.handle}: ${session.created ? "signed up" : "existing, signed in"} · ` +
            `${subscribed.count} sources`,
        ),
      );
    }

    const follows = await applyFollows(sessions);
    const elapsed = ((Date.now() - started) / 1000).toFixed(1);

    console.log(
      green(
        `  ✓ ${sessions.size} accounts · ${posted} posts · ${subscriptions} subscriptions · ` +
          `${follows} new follows in ${elapsed}s`,
      ),
    );
    if (skippedPosts > 0) {
      console.log(yellow(`  ! skipped ${skippedPosts} posts for accounts that already existed`));
    }
    if (refreshFailures.length > 0) {
      console.log(yellow(`  ! ${refreshFailures.length} source(s) could not be fetched:`));
      for (const failure of refreshFailures) console.log(yellow(`      ${failure}`));
    }
    console.log(dim("  no saved feeds, no cross-post links, every timestamp is now"));
    console.log(dim(`  sign in as test0 … test10 with the password ${PASSWORD}`));
  } catch (error) {
    console.error(red("  ✗ seeding failed"));
    console.error(error);
    process.exitCode = 1;
  }
}

await main();
