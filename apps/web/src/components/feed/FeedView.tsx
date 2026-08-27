"use client";

import type { AppStyle } from "@shome/core";
import { type SubmitEvent, useCallback, useEffect, useRef, useState } from "react";
import { api } from "#/lib/api";
import { sourceLabel } from "#/lib/format";
import type { FeedItemView, SourceView } from "#/lib/types";
import FeedItem from "./FeedItem";
import PostComposer from "./PostComposer";

const KINDS = ["post", "rss", "bluesky", "mastodon", "youtube"];

export function FeedView({ appStyle }: { appStyle: AppStyle }) {
  const [items, setItems] = useState<FeedItemView[] | null>(null);
  const [sources, setSources] = useState<SourceView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const [appliedQ, setAppliedQ] = useState("");
  const [kind, setKind] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [composerVisible, setComposerVisible] = useState(false);
  const refreshedOnMount = useRef(false);
  const searchRequested = useRef(false);
  // Filters change faster than the network answers; only the newest request
  // is allowed to write to state.
  const latestRequest = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++latestRequest.current;
    const isSearchRequest = searchRequested.current;
    searchRequested.current = false;
    setSearching(isSearchRequest);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (appliedQ) params.set("q", appliedQ);
      if (kind) params.set("kind", kind);
      if (sourceId) params.set("sourceId", sourceId);
      const res = await api.get<{ items: FeedItemView[] }>(`/api/feed?${params}`);
      if (requestId === latestRequest.current) setItems(res.items);
    } catch (err) {
      if (requestId === latestRequest.current) {
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (requestId === latestRequest.current) setSearching(false);
    }
  }, [appliedQ, kind, sourceId]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await api.post("/api/refresh");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, [load]);

  // Every filter change re-queries, including the first render — so the feed
  // paints from what is already stored while the refresh below runs.
  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (refreshedOnMount.current) return;
    refreshedOnMount.current = true;
    void refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    api
      .get<{ sources: SourceView[] }>("/api/sources")
      .then((res) => setSources(res.sources))
      // The source filter is an extra; a failure here must not break the feed.
      .catch(() => undefined);
  }, []);

  function search(e: SubmitEvent) {
    e.preventDefault();
    const nextQuery = q.trim();
    if (nextQuery === appliedQ) return;
    searchRequested.current = true;
    setAppliedQ(nextQuery);
  }

  function clearFilters() {
    setQ("");
    setAppliedQ("");
    setKind("");
    setSourceId("");
  }

  useEffect(() => {
    if (!composerVisible) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setComposerVisible(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [composerVisible]);

  const filtered = Boolean(appliedQ || kind || sourceId);
  const selectedSource = sources.find((source) => source.id === sourceId);

  return (
    <section>
      <div className={`flex flex-wrap items-center gap-2 ${filtered ? "mb-3" : "mb-5"}`}>
        <form className="flex min-w-64 flex-1 gap-2" onSubmit={search}>
          <div className="relative flex-1">
            <input
              // The native WebKit clear affordance is hidden in favour of the
              // themed one below it.
              className="input w-full pr-9 [&::-webkit-search-cancel-button]:hidden"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search your feed…"
              aria-label="Search your feed"
            />
            {q && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 cursor-pointer px-3 text-slate-400 hover:text-white"
                onClick={() => {
                  setQ("");
                  setAppliedQ("");
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="btn" disabled={searching}>
            {searching ? "searching…" : "search"}
          </button>
        </form>
        <FilterMenu
          sources={sources}
          sourceId={sourceId}
          kind={kind}
          onSourceChange={setSourceId}
          onKindChange={setKind}
          onClear={clearFilters}
        />
        <button type="button" className="btn-ghost" onClick={refreshAll} disabled={busy}>
          {busy ? "refreshing…" : "refresh"}
        </button>
      </div>

      {filtered && (
        <p className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
          <span>
            {items === null
              ? "searching"
              : `${items.length} ${items.length === 1 ? "item" : "items"}`}
            {appliedQ && ` matching “${appliedQ}”`}
            {selectedSource && ` from ${sourceLabel(selectedSource)}`}
            {kind && ` in ${kind}`}
          </span>
          <button
            type="button"
            className="cursor-pointer text-indigo-200 underline hover:text-indigo-100"
            onClick={clearFilters}
          >
            clear filters
          </button>
        </p>
      )}

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      {items === null ? (
        <p className="text-slate-400">loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-12 text-center">
          {filtered ? (
            <>
              <p>No items match these filters.</p>
              <p className="text-slate-400">
                Try a different search, or{" "}
                <button
                  type="button"
                  className="cursor-pointer text-indigo-200 underline hover:text-indigo-100"
                  onClick={clearFilters}
                >
                  clear them
                </button>
                .
              </p>
            </>
          ) : (
            <>
              <p>Nothing here yet.</p>
              <p className="text-slate-400">
                Create your first post, or add a source in the Sources tab.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col" style={{ gap: appStyle.appSpacing }}>
          {items.map((item) => (
            <FeedItem key={item.id} item={item} appStyle={appStyle} />
          ))}
        </div>
      )}

      <button
        type="button"
        className="btn fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 shadow-lg shadow-black/40 sm:right-6 sm:bottom-6"
        onClick={() => setComposerVisible(true)}
        aria-haspopup="dialog"
        aria-expanded={composerVisible}
      >
        <span aria-hidden="true" className="text-xl leading-none">
          +
        </span>
        Create post
      </button>

      {composerVisible && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Create post"
        >
          <div className="mx-auto flex min-h-full w-full max-w-2xl items-center">
            <div className="w-full py-4">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  className="btn-ghost px-3 py-1.5"
                  onClick={() => setComposerVisible(false)}
                >
                  close
                </button>
              </div>
              <PostComposer
                onPosted={(post) => {
                  setItems((current) => [post, ...(current ?? [])]);
                  // Drop the filters so the new post is not hidden by them.
                  clearFilters();
                }}
                onSuccess={() => setComposerVisible(false)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Source and kind filters behind one trigger. They used to sit inline as two
 * selects, which pushed the feed itself below the fold on narrower windows.
 */
function FilterMenu({
  sources,
  sourceId,
  kind,
  onSourceChange,
  onKindChange,
  onClear,
}: {
  sources: SourceView[];
  sourceId: string;
  kind: string;
  onSourceChange: (id: string) => void;
  onKindChange: (kind: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const activeCount = (sourceId ? 1 : 0) + (kind ? 1 : 0);

  useEffect(() => {
    if (!open) return;
    function closeOnOutside(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={container}>
      <button
        type="button"
        className="btn-ghost inline-flex items-center gap-2"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        filters
        {activeCount > 0 && (
          <span className="rounded-full bg-indigo-300 px-1.5 text-xs font-semibold text-slate-950">
            {activeCount}
          </span>
        )}
        <span aria-hidden="true" className="text-[0.6rem] leading-none">
          ▼
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-30 mt-2 w-72 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl"
          role="dialog"
          aria-label="Feed filters"
        >
          {sources.length > 0 && (
            <>
              <p className="px-2 pb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Source
              </p>
              <div className="max-h-56 overflow-y-auto">
                <FilterOption
                  label="All sources"
                  selected={sourceId === ""}
                  onSelect={() => onSourceChange("")}
                />
                {sources.map((source) => (
                  <FilterOption
                    key={source.id}
                    label={sourceLabel(source)}
                    selected={sourceId === source.id}
                    onSelect={() => onSourceChange(source.id)}
                  />
                ))}
              </div>
              <div className="my-2 border-t border-white/10" />
            </>
          )}

          <p className="px-2 pb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Kind
          </p>
          <FilterOption
            label="All kinds"
            selected={kind === ""}
            onSelect={() => onKindChange("")}
          />
          {KINDS.map((k) => (
            <FilterOption
              key={k}
              label={k}
              selected={kind === k}
              onSelect={() => onKindChange(k)}
            />
          ))}

          <div className="mt-2 border-t border-white/10 pt-2">
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg px-2 py-1.5 text-left text-sm text-indigo-200 hover:bg-white/5"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white/5 ${
        selected ? "text-white" : "text-slate-400"
      }`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="truncate">{label}</span>
      {selected && (
        <span aria-hidden="true" className="shrink-0 text-indigo-300">
          ✓
        </span>
      )}
    </button>
  );
}
