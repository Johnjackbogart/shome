<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Never start a second dev server

Dev uses embedded PGlite, which is **single-process**: the data directory at
`apps/web/.data/pglite` may only be open by one process at a time. A second
process opening it corrupts it — including a second `next dev`, even on a
different port, and `db:sql` / `db:studio` / `db:migrate`.

Assume a dev server is already running. Do not run `next dev`, `npm run dev`,
or `npm run dev:ts`; to check whether the app is up, curl the existing server
(default `http://localhost:3000`) or ask. If you genuinely need your own
instance, it must have both its own port and its own database:

```
SHOME_PGLITE_DIR=/tmp/<somewhere> npx next dev -p <unused-port>
```

The failure mode is not obvious: the second PGlite aborts while *booting*, and
because nothing awaits `client.waitReady` in `packages/db/src/client.ts`, it
surfaces as a bare unhandled rejection with no usable stack —

```
Unhandled Rejection: RuntimeError: Aborted(). Build with -sASSERTIONS for more info.
    at ignore-listed frames
```

Recovery is deleting `apps/web/.data` and restarting (see README).
