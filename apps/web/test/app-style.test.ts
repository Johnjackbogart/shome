import { DEFAULT_APP_STYLE } from "@shome/core";
import { describe, expect, it } from "vitest";
import { appStyleFromColumns, appStyleSchema } from "../src/server/app-style";

describe("member app style", () => {
  it("accepts the complete supported app style", () => {
    const style = {
      ...DEFAULT_APP_STYLE,
      appBorderRadius: "24px" as const,
      appBorderLineStyle: "dashed" as const,
      appFont: "serif" as const,
      appOverridePostStyles: true,
    };

    expect(appStyleSchema.parse(style)).toEqual(style);
    expect(appStyleFromColumns(style)).toEqual(style);
  });

  it("rejects unsafe colors", () => {
    expect(
      appStyleSchema.safeParse({
        ...DEFAULT_APP_STYLE,
        appBackgroundColor: "url(https://example.test/tracker)",
      }).success,
    ).toBe(false);
    expect(
      appStyleSchema.safeParse({
        ...DEFAULT_APP_STYLE,
        appSecondaryBackgroundColor: "transparent",
      }).success,
    ).toBe(false);
    expect(
      appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, appAccentColor: "currentColor" }).success,
    ).toBe(false);
    expect(
      appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, appAccentBackgroundColor: "inherit" })
        .success,
    ).toBe(false);
    expect(
      appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, appAccentFontColor: "currentColor" })
        .success,
    ).toBe(false);
    expect(
      appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, appBorderRadius: "999px" }).success,
    ).toBe(false);
    expect(appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, appFont: "fantasy" }).success).toBe(
      false,
    );
    expect(appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, appSpacing: "17px" }).success).toBe(
      false,
    );
  });

  it("falls back when database columns are missing or malformed", () => {
    expect(appStyleFromColumns({ ...DEFAULT_APP_STYLE, appFont: "fantasy" })).toEqual(
      DEFAULT_APP_STYLE,
    );
    expect(appStyleFromColumns(undefined)).toEqual(DEFAULT_APP_STYLE);
  });
});
