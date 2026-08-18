import { describe, expect, it } from "vitest";
import { originalSourceLabel, type SourceView, sourceLabel } from "../src/index";

function source(overrides: Partial<SourceView>): SourceView {
  return {
    id: "5f1c2b3a-0000-4000-8000-000000000001",
    kind: "rss",
    title: null,
    customTitle: null,
    config: {},
    lastFetchedAt: null,
    lastError: null,
    ...overrides,
  };
}

describe("source labels", () => {
  it("prefers this subscriber's rename over the fetched title", () => {
    const renamed = source({ title: "Ars Technica", customTitle: "Tech news" });
    expect(sourceLabel(renamed)).toBe("Tech news");
    // The name the feed reported stays reachable so the rename is never confusing.
    expect(originalSourceLabel(renamed)).toBe("Ars Technica");
  });

  it("falls back to the fetched title when there is no rename", () => {
    expect(sourceLabel(source({ title: "Ars Technica", config: { url: "https://x/feed" } }))).toBe(
      "Ars Technica",
    );
  });

  it("falls back to what the person typed to add the source", () => {
    expect(sourceLabel(source({ config: { url: "https://example.com/feed.xml" } }))).toBe(
      "https://example.com/feed.xml",
    );
    expect(sourceLabel(source({ kind: "bluesky", config: { actor: "alice.bsky.social" } }))).toBe(
      "@alice.bsky.social",
    );
    expect(sourceLabel(source({ kind: "mastodon", config: { hashtag: "photography" } }))).toBe(
      "#photography",
    );
    // YouTube handles are stored with their "@" already; it must not double up.
    expect(sourceLabel(source({ kind: "youtube", config: { handle: "@someone" } }))).toBe(
      "@someone",
    );
  });

  it("falls back to the kind when the config has nothing to show", () => {
    expect(sourceLabel(source({ kind: "mastodon", config: { mode: "public" } }))).toBe("mastodon");
  });
});
