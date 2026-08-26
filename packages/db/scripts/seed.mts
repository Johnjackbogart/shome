/**
 * Writes the world in seed-data.mts straight into a development database:
 * eleven accounts (test0 … test10, every one of them with the password
 * `testtest`), each with both of its styles written out — the post style its
 * posts inherit and the app style its signed-in chrome uses — plus their
 * posts, shared RSS sources whose items are already fetched, and the
 * subscriptions, saved feeds and follows that make the UI look lived-in.
 *
 *   npm run db:seed             # from the repo root
 *   npm run db:seed -- --clean  # remove what a previous run wrote, then stop
 *
 * STOP THE DEV SERVER FIRST when using the embedded database — PGlite is
 * single-process; opening the data dir from two processes corrupts it.
 *
 * See seed-http.mts for the other way to seed — through the running app's API,
 * which is slower and less complete but exercises the endpoints themselves.
 *
 * Re-running is safe. Every row gets an id derived from the seed data, and a
 * run first deletes the previous seed — its users (taking their accounts,
 * profiles, posts, subscriptions, feeds and follows along by cascade) and its
 * sources (taking their items) — so nothing outside the seed set is ever
 * touched.
 *
 * Two things are deliberately absent. Media attachments would need the bytes
 * themselves in the local media store, so seeded `post_media` rows would only
 * render as broken attachments. Connections hold a JWE that only the server's
 * SHOME_ENCRYPTION_KEY can open, so a fabricated one would do nothing but fail
 * at cross-post time — which is why the two non-RSS sources below use the
 * public, credential-free connector modes.
 */

import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { connectors } from "@shome/connectors";
import { type AppStyle, DEFAULT_POST_STYLE, type PostStyle, SOURCE_FETCH_ERROR } from "@shome/core";
import {
  account,
  createDatabase,
  type Db,
  feeds,
  follows,
  items,
  posts,
  profiles,
  sources,
  subscriptions,
  user,
} from "@shome/db";
import { hashPassword } from "better-auth/crypto";
import { inArray } from "drizzle-orm";
import { FOLLOW_PAIRS, PASSWORD, SEED_SOURCES, SEED_USERS, type SeedUser } from "./seed-data.mjs";

// ---------------------------------------------------------------------------
// Derivation helpers
// ---------------------------------------------------------------------------

const startedAt = Date.now();

/** A timestamp relative to this run, so seeded content always reads as recent. */
function ago(hours: number): Date {
  return new Date(startedAt - hours * 3_600_000);
}

/**
 * A stable UUID for a seeded row. Deriving ids from the data means a re-run
 * rewrites the same rows rather than accumulating new ones, and makes the
 * delete below able to find exactly what an earlier run wrote.
 */
