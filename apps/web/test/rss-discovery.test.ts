import { afterEach, describe, expect, it, vi } from "vitest";
import {
  discoverPopularRssFeeds,
  discoverRssFeeds,
  looksLikeWebsite,
  normalizeDiscoveryUrl,
  searchFeedlyRssFeeds,
} from "../src/server/rss-discovery";

afterEach(() => vi.unstubAllGlobals());

describe("RSS discovery", () => {
  it("normalizes a bare site URL and refuses a non-web protocol", () => {
    expect(normalizeDiscoveryUrl("arstechnica.com/#latest")).toBe("https://arstechnica.com/");
    expect(() => normalizeDiscoveryUrl("file:///etc/passwd")).toThrow("must use http(s)");
    expect(looksLikeWebsite("arstechnica.com")).toBe(true);
    expect(looksLikeWebsite("Ars Technica")).toBe(false);
  });

  it("keeps only valid, unique public feed URLs from the discovery service", async () => {
    const fetch = vi.fn(async () =>
      Response.json([
        {
          url: "https://example.com/feed.xml#top",
          title: " Example feed ",
          description: "A useful feed",
          site_name: "Example",
          site_url: "https://example.com/",
          is_podcast: true,
        },
        { url: "https://example.com/feed.xml" },
        { url: "javascript:alert(1)", title: "unsafe" },
        { url: 42 },
      ]),
    );
    vi.stubGlobal("fetch", fetch);

    await expect(discoverRssFeeds("https://example.com/")).resolves.toEqual([
      {
        url: "https://example.com/feed.xml",
        title: "Example feed",
        description: "A useful feed",
        siteName: "Example",
        siteUrl: "https://example.com/",
        isPodcast: true,
      },
    ]);

    const [url] = fetch.mock.calls[0] ?? [];
    expect(String(url)).toContain("https://feedsearch.dev/api/v1/search?");
    expect(String(url)).toContain("url=https%3A%2F%2Fexample.com%2F");
  });

  it("reports a failed discovery response clearly", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 429 })),
    );
    await expect(discoverRssFeeds("https://example.com/")).rejects.toThrow(
      "feed discovery failed: HTTP 429",
    );
  });

  it("searches Feedly by publisher name when the input is not a URL", async () => {
    const fetch = vi.fn(async () =>
      Response.json({
        results: [
          {
            valid: true,
            feedId: "feed/https://feeds.example.com/ars.xml",
            title: "Ars Example",
            description: "Technology reporting",
            website: "https://example.com/",
            subscribers: 123_456,
          },
          { valid: true, feedId: "feed/javascript:alert(1)", subscribers: 1 },
        ],
      }),
    );
    vi.stubGlobal("fetch", fetch);

    await expect(searchFeedlyRssFeeds("Ars Example")).resolves.toEqual([
      {
        url: "https://feeds.example.com/ars.xml",
        title: "Ars Example",
        description: "Technology reporting",
        siteName: null,
        siteUrl: "https://example.com/",
        isPodcast: false,
        subscriberCount: 123_456,
      },
    ]);

    const [url] = fetch.mock.calls[0] ?? [];
    expect(String(url)).toContain("https://cloud.feedly.com/v3/search/feeds?");
    expect(String(url)).toContain("query=Ars+Example");
  });

  it("preserves Feedly's result order for the popular-sources panel", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          results: [
            {
              valid: true,
              feedId: "feed/https://feeds.example.com/first.xml",
              title: "Feedly's first result",
              subscribers: 1,
            },
            {
              valid: true,
              feedId: "feed/https://feeds.example.com/second.xml",
              title: "Feedly's second result",
              subscribers: 999_999,
            },
          ],
        }),
      ),
    );

    await expect(discoverPopularRssFeeds()).resolves.toMatchObject([
      { title: "Feedly's first result", subscriberCount: 1 },
      { title: "Feedly's second result", subscriberCount: 999_999 },
    ]);
  });
});
