import { profiles, user } from "@shome/db";
import { eq } from "drizzle-orm";
import { getDb } from "@/server/db";
import { defaultProfileHtml, sanitizeProfileHtml } from "@/server/sanitize";

export const dynamic = "force-dynamic";

// Serves the user-authored profile page for the sandboxed iframe. Sanitized at
// serve time; the CSP below is defense in depth for direct navigation (no
// scripts, no external requests beyond images/media/fonts).
export async function GET(_req: Request, ctx: { params: Promise<{ handle: string }> }) {
  const { handle } = await ctx.params;
  const db = await getDb();
  const [row] = await db
    .select({ html: profiles.html, username: user.username })
    .from(user)
    .leftJoin(profiles, eq(profiles.userId, user.id))
    .where(eq(user.username, handle.toLowerCase()))
    .limit(1);
  if (!row) return new Response("not found", { status: 404 });

  const inner = row.html?.trim()
    ? sanitizeProfileHtml(row.html)
    : defaultProfileHtml(row.username ?? handle);
  const doc = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>${inner}</body>
</html>`;

  return new Response(doc, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-security-policy":
        "default-src 'none'; style-src 'unsafe-inline'; img-src https: data:; media-src https:; font-src https: data:",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });
}
