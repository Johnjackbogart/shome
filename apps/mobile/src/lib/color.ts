// Color math for the picker. Kept free of React Native imports so it runs
// under the node-environment vitest suite.

export type Hsv = { h: number; s: number; v: number };

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Expands shorthand and adds the leading `#`, so a half-typed field can still
 * be read back as a color. Returns null when the text is not a hex color.
 */
export function normalizeHex(input: string): string | null {
  const match = HEX_PATTERN.exec(input.trim());
  if (!match) return null;
  const digits = match[1].toLowerCase();
  const expanded =
    digits.length === 3
      ? digits
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : digits;
  return `#${expanded}`;
}

export function isHexColor(input: string): boolean {
  return normalizeHex(input) !== null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = normalizeHex(hex) ?? "#000000";
  return [
    Number.parseInt(normalized.slice(1, 3), 16),
    Number.parseInt(normalized.slice(3, 5), 16),
    Number.parseInt(normalized.slice(5, 7), 16),
  ];
}

export function hexToHsv(hex: string): Hsv {
  const [red, green, blue] = hexToRgb(hex).map((channel) => channel / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return { h: hue, s: max === 0 ? 0 : delta / max, v: max };
}

export function hsvToHex({ h, s, v }: Hsv): string {
  const hue = ((h % 360) + 360) % 360;
  const saturation = clamp(s, 0, 1);
  const value = clamp(v, 0, 1);

  const chroma = value * saturation;
  const second = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const offset = value - chroma;

  const sector = Math.floor(hue / 60) % 6;
  const rgbBySector: [number, number, number][] = [
    [chroma, second, 0],
    [second, chroma, 0],
    [0, chroma, second],
    [0, second, chroma],
    [second, 0, chroma],
    [chroma, 0, second],
  ];

  return `#${rgbBySector[sector]
    .map((channel) =>
      Math.round((channel + offset) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

/** The fully saturated color for a hue, used as the picker area's base layer. */
export function hueHex(hue: number): string {
  return hsvToHex({ h: hue, s: 1, v: 1 });
}

/**
 * Picks black or white for text/handles drawn on top of a swatch, so the
 * selected-state check mark stays legible on both dark and light colors.
 */
export function readableTextColor(hex: string): string {
  const [red, green, blue] = hexToRgb(hex).map((channel) => {
    const ratio = channel / 255;
    return ratio <= 0.04045 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  return luminance > 0.179 ? "#0f172a" : "#f8fafc";
}

/** Swatches offered above the gradient, covering the app's defaults and the common hues. */
export const COLOR_PRESETS = [
  "#070a18",
  "#0f172a",
  "#24293a",
  "#64748b",
  "#94a3b8",
  "#f8fafc",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#14b8a6",
  "#38bdf8",
  "#6366f1",
  "#a855f7",
  "#f472b6",
] as const;
