# shome architecture

Status: v0 scaffold (2026-08). Hosted multi-user platform; v0 pillars are the
**aggregated feed** and **vibe-coded profile pages**.

## Shape

```
packages/core        pure domain logic (no IO, no framework)
packages/db          Drizzle schema + migrations, Postgres/PGlite dual driver
packages/connectors  platform connectors implementing core's Connector contract
apps/web             Next.js 16 (App Router): UI + API route handlers + auth
apps/mobile          Expo (expo-router): iOS/Android client of apps/web's API
```

Workspace packages ship TypeScript source (`exports` → `src/index.ts`); Next
compiles them via `transpilePackages`, Metro compiles them in the Expo app,
tests run them directly — no build step anywhere except `next build`.

## Web API boundary (`apps/web`)

`src/app/api/` and `src/server/` both run only on the server, but they serve
different roles:

- **`src/app/api/**/route.ts`** is the public HTTP boundary. Next.js maps each
  `route.ts` file to a URL under `/api` (for example,
  [`api/feed/route.ts`](../apps/web/src/app/api/feed/route.ts) handles
  `GET /api/feed`). These handlers authenticate requests, validate HTTP input,
  and return responses for the web and mobile clients.
- **`src/server/`** is private, reusable server implementation code. It has no
  URL of its own; route handlers and server-rendered pages import it for work
  such as database access, authentication, refreshes, encryption, and
  sanitization. For example, [`server/refresh.ts`](../apps/web/src/server/refresh.ts)
  contains source-refresh logic called by API routes.

The potentially confusing [`server/api.ts`](../apps/web/src/server/api.ts) is
also private: it provides shared API helpers such as JSON error and request-body
parsing, rather than defining endpoints. See the
[Next.js Route Handlers reference](https://nextjs.org/docs/app/api-reference/file-conventions/route)
for the file-to-URL convention.

## Mobile app (`apps/mobile`)

A thin client over the same HTTP API the web UI uses — no direct database or
connector access; all ingestion, sanitization, and credential handling stays
server-side. Pieces:

- **Auth**: Better Auth's Expo plugin. The server adds `expo()` +
  `trustedOrigins: ["shome://"]`; the app's client
  (`src/lib/auth-client.ts`) stores the session cookie in `expo-secure-store`
  (OS keychain), and `src/lib/api.ts` forwards it as a `Cookie` header on
  every API call — native fetch has no cookie jar.
- **Shared contract**: the API view types (`FeedItemView`, `SourceView`, …)
  moved to `packages/core/src/api-views.ts`; web re-exports them from
  `@/lib/types`, mobile imports them from `@shome/core` directly.
- **Styling**: NativeWind 4 (Tailwind classes compiled to RN styles). Note the
  version split: web is Tailwind v4 CSS-first, mobile pins `tailwindcss` v3 in
  its own workspace because NativeWind 4 requires it.
- **Server discovery**: in dev the app derives the API origin from the Metro
  host (`exp://…:8081` → `http://…:3000`), so simulators and physical devices
  on the LAN both reach `npm run dev` with zero config; `EXPO_PUBLIC_API_URL`
  overrides for deployed servers.
- **Scope**: feed (pull-to-refresh + server refresh), sources
  (add/refresh/remove for the credential-free modes; credentialed modes are
  managed on web), account tab with sign-out and a browser link to the
  public profile page. Item HTML is flattened to text for native rendering —
  the sanitized-HTML/iframe pipeline stays a web concern.

## Domain model

- **Source** — a thing that produces content (an RSS feed, a Bluesky author, a
  Mastodon hashtag, a YouTube channel). Global rows deduped by `canonical_key`;
  per-user sources (home timelines) embed the owning account in the key so two
  users never share one.
- **Subscription** — user ↔ source, optionally carrying a `connection_id` for
  credentials. All feed queries join through subscriptions, which is what
  scopes every read to the signed-in user.
- **Item** — the normalized content unit (`ContentItem` in core): external id,
  url, title, text, sanitized html, author, media refs, `published_at`, plus
  the `raw` payload for future re-normalization. Deduped on
  `(source_id, external_id)`.
- **Connection** — a user's platform credentials (Bluesky app password,
  Mastodon token, YouTube API key). Never echoed back by the API.
