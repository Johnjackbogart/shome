import { describe, expect, it } from "vitest";
import { hasProfileComponent } from "../src/server/profile-components";

describe("profile component syntax", () => {
  it("recognizes the documented self-closing and paired tags", () => {
    expect(hasProfileComponent("<shome-products />", "products")).toBe(true);
    expect(hasProfileComponent("<shome-posts></shome-posts>", "posts")).toBe(true);
    expect(hasProfileComponent("<shome-products>\n</shome-products>", "products")).toBe(true);
  });

  it("does not treat attributed or malformed tags as components", () => {
    expect(hasProfileComponent('<shome-products data-id="x" />', "products")).toBe(false);
    expect(hasProfileComponent("<shome-products>custom</shome-products>", "products")).toBe(false);
  });
});
