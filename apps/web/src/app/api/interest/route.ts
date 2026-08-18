import { interestSignups } from "@shome/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { parseBody } from "#/server/api";
import { getDb } from "#/server/db";

const interestSchema = z
  .object({
    email: z.email().trim().toLowerCase(),
    waitlist: z.boolean(),
    newsletter: z.boolean(),
  })
  .refine((value) => value.waitlist || value.newsletter, {
    message: "choose the waitlist, the newsletter, or both",
  });

/** Public endpoint for pre-launch interest; this deliberately does not create an account. */
export async function POST(request: Request) {
  const body = await parseBody(request, interestSchema);
  if (!body.ok) return body.res;

  const db = await getDb();
  await db
    .insert(interestSignups)
    .values(body.data)
    .onConflictDoUpdate({
      target: interestSignups.email,
      // Re-submitting is additive: a visitor can opt into the other list without
      // accidentally removing an earlier choice.
      set: {
        waitlist: sql`${interestSignups.waitlist} OR excluded.waitlist`,
        newsletter: sql`${interestSignups.newsletter} OR excluded.newsletter`,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ ok: true });
}
