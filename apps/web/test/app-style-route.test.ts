import { DEFAULT_APP_STYLE } from "@shome/core";
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

import { GET, PUT } from "../src/app/api/app-style/route";

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

describe("app-style API", () => {
  it("reads the signed-in member's saved app style", async () => {
    const customized = { ...DEFAULT_APP_STYLE, backgroundColor: "#123456" };
    mocks.selectLimit.mockResolvedValue([customized]);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ appStyle: customized });
  });

  it("validates and updates only the signed-in member's app style", async () => {
    const customized = { ...DEFAULT_APP_STYLE, borderColor: "#abcdef", overridePostStyles: true };
    const response = await PUT(
      new Request("http://localhost/api/app-style", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ appStyle: customized }),
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.updateSet).toHaveBeenCalledWith({
      appBackgroundColor: customized.backgroundColor,
      appSecondaryBackgroundColor: customized.secondaryBackgroundColor,
      appBorderColor: customized.borderColor,
      appBorderRadius: customized.borderRadius,
      appBorderLineStyle: customized.borderLineStyle,
      appFont: customized.font,
      appFontColor: customized.fontColor,
      appSecondaryTextColor: customized.secondaryTextColor,
      appSpacing: customized.spacing,
      appOverridePostStyles: customized.overridePostStyles,
      updatedAt: expect.any(Date),
    });
    expect(mocks.updateWhere).toHaveBeenCalledOnce();
    await expect(response.json()).resolves.toEqual({ ok: true, appStyle: customized });
  });

  it("rejects invalid app style values before touching the database", async () => {
    const response = await PUT(
      new Request("http://localhost/api/app-style", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          appStyle: { ...DEFAULT_APP_STYLE, borderColor: "transparent" },
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(mocks.updateSet).not.toHaveBeenCalled();
  });
});
