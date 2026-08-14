import { products } from "@shome/db";
import { asc, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError, parseBody } from "@/server/api";
import { getSessionOrNull } from "@/server/auth";
import { getDb } from "@/server/db";
import { createProductSchema } from "@/server/products";

export async function GET() {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.userId, session.user.id))
    .orderBy(asc(products.sortOrder), desc(products.createdAt));
  return NextResponse.json({ products: rows });
}

export async function POST(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, createProductSchema);
  if (!body.ok) return body.res;
  const db = await getDb();
  const [product] = await db
    .insert(products)
    .values({ userId: session.user.id, ...body.data })
    .returning();
  return NextResponse.json({ product }, { status: 201 });
}
