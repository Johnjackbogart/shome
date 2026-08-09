import { connections } from "@shome/db";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { ConnectionView } from "@/lib/types";
import { isUniqueViolation, jsonError, parseBody } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { encryptCredentials } from "@/server/crypto";
import { getDb } from "@/server/db";

// Providers that need stored credentials, and which fields they require.
const REQUIRED_FIELDS: Record<string, string[]> = {
  bluesky: ["identifier", "appPassword"],
  mastodon: ["accessToken"],
  youtube: ["apiKey"],
};

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  // Credentials are intentionally never echoed back.
  const rows = await db
    .select({
      id: connections.id,
      provider: connections.provider,
      label: connections.label,
      createdAt: connections.createdAt,
    })
    .from(connections)
    .where(eq(connections.userId, session.user.id))
    .orderBy(desc(connections.createdAt));
  const views: ConnectionView[] = rows.map((row) => ({
    id: row.id,
    provider: row.provider,
    label: row.label,
    createdAt: row.createdAt.toISOString(),
  }));
  return NextResponse.json({ connections: views });
}

const createSchema = z.object({
  provider: z.enum(["bluesky", "mastodon", "youtube"]),
  label: z.string().min(1).max(40).optional(),
  credentials: z.record(z.string(), z.unknown()),
});

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, createSchema);
  if (!body.ok) return body.res;
  const db = await getDb();

  const required = REQUIRED_FIELDS[body.data.provider] ?? [];
  const missing = required.filter((key) => {
    const value = body.data.credentials[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
  if (missing.length > 0) {
    return jsonError(400, `missing credential fields: ${missing.join(", ")}`);
  }

  try {
    const [row] = await db
      .insert(connections)
      .values({
        userId: session.user.id,
        provider: body.data.provider,
        label: body.data.label ?? "default",
        // Stored as a compact JWE — plaintext never touches the database.
        credentials: await encryptCredentials(body.data.credentials),
      })
      .returning({
        id: connections.id,
        provider: connections.provider,
        label: connections.label,
        createdAt: connections.createdAt,
      });
    if (!row) return jsonError(500, "failed to create connection");
    const view: ConnectionView = {
      ...row,
      createdAt: row.createdAt.toISOString(),
    };
    return NextResponse.json({ connection: view });
  } catch (err) {
    if (isUniqueViolation(err)) {
      return jsonError(409, "a connection with this provider and label already exists");
    }
    throw err;
  }
}
