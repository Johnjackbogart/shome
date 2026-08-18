import { describe, expect, it } from "vitest";
import { containsPattern } from "../src/server/api";

// Source labelling is shared with the Expo app; it is covered in
// packages/core/test/api-views.test.ts.
describe("feed search", () => {
  it("matches a substring case-insensitively", () => {
    expect(containsPattern("Ars")).toBe("%Ars%");
  });

  it("escapes wildcards so they match themselves", () => {
    expect(containsPattern("100%")).toBe("%100\\%%");
    expect(containsPattern("a_b")).toBe("%a\\_b%");
    expect(containsPattern("back\\slash")).toBe("%back\\\\slash%");
  });
});