function seedUuid(name: string): string {
  const hex = createHash("sha1").update(`shome-seed:${name}`).digest("hex");
  // Pin the version-5 and RFC 4122 variant nibbles so these are valid UUIDs.
  const variant = ((Number.parseInt(hex.slice(16, 17), 16) & 0x3) | 0x8).toString(16);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `5${hex.slice(13, 16)}`,
    `${variant}${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join("-");
}

/** `user.id` is text, so seeded accounts get ids that say what they are. */
function userId(handle: string): string {
  return `seed-${handle}`;
}

/**
 * Config and canonical key come from the connector itself rather than being
 * written out by hand, so a seeded source is indistinguishable from one added
 * through the UI — including the URL normalization the connector applies.
 */
const preparedSources = SEED_SOURCES.map((source) => {
  const connector = connectors[source.kind];
  const config = connector.parseConfig(source.config);
  const canonicalKey = connector.canonicalKey(config);
  return {
    ...source,
    config,
    canonicalKey,
    id: seedUuid(`source:${canonicalKey}`),
  };
});

function sourceBySlug(slug: string): (typeof preparedSources)[number] {
  const found = preparedSources.find((source) => source.slug === slug);
  if (!found) throw new Error(`seed references unknown source "${slug}"`);
  return found;
}

/**
 * The style stored on a post. Mirrors what POST /api/posts resolves: the
 * author's saved style over the defaults, then the composer's overrides.
 */
function resolvePostStyle(author: SeedUser, override: Partial<PostStyle> = {}): PostStyle {
  return { ...DEFAULT_POST_STYLE, ...author.style, ...override };
}

/**
 * Spreads an app style across the ten `app_*` columns it is stored in. The
 * column names differ from the object's keys, so this is the one place the two
 * are lined up — the same mapping PUT /api/app-style writes.
 */
function appStyleColumns(style: AppStyle) {
  return {
    appBackgroundColor: style.backgroundColor,
    appSecondaryBackgroundColor: style.secondaryBackgroundColor,
    appBorderColor: style.borderColor,
    appBorderRadius: style.borderRadius,
    appBorderLineStyle: style.borderLineStyle,
    appFont: style.font,
    appFontColor: style.fontColor,
    appSecondaryTextColor: style.secondaryTextColor,
    appSpacing: style.spacing,
    appOverridePostStyles: style.overridePostStyles,
  };
}

/**
 * The shared follow graph, addressed by user id and dated into the past — the
 * one thing this seeder can do with it that the HTTP seeder cannot.
 */
function followEdges(): {
  followerId: string;
  followingId: string;
  createdAt: Date;
}[] {
  return FOLLOW_PAIRS.map(([follower, following], index) => ({
    followerId: userId(follower),
    followingId: userId(following),
    createdAt: ago(120 + index),
  }));
}

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

const color = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code: number) => (s: string) => (color ? `\x1b[${code}m${s}\x1b[0m` : s);
const bold = paint(1);
const dim = paint(2);
const green = paint(32);
const red = paint(31);

/** Hides the password when echoing back a connection string. */
function describeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "***";
    return parsed.href;
  } catch {
    return "the configured DATABASE_URL";
  }
}

/**
 * The embedded database the app itself uses. `createDatabase()` would default
 * to `<cwd>/.data/pglite`, which from this package is a private, empty
 * database nobody reads — so the dir is resolved here and passed in, the same
 * way sql.mjs and migrate.mjs address it. Assumes this package's own cwd,
 * which is what `npm run db:seed` gives it.
 */
const PGLITE_DIR =
  process.env.SHOME_PGLITE_DIR ?? path.resolve(process.cwd(), "../../apps/web/.data/pglite");

/** Names the database this run will write to. */
function describeTarget(): string {
  const url = process.env.DATABASE_URL;
  if (url) return `Postgres at ${describeUrl(url)}`;
  const relative = path.relative(process.cwd(), PGLITE_DIR);
  return `embedded PGlite at ${relative && !relative.startsWith("..") ? relative : PGLITE_DIR}`;
}

/** Removes what an earlier run wrote. Cascades take the dependent rows. */
async function removeSeed(db: Db): Promise<{ users: number; sources: number }> {
  const removedUsers = await db
    .delete(user)
    .where(
      inArray(
        user.id,
        SEED_USERS.map((seedUser) => userId(seedUser.handle)),
      ),
    )
    .returning({ id: user.id });
  const removedSources = await db
    .delete(sources)
    .where(
      inArray(
        sources.canonicalKey,
        preparedSources.map((source) => source.canonicalKey),
      ),
    )
    .returning({ id: sources.id });
  return { users: removedUsers.length, sources: removedSources.length };
}

interface SeedCounts {
  users: number;
  posts: number;
  sources: number;
  items: number;
  subscriptions: number;
  feeds: number;
  follows: number;
}

async function insertSeed(db: Db): Promise<SeedCounts> {
  // Hashed with Better Auth's own function rather than a hand-rolled scrypt,
  // so these rows stay valid if it ever changes its format. One hash per
  // account: the salt differs even though the password does not.
  const passwords = await Promise.all(SEED_USERS.map(() => hashPassword(PASSWORD)));

  await db.insert(user).values(
    SEED_USERS.map((seedUser, index) => ({
      id: userId(seedUser.handle),
      name: seedUser.displayName,
      email: `${seedUser.handle}@example.com`,
      emailVerified: true,
      username: seedUser.handle,
      displayUsername: seedUser.handle,
      // Both styles land on the user row: the post style in the bare columns,
      // the app style in the `app_*` ones. Written out for every account, so
      // none of them depends on a null fallback or a column default.
      ...seedUser.style,
      ...appStyleColumns(seedUser.appStyle),
      createdAt: ago(240 - index),
      updatedAt: ago(240 - index),
    })),
  );

  await db.insert(account).values(
    SEED_USERS.map((seedUser, index) => ({
      id: `seed-account-${seedUser.handle}`,
      // Better Auth's email/password credentials live under this provider,
      // keyed by the user's own id — see its sign-up route.
      providerId: "credential",
      accountId: userId(seedUser.handle),
      userId: userId(seedUser.handle),
      password: passwords[index],
      createdAt: ago(240 - index),
      updatedAt: ago(240 - index),
    })),
  );

  await db.insert(profiles).values(
    SEED_USERS.map((seedUser, index) => ({
      userId: userId(seedUser.handle),
      html: seedUser.profileHtml ?? "",
      updatedAt: ago(240 - index),
    })),
  );

  const postRows = SEED_USERS.flatMap((seedUser) =>
    seedUser.posts.map((post) => {
      const crossPosted = post.crossPostedTo ?? [];
      const id = seedUuid(`post:${seedUser.handle}:${post.text}`);
      return {
        id,
        userId: userId(seedUser.handle),
        text: post.text,
        ...resolvePostStyle(seedUser, post.style),
        blueskyUrl: crossPosted.includes("bluesky")
          ? `https://bsky.app/profile/${seedUser.handle}.bsky.social/post/${id.slice(0, 13)}`
          : null,
        mastodonUrl: crossPosted.includes("mastodon")
          ? `https://mastodon.social/@${seedUser.handle}/${id.replaceAll("-", "").slice(0, 18)}`
          : null,
        createdAt: ago(post.hoursAgo),
      };
    }),
  );
  await db.insert(posts).values(postRows);

  await db.insert(sources).values(
    preparedSources.map((source) => ({
      id: source.id,
      kind: source.kind,
      canonicalKey: source.canonicalKey,
      config: source.config,
      title: source.title,
      createdAt: ago(240),
      lastFetchedAt: ago(source.failing ? 9 : 1),
      lastError: source.failing ? SOURCE_FETCH_ERROR : null,
    })),
  );

  const itemRows = preparedSources.flatMap((source) =>
    source.items.map((item) => ({
      id: seedUuid(`item:${source.canonicalKey}:${item.externalId}`),
      sourceId: source.id,
      externalId: item.externalId,
      url: item.url,
      title: item.title ?? null,
      text: item.text,
      authorName: item.authorName ?? null,
      authorHandle: item.authorHandle ?? null,
      media: item.media ?? [],
      publishedAt: ago(item.hoursAgo),
      fetchedAt: ago(source.failing ? 9 : 1),
    })),
  );
  await db.insert(items).values(itemRows);

  const subscriptionRows = SEED_USERS.flatMap((seedUser, userIndex) =>
    seedUser.subscriptions.map((subscription, index) => ({
      userId: userId(seedUser.handle),
      sourceId: sourceBySlug(subscription.source).id,
      customTitle: subscription.customTitle ?? null,
      createdAt: ago(200 - userIndex * 4 - index),
    })),
  );
  await db.insert(subscriptions).values(subscriptionRows);

  const feedRows = SEED_USERS.flatMap((seedUser, userIndex) =>
    (seedUser.feeds ?? []).map((feed, index) => ({
      id: seedUuid(`feed:${seedUser.handle}:${feed.name}`),
      userId: userId(seedUser.handle),
      name: feed.name,
      rules: feed.ruleSources
        ? {
            ...feed.rules,
            sourceIds: feed.ruleSources.map((slug) => sourceBySlug(slug).id),
          }
        : feed.rules,
      createdAt: ago(180 - userIndex * 4 - index),
    })),
  );
  if (feedRows.length > 0) await db.insert(feeds).values(feedRows);

  const followRows = followEdges();
  await db.insert(follows).values(followRows);

  return {
    users: SEED_USERS.length,
    posts: postRows.length,
    sources: preparedSources.length,
    items: itemRows.length,
    subscriptions: subscriptionRows.length,
    feeds: feedRows.length,
    follows: followRows.length,
  };
}

