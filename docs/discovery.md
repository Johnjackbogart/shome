# Discovery roadmap

## Goal

Make it easy to find worthwhile sources before adding them to a person's feed.
Discovery should be a separate, authenticated surface; **Sources** remains the
place to review, refresh, and remove the sources already followed.

The proposed web navigation is:

```
Feed | Discover | Sources | My page
```

The mobile equivalent is a Discover tab, with existing source management left
in the Sources tab.

## Current RSS implementation

RSS discovery is already available in Sources on web and mobile.

- Enter a domain or URL such as `arstechnica.com` to inspect that site with
  [Feedsearch](https://feedsearch.dev/).
- Enter plain words such as `Ars Technica` or `arstechnica` to search Feedly's
  public source directory; no `https://`, `www.`, or `.com` is required.
- Add a result through the normal `POST /api/sources` path, so connector
  validation, SSRF protection, deduplication, and the initial refresh remain
  centralized.
- `GET /api/discover/rss/popular` returns two independent RSS rankings: sources
  ranked by aggregate Shome subscription counts and a 30-minute-cached Feedly
  public-directory list for popular sources across the web.

### Feedly terms assessment — implementation blocker

The Feedly-backed ranking must not ship (and should be removed from the
automatic popular-sources path) without written permission from Feedly.

- Feedly documents `/v3/search/feeds` as source recommendations, but its API
  terms require applications to display search results in the delivered order
  and not remove sponsored or featured results. The popular-sources helper
  queries `#news` and returns its normalized, valid results in Feedly's
  delivered order; it does not re-sort them or apply a second result limit.
- Feedly's current API documentation says API interactions require an API
  access token, while the implementation calls the `cloud.feedly.com` endpoint
  anonymously.
- The same terms say business applications that connect to Feedly must require
  each user to have a Feedly Pro or Team account, discourage high search
  volumes (20 search requests per user per hour is their stated acceptable
  rate), and prohibit mass import/export without permission. A stored list of
  1,000 Feedly-derived sources may fall into that last restriction.

References: [Feedly API terms](https://developers.feedly.com/In/reference/feedly-api-terms-of-service),
[Feedly API introduction](https://developers.feedly.com/reference/introduction),
and [Feedly source search](https://feedly.com/new-features/posts/introducing-the-feedly-teams-api).

Use Feedsearch only for a user-requested website lookup. For Popular sources,
use Shome's aggregate subscription counts once available and a separately
curated or appropriately licensed seed list during cold start. Retain a
Feedly integration only after Feedly approves the exact use case in writing;
then preserve its ranking/order, sponsorship treatment, authentication, and
rate limits as agreed.

Current implementation:

- [`rss-discovery.ts`](../apps/web/src/server/rss-discovery.ts)
- [`/api/discover/rss`](../apps/web/src/app/api/discover/rss/route.ts)
- [`/api/discover/rss/popular`](../apps/web/src/app/api/discover/rss/popular/route.ts)

No static top-1,000 table is needed for this design. The existing global
`sources` table plus `subscriptions` table is the durable, first-party source
of popularity after the cold start.

## Discover page design

The page should use platform sections rather than blending unlike results into
one ranking:

| Section | Search input | Results | Add action |
| --- | --- | --- | --- |
| RSS | Site name or URL | feeds, title, description, subscriber count where available | Add RSS feed |
| Bluesky | Handle or display name | public profiles | Follow author |
| Mastodon | Instance, then account/hashtag query | instance-local accounts, tags, and trends | Follow author or tag |

Each result needs a clear platform badge, source name, handle or URL, short
description, and an explicit Add button. Existing sources should stay visible
but be marked **Added**, rather than disappearing from a popular list.

All Discover API routes remain authenticated, result-capped, rate-limited, and
server-side. The UI must never fetch a user-supplied server or URL directly.

## Bluesky discovery

### What is available

`app.bsky.actor.searchActors` searches public profiles by handle or display
name and does not require authentication. It is a direct fit for the existing
Bluesky `author` source mode, which already accepts an actor handle and reads
the public author feed.

There is no stable, universally meaningful “most popular Bluesky accounts”
metric in the public source model. The first version should therefore be
search-first. Any future suggested-profile panel must label its provider and
ranking basis rather than imply an objective global popularity order.

### Proposed API

```
GET /api/discover/bluesky?q=<handle-or-name>&cursor=<optional>
```

The route calls the public Bluesky AppView, returns a small normalized profile
view (`handle`, display name, description, avatar), and never needs stored
credentials. Adding a result uses the existing source endpoint:

```json
{
  "kind": "bluesky",
  "config": { "mode": "author", "actor": "example.bsky.social" }
}
```

Reference: [Bluesky actor-search API contract](https://app.unpkg.com/%40atproto/bsky%400.0.241/files/dist/lexicons/app/bsky/actor/searchActors.defs.d.ts).

## Mastodon discovery

### What is available

Mastodon discovery is **instance-scoped**, not network-global. A Discover
user chooses an instance (for example `mastodon.social`), then searches that
server. `GET /api/v2/search` can search accounts and hashtags publicly when
the server already knows them; resolving an unknown remote account requires a
connected user token. Public trending tags, statuses, and links are also
provided per instance.

References: [Mastodon search](https://docs.joinmastodon.org/methods/search/)
and [Mastodon trends](https://docs.joinmastodon.org/methods/trends/).

### Required connector work

The existing Mastodon connector supports public timelines, hashtags, and an
authenticated home timeline. It does **not** yet support an individual author,
so account discovery must ship with a new `author` mode:

```ts
{
  server: "https://mastodon.social",
  mode: "author",
  accountId: "server-local-account-id",
  account: "person@remote.example" // display/canonical metadata
}
```

The connector would fetch `/api/v1/accounts/:accountId/statuses`. Store the
stable server-local `accountId` returned by search; do not repeatedly resolve
the handle during background refreshes. Its canonical key should include both
the normalized instance host and that account ID.

### Proposed APIs

```
GET /api/discover/mastodon?server=<https-origin>&q=<query>
GET /api/discover/mastodon/trends?server=<https-origin>
```

Both routes need the existing public-host guard before contacting an instance.
The search route should accept an optional saved Mastodon `connectionId`; use
that connection only when remote resolution is requested, and never return its
access token. Limit the response to accounts and hashtags in the first
iteration; status search is more expensive and has inconsistent availability
between instances.

## Delivery plan

1. **Extract RSS into Discover.** Add web and mobile navigation, move the
   existing RSS discovery panel unchanged, and leave manual RSS entry in
   Sources.
2. **Add Bluesky people search.** Implement the public route, normalized
   response, search UI, pagination, and Add action. No schema migration or
   connection is needed.
3. **Add Mastodon author ingestion.** Extend connector configuration, fetching,
   canonical keys, tests, and the standard source-create path.
4. **Add Mastodon instance search and trends.** Build the guarded discovery
   routes and UI only after author ingestion exists.
5. **Measure and refine.** Optionally record privacy-preserving aggregate
   add/click counts for ranking quality. Do not record search terms or expose
   individual subscription relationships.

## Acceptance criteria

- Discover shows Popular on Shome from aggregate RSS subscriptions. A cold
  start list, if shown, is independently curated or used under an explicit
  provider licence; it is not derived from Feedly search results by default.
- Plain-name RSS searches work alongside domains and full URLs.
- Bluesky search results can be added as public author sources.
- Mastodon results make their instance scope clear, and an account result can
  be added only after the `author` connector mode is implemented.
- Discovery results never bypass SSRF validation, source parsing, or the
  normal source creation endpoint.
