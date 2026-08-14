import { eq, sql } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import {
  type Db,
  interestSignups,
  items,
  openDatabase,
  products,
  sources,
  subscriptions,
  user,
} from "../src/index";

// Boots an in-memory PGlite database and runs the real migrations against it,
// so this test fails if the generated migrations drift from the schema.
let db: Db;

beforeAll(async () => {
  db = await openDatabase({ pgliteDir: ":memory:" });
});

describe("schema + migrations", () => {
  it("inserts and reads across the core tables", async () => {
    const [alice] = await db
      .insert(user)
      .values({
        id: "user_alice",
        name: "Alice",
        email: "a@example.com",
        username: "alice",
      })
      .returning();
    expect(alice).toBeDefined();
    if (!alice) throw new Error("unreachable");

    const [source] = await db
      .insert(sources)
      .values({
        kind: "rss",
        canonicalKey: "rss:https://example.com/feed.xml",
        config: { url: "https://example.com/feed.xml" },
      })
      .returning();
    if (!source) throw new Error("unreachable");

    await db.insert(subscriptions).values({ userId: alice.id, sourceId: source.id });

    await db.insert(items).values({
      sourceId: source.id,
      externalId: "item-1",
      title: "hello",
      media: [{ type: "image", url: "https://example.com/x.png" }],
      publishedAt: new Date("2026-01-01T00:00:00Z"),
    });

    const rows = await db
      .select({ title: items.title, media: items.media })
      .from(items)
      .innerJoin(subscriptions, eq(items.sourceId, subscriptions.sourceId))
      .where(eq(subscriptions.userId, alice.id));
    expect(rows).toHaveLength(1);
    expect(rows[0]?.title).toBe("hello");
    expect(rows[0]?.media).toEqual([{ type: "image", url: "https://example.com/x.png" }]);
  });

  it("dedupes items on (sourceId, externalId)", async () => {
    const [source] = await db
      .insert(sources)
      .values({
        kind: "rss",
        canonicalKey: "rss:https://example.com/other.xml",
        config: { url: "https://example.com/other.xml" },
      })
      .returning();
    if (!source) throw new Error("unreachable");

    const row = { sourceId: source.id, externalId: "dup", title: "first" };
    await db.insert(items).values(row);
    await db
      .insert(items)
      .values({ ...row, title: "second" })
      .onConflictDoNothing({ target: [items.sourceId, items.externalId] });

    const rows = await db.select().from(items).where(eq(items.sourceId, source.id));
    expect(rows).toHaveLength(1);
    expect(rows[0]?.title).toBe("first");
  });

  it("stores waitlist and newsletter interest once per email", async () => {
    const email = "early@example.com";
    await db.insert(interestSignups).values({ email, waitlist: true, newsletter: false });
    await db
      .insert(interestSignups)
      .values({ email, waitlist: false, newsletter: true })
      .onConflictDoUpdate({
        target: interestSignups.email,
        set: {
          waitlist: sql`${interestSignups.waitlist} OR excluded.waitlist`,
          newsletter: sql`${interestSignups.newsletter} OR excluded.newsletter`,
          updatedAt: new Date(),
        },
      });

    const [signup] = await db
      .select()
      .from(interestSignups)
      .where(eq(interestSignups.email, email));
    expect(signup).toMatchObject({ email, waitlist: true, newsletter: true });
  });

  it("stores a creator-owned product catalog", async () => {
    const [product] = await db
      .insert(products)
      .values({
        userId: "user_alice",
        title: "Small print",
        price: "$20 CAD",
        checkoutUrl: "https://checkout.example.com/print",
      })
      .returning();
    expect(product).toMatchObject({ title: "Small print", visible: true, sortOrder: 0 });
  });
});