async function main(): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    console.error(red("db:seed refuses to run with NODE_ENV=production — it deletes rows."));
    process.exitCode = 1;
    return;
  }
  const cleanOnly = process.argv.slice(2).includes("--clean");

  console.log(`${bold("db:seed")} → ${describeTarget()}`);
  const handle = createDatabase({ pgliteDir: PGLITE_DIR });
  try {
    // Idempotent, and it means a brand-new database is usable in one command.
    await handle.migrate();

    const removed = await removeSeed(handle.db);
    if (removed.users > 0 || removed.sources > 0) {
      console.log(
        dim(`  removed a previous seed: ${removed.users} user(s), ${removed.sources} source(s)`),
      );
    }
    if (cleanOnly) {
      console.log(green("  ✓ cleaned; nothing seeded"));
      return;
    }

    const counts = await insertSeed(handle.db);
    console.log(
      green(
        `  ✓ ${counts.users} users · ${counts.posts} posts · ${counts.sources} sources · ` +
          `${counts.items} items · ${counts.subscriptions} subscriptions · ` +
          `${counts.feeds} feeds · ${counts.follows} follows`,
      ),
    );
    console.log(dim(`  sign in as test0 … test10 with the password ${PASSWORD}`));
  } catch (error) {
    console.error(red("  ✗ seeding failed"));
    console.error(error);
    process.exitCode = 1;
  } finally {
    await handle.close();
  }
}

await main();
