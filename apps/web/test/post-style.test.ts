import { DEFAULT_POST_STYLE } from "@shome/core";
import { describe, expect, it } from "vitest";
import { postStyleOrDefault, postStyleSchema } from "../src/server/post-style";

describe("profile default post style", () => {
  it("accepts a complete supported style", () => {
    const style = {
      ...DEFAULT_POST_STYLE,
      postBorderStyle: "#123456",
      postBorderRadius: "24px" as const,
      postBorderLineStyle: "dashed" as const,
      postFont: "serif" as const,
    };

    expect(postStyleSchema.parse(style)).toEqual(style);
    expect(postStyleOrDefault(style)).toEqual(style);
  });

  it("rejects unsafe colors and unsupported style values", () => {
    expect(
      postStyleSchema.safeParse({
        ...DEFAULT_POST_STYLE,
        postBackgroundColor: "url(https://example.test/tracker)",
      }).success,
    ).toBe(false);
    expect(
      postStyleSchema.safeParse({ ...DEFAULT_POST_STYLE, postFont: "cursive" }).success,
    ).toBe(false);
  });

  it("falls back when a legacy database value is malformed", () => {
    expect(postStyleOrDefault("old free-form CSS")).toEqual(DEFAULT_POST_STYLE);
  });
});
