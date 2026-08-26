import { DEFAULT_POST_STYLE } from "@shome/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSessionOrNull: vi.fn(),
  getDb: vi.fn(),
  selectLimit: vi.fn(),
  updateSet: vi.fn(),
  updateWhere: vi.fn(),
}));

vi.mock("#/server/auth", () => ({ getSessionOrNull: mocks.getSessionOrNull }));
vi.mock("#/server/db", () => ({ getDb: mocks.getDb }));

import { GET, PUT } from "../src/app/api/post-style/route";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getSessionOrNull.mockResolvedValue({ user: { id: "user-1" } });
  mocks.updateWhere.mockResolvedValue(undefined);
  mocks.updateSet.mockReturnValue({ where: mocks.updateWhere });
  mocks.getDb.mockResolvedValue({
    select: () => ({
      from: () => ({
        where: () => ({ limit: mocks.selectLimit }),
      }),
    }),
    update: () => ({ set: mocks.updateSet }),
  });
});

describe("default post-style API", () => {
  it("reads the signed-in user's saved default", async () => {
    const customized = { ...DEFAULT_POST_STYLE, postBackgroundColor: "#123456" };
    mocks.selectLimit.mockResolvedValue([customized]);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ defaultPostStyle: customized });
  });

  it("validates and updates only the signed-in user's default", async () => {
    const customized = {
      ...DEFAULT_POST_STYLE,
      postBorderRadius: "24px",
      postBorderLineStyle: "dashed",
    };
    const response = await PUT(
      new Request("http://localhost/api/post-style", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ defaultPostStyle: customized }),
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.updateSet).toHaveBeenCalledWith({
      ...customized,
      updatedAt: expect.any(Date),
    });
    expect(mocks.updateWhere).toHaveBeenCalledOnce();
    await expect(response.json()).resolves.toEqual({
      ok: true,
      defaultPostStyle: customized,
    });
  });

  it("rejects invalid style values before touching the database", async () => {
    const response = await PUT(
      new Request("http://localhost/api/post-style", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          defaultPostStyle: { ...DEFAULT_POST_STYLE, postFont: "unsupported" },
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.updateSet).not.toHaveBeenCalled();
  });

  it("rejects the old unprefixed API fields", async () => {
    const response = await PUT(
      new Request("http://localhost/api/post-style", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          defaultPostStyle: {
            borderStyle: "#ffffff",
            borderRadius: "16px",
            borderLineStyle: "solid",
            backgroundColor: "#0f172a",
            font: "sans-serif",
            fontColor: "#f8fafc",
            secondaryTextColor: "#94a3b8",
          },
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.updateSet).not.toHaveBeenCalled();
  });
});
