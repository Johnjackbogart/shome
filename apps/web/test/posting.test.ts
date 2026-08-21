import type { Post } from "@shome/db";
import { describe, expect, it } from "vitest";
import { postToFeedItem } from "../src/server/posting";

describe("post style API view", () => {
  it("includes each saved post style in its feed representation", () => {
    const post = {
      id: "post-1",
      text: "Styled post",
      borderStyle: "#123456",
      backgroundColor: "#abcdef",
      font: "serif",
      fontColor: "#fedcba",
      blueskyUrl: null,
      mastodonUrl: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    } as Post;

    expect(postToFeedItem(post, { name: "Sam", username: "sam", image: null })).toMatchObject({
      borderStyle: "#123456",
      backgroundColor: "#abcdef",
      font: "serif",
      fontColor: "#fedcba",
    });
  });

  it("does not expose an unsupported stored font as a usable style", () => {
    const post = {
      id: "post-1",
      text: "Styled post",
      borderStyle: null,
      backgroundColor: null,
      font: "url(https://example.test/font)",
      fontColor: null,
      blueskyUrl: null,
      mastodonUrl: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    } as Post;

    expect(postToFeedItem(post, { name: "Sam", username: "sam", image: null }).font).toBeNull();
  });
});
