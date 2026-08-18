import { products } from "@shome/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jsonError, parseBody, UUID_RE } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { getDb } from "#/server/db";
import { updateProductSchema } from "#/server/products";

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return jsonError(404, "unknown product");
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const body = await parseBody(req, updateProductSchema);
  if (!body.ok) return body.res;
  const db = await getDb();
  const [product] = await db
    .update(products)
    .set({ ...body.data, updatedAt: new Date() })
    .where(and(eq(products.id, id), eq(products.userId, session.user.id)))
    .returning();
  if (!product) return jsonError(404, "unknown product");
  return NextResponse.json({ product });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID_RE.test(id)) return jsonError(404, "unknown product");
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");
  const db = await getDb();
  const [product] = await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.userId, session.user.id)))
    .returning({ id: products.id });
  if (!product) return jsonError(404, "unknown product");
  return NextResponse.json({ ok: true });
}
