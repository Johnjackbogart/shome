import type { MediaRef, SourceKind } from "./types";

export type FeedSort = "newest" | "oldest";

/**
 * v0 of the programmable feed: a declarative rule set evaluated as a pipeline.
 * The shape is deliberately a plain JSON document so richer stages (scoring,
 * user-authored sandboxed scripts) can slot in behind the same interface later.
 */
export interface FeedRules {
  /** Restrict to these source ids; absent/empty = all of the user's sources. */
  sourceIds?: string[];
  /** Restrict to items from these connector kinds. */
  kinds?: SourceKind[];
  /** Keep only items matching at least one keyword (case-insensitive, title + text). */
  includeKeywords?: string[];
  /** Drop items matching any of these keywords. */
  excludeKeywords?: string[];
  /** Keep only items carrying at least one media attachment. */
  requireMedia?: boolean;
  sort?: FeedSort;
  limit?: number;
}

/** The minimal item shape the feed engine needs; the storage layer adapts rows to this. */
export interface FeedCandidate {
  id: string;
  sourceId: string;
  kind: SourceKind;
  title?: string | null;
  text?: string | null;
  media?: MediaRef[] | null;
  publishedAt?: Date | null;
  fetchedAt: Date;
}

/** Items without a publish date (some RSS feeds) sort by when we first saw them. */
export function effectiveDate(item: Pick<FeedCandidate, "publishedAt" | "fetchedAt">): Date {
  return item.publishedAt ?? item.fetchedAt;
}

function matchesAny(haystack: string, keywords: string[]): boolean {
  return keywords.some((k) => k.length > 0 && haystack.includes(k.toLowerCase()));
}

export function evaluateFeed<T extends FeedCandidate>(
  items: readonly T[],
  rules: FeedRules = {},
): T[] {
  const sourceIds = rules.sourceIds?.length ? new Set(rules.sourceIds) : null;
  const kinds = rules.kinds?.length ? new Set<SourceKind>(rules.kinds) : null;

  const out = items.filter((item) => {
    if (sourceIds && !sourceIds.has(item.sourceId)) return false;
    if (kinds && !kinds.has(item.kind)) return false;
    if (rules.requireMedia && !(item.media && item.media.length > 0)) return false;
    if (rules.includeKeywords?.length || rules.excludeKeywords?.length) {
      const haystack = `${item.title ?? ""} ${item.text ?? ""}`.toLowerCase();
      if (rules.includeKeywords?.length && !matchesAny(haystack, rules.includeKeywords)) {
        return false;
      }
      if (rules.excludeKeywords?.length && matchesAny(haystack, rules.excludeKeywords)) {
        return false;
      }
    }
    return true;
  });

  const dir = rules.sort === "oldest" ? 1 : -1;
  out.sort((a, b) => dir * (effectiveDate(a).getTime() - effectiveDate(b).getTime()));

  return rules.limit && rules.limit > 0 ? out.slice(0, rules.limit) : out;
}
