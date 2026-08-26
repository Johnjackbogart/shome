import type { Post } from "@shome/db";
import { describe, expect, it } from "vitest";
import { postToFeedItem } from "../src/server/posting";

describe("post style API view", () => {
  it("includes each saved post style in its feed representation", () => {
    const post = {
      id: "post-1",
      text: "Styled post",
      postBorderStyle: "#123456",
      postBorderRadius: "24px",
      postBorderLineStyle: "dashed",
      postBackgroundColor: "#abcdef",
      postFont: "serif",
      postFontColor: "#fedcba",
      postSecondaryTextColor: "#aabbcc",
      blueskyUrl: null,
      mastodonUrl: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    } as Post;

    expect(postToFeedItem(post, { name: "Sam", username: "sam", image: null })).toMatchObject({
      postBorderStyle: "#123456",
      postBorderRadius: "24px",
      postBorderLineStyle: "dashed",
      postBackgroundColor: "#abcdef",
      postFont: "serif",
      postFontColor: "#fedcba",
      postSecondaryTextColor: "#aabbcc",
    });
  });

  it("does not expose an unsupported stored font as a usable style", () => {
    const post = {
      id: "post-1",
      text: "Styled post",
      postBorderStyle: null,
      postBorderRadius: null,
      postBorderLineStyle: null,
      postBackgroundColor: null,
      postFont: "url(https://example.test/font)",
      postFontColor: null,
      postSecondaryTextColor: null,
      blueskyUrl: null,
      mastodonUrl: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    } as Post;

    expect(postToFeedItem(post, { name: "Sam", username: "sam", image: null }).postFont).toBeNull();
  });
});
