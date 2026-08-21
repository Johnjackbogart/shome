import type { Db } from "@shome/db";
import { describe, expect, it } from "vitest";
import { hasProfileComponent, renderProfileComponents } from "../src/server/profile-components";

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
                          borderStyle: "#fff",
                          borderRadius: "24px",
                          borderLineStyle: "dashed",
                          backgroundColor: "#abcdef",
                          font: "serif",
                          fontColor: "#fedcba",
                          secondaryTextColor: "#aabbcc",
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
