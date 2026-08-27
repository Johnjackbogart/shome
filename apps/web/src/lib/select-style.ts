import type { AppStyle } from "@shome/core";
import type { CSSProperties } from "react";

/**
 * Safari renders <select> as a native menulist and ignores border-radius and
 * border-style on it, so the member's border tokens only land once the platform
 * appearance is dropped. Dropping it also removes the built-in arrow, so we
 * paint our own in the space reserved by the extra right padding.
 */
export function selectChevron(color: string): CSSProperties {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l5 5 5-5"/></svg>`;
  return {
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.6rem center",
    backgroundSize: "0.7rem",
    paddingRight: "1.9rem",
  };
}

/**
 * The full <select> appearance the sources page established: the member's
 * accent fill and type, their border tokens inline so they win regardless of
 * cascade layer order, and the hand-painted chevron.
 */
export function appSelectStyle(appStyle: AppStyle): CSSProperties {
  return {
    backgroundColor: appStyle.appAccentBackgroundColor,
    color: appStyle.appSecondaryTextColor,
    fontFamily: appStyle.appFont,
    borderColor: appStyle.appBorderStyle,
    borderRadius: appStyle.appBorderRadius,
    borderStyle: appStyle.appBorderLineStyle,
    ...selectChevron(appStyle.appSecondaryTextColor),
  };
}
