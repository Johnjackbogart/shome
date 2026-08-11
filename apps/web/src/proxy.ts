import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAllowedOrigin } from "@/lib/origins";

// Neither Next nor Better Auth emits CORS headers on its own, so the API is
// same-origin only by default. The Expo app running under `--web` lives on the
// Metro origin, so answer its preflights and tag its responses.
export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || !isAllowedOrigin(origin)) return NextResponse.next();

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...corsHeaders(origin),
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(corsHeaders(origin))) {
    response.headers.set(key, value);
  }
  return response;
}

/** Session cookies ride along, so the origin must be echoed rather than `*`. */
function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

export const config = {
  matcher: "/api/:path*",
};
