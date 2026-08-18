"use client";

import type { PopularRssFeed, PopularRssResponse } from "@shome/core";
import { useCallback, useEffect, useState } from "react";
import { RssDiscovery } from "#/components/RssDiscovery";
import { api } from "#/lib/api";
import type { SourceView } from "#/lib/types";

export function DiscoverView() {
  const [sources, setSources] = useState<SourceView[] | null>(null);
  const [shomeFeeds, setShomeFeeds] = useState<PopularRssFeed[]>([]);
  const [webFeeds, setWebFeeds] = useState<PopularRssFeed[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [sourceResult, popularResult] = await Promise.all([
        api.get<{ sources: SourceView[] }>("/api/sources"),
        // Discovery recommendations are optional, so an unavailable ranking
        // must not prevent the rest of Discover from working.
        api.get<PopularRssResponse>("/api/discover/rss/popular").catch(() => null),
      ]);
      setSources(sourceResult.sources);
      setShomeFeeds(popularResult?.shomeFeeds ?? []);
      setWebFeeds(popularResult?.webFeeds ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const subscribedFeedUrls = new Set(
    (sources ?? []).flatMap((source) =>
      typeof source.config.url === "string" ? [source.config.url] : [],
    ),
  );

  return (
    <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(16rem,2fr)]">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="badge text-orange-300">RSS</span>
          <h2 className="text-xl font-bold">Publications, blogs, and podcasts</h2>
        </div>
        <RssDiscovery
          shomeFeeds={shomeFeeds}
          webFeeds={webFeeds}
          subscribedFeedUrls={subscribedFeedUrls}
          onAdded={(message) => {
            setNotice(message);
            setError(null);
            void load();
          }}
          onError={(message) => {
            setNotice(null);
            setError(message);
          }}
        />
        {notice && <p className="text-sm text-emerald-400">{notice}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      <aside className="space-y-3">
        <section className="card">
          <span className="badge text-sky-300">Bluesky</span>
          <h2 className="mt-3 font-semibold text-white">People search is next</h2>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Search public profiles by handle or display name, then follow an author in your feed.
          </p>
        </section>
        <section className="card">
          <span className="badge text-violet-300">Mastodon</span>
          <h2 className="mt-3 font-semibold text-white">Search within an instance</h2>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Mastodon discovery will begin with an instance, so results always make their local scope
            clear.
          </p>
        </section>
      </aside>
    </section>
  );
}
