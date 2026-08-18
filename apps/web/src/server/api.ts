import { NextResponse } from "next/server";
import type { z } from "zod";

export function jsonError(status: number, message: string): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

export type ParsedBody<T> = { ok: true; data: T } | { ok: false; res: NextResponse };

export async function parseBody<Schema extends z.ZodType>(
  req: Request,
  schema: Schema,
): Promise<ParsedBody<z.infer<Schema>>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return { ok: false, res: jsonError(400, "invalid JSON body") };
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) =>
        issue.path.length ? `${issue.path.join(".")}: ${issue.message}` : issue.message,
      )
      .join("; ");
    return { ok: false, res: jsonError(400, message) };
  }
  return { ok: true, data: parsed.data };
}

/** Postgres unique_violation, possibly wrapped by the driver or ORM. */
export function isUniqueViolation(err: unknown): boolean {
  let current = err as { code?: unknown; cause?: unknown } | null | undefined;
  for (let depth = 0; current && depth < 4; depth++) {
    if (current.code === "23505") return true;
    current = current.cause as { code?: unknown; cause?: unknown } | null | undefined;
  }
  return false;
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Wrap a person's search text in a case-insensitive "contains" pattern, with
 * the LIKE wildcards they typed escaped so `100%` matches the literal text
 * rather than every row.
 */
export function containsPattern(term: string): string {
  return `%${term.replace(/[\\%_]/g, (ch) => `\\${ch}`)}%`;
}
