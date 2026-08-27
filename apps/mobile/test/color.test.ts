import { describe, expect, it } from "vitest";
import {
  hexToHsv,
  hsvToHex,
  hueHex,
  isHexColor,
  normalizeHex,
  readableTextColor,
} from "../src/lib/color";

describe("normalizeHex", () => {
  it("accepts the hex codes the style editors store", () => {
    expect(normalizeHex("#070a18")).toBe("#070a18");
    expect(normalizeHex("#F8FAFC")).toBe("#f8fafc");
  });

  it("fills in the parts a person leaves out while typing", () => {
    expect(normalizeHex("070a18")).toBe("#070a18");
    expect(normalizeHex("#abc")).toBe("#aabbcc");
    expect(normalizeHex("  #070a18  ")).toBe("#070a18");
  });

  it("rejects anything that is not a hex color", () => {
    expect(normalizeHex("")).toBeNull();
    expect(normalizeHex("#12345")).toBeNull();
    expect(normalizeHex("#gggggg")).toBeNull();
    expect(normalizeHex("rebeccapurple")).toBeNull();
    expect(isHexColor("#0f172a")).toBe(true);
    expect(isHexColor("#0f17")).toBe(false);
  });
});

describe("hsv round trip", () => {
  it("returns the same hex it started from", () => {
    for (const hex of ["#070a18", "#0f172a", "#6366f1", "#f472b6", "#ffffff", "#000000"]) {
      expect(hsvToHex(hexToHsv(hex))).toBe(hex);
    }
  });

  it("reads the primaries as the expected hues", () => {
    expect(hexToHsv("#ff0000").h).toBeCloseTo(0);
    expect(hexToHsv("#00ff00").h).toBeCloseTo(120);
    expect(hexToHsv("#0000ff").h).toBeCloseTo(240);
  });

  it("treats black and white as unsaturated", () => {
    expect(hexToHsv("#000000")).toEqual({ h: 0, s: 0, v: 0 });
    expect(hexToHsv("#ffffff")).toEqual({ h: 0, s: 0, v: 1 });
  });

  it("clamps drags that run past the edge of the picker area", () => {
    expect(hsvToHex({ h: 200, s: 1.4, v: 1 })).toBe(hsvToHex({ h: 200, s: 1, v: 1 }));
    expect(hsvToHex({ h: 200, s: 0.5, v: -0.2 })).toBe("#000000");
  });

  it("wraps hue past both ends of the slider", () => {
    expect(hsvToHex({ h: 360, s: 1, v: 1 })).toBe("#ff0000");
    expect(hsvToHex({ h: -60, s: 1, v: 1 })).toBe(hsvToHex({ h: 300, s: 1, v: 1 }));
  });
});

describe("hueHex", () => {
  it("gives the picker area its fully saturated base color", () => {
    expect(hueHex(0)).toBe("#ff0000");
    expect(hueHex(120)).toBe("#00ff00");
  });
});

describe("readableTextColor", () => {
  it("keeps the check mark legible on light and dark swatches", () => {
    expect(readableTextColor("#ffffff")).toBe("#0f172a");
    expect(readableTextColor("#facc15")).toBe("#0f172a");
    expect(readableTextColor("#070a18")).toBe("#f8fafc");
    expect(readableTextColor("#24293a")).toBe("#f8fafc");
  });
});
