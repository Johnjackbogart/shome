Shome is an open source media engine that is designed
to create, share, or bring content from across the web
and keep it all in one place

Shome does the following:

- login to your social media accounts to centralize all of the content you follow
- build a programmable media feed
- share custom content
  - I want to be able to have each user style their own posts
    - Would need to sanitize code, heavily
- distribute your IP across platforms
- build a personalizable profile section
  - I want the user to be able to vibe code their own profile section
- discover RSS and Atom feeds from any public website, plus the most-followed
  RSS sources already used in shome

---

## Development

Multi-user platform built as a TypeScript monorepo:

| Workspace             | What it is                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `packages/core`       | Dependency-free domain model: `ContentItem`, the `Connector` contract, the feed rule engine |
| `packages/db`         | Drizzle ORM schema + migrations; Postgres in prod, embedded PGlite for zero-setup dev       |
| `packages/connectors` | RSS/Atom, Bluesky, Mastodon, YouTube connectors                                             |
| `apps/web`            | Next.js app: React UI + API route handlers, Better Auth, sanitized profile pages            |
| `apps/mobile`         | Expo app (iOS/Android): same accounts and API as the web app, NativeWind styling            |

### Quickstart

```sh
npm install
cp .env.example apps/web/.env   # set BETTER_AUTH_SECRET (openssl rand -hex 32)
npm run dev                     # http://localhost:3000 — uses embedded PGlite, no DB setup
```

For a real Postgres instead of PGlite: `docker compose up -d` and uncomment
`DATABASE_URL` in `apps/web/.env`.

First-party post photos and videos work with no extra local setup. The default
`SHOME_MEDIA_PROVIDER=local` stores them at `apps/web/.data/uploads` and is
ideal for development. Set `SHOME_UPLOAD_DIR` to use another writable location.

For production video delivery, set `SHOME_MEDIA_PROVIDER=cloudflare` plus the
Cloudflare variables in `.env.example`. The app then creates short-lived upload
URLs: photos go directly to Cloudflare Images and videos to Cloudflare Stream,
which enforces the three-minute limit and processes playback asynchronously.
Register the public `/api/webhooks/cloudflare/stream` endpoint with Stream and
set its signing secret. Media bytes never traverse the shome server in this
mode. The local provider remains available for tests and local development.

### Discovering RSS sources

On the web Sources page, enter a website (not a feed URL) under **Discover
RSS**. Shome asks [Feedsearch](https://feedsearch.dev/) to find that site's
public RSS or Atom feeds, then lets the user subscribe directly. The same page
first ranks popular RSS sources from Shome's aggregate subscriptions; until an
instance has any, it falls back to Feedly subscriber counts, cached for 30
minutes. There is no stale hard-coded top-1,000 catalog to maintain.

> Troubleshooting: if the server starts 500ing with `RuntimeError: Aborted()`
> in the logs, the embedded dev database was killed mid-write (crash/hard
> kill) and is unrecoverable — delete `apps/web/.data` and restart. It's
> throwaway dev data; real deployments use Postgres.

### Peeking at the dev database

**Stop the dev server first** — PGlite is single-process, and a second process
opening the same data dir corrupts it.

```sh
npm run db:sql -- "select tablename from pg_tables where schemaname='public'"
npm run db:sql -- "select id, email, username from \"user\""
npm run db:studio    # Drizzle Studio GUI over the same data
```

### Mobile (Expo)

```sh
npm run dev          # the mobile app talks to this server — keep it running
npm run dev:mobile   # Metro dev server; press i / a, or scan the QR in Expo Go
```

On a simulator/emulator the app finds the web server automatically (it targets
port 3000 on the machine running Metro). For a deployed server set
`EXPO_PUBLIC_API_URL` in `apps/mobile/.env`.

### Scripts

- `npm run dev` — Next.js dev server
- `npm run dev:mobile` — Expo dev server for the iOS/Android app
- `npm run dev:ts` — dev server + a `tsc --watch` typechecker across all workspaces
- `npm test` / `npm run typecheck` / `npm run lint` — Vitest, per-package tsc, Biome
- `npm run db:generate` — regenerate SQL migrations after editing `packages/db/src/schema.ts`
- `npm run build` / `npm start` — production build / serve

### Docs

- [Architecture & decisions](docs/architecture.md)
- [Discovery roadmap](docs/discovery.md)
- [Closed-platform access research](docs/platform-access.md) — what's possible with X, Facebook, Instagram, LinkedIn