- **Feed** — a saved `FeedRules` document (core's declarative rule set:
  source/kind filters, include/exclude keywords, media requirement, sort,
  limit). The engine (`evaluateFeed`) is a pure, tested function; richer
  stages — scoring, user-authored sandboxed scripts — slot in behind the same
  interface later. v0 UI exposes live filtering; saved-feed routes are next.
- **Profile** — the user's vibe-coded page: raw HTML/CSS stored as written.
- **Product** — a creator-owned catalog item (title, description, price label,
  image, external checkout URL, visibility, order). shome displays products but
  does not handle payment, inventory, orders, customer data, tax, or refunds.

## Profile builder and components

Profiles stay code-first: creators author normal HTML/CSS, paste a generated
draft, or use editor snippets. The source additionally supports a small,
versioned component vocabulary. v1 components are attribute-free tags:

- `<shome-posts />` renders the owner's first-party posts in that exact place.
- `<shome-products />` renders the owner's visible product catalog and sends
  visitors to each creator-provided external checkout URL.

`server/profile-components.ts` is the registry seam. It recognizes only known
component syntax, loads the owner-scoped data on the server, replaces a tag with
trusted generated markup, then passes the entire result through profile
sanitization. Component tags never execute arbitrary user code. Public profiles
without `<shome-posts />` retain the legacy posts section below the iframe, so
old pages remain unchanged.

Future blog lists, galleries, provider-backed catalogs, games, and 3D viewers
should be added as typed components at this seam. Native, reviewed interactive
components come before any general scripting. If custom JavaScript is later
allowed, it must run in a separate opt-in sandbox with a narrow message API,
explicit permissions, resource quotas, and no default access to shome identity
or creator data.

## Connector contract (`packages/core/src/connector.ts`)

`parseConfig` (validate/normalize user config) → `canonicalKey` (stable
identity) → `fetchLatest(config, {credentials, since})` → `FetchResult`
(normalized items + source title). Connectors are platform SDK/HTTP only —
sanitization and SSRF policy live in the app, storage in the db layer.

## Auth

