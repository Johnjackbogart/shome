import { connections, type Db } from "@shome/db";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { ConnectionView } from "#/lib/types";
import { isUniqueViolation, jsonError, parseBody } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { resolveConnectionAccount } from "#/server/connection-account";
import { decryptCredentials, encryptCredentials } from "#/server/crypto";
import { getDb } from "#/server/db";

// Providers that need stored credentials, and which fields they require.
const REQUIRED_FIELDS: Record<string, string[]> = {
  bluesky: ["identifier", "appPassword"],
  mastodon: ["server", "accessToken"],
  youtube: ["apiKey"],
};

// Names a connection linked before `account` was recorded, so existing
// connections show who they are without being relinked. Best effort: an
// unresolved row simply stays unnamed and is tried again on the next read.
async function backfillAccount(
  db: Db,
  row: { id: string; provider: string; credentials: string },
): Promise<string | null> {
  try {
    const account = await resolveConnectionAccount(
      row.provider,
      await decryptCredentials(row.credentials),
    );
    if (account) await db.update(connections).set({ account }).where(eq(connections.id, row.id));
    return account;
  } catch {
    return null;
  }
}

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();

  // Credentials are intentionally never echoed back; they are selected only so
  // a legacy row can be named, and stay server-side.
  const rows = await db
    .select({
      id: connections.id,
      provider: connections.provider,
      label: connections.label,
      account: connections.account,
      credentials: connections.credentials,
      createdAt: connections.createdAt,
    })
    .from(connections)
    .where(eq(connections.userId, session.user.id))
    .orderBy(desc(connections.createdAt));
  const views: ConnectionView[] = await Promise.all(
    rows.map(async (row) => ({
      id: row.id,
      provider: row.provider,
      label: row.label,
      account: row.account ?? (await backfillAccount(db, row)),
      createdAt: row.createdAt.toISOString(),
    })),
  );
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

  const credentials = { ...body.data.credentials };
  if (body.data.provider === "mastodon") {
    const rawServer = credentials.server;
    try {
      const url = new URL(
        typeof rawServer === "string" && rawServer.includes("://")
          ? rawServer
          : `https://${rawServer}`,
      );
      if (url.protocol !== "https:") return jsonError(400, "Mastodon server must use https");
      credentials.server = url.origin;
    } catch {
      return jsonError(400, "Mastodon server must be a valid URL");
    }
  }

  try {
    const [row] = await db
      .insert(connections)
      .values({
        userId: session.user.id,
        provider: body.data.provider,
        label: body.data.label ?? "default",
        account: await resolveConnectionAccount(body.data.provider, credentials),
        // Stored as a compact JWE — plaintext never touches the database.
        credentials: await encryptCredentials(credentials),
      })
      .returning({
        id: connections.id,
        provider: connections.provider,
        label: connections.label,
        account: connections.account,
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
