import { DEFAULT_APP_STYLE } from "@shome/core";
import { describe, expect, it } from "vitest";
import { appStyleFromColumns, appStyleSchema } from "../src/server/app-style";

describe("member app style", () => {
  it("accepts the complete supported app style", () => {
    const style = {
      ...DEFAULT_APP_STYLE,
      borderRadius: "24px" as const,
      borderLineStyle: "dashed" as const,
      font: "serif" as const,
      overridePostStyles: true,
    };

    expect(appStyleSchema.parse(style)).toEqual(style);
    expect(appStyleFromColumns(style)).toEqual(style);
  });

  it("rejects unsafe colors", () => {
    expect(
      appStyleSchema.safeParse({
        ...DEFAULT_APP_STYLE,
        backgroundColor: "url(https://example.test/tracker)",
      }).success,
    ).toBe(false);
    expect(
      appStyleSchema.safeParse({
        ...DEFAULT_APP_STYLE,
        secondaryBackgroundColor: "transparent",
      }).success,
    ).toBe(false);
    expect(appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, borderRadius: "999px" }).success).toBe(
      false,
    );
    expect(appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, font: "fantasy" }).success).toBe(false);
    expect(appStyleSchema.safeParse({ ...DEFAULT_APP_STYLE, spacing: "17px" }).success).toBe(false);
  });

  it("falls back when database columns are missing or malformed", () => {
    expect(appStyleFromColumns({ ...DEFAULT_APP_STYLE, font: "fantasy" })).toEqual(
      DEFAULT_APP_STYLE,
    );
    expect(appStyleFromColumns(undefined)).toEqual(DEFAULT_APP_STYLE);
  });
});
