import { describe, expect, it } from "vitest";
import type { Db } from "@shome/db";
import { hasProfileComponent } from "../src/server/profile-components";
import { renderProfileDocument } from "../src/server/profile-page";
import { profileHtmlOrDefault } from "../src/server/sanitize";

describe("default profile template", () => {
  it("provides a polished posts-enabled page when no profile has been saved", () => {
    const html = profileHtmlOrDefault(null, "sam&jules");

    expect(html).toContain("A little more about me.");
    expect(html).toContain("@sam&amp;jules");
    expect(html).toContain("<style>");
    expect(hasProfileComponent(html, "posts")).toBe(true);
    expect(html).not.toContain("<script");
  });

  it("keeps a non-empty saved profile unchanged", () => {
    expect(profileHtmlOrDefault("<h1>My page</h1>", "sam")).toBe("<h1>My page</h1>");
  });

  it("renders its posts block through the same safe document pipeline", async () => {
    const emptyDb = {
      select: () => ({
        from: () => ({
          where: () => ({
            orderBy: () => ({ limit: async () => [] }),
          }),
        }),
      }),
    } as unknown as Db;

    const document = await renderProfileDocument({
      db: emptyDb,
      userId: "user-1",
      html: null,
      handle: "sam",
    });

    expect(document).toContain("No posts yet.");
    expect(document).not.toContain("<shome-posts");
    expect(document).not.toContain("<script");
  });
});
