import type { CSSProperties } from "react";

// Static map so Tailwind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
  post: "text-emerald-300",
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

/**
 * A small caps pill. `.badge` picks up the member's border tokens from
 * `.app-theme` in globals.css; pass `style` to apply them inline instead, the
 * way the sections that build their own `appBorder` object do.
 *
 * `tone` must be a literal class name from a caller's static map, never one
 * built from a template, or Tailwind's scanner will not emit it.
 */
export function Badge({
  label,
  tone,
  className,
  style,
}: {
  label: string;
  tone?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`badge ${tone ?? ""} ${className ?? ""}`} style={style}>
      {label}
    </span>
  );
}

/** The pill naming where a post or source came from. */
export function KindBadge({ kind, style }: { kind: string; style?: CSSProperties }) {
  return <Badge label={kind} tone={KIND_COLORS[kind]} style={style} />;
}