[Better Auth](https://better-auth.com) with the Drizzle adapter and the
username plugin (`user.username` is the public handle, shown at `/p/[handle]`).
Better Auth owns the `user`/`session`/`account`/`verification` tables; domain
tables reference `user.id`. The app-side seam is small on purpose
(`getSessionOrNull()` in `apps/web/src/server/auth.ts`), so swapping to a
hosted provider (WorkOS AuthKit et al.) later is cheap.

## Storage

Drizzle ORM against Postgres. With no `DATABASE_URL`, an embedded
[PGlite](https://pglite.dev) database (same SQL dialect) runs in-process —
in-memory tests that exercise the real migrations, and dev without a database
to install.

Migrations are generated by drizzle-kit into `packages/db/migrations` and
applied only when someone runs `npm run db:migrate`. The server never migrates
on its own: starting a process must not be able to rewrite the schema, so a
rolling deploy can't half-migrate a database under the version still serving
it, and the change lands as a step someone chose to take. The trade is that a
fresh database — including a new dev one — serves errors until that command has
run. `createDatabase().migrate()` still exists for tests and scripts, and
locates the folder at runtime (env override `SHOME_MIGRATIONS_DIR` →
source-relative → cwd walk-up) because bundlers rewrite `import.meta.url`.

First-party photos and videos use a two-stage model. A temporary
`media_uploads` record establishes ownership before a post exists; once a user
publishes, its asset is copied into `post_media` and appears in the same
chronological feed as text and connector items.

`SHOME_MEDIA_PROVIDER=local` is the zero-setup development adapter. It stores
media bytes in `apps/web/.data/uploads` (`SHOME_UPLOAD_DIR` overrides this) and
supports HTTP range requests for local video playback. `SHOME_MEDIA_PROVIDER=cloudflare`
issues browser-direct URLs instead: images upload to Cloudflare Images and
videos upload to Cloudflare Stream with a server-enforced 180-second maximum.
The app stores provider IDs and processing status, not production media bytes.
Stream's signed webhook updates pending and published video rows when encoding
finishes; the feed uses its player URL, preserving the source orientation.

## Security model

Two distinct trust boundaries for user-influenced HTML
(`apps/web/src/server/sanitize.ts`):

1. **Feed items** (third-party content) render inline in the app → tightest
   sanitize-html allowlist, no styling hooks, applied **once at ingest**.
2. **Profiles** (user-authored pages) render **only** inside a fully sandboxed
   iframe (`sandbox=""` → opaque origin, no scripts) served from
   `/p/[handle]/content` with a strict CSP (`default-src 'none'`, inline CSS
   allowed, images/media/fonts over https). Sanitized **at serve time** so
   sanitizer fixes reach existing profiles; `<style>` is allowed, scripts never.
   Verified: `<script>` tags and event-handler attributes are stripped, and the
   CSP blocks execution even on direct navigation. Later, opt-in scripts can
   ride the same iframe with `allow-scripts` (still opaque origin) — that's the
   path to fully interactive vibe-coded pages.

Other measures:

- **SSRF guard** (`netguard.ts`): user-supplied fetch targets (RSS URLs,
  Mastodon servers) must be http(s) and resolve only to public address space;
  cloud-metadata/link-local/private ranges are refused. Known gap: DNS could
  change between check and fetch (rebinding); closing it needs a
  pinned-address dispatcher on the fetch itself.
- **Credentials at rest** (`crypto.ts`): `connections.credentials` is stored as
  a compact JWE (direct AES-256-GCM; key = HKDF-SHA256 of
  `CREDENTIALS_ENCRYPTION_KEY`, falling back to `BETTER_AUTH_SECRET`).
  Plaintext exists only in memory during a fetch, and the API never serializes
  credentials back to clients. Key rotation = decrypt-with-old/encrypt-with-new
  batch job (not built yet).
- **Credentials in transit**: connectors that send tokens speak https only
  (Bluesky/YouTube endpoints are https; Mastodon server config rejects
  `http://`). Client↔server TLS terminates at the deployment platform/proxy;
  the app sends HSTS in production and marks session cookies `secure`.
- **Tenancy**: every domain query filters through the session user's
  subscriptions/ownership.

## Known gaps / next steps (roughly in order)

1. **License** — undecided (MIT vs AGPL matters for a hosted platform; AGPL is
   the common choice in this genre: Mastodon, FreshRSS).
2. **Credential key rotation tooling** — encryption at rest is in place; a
   rotation job (re-encrypt under a new `CREDENTIALS_ENCRYPTION_KEY`) is not.
3. **Background refresh** — fetches run inline on request; move to a scheduler
   (cron + queue) with per-source cadence and backoff.
4. **Saved programmable feeds** — routes + UI over the existing `feeds` table
   and rule engine; then sandboxed user scripts (QuickJS/WASM) as a pipeline
   stage.
5. **Feed pagination** — keyset cursors (`coalesce(published_at, fetched_at), id`).
6. **Publishing + syndication pillar** — compose posts, style them (same
   sanitize+sandbox machinery), cross-post via platform write APIs
   (see [platform-access.md](platform-access.md)).
7. **Vibe-code assistant** — LLM generation of profile pages (Claude API)
   feeding the same sanitize/sandbox path; nothing about the pipeline changes.
8. **Rate limiting & abuse controls** on auth and fetch endpoints.
9. **Retention** — orphaned sources are deliberately kept when the last
   subscriber leaves (explicit product decision); revisit if storage becomes a
   concern.
10. **Pinterest live connector** — add an OAuth-connected source for a user's
    own boards and boards they follow. It must not promise Pinterest's
    algorithmic home feed, which the API does not expose. Pinterest's developer
    guidelines prohibit storing API-derived information, so this cannot use the
    normal `fetch → items` ingestion path: retain only the encrypted connection
    and user-supplied configuration, fetch Pins just-in-time for rendering, and
    do not persist Pin payloads, media, raw responses, or refresh snapshots.
    Require `boards:read` and `pins:read` by default; request the corresponding
    secret-board scopes only when a user explicitly opts in. Preserve Pinterest
    attribution and a permalink on every rendered Pin. Before implementation,
    obtain Pinterest app approval and confirm the live-rendering design against
    the current [Pinterest developer guidelines](https://policy.pinterest.com/en/developer-guidelines)
    and [OAuth scope documentation](https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/).

## Connector expansion research

The source roadmap distinguishes a genuine following feed from an
authorized user's own content or activity. The latter is useful for profiles
and outbound distribution, but must not be presented as a replacement for a
platform's home feed. Re-check provider terms, app-review requirements, rate
limits, data-retention rules, and scopes immediately before implementation.

### First priority — durable feed value

1. **RSS/Atom discovery** — implemented on the web Sources page. A user pastes
   a public website URL; the server applies the existing SSRF guard, asks
   Feedsearch for that site's feeds, and lets the user subscribe to a result.
   This multiplies the value of the existing RSS connector across blogs,
   newsletters, podcasts, communities, and release notes without a
   service-specific integration. The same view first ranks popular RSS sources
   from aggregate Shome subscriptions. Feedly's public source directory is a
   30-minute-cached cold-start fallback only, avoiding a stale hard-coded
   catalog.
2. **YouTube subscriptions** — extend the existing channel connector with an
   OAuth connection. The API can list the authenticated user's subscriptions;
   shome can then aggregate recent uploads from those channels into a
   chronological following feed. [YouTube subscription API](https://developers.google.com/youtube/v3/docs/subscriptions/list)
3. **Reddit** — an OAuth connector can ingest the authenticated user's
   `/best` listing, selected subreddits, and saved items. This is a true
   social-feed candidate, subject to Reddit's API terms and an explicit data
   retention review. [Reddit API documentation](https://www.reddit.com/dev/api/)
4. **Tumblr** — ingest the authenticated user's Dashboard and selected blogs.
   Tumblr's official client exposes an authenticated dashboard method, making
   it another genuine following-feed candidate. [Tumblr API client](https://tumblr.github.io/tumblr.js/)
5. **Twitch** — show a user's followed broadcasters that are currently live;
   use the user-scoped `user:read:follows` authorization. Treat it as a live
   events source, not an archive. [Twitch followed streams](https://dev.twitch.tv/docs/api/reference/#get-followed-streams)
6. **GitHub** — add a work/technical feed for notifications, watched
   repositories, releases, issues, and pull requests. Notification polling
   supports `Last-Modified`/`304` for efficient incremental refreshes.
   [GitHub notifications API](https://docs.github.com/en/rest/activity/notifications)

### Second priority — creator-owned or scoped sources

- **Pinterest** — implement the live connector described above; it is not a
  persisted `items` source.
- **TikTok** — show an authorized user's profile and public videos, using the
  provider's display/embed model. It does not provide the user's Following or
  For You feed. [TikTok Display API](https://developers.tiktok.com/doc/display-api-overview/)
- **Snapchat** — consider only a creator/business public-profile integration:
  the Public Profile API can retrieve public Stories by profile, but does not
  provide a person's friends, private Stories, or home feed. [Snap Public Profile API](https://developers.snap.com/marketing-api/Public-Profile-API/ProfileAssetManagement)
- **Threads** — run a short OAuth/app-review spike for own-content and
  publishing support, but do not plan around a Following feed without a
  documented, tested endpoint.
- **Spotify** — optional private activity source for a user's recently played,
  saved, and followed music/podcast items; request the narrowest scopes and do
  not treat it as a social-content feed. [Spotify recently played API](https://developer.spotify.com/documentation/web-api/reference/get-recently-played)
- **Strava** — optional own-activity source for profiles; its activity webhook
  can replace polling once a user authorizes the app. [Strava API overview](https://developers.strava.com/docs/getting-started/)
- **Slack** — offer only as an explicit workspace integration with source
  selection and strong privacy controls. User tokens can access messages in
  channels the user is permitted to read, but non-Marketplace apps have tight
  history limits. [Slack conversation history](https://api.slack.com/methods/conversations.history)
- **Telegram** — support selected channels only, via a bot that receives new
  `channel_post` updates; it is not a personal Telegram timeline.
  [Telegram Bot API](https://core.telegram.org/bots/api)

### Do not build as personal-feed connectors

- **Discord** — a normal user-data connector would require a prohibited
  self-bot. A server-installed bot may be useful for an administrator-selected
  channel, but is a workspace integration, not a user's Discord feed.
  [Discord self-bot policy](https://support.discord.com/hc/en-us/articles/115002192352-Automated-User-Accounts-Self-Bots)
- **Snapchat friends/Discover**, **WhatsApp personal**, and the following feeds
  of **Facebook, Instagram, and LinkedIn** have no suitable standard API path.
  Follow the compliant alternatives in [platform-access.md](platform-access.md):
  official owned-content APIs, exports, embeds, or a user-triggered
  "Save to shome" flow.
- **X** remains a separate, opt-in bring-your-own-key connector because read
  calls are metered; see [platform-access.md](platform-access.md).
