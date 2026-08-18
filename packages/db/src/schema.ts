import type { FeedRules, MediaRef, SourceKind } from "@shome/core";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Auth tables — owned by Better Auth (field names must match its models; the
// username/displayUsername columns come from its username plugin).
// ---------------------------------------------------------------------------

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true,
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Domain tables
// ---------------------------------------------------------------------------

// A user's linked platform credentials (Bluesky app password, Mastodon token,
// YouTube API key) — distinct from Better Auth's `account` table, which holds
// login identities. `credentials` holds a compact JWE (A256GCM) produced by
// apps/web src/server/crypto.ts — never plaintext.
export const connections = pgTable(
  "connections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    label: text("label").notNull().default("default"),
    // Non-secret display identity for the linked account (a Bluesky handle, a
    // Mastodon @user@host). Resolved when the connection is linked, so it is
    // null for rows created before it existed and when resolution failed.
    account: text("account"),
    credentials: text("credentials").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("connections_user_provider_label_ux").on(t.userId, t.provider, t.label)],
);

// Sources are global and deduped by canonical key; users attach via
// subscriptions. Per-user sources (e.g. a home timeline) stay private because
// their canonical key includes the owning account.
export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: text("kind").notNull().$type<SourceKind>(),
  canonicalKey: text("canonical_key").notNull().unique(),
  config: jsonb("config").notNull().$type<Record<string, unknown>>(),
  title: text("title"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastFetchedAt: timestamp("last_fetched_at", { withTimezone: true }),
  lastError: text("last_error"),
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "cascade" }),
    connectionId: uuid("connection_id").references(() => connections.id, {
      onDelete: "set null",
    }),
    // What this subscriber calls the source. It lives here rather than on the
    // shared `sources` row so one person's rename cannot rewrite the name for
    // everyone else, and so `sources.title` keeps the name the feed reported.
    customTitle: text("custom_title"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.sourceId] })],
);

export const items = pgTable(
  "items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "cascade" }),
    externalId: text("external_id").notNull(),
    url: text("url"),
    title: text("title"),
    text: text("text_content"),
    // Sanitized at ingest (see apps/web src/server/sanitize.ts); raw markup lives in `raw`.
    html: text("html"),
    authorName: text("author_name"),
    authorHandle: text("author_handle"),
    authorAvatarUrl: text("author_avatar_url"),
    media: jsonb("media").notNull().$type<MediaRef[]>().default([]),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
    raw: jsonb("raw"),
  },
  (t) => [
    uniqueIndex("items_source_external_ux").on(t.sourceId, t.externalId),
    index("items_source_published_ix").on(t.sourceId, t.publishedAt),
  ],
);

// First-party posts live separately from fetched `items`: they are authored in
// shome, may be cross-posted to connected accounts, and are always owned by a
// single user. Keeping them separate means a failed cross-post never prevents
// the original post from appearing on the user's feed or profile.
export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    text: text("text_content").notNull(),
    blueskyUrl: text("bluesky_url"),
    mastodonUrl: text("mastodon_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("posts_user_created_ix").on(t.userId, t.createdAt)],
);

export type MediaProvider = "local" | "cloudflare_images" | "cloudflare_stream";
export type MediaStatus = "uploading" | "processing" | "ready" | "failed";

