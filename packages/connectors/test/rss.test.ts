import { readFileSync } from "node:fs";
import { ConnectorConfigError } from "@shome/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { rssConnector } from "../src/index";

const fixtureXml = readFileSync(new URL("./fixtures/sample-feed.xml", import.meta.url), "utf8");

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("rssConnector.parseConfig", () => {
  it("normalizes the url and strips fragments", () => {
    const config = rssConnector.parseConfig({
      url: "https://blog.example.com/feed.xml#frag",
    });
    expect(config).toEqual({ url: "https://blog.example.com/feed.xml" });
  });

  it("rejects missing and non-http urls", () => {
    expect(() => rssConnector.parseConfig({})).toThrow(ConnectorConfigError);
    expect(() => rssConnector.parseConfig({ url: "ftp://example.com/feed" })).toThrow(
      ConnectorConfigError,
    );
    expect(() => rssConnector.parseConfig({ url: "not a url" })).toThrow(ConnectorConfigError);
  });

  it("builds a stable canonical key", () => {
    const config = rssConnector.parseConfig({
      url: "https://blog.example.com/feed.xml",
    });
    expect(rssConnector.canonicalKey(config)).toBe("rss:https://blog.example.com/feed.xml");
  });
});

describe("rssConnector.fetchLatest", () => {
  it("normalizes items from a fetched feed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(fixtureXml, { status: 200 })),
    );

    const result = await rssConnector.fetchLatest({ url: "https://blog.example.com/feed.xml" }, {});
    expect(result.sourceTitle).toBe("Example Blog");
    expect(result.items).toHaveLength(2);

    const [first, second] = result.items;
    expect(first?.externalId).toBe("post-1");
    expect(first?.title).toBe("First Post");
    expect(first?.url).toBe("https://blog.example.com/first");
    expect(first?.author?.name).toBe("Jordan Writer");
    expect(first?.text).toBe("Full rich body.");
    expect(first).not.toHaveProperty("html");
    expect(first).not.toHaveProperty("raw");
    expect(first?.publishedAt).toEqual(new Date("2026-08-03T12:00:00Z"));
    // enclosure + duplicate media:content collapse to unique urls
    expect(first?.media?.map((m) => m.url).sort()).toEqual([
      "https://blog.example.com/cover.png",
      "https://blog.example.com/extra.jpg",
    ]);

    // no guid → falls back to link; no date → undefined
    expect(second?.externalId).toBe("https://blog.example.com/second");
    expect(second?.publishedAt).toBeUndefined();
  });

  it("throws on http errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("gone", { status: 410 })),
    );
    await expect(
      rssConnector.fetchLatest({ url: "https://blog.example.com/feed.xml" }, {}),
    ).rejects.toThrow("HTTP 410");
  });
});
