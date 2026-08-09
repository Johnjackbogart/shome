import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source; Next compiles them in place.
  transpilePackages: ["@shome/core", "@shome/db", "@shome/connectors"],
  // PGlite loads wasm assets from disk and pg does dynamic requires — keep both unbundled.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    // TLS itself terminates at the platform/proxy; HSTS pins browsers to it.
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
