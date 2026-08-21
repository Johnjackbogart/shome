import { createHash } from "node:crypto";
import {
  type Connector,
  ConnectorConfigError,
  type ContentItem,
  type FetchResult,
  htmlToPlainText,
  type MediaRef,
} from "@shome/core";
import Parser from "rss-parser";

export interface RssConfig extends Record<string, unknown> {
  url: string;
}

interface MediaContentEntry {
  $?: { url?: string; medium?: string; type?: string };
}

type ExtraItemFields = {
  id?: string;
  contentEncoded?: string;
  mediaContent?: MediaContentEntry[];
};

const parser = new Parser<Record<string, unknown>, ExtraItemFields>({
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["media:content", "mediaContent", { keepArray: true }],
    ],
  },
});

const USER_AGENT = "shome/0.1 (open source media engine)";

function normalizeUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ConnectorConfigError("config.url is not a valid URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new ConnectorConfigError("feed URL must be http(s)");
  }
  url.hash = "";
  return url.toString();
}

function mediaType(mime: string | undefined): MediaRef["type"] {
  if (mime?.startsWith("audio")) return "audio";
  if (mime?.startsWith("video")) return "video";
  return "image";
}

function normalizeItem(item: Parser.Item & ExtraItemFields): ContentItem {
  const media: MediaRef[] = [];
  if (item.enclosure?.url) {
    media.push({
      type: mediaType(item.enclosure.type),
      url: item.enclosure.url,
    });
  }
  for (const entry of item.mediaContent ?? []) {
    const attrs = entry.$;
    if (attrs?.url)
      media.push({
        type: mediaType(attrs.type ?? attrs.medium),
        url: attrs.url,
      });
  }
  const seen = new Set<string>();
  const dedupedMedia = media.filter((m) => !seen.has(m.url) && seen.add(m.url));

  const dateSource = item.isoDate ?? item.pubDate;
  const publishedAt = dateSource ? new Date(dateSource) : undefined;

  const externalId =
    item.guid ??
    item.id ??
    item.link ??
    createHash("sha256")
      .update(`${item.title ?? ""}|${item.pubDate ?? ""}`)
      .digest("hex")
      .slice(0, 32);

  return {
    externalId,
    url: item.link ?? undefined,
    title: item.title?.trim() || undefined,
    text:
      htmlToPlainText(item.contentEncoded ?? item.content ?? item.contentSnippet ?? "") ||
      undefined,
    author: item.creator ? { name: item.creator } : undefined,
    media: dedupedMedia,
    publishedAt: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : undefined,
  };
}

export const rssConnector: Connector<RssConfig> = {
  kind: "rss",
  displayName: "RSS / Atom",
  auth: "none",
  parseConfig(raw) {
    if (typeof raw.url !== "string" || raw.url.length === 0) {
      throw new ConnectorConfigError("config.url is required");
    }
    return { url: normalizeUrl(raw.url) };
  },
  canonicalKey(config) {
    return `rss:${config.url}`;
  },
  async fetchLatest(config, ctx): Promise<FetchResult> {
    const res = await fetch(config.url, {
      signal: ctx.signal ?? AbortSignal.timeout(20_000),
      redirect: "follow",
      headers: {
        "user-agent": USER_AGENT,
        accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
    });
    if (!res.ok) throw new Error(`feed fetch failed: HTTP ${res.status}`);
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    return {
      items: (feed.items ?? []).map(normalizeItem),
      sourceTitle:
        typeof feed.title === "string" && feed.title.trim() ? feed.title.trim() : undefined,
    };
  },
};
