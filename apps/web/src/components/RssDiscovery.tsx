"use client";

import type {
  DiscoveredRssFeed,
  PopularRssFeed,
  PopularRssResponse,
  SourceView,
} from "@shome/core";
import { type FormEvent, useState } from "react";
import { api } from "#/lib/api";

function subscribedMessage(
  source: SourceView,
  fallback: string,
  fetched: number | undefined,
  refreshError: string | undefined,
): string {
  const name = source.title ?? fallback;
  return refreshError
    ? `added "${name}" — first fetch failed: ${refreshError}`
    : `added "${name}" (${fetched ?? 0} items)`;
}

export function RssDiscovery({
  shomeFeeds,
  webFeeds,
  subscribedFeedUrls,
  onAdded,
  onError,
}: {
  shomeFeeds: PopularRssResponse["shomeFeeds"];
  webFeeds: PopularRssResponse["webFeeds"];
  subscribedFeedUrls: Set<string>;
  onAdded: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [website, setWebsite] = useState("");
  const [feeds, setFeeds] = useState<DiscoveredRssFeed[] | null>(null);
  const [discovering, setDiscovering] = useState(false);
  const [subscribingUrl, setSubscribingUrl] = useState<string | null>(null);

  async function discover(event: FormEvent) {
    event.preventDefault();
    setDiscovering(true);
    try {
      const result = await api.get<{ feeds: DiscoveredRssFeed[] }>(
        `/api/discover/rss?q=${encodeURIComponent(website)}`,
      );
      setFeeds(result.feeds);
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setDiscovering(false);
    }
  }

  async function subscribe(url: string, fallback: string) {
    setSubscribingUrl(url);
    try {
      const result = await api.post<{
        source: SourceView;
        fetched?: number;
        refreshError?: string;
      }>("/api/sources", { kind: "rss", config: { url } });
      onAdded(subscribedMessage(result.source, fallback, result.fetched, result.refreshError));
    } catch (err) {
      onError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubscribingUrl(null);
    }
  }

  return (
    <section className="card mb-3 px-3.5 py-3">
      <h3 className="font-semibold">Discover RSS</h3>
      <p className="mt-1 text-sm text-slate-400">
        Search by name or paste a publication, blog, or podcast website—we’ll find its public feeds.
      </p>
      <form className="mt-3 flex flex-wrap gap-2" onSubmit={discover}>
        <input
          className="input min-w-44 flex-1"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="Ars Technica or arstechnica.com"
          required
        />
        <button type="submit" className="btn" disabled={discovering}>
          {discovering ? "finding…" : "find feeds"}
        </button>
      </form>

      {feeds && (
        <div className="mt-3">
          {feeds.length === 0 ? (
            <p className="text-sm text-slate-400">
              No public RSS or Atom feed found for that site.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {feeds.map((feed) => (
                <SearchResult
                  key={feed.url}
                  feed={feed}
                  subscribed={subscribedFeedUrls.has(feed.url)}
                  subscribing={subscribingUrl === feed.url}
                  onAdd={() => void subscribe(feed.url, feed.title ?? feed.siteName ?? feed.url)}
                />
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-4 border-t border-white/10 pt-3">
        <h4 className="font-medium">Popular on Shome</h4>
        <p className="mt-1 text-sm text-slate-400">Ranked by aggregate Shome subscriptions.</p>
        {shomeFeeds.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            This community has not followed any RSS sources yet.
          </p>
        ) : (
          <PopularFeedList
            feeds={shomeFeeds}
            subscriberLabel="Shome subscribers"
            subscribedFeedUrls={subscribedFeedUrls}
            subscribingUrl={subscribingUrl}
            onAdd={subscribe}
          />
        )}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <h4 className="font-medium">Popular across the web</h4>
        <p className="mt-1 text-sm text-slate-400">From Feedly’s public source directory.</p>
        {webFeeds.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            Web recommendations are unavailable right now.
          </p>
        ) : (
          <PopularFeedList
            feeds={webFeeds}
            subscriberLabel="Feedly subscribers"
            subscribedFeedUrls={subscribedFeedUrls}
            subscribingUrl={subscribingUrl}
            onAdd={subscribe}
          />
        )}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Feed discovery powered by{" "}
        <a
          className="underline hover:text-slate-300"
          href="https://feedsearch.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Feedsearch
        </a>
        . Feedly supplies the Popular across the web list. Learn more at{" "}
        <a
          className="underline hover:text-slate-300"
          href="https://feedly.com/"
          target="_blank"
          rel="noreferrer"
        >
          Feedly
        </a>
        .
      </p>
    </section>
  );
}

function PopularFeedList({
  feeds,
  subscriberLabel,
  subscribedFeedUrls,
  subscribingUrl,
  onAdd,
}: {
  feeds: PopularRssFeed[];
  subscriberLabel: string;
  subscribedFeedUrls: Set<string>;
  subscribingUrl: string | null;
  onAdd: (url: string, fallback: string) => Promise<void>;
}) {
  return (
    <ul className="mt-2 flex flex-col gap-2">
      {feeds.map((feed) => {
        const subscribed = subscribedFeedUrls.has(feed.url);
        const subscribing = subscribingUrl === feed.url;
        return (
          <li
            key={feed.url}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="font-medium [overflow-wrap:anywhere]">
                {feed.title ?? feed.siteName ?? feed.url}
              </p>
              {feed.description && (
                <p className="mt-0.5 text-sm text-slate-400">{feed.description}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                {feed.subscriberCount.toLocaleString()} {subscriberLabel}
              </p>
            </div>
            <button
              type="button"
              className="btn-ghost shrink-0"
              disabled={subscribed || subscribing}
              onClick={() => void onAdd(feed.url, feed.title ?? feed.siteName ?? feed.url)}
            >
              {subscribed ? "added" : subscribing ? "adding…" : "add"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function SearchResult({
  feed,
  subscribed,
  subscribing,
  onAdd,
}: {
  feed: DiscoveredRssFeed;
  subscribed: boolean;
  subscribing: boolean;
  onAdd: () => void;
}) {
  return (
    <li className="rounded-lg border border-white/10 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium [overflow-wrap:anywhere]">
            {feed.title ?? feed.siteName ?? feed.url}
            {feed.isPodcast && <span className="ml-2 text-xs text-slate-400">podcast</span>}
          </p>
          {feed.description && <p className="mt-0.5 text-sm text-slate-400">{feed.description}</p>}
          <p className="mt-1 text-xs text-slate-500 [overflow-wrap:anywhere]">{feed.url}</p>
        </div>
        <button
          type="button"
          className="btn-ghost shrink-0"
          disabled={subscribed || subscribing}
          onClick={onAdd}
        >
          {subscribed ? "added" : subscribing ? "adding…" : "add"}
        </button>
      </div>
    </li>
  );
}
