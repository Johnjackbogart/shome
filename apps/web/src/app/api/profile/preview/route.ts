import { z } from "zod";
import { jsonError, parseBody } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { renderProfileDocument } from "#/server/profile-page";

// Renders an unsaved draft for the editor's preview pane. Same render +
// sanitize pipeline as the published page, but nothing is written: the draft
// arrives in the request and the document goes straight back.
const previewSchema = z.object({
  html: z.string().max(200_000, "profile HTML is limited to 200k characters"),
});

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, previewSchema);
  if (!body.ok) return body.res;
  const db = await getDb();

  const doc = await renderProfileDocument({
    db,
    userId: session.user.id,
    html: body.data.html,
    handle: session.user.username ?? session.user.name,
  });
  return Response.json({ doc });
}
