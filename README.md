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

---

## Development

Multi-user platform built as a TypeScript monorepo:

| Workspace             | What it is                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `packages/core`       | Dependency-free domain model: `ContentItem`, the `Connector` contract, the feed rule engine |
| `packages/db`         | Drizzle ORM schema + migrations; Postgres in prod, embedded PGlite for zero-setup dev       |
| `packages/connectors` | RSS/Atom, Bluesky, Mastodon, YouTube connectors                                             |
| `apps/web`            | Next.js app: React UI + API route handlers, Better Auth, sanitized profile pages            |

### Quickstart

```sh
npm install
cp .env.example apps/web/.env   # set BETTER_AUTH_SECRET (openssl rand -hex 32)
npm run dev                     # http://localhost:3000 — uses embedded PGlite, no DB setup
```

For a real Postgres instead of PGlite: `docker compose up -d` and uncomment
`DATABASE_URL` in `apps/web/.env`.

> Troubleshooting: if the server starts 500ing with `RuntimeError: Aborted()`
> in the logs, the embedded dev database was killed mid-write (crash/hard
> kill) and is unrecoverable — delete `apps/web/.data` and restart. It's
> throwaway dev data; real deployments use Postgres.

### Scripts

- `npm run dev` — Next.js dev server
- `npm run dev:ts` — dev server + a `tsc --watch` typechecker across all workspaces
- `npm test` / `npm run typecheck` / `npm run lint` — Vitest, per-package tsc, Biome
- `npm run db:generate` — regenerate SQL migrations after editing `packages/db/src/schema.ts`
- `npm run build` / `npm start` — production build / serve

### Docs

- [Architecture & decisions](docs/architecture.md)
- [Closed-platform access research](docs/platform-access.md) — what's possible with X, Facebook, Instagram, LinkedIn