// Uploaded media is kept as a first-class child of a post rather than being
// folded into its text. The file itself lives in the configured media store;
// this table is the durable ownership, type, and playback-metadata record.
export const postMedia = pgTable(
  "post_media",
  {
    id: uuid("id").primaryKey(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    type: text("type").notNull().$type<"image" | "video">(),
    contentType: text("content_type").notNull(),
    byteSize: integer("byte_size").notNull(),
    // Present only for video. Keeping milliseconds makes the three-minute
    // server-side limit exact without depending on the browser's metadata.
    durationMs: integer("duration_ms"),
    originalName: text("original_name").notNull(),
    provider: text("provider").notNull().$type<MediaProvider>().default("local"),
    providerAssetId: text("provider_asset_id"),
    status: text("status").notNull().$type<MediaStatus>().default("ready"),
    playbackUrl: text("playback_url"),
    thumbnailUrl: text("thumbnail_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("post_media_post_created_ix").on(t.postId, t.createdAt)],
);

// An upload exists before it belongs to a post. This lets a browser send bytes
// directly to a media provider, while the app keeps ownership and processing
// state server-side until the user chooses to publish the post.
export const mediaUploads = pgTable(
  "media_uploads",
  {
    id: uuid("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull().$type<"image" | "video">(),
    contentType: text("content_type").notNull(),
    byteSize: integer("byte_size").notNull(),
    durationMs: integer("duration_ms"),
    originalName: text("original_name").notNull(),
    provider: text("provider").notNull().$type<MediaProvider>(),
    providerAssetId: text("provider_asset_id").notNull(),
    status: text("status").notNull().$type<MediaStatus>().default("uploading"),
    playbackUrl: text("playback_url"),
    thumbnailUrl: text("thumbnail_url"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("media_uploads_provider_asset_ux").on(t.provider, t.providerAssetId),
    index("media_uploads_user_status_created_ix").on(t.userId, t.status, t.createdAt),
  ],
);

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  rules: jsonb("rules").notNull().$type<FeedRules>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  // Stored as the user wrote it; sanitized at serve time so sanitizer
  // improvements apply retroactively to existing profiles.
  html: text("html").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// A directed, first-party relationship between two shome accounts. Keeping
// each direction as its own row makes following mutual by choice, not by
// accident, and lets a person see both their followers and who they follow.
export const follows = pgTable(
  "follows",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.followerId, t.followingId] }),
    index("follows_following_created_ix").on(t.followingId, t.createdAt),
  ],
);

// A lightweight first-party catalog for profile storefronts. Purchases stay on
// the creator's checkout provider; shome never stores payment or order data.
export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    price: text("price"),
    imageUrl: text("image_url"),
    checkoutUrl: text("checkout_url").notNull(),
    visible: boolean("visible").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("products_user_visible_sort_ix").on(t.userId, t.visible, t.sortOrder)],
);

// Launch interest is intentionally separate from accounts: visitors can join
// the waitlist or newsletter before shome is publicly available.
export const interestSignups = pgTable("interest_signups", {
  email: text("email").primaryKey(),
  waitlist: boolean("waitlist").notNull().default(false),
  newsletter: boolean("newsletter").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Drizzle relational-query metadata
// ---------------------------------------------------------------------------
//
// These declarations describe the application-level navigation between the
// foreign keys above. They do not alter the database schema or migrations.

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  connections: many(connections),
  subscriptions: many(subscriptions),
  posts: many(posts),
  mediaUploads: many(mediaUploads),
  feeds: many(feeds),
  profile: one(profiles),
  // `following` are relationship rows where this user initiated the follow;
  // `followers` are rows where they are the target.
  following: many(follows, { relationName: "follower" }),
  followers: many(follows, { relationName: "following" }),
  products: many(products),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const connectionsRelations = relations(connections, ({ many, one }) => ({
  user: one(user, {
    fields: [connections.userId],
    references: [user.id],
  }),
  subscriptions: many(subscriptions),
}));

export const sourcesRelations = relations(sources, ({ many }) => ({
  subscriptions: many(subscriptions),
  items: many(items),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(user, {
    fields: [subscriptions.userId],
    references: [user.id],
  }),
  source: one(sources, {
    fields: [subscriptions.sourceId],
    references: [sources.id],
  }),
  connection: one(connections, {
    fields: [subscriptions.connectionId],
    references: [connections.id],
  }),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  source: one(sources, {
    fields: [items.sourceId],
    references: [sources.id],
  }),
}));

export const postsRelations = relations(posts, ({ many, one }) => ({
  user: one(user, {
    fields: [posts.userId],
    references: [user.id],
  }),
  media: many(postMedia),
}));

export const postMediaRelations = relations(postMedia, ({ one }) => ({
  post: one(posts, {
    fields: [postMedia.postId],
    references: [posts.id],
  }),
}));

export const mediaUploadsRelations = relations(mediaUploads, ({ one }) => ({
  user: one(user, {
    fields: [mediaUploads.userId],
    references: [user.id],
  }),
}));

export const feedsRelations = relations(feeds, ({ one }) => ({
  user: one(user, {
    fields: [feeds.userId],
    references: [user.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(user, {
    fields: [profiles.userId],
    references: [user.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(user, {
    fields: [follows.followerId],
    references: [user.id],
    relationName: "follower",
  }),
  following: one(user, {
    fields: [follows.followingId],
    references: [user.id],
    relationName: "following",
  }),
}));

export const productsRelations = relations(products, ({ one }) => ({
  user: one(user, {
    fields: [products.userId],
    references: [user.id],
  }),
}));
