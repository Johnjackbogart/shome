"use client";

import type {
  AppStyle,
  PeopleSearchResult,
  PopularRssFeed,
  PopularRssResponse,
  SocialGraphView,
  SocialUserView,
} from "@shome/core";
import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Badge } from "#/components/Badge";
import { RssDiscovery } from "#/components/RssDiscovery";
import { api } from "#/lib/api";
import type { SourceView } from "#/lib/types";

const FOLLOW_LIST_LIMIT = 50;

export function DiscoverView({ appStyle }: { appStyle: AppStyle }) {
  const [sources, setSources] = useState<SourceView[] | null>(null);
  const [shomeFeeds, setShomeFeeds] = useState<PopularRssFeed[]>([]);
  const [webFeeds, setWebFeeds] = useState<PopularRssFeed[]>([]);
  const [community, setCommunity] = useState<SocialGraphView | null>(null);
  const [personQuery, setPersonQuery] = useState("");
  const [people, setPeople] = useState<PeopleSearchResult[] | null>(null);
  const [searchingPeople, setSearchingPeople] = useState(false);
  const [updatingPersonId, setUpdatingPersonId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [peopleError, setPeopleError] = useState<string | null>(null);
  const [communityError, setCommunityError] = useState<string | null>(null);

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

  const loadCommunity = useCallback(async () => {
    try {
      const graph = await api.get<SocialGraphView>("/api/follows");
      setCommunity(graph);
      setCommunityError(null);
    } catch (err) {
      setCommunityError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    void load();
    void loadCommunity();
  }, [load, loadCommunity]);

  const subscribedFeedUrls = new Set(
    (sources ?? []).flatMap((source) =>
      typeof source.config.url === "string" ? [source.config.url] : [],
    ),
  );

  async function findPeople(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = personQuery.trim();
    if (!query) {
      setPeople(null);
      setPeopleError("Enter a name or handle to search shome.");
      return;
    }

    setSearchingPeople(true);
    setPeopleError(null);
    try {
      const result = await api.get<{ people: PeopleSearchResult[] }>(
        `/api/discover/people?q=${encodeURIComponent(query)}`,
      );
      setPeople(result.people);
    } catch (err) {
      setPeopleError(err instanceof Error ? err.message : String(err));
    } finally {
      setSearchingPeople(false);
    }
  }

  async function toggleFollow(person: PeopleSearchResult) {
    setUpdatingPersonId(person.id);
    setPeopleError(null);
    try {
      if (person.isFollowing) {
        await api.del(`/api/follows/${encodeURIComponent(person.id)}`);
        setPeople(
          (current) =>
            current?.map((candidate) =>
              candidate.id === person.id ? { ...candidate, isFollowing: false } : candidate,
            ) ?? null,
        );
        setCommunity((current) => {
          if (!current) return current;
          return {
            ...current,
            followingCount: Math.max(0, current.followingCount - 1),
            following: current.following.filter((candidate) => candidate.id !== person.id),
          };
        });
      } else {
        const result = await api.post<{ person: SocialUserView; created: boolean }>(
          "/api/follows",
          {
            userId: person.id,
          },
        );
        setPeople(
          (current) =>
            current?.map((candidate) =>
              candidate.id === person.id ? { ...candidate, isFollowing: true } : candidate,
            ) ?? null,
        );
        setCommunity((current) => {
          if (!current || !result.created) return current;
          const alreadyListed = current.following.some((candidate) => candidate.id === person.id);
          return {
            ...current,
            followingCount: current.followingCount + 1,
            following: alreadyListed
              ? current.following
              : [result.person, ...current.following].slice(0, FOLLOW_LIST_LIMIT),
          };
        });
      }
      // A fresh server read accounts for concurrent follows or an older client
      // whose local list was already capped.
      void loadCommunity();
    } catch (err) {
      setPeopleError(err instanceof Error ? err.message : String(err));
    } finally {
      setUpdatingPersonId(null);
    }
  }

  // Inline so the member's border tokens win regardless of cascade layer order.
  const appBorder = {
    borderColor: appStyle.appBorderStyle,
    borderRadius: appStyle.appBorderRadius,
    borderStyle: appStyle.appBorderLineStyle,
  };

  return (
    <section
      className="grid items-start lg:grid-cols-[minmax(0,3fr)_minmax(16rem,2fr)]"
      style={{ gap: appStyle.appSpacing }}
    >
      <div className="flex flex-col" style={{ gap: appStyle.appSpacing }}>
        <section className="card flex flex-col" style={{ gap: appStyle.appSpacing }}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge label="People" tone="text-indigo-200" style={appBorder} />
              <h2 className="mt-3 text-xl font-bold text-white">Find your people on shome</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Search a name or @handle, visit their page, then decide whether to follow.
              </p>
            </div>
          </div>
          <form className="flex flex-col gap-2 sm:flex-row" onSubmit={findPeople}>
            <label className="sr-only" htmlFor="people-search">
              Search shome users
            </label>
            <input
              id="people-search"
              className="input app-secondary-text min-w-0 flex-1"
              style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
              type="search"
              value={personQuery}
              onChange={(event) => setPersonQuery(event.target.value)}
              placeholder="Name or @handle"
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn shrink-0 font-normal"
              style={{
                backgroundColor: appStyle.appAccentBackgroundColor,
                color: appStyle.appFontColor,
              }}
              disabled={searchingPeople}
            >
              {searchingPeople ? "searching…" : "find people"}
            </button>
          </form>

          {people && (
            <div className="border-t border-white/10 pt-3" aria-live="polite">
              {people.length === 0 ? (
                <p className="py-2 text-sm text-slate-400">
                  No shome members match that search yet.
                </p>
              ) : (
                <ul className="divide-y divide-white/10">
                  {people.map((person) => (
                    <li key={person.id} className="flex items-center gap-3 py-3">
                      <PersonAvatar person={person} />
                      <Link
                        className="min-w-0 flex-1 rounded-lg outline-none transition hover:text-indigo-200 focus-visible:ring-2 focus-visible:ring-indigo-300"
                        href={`/p/${encodeURIComponent(person.handle)}`}
                      >
                        <p className="truncate font-medium text-white">
                          {person.displayName || `@${person.handle}`}
                        </p>
                        <p className="truncate text-sm text-slate-400">@{person.handle}</p>
                      </Link>
                      <button
                        type="button"
                        className={person.isFollowing ? "btn-ghost" : "btn"}
                        disabled={updatingPersonId === person.id}
                        onClick={() => void toggleFollow(person)}
                        aria-label={`${person.isFollowing ? "Unfollow" : "Follow"} @${person.handle}`}
                      >
                        {updatingPersonId === person.id
                          ? "saving…"
                          : person.isFollowing
                            ? "following"
                            : "follow"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {peopleError && <p className="text-sm text-red-400">{peopleError}</p>}
        </section>

        <section className="flex flex-col" style={{ gap: appStyle.appSpacing }}>
          <div className="flex items-center gap-2">
            <Badge label="RSS" tone="text-orange-300" style={appBorder} />
            <h2 className="text-xl font-bold">Publications, blogs, and podcasts</h2>
          </div>
          <RssDiscovery
            appStyle={appStyle}
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
        </section>
      </div>

      <aside className="flex flex-col" style={{ gap: appStyle.appSpacing }}>
        <section className="card flex flex-col" style={{ gap: appStyle.appSpacing, ...appBorder }}>
          <Badge
            label="Your community"
            tone="text-emerald-300"
            className="self-start"
            style={appBorder}
          />
          <h2 className="font-semibold text-white">People following you</h2>
          {community ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="border bg-white/[0.04] p-3" style={appBorder}>
                  <p className="text-2xl font-semibold text-white">{community.followerCount}</p>
                  <p className="text-xs text-slate-400">followers</p>
                </div>
                <div className="border bg-white/[0.04] p-3" style={appBorder}>
                  <p className="text-2xl font-semibold text-white">{community.followingCount}</p>
                  <p className="text-xs text-slate-400">following</p>
                </div>
              </div>
              {community.followers.length === 0 ? (
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Your first followers will appear here.
                </p>
              ) : (
                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                    Latest followers
                  </p>
                  <ul className="mt-2 space-y-2">
                    {community.followers.map((person) => (
                      <li key={person.id}>
                        <Link
                          className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-indigo-200"
                          href={`/p/${encodeURIComponent(person.handle)}`}
                        >
                          <PersonAvatar person={person} small />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-slate-200">
                              {person.displayName || `@${person.handle}`}
                            </span>
                            <span className="block truncate text-xs text-slate-500">
                              @{person.handle}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {community.followerCount > community.followers.length && (
                    <p className="mt-3 text-xs text-slate-500">Showing your 50 newest followers.</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="mt-3 text-sm text-slate-400">Loading your community…</p>
          )}
          {communityError && <p className="mt-3 text-sm text-red-400">{communityError}</p>}
        </section>
      </aside>
    </section>
  );
}

function PersonAvatar({ person, small = false }: { person: SocialUserView; small?: boolean }) {
  const sizeClass = small ? "size-8 text-xs" : "size-10 text-sm";
  if (person.image) {
    return (
      <img
        className={`${sizeClass} shrink-0 rounded-full bg-slate-800 object-cover`}
        src={person.image}
        alt=""
      />
    );
  }

  return (
    <span
      className={`grid ${sizeClass} shrink-0 place-items-center rounded-full bg-indigo-300 font-semibold text-slate-950`}
      aria-hidden="true"
    >
      {(person.displayName || person.handle).slice(0, 1).toUpperCase()}
    </span>
  );
}
