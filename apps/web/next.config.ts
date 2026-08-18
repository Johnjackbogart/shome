import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // `proxy.ts` runs for every API route. Its default 10 MB request clone
    // limit truncates camera videos before the local upload route can parse
    // their multipart body. This leaves room for the 512 MiB file limit and
    // multipart headers; media-storage still enforces the precise limit.
    proxyClientMaxBodySize: "550mb",
  },
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
