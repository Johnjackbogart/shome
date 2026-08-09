import { defineConfig } from "drizzle-kit";

const base = {
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
} as const;

// `generate` never connects; the credentials below are for `studio` (and any
// future push/CLI-migrate use). With DATABASE_URL set they target that
// Postgres — matching the app's own driver selection; otherwise the embedded
// dev database (STOP THE DEV SERVER FIRST — PGlite is single-process).
export default process.env.DATABASE_URL
  ? defineConfig({
      ...base,
      dbCredentials: { url: process.env.DATABASE_URL },
    })
  : defineConfig({
      ...base,
      driver: "pglite",
      dbCredentials: { url: process.env.SHOME_PGLITE_DIR ?? "../../apps/web/.data/pglite" },
    });
