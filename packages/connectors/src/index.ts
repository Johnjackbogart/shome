import type { Connector, SourceKind } from "@shome/core";
import { blueskyConnector } from "./bluesky";
import { mastodonConnector } from "./mastodon";
import { rssConnector } from "./rss";
import { youtubeConnector } from "./youtube";

export { type BlueskyConfig, blueskyConnector } from "./bluesky";
export { type MastodonConfig, mastodonConnector, stripHtml } from "./mastodon";
export { type RssConfig, rssConnector } from "./rss";
export { type YoutubeConfig, youtubeConnector } from "./youtube";

export const connectors: Record<SourceKind, Connector> = {
  rss: rssConnector,
  bluesky: blueskyConnector,
  mastodon: mastodonConnector,
  youtube: youtubeConnector,
};

export function getConnector(kind: string): Connector | undefined {
  return Object.hasOwn(connectors, kind) ? connectors[kind as SourceKind] : undefined;
}
