import { count, desc, eq, inArray, sql } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import {
  type Db,
  interestSignups,
  items,
  mediaUploads,
  openDatabase,
  postMedia,
  posts,
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

    const [post] = await db
      .insert(posts)
      .values({ userId: alice.id, text: "a post with a photo" })
      .returning();
    if (!post) throw new Error("unreachable");
    const [attachment] = await db
      .insert(postMedia)
      .values({
        id: "8c1fc5bc-7813-46bd-b351-569abcb9950f",
        postId: post.id,
        type: "image",
        contentType: "image/jpeg",
        byteSize: 42,
        originalName: "photo.jpg",
      })
      .returning();
    expect(attachment).toMatchObject({ postId: post.id, type: "image" });

    const [upload] = await db
      .insert(mediaUploads)
      .values({
        id: "20c33cef-abb9-48a1-9f7a-77cb56c2655e",
        userId: alice.id,
        type: "video",
        contentType: "video/mp4",
        byteSize: 123,
        originalName: "clip.mp4",
        provider: "cloudflare_stream",
        providerAssetId: "cloudflare-video-123",
      })
      .returning();
    expect(upload).toMatchObject({
      status: "uploading",
      provider: "cloudflare_stream",
    });
    if (!attachment || !upload) throw new Error("unreachable");

    const userWithRelations = await db.query.user.findFirst({
      where: eq(user.id, alice.id),
      with: {
        subscriptions: { with: { source: true } },
        posts: { with: { media: true } },
        mediaUploads: true,
      },
    });
    expect(userWithRelations?.subscriptions[0]?.source.id).toBe(source.id);
    expect(userWithRelations?.posts[0]?.media[0]?.id).toBe(attachment.id);
    expect(userWithRelations?.mediaUploads[0]?.id).toBe(upload.id);
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

  it("ranks shared RSS sources by aggregate subscription count", async () => {
    const [one, two] = await db
      .insert(user)
      .values([
        { id: "user_rss_rank_one", name: "One", email: "rank-one@example.com" },
        { id: "user_rss_rank_two", name: "Two", email: "rank-two@example.com" },
      ])
      .returning();
    if (!one || !two) throw new Error("unreachable");

    const [popular, lessPopular] = await db
      .insert(sources)
      .values([
        {
          kind: "rss",
          canonicalKey: "rss:https://rank.example.com/popular.xml",
          config: { url: "https://rank.example.com/popular.xml" },
          title: "Popular",
        },
        {
          kind: "rss",
          canonicalKey: "rss:https://rank.example.com/less-popular.xml",
          config: { url: "https://rank.example.com/less-popular.xml" },
          title: "Less popular",
        },
      ])
      .returning();
    if (!popular || !lessPopular) throw new Error("unreachable");

    await db.insert(subscriptions).values([
      { userId: one.id, sourceId: popular.id },
      { userId: two.id, sourceId: popular.id },
      { userId: one.id, sourceId: lessPopular.id },
    ]);

    const subscriberCount = count(subscriptions.userId);
    const rows = await db
      .select({ source: sources, subscriberCount })
      .from(sources)
      .innerJoin(subscriptions, eq(subscriptions.sourceId, sources.id))
      .where(inArray(sources.id, [popular.id, lessPopular.id]))
      .groupBy(sources.id)
      .orderBy(desc(subscriberCount), sources.title, sources.canonicalKey);

    expect(rows.map((row) => [row.source.title, row.subscriberCount])).toEqual([
      ["Popular", 2],
      ["Less popular", 1],
    ]);
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
