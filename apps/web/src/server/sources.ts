import type { Source } from "@shome/db";
import type { SourceView } from "#/lib/types";

/**
 * A source as one subscriber sees it. `sources` rows are shared between every
 * subscriber, so the name a person chose for it comes from their own
 * subscription and is passed in alongside.
 */
export function toSourceView(source: Source, customTitle: string | null = null): SourceView {
  return {
    id: source.id,
    kind: source.kind,
    title: source.title,
    customTitle,
    config: source.config,
    lastFetchedAt: source.lastFetchedAt?.toISOString() ?? null,
    lastError: source.lastError,
  };
}
