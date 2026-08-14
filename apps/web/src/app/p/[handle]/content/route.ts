import { profiles, user } from "@shome/db";
import { eq } from "drizzle-orm";
import { getDb } from "@/server/db";
import { PROFILE_CSP, renderProfileDocument } from "@/server/profile-page";

export const dynamic = "force-dynamic";

// Serves the user-authored profile page for the sandboxed iframe. Sanitized at
// serve time; the CSP below is defense in depth for direct navigation (no
// scripts, no external requests beyond images/media/fonts).
export async function GET(_req: Request, ctx: { params: Promise<{ handle: string }> }) {
  const { handle } = await ctx.params;
  const db = await getDb();
  const [row] = await db
    .select({ html: profiles.html, userId: user.id, username: user.username })
    .from(user)
    .leftJoin(profiles, eq(profiles.userId, user.id))
    .where(eq(user.username, handle.toLowerCase()))
    .limit(1);
  if (!row) return new Response("not found", { status: 404 });

  const doc = await renderProfileDocument({
    db,
    userId: row.userId,
    html: row.html,
    handle: row.username ?? handle,
  });

  return new Response(doc, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-security-policy": PROFILE_CSP,
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });
}
