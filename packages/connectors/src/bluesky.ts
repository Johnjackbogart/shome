import { AtpAgent } from "@atproto/api";
import {
  type Connector,
  ConnectorConfigError,
  type ContentItem,
  type FetchResult,
  type MediaRef,
} from "@shome/core";

export type BlueskyConfig = Record<string, unknown> &
  (
    | { mode: "timeline"; account: string; service?: string }
    // A handle keeps this source recognizable in the UI. When it was imported
    // from the follow graph, its DID makes its canonical key survive a handle
    // change and is used to fetch the author's posts.
    | { mode: "author"; actor: string; did?: string }
  );

// Unauthenticated AppView endpoint — serves public data like author feeds.
const PUBLIC_SERVICE = "https://public.api.bsky.app";
const DEFAULT_SERVICE = "https://bsky.social";

// Minimal structural view of the lexicon types; the full @atproto/api response
// types are far wider than the fields we normalize, so we narrow via cast.
interface BskyPostView {
  uri: string;
  author: {
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  record?: { text?: string; createdAt?: string };
  embed?: {
    $type?: string;
    images?: { fullsize?: string; thumb?: string; alt?: string }[];
    media?: { images?: { fullsize?: string; thumb?: string; alt?: string }[] };
  };
  indexedAt: string;
}

function normalizeActor(raw: unknown, field: string): string {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    throw new ConnectorConfigError(`config.${field} is required`);
  }
  const actor = raw.trim().replace(/^@/, "");
  return actor.startsWith("did:") ? actor : actor.toLowerCase();
}

function normalizeDid(raw: unknown): string | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "string" || !raw.startsWith("did:") || raw.length <= "did:".length) {
    throw new ConnectorConfigError("config.did must be a DID");
  }
  return raw;
}

function postUrl(post: BskyPostView): string {
  const rkey = post.uri.split("/").pop() ?? "";
  return `https://bsky.app/profile/${post.author.handle}/post/${rkey}`;
}

function normalizePost(entry: { post: BskyPostView }): ContentItem {
  const post = entry.post;
  const images = post.embed?.images ?? post.embed?.media?.images ?? [];
  const media: MediaRef[] = images
    .map((img) => ({
      type: "image" as const,
      url: img.fullsize ?? img.thumb ?? "",
      alt: img.alt,
    }))
    .filter((m) => m.url.length > 0);
  const created = post.record?.createdAt ?? post.indexedAt;
  return {
    externalId: post.uri,
    url: postUrl(post),
    text: post.record?.text,
    author: {
      name: post.author.displayName || post.author.handle,
      handle: post.author.handle,
      avatarUrl: post.author.avatar,
    },
    media,
    publishedAt: created ? new Date(created) : undefined,
  };
}

export const blueskyConnector: Connector<BlueskyConfig> = {
  kind: "bluesky",
  displayName: "Bluesky",
  auth: "account",
  parseConfig(raw) {
    if (raw.mode === "author") {
      const config: BlueskyConfig = {
        mode: "author",
        actor: normalizeActor(raw.actor, "actor"),
      };
      const did = normalizeDid(raw.did);
      if (did) config.did = did;
      return config;
    }
    if (raw.mode === "timeline") {
      const config: BlueskyConfig = {
        mode: "timeline",
        account: normalizeActor(raw.account, "account"),
      };
      if (typeof raw.service === "string" && raw.service.length > 0) config.service = raw.service;
      return config;
    }
    throw new ConnectorConfigError("config.mode must be 'timeline' or 'author'");
  },
  canonicalKey(config) {
    return config.mode === "author"
      ? `bluesky:author:${config.did ?? config.actor}`
      : `bluesky:timeline:${config.account}`;
  },
  async fetchLatest(config, ctx): Promise<FetchResult> {
    if (config.mode === "author") {
      const agent = new AtpAgent({ service: PUBLIC_SERVICE });
      const res = await agent.getAuthorFeed({ actor: config.did ?? config.actor, limit: 50 });
      const feed = res.data.feed as unknown as { post: BskyPostView }[];
      return {
        items: feed.map(normalizePost),
        sourceTitle: `@${config.actor} on Bluesky`,
      };
    }

    const identifier = ctx.credentials?.identifier;
    const password = ctx.credentials?.appPassword;
    if (typeof identifier !== "string" || typeof password !== "string") {
      throw new Error(
        "Bluesky timeline needs a linked connection with { identifier, appPassword } (use an app password, not your main password)",
      );
    }
    const agent = new AtpAgent({ service: config.service ?? DEFAULT_SERVICE });
    await agent.login({ identifier, password });
    const res = await agent.getTimeline({ limit: 50 });
    const feed = res.data.feed as unknown as { post: BskyPostView }[];
    return {
      items: feed.map(normalizePost),
      sourceTitle: `Bluesky timeline (@${config.account})`,
    };
  },
};
