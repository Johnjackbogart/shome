import { user } from "@shome/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError, parseBody, UUID_RE } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { getDb } from "@/server/db";
import { createPost, postToFeedItem } from "@/server/posting";

const createSchema = z.object({
  text: z.string().trim().min(1, "write something before posting").max(5_000),
  blueskyConnectionId: z.string().regex(UUID_RE, "invalid Bluesky connection").optional(),
  mastodonConnectionId: z.string().regex(UUID_RE, "invalid Mastodon connection").optional(),
});

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, createSchema);
  if (!body.ok) return body.res;

  const db = await getDb();
  const { post, deliveries } = await createPost(db, {
    userId: session.user.id,
    ...body.data,
  });
  const [author] = await db
    .select({ name: user.name, username: user.username, image: user.image })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return NextResponse.json({
    post: postToFeedItem(post, author ?? { name: null, username: null, image: null }),
    deliveries,
  });
}
