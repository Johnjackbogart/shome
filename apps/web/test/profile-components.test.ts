import { type Db, follows, openDatabase, user } from "@shome/db";
import { beforeAll, describe, expect, it } from "vitest";
import { hasProfileComponent, renderProfileComponents } from "../src/server/profile-components";
import { renderProfileDocument } from "../src/server/profile-page";

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

  it("renders safe saved styles on a posts component", async () => {
    let selectCount = 0;
    const db = {
      select: () => {
        const call = ++selectCount;
        return {
          from: () => ({
            where: () => ({
              orderBy: () =>
                call === 1
                  ? {
                      limit: async () => [
                        {
                          id: "post-1",
                          text: "A styled post",
                          postBorderStyle: "#fff",
                          postBorderRadius: "24px",
                          postBorderLineStyle: "dashed",
                          postBackgroundColor: "#abcdef",
                          postFont: "serif",
                          postFontColor: "#fedcba",
                          postSecondaryTextColor: "#aabbcc",
                          blueskyUrl: null,
                          mastodonUrl: null,
                          createdAt: new Date("2026-01-01T00:00:00.000Z"),
                        },
                      ],
                    }
                  : Promise.resolve([]),
            }),
          }),
        };
      },
    } as unknown as Db;

    const html = await renderProfileComponents({
      db,
      userId: "user-1",
      html: "<shome-posts />",
    });

    expect(html).toContain("border-color: #fff");
    expect(html).toContain("border-radius: 24px");
    expect(html).toContain("border-style: dashed");
    expect(html).toContain("background-color: #abcdef");
    expect(html).toContain("font-family: serif");
    expect(html).toContain("color: #fedcba");
    expect(html).toContain("--shome-post-secondary-text-color: #aabbcc");
  });
});

describe("social profile components", () => {
  let db: Db;

  beforeAll(async () => {
    db = await openDatabase({ pgliteDir: ":memory:" });
    await db.insert(user).values([
      {
        id: "component-owner",
        name: "Owner Example",
        email: "component-owner@example.com",
        username: "owner",
      },
      {
        id: "component-fan",
        name: "Fan Example",
        email: "component-fan@example.com",
        username: "fan",
        image: "/api/profile/avatar/fan-upload",
      },
      {
        id: "component-idol",
        name: "",
        email: "component-idol@example.com",
        username: "idol",
        image: "//evil.example.com/tracker.png",
      },
      {
        id: "component-lurker",
        name: "Unlisted Lurker",
        email: "component-lurker@example.com",
      },
      {
        id: "component-loner",
        name: "Loner Example",
        email: "component-loner@example.com",
        username: "loner",
      },
    ]);
    await db.insert(follows).values([
      { followerId: "component-fan", followingId: "component-owner" },
      { followerId: "component-lurker", followingId: "component-owner" },
      { followerId: "component-owner", followingId: "component-idol" },
    ]);
  });

  it("recognizes the social tags without confusing followers and following", () => {
    expect(hasProfileComponent("<shome-followers />", "followers")).toBe(true);
    expect(hasProfileComponent("<shome-following />", "following")).toBe(true);
    expect(hasProfileComponent("<shome-stats></shome-stats>", "stats")).toBe(true);

    expect(hasProfileComponent("<shome-followers />", "following")).toBe(false);
    expect(hasProfileComponent("<shome-following />", "followers")).toBe(false);
  });

  it("renders followers as links, skipping members without a public handle", async () => {
    const html = await renderProfileComponents({
      db,
      userId: "component-owner",
      html: "<shome-followers />",
    });

    expect(html).toContain('href="/p/fan"');
    expect(html).toContain("Fan Example");
    expect(html).toContain('src="/api/profile/avatar/fan-upload"');
    // The handle-less follower is counted but never listed.
    expect(html).not.toContain("Unlisted Lurker");
  });

  it("falls back to an initial for an unsafe avatar and to the handle for a blank name", async () => {
    const html = await renderProfileComponents({
      db,
      userId: "component-owner",
      html: "<shome-following />",
    });

    expect(html).toContain('href="/p/idol"');
    expect(html).toContain("@idol");
    expect(html).not.toContain("evil.example.com");
    expect(html).toContain('shome-person__avatar--empty">I<');
  });

  it("renders both counts from the owner's graph", async () => {
    const html = await renderProfileComponents({
      db,
      userId: "component-owner",
      html: "<shome-stats />",
    });

    expect(html).toContain("Followers");
    expect(html).toContain("Following");
    expect(html).toMatch(/shome-stat__value">2</);
    expect(html).toMatch(/shome-stat__value">1</);
  });

  it("renders every social component on one page without an empty state", async () => {
    const html = await renderProfileComponents({
      db,
      userId: "component-owner",
      html: "<shome-stats />\n<shome-followers />\n<shome-following />",
    });

    expect(html).toContain('data-shome-component="stats"');
    expect(html).toContain('data-shome-component="followers"');
    expect(html).toContain('data-shome-component="following"');
    expect(html).not.toContain("shome-component__empty");
  });

  it("keeps the generated social markup intact through profile sanitization", async () => {
    // Generated component markup is sanitized alongside the author's HTML, so a
    // tag or attribute outside the profile allowlist would silently vanish.
    const doc = await renderProfileDocument({
      db,
      userId: "component-owner",
      html: "<main><shome-stats /><shome-followers /><shome-following /></main>",
      handle: "owner",
    });

    expect(doc).toContain('class="shome-people__list"');
    expect(doc).toContain('src="/api/profile/avatar/fan-upload"');
    expect(doc).toContain("shome-person__avatar--empty");
    expect(doc).toContain(".shome-stat__value {");
    // Profile links must break out of the sandboxed iframe.
    expect(doc).toContain('href="/p/fan"');
    expect(doc).toContain('target="_blank"');
  });

  it("shows a distinct empty state on each side of an empty graph", async () => {
    const html = await renderProfileComponents({
      db,
      userId: "component-loner",
      html: "<shome-followers />\n<shome-following />",
    });

    expect(html).toContain("No followers yet.");
    expect(html).toContain("Not following anyone yet.");
  });
});
