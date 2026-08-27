import type { PostBorderLineStyle, PostBorderRadius, PostFont } from "./post-styles";

export const APP_SPACING_VALUES = ["0px", "4px", "8px", "12px", "20px", "32px"] as const;

export type AppSpacing = (typeof APP_SPACING_VALUES)[number];

export const APP_SPACING_OPTIONS: readonly { label: string; value: AppSpacing }[] = [
  { label: "None", value: "0px" },
  { label: "Tight", value: "4px" },
  { label: "Compact", value: "8px" },
  { label: "Default", value: "12px" },
  { label: "Roomy", value: "20px" },
  { label: "Airy", value: "32px" },
];

/**
 * A member's private application chrome. Unlike post styles, this changes the
 * signed-in experience only; it is never applied to their public profile.
 */
export type AppStyle = {
  appBackgroundColor: string;
  appSecondaryBackgroundColor: string;
  appAccentBackgroundColor: string;
  appAccentColor: string;
  appSecondaryAccentColor: string;
  appBorderStyle: string;
  appBorderRadius: PostBorderRadius;
  appBorderLineStyle: PostBorderLineStyle;
  appFont: PostFont;
  appFontColor: string;
  appAccentFontColor: string;
  appSecondaryTextColor: string;
  appSpacing: AppSpacing;
  appOverridePostStyles: boolean;
};

export const DEFAULT_APP_STYLE: Readonly<AppStyle> = {
  appBackgroundColor: "#070a18",
  appSecondaryBackgroundColor: "#0f172a",
  appAccentBackgroundColor: "#0f172a",
  appAccentColor: "#6366f1",
  appSecondaryAccentColor: "#f472b6",
  appBorderStyle: "#24293a",
  appBorderRadius: "16px",
  appBorderLineStyle: "solid",
  appFont: "sans-serif",
  appFontColor: "#f8fafc",
  appAccentFontColor: "#f8fafc",
  appSecondaryTextColor: "#94a3b8",
  appSpacing: "12px",
  appOverridePostStyles: false,
};
