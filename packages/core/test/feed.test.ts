import { describe, expect, it } from "vitest";
import { effectiveDate, evaluateFeed, type FeedCandidate } from "../src/index";

let seq = 0;
function candidate(overrides: Partial<FeedCandidate> = {}): FeedCandidate {
  seq += 1;
  return {
    id: `item-${seq}`,
    sourceId: "src-a",
    kind: "rss",
    title: null,
    text: null,
    media: null,
    publishedAt: new Date("2026-01-01T00:00:00Z"),
    fetchedAt: new Date("2026-02-01T00:00:00Z"),
    ...overrides,
  };
}

describe("evaluateFeed", () => {
  it("returns everything newest-first by default", () => {
    const older = candidate({ publishedAt: new Date("2026-01-01T00:00:00Z") });
    const newer = candidate({ publishedAt: new Date("2026-03-01T00:00:00Z") });
    expect(evaluateFeed([older, newer]).map((i) => i.id)).toEqual([newer.id, older.id]);
  });

  it("sorts oldest-first when asked", () => {
    const older = candidate({ publishedAt: new Date("2026-01-01T00:00:00Z") });
    const newer = candidate({ publishedAt: new Date("2026-03-01T00:00:00Z") });
    const result = evaluateFeed([newer, older], { sort: "oldest" });
    expect(result.map((i) => i.id)).toEqual([older.id, newer.id]);
  });

  it("falls back to fetchedAt for undated items", () => {
    const undated = candidate({
      publishedAt: null,
      fetchedAt: new Date("2026-04-01T00:00:00Z"),
    });
    const dated = candidate({ publishedAt: new Date("2026-03-01T00:00:00Z") });
    expect(effectiveDate(undated)).toEqual(new Date("2026-04-01T00:00:00Z"));
    expect(evaluateFeed([dated, undated]).map((i) => i.id)).toEqual([undated.id, dated.id]);
  });

  it("filters by source ids and kinds", () => {
    const a = candidate({ sourceId: "src-a", kind: "rss" });
    const b = candidate({ sourceId: "src-b", kind: "bluesky" });
    expect(evaluateFeed([a, b], { sourceIds: ["src-b"] })).toEqual([b]);
    expect(evaluateFeed([a, b], { kinds: ["rss"] })).toEqual([a]);
  });

  it("matches include keywords case-insensitively across title and text", () => {
    const hit = candidate({ title: "Big TypeScript News", text: null });
    const textHit = candidate({
      title: null,
      text: "all about typescript today",
    });
    const miss = candidate({ title: "unrelated", text: "nothing here" });
    const result = evaluateFeed([hit, textHit, miss], {
      includeKeywords: ["TypeScript"],
    });
    expect(result.map((i) => i.id).sort()).toEqual([hit.id, textHit.id].sort());
  });

  it("drops items matching exclude keywords", () => {
    const keep = candidate({ title: "good stuff" });
    const drop = candidate({ title: "SPOILER inside" });
    expect(evaluateFeed([keep, drop], { excludeKeywords: ["spoiler"] })).toEqual([keep]);
  });

  it("exclude wins over include when both match", () => {
    const both = candidate({ title: "typescript spoiler" });
    expect(
      evaluateFeed([both], {
        includeKeywords: ["typescript"],
        excludeKeywords: ["spoiler"],
      }),
    ).toEqual([]);
  });

  it("requireMedia keeps only items with attachments", () => {
    const withMedia = candidate({
      media: [{ type: "image", url: "https://example.com/x.png" }],
    });
    const withoutMedia = candidate({ media: [] });
    expect(evaluateFeed([withMedia, withoutMedia], { requireMedia: true })).toEqual([withMedia]);
  });

  it("applies limit after sorting", () => {
    const first = candidate({ publishedAt: new Date("2026-03-01T00:00:00Z") });
    const second = candidate({ publishedAt: new Date("2026-02-01T00:00:00Z") });
    const third = candidate({ publishedAt: new Date("2026-01-01T00:00:00Z") });
    const result = evaluateFeed([third, first, second], { limit: 2 });
    expect(result.map((i) => i.id)).toEqual([first.id, second.id]);
  });

  it("does not mutate the input array", () => {
    const a = candidate({ publishedAt: new Date("2026-01-01T00:00:00Z") });
    const b = candidate({ publishedAt: new Date("2026-03-01T00:00:00Z") });
    const input = [a, b];
    evaluateFeed(input);
    expect(input.map((i) => i.id)).toEqual([a.id, b.id]);
  });
});
