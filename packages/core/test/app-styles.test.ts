import { describe, expect, it } from "vitest";
import { APP_SPACING_OPTIONS, appSpacingPixels } from "../src/app-styles";

describe("app spacing", () => {
  it("converts every shared spacing token to its native pixel value", () => {
    expect(APP_SPACING_OPTIONS.map(({ value }) => appSpacingPixels(value))).toEqual([
      0, 4, 8, 12, 20, 32,
    ]);
  });
});
