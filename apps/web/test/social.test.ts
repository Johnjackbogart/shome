import { type Db, follows, openDatabase, user } from "@shome/db";
import { eq } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import { followPerson, searchPeople, socialGraph, unfollowPerson } from "../src/server/social";

let db: Db;

beforeAll(async () => {
  db = await openDatabase({ pgliteDir: ":memory:" });
  await db.insert(user).values([
    {
      id: "social-alice",
      name: "Alice Example",
      email: "social-alice@example.com",
      username: "alice",
    },
    { id: "social-bob", name: "Robert Pine", email: "social-bob@example.com", username: "bobby" },
    { id: "social-bee", name: "Bea Jones", email: "social-bee@example.com", username: "bea" },
    { id: "social-private", name: "Unlisted", email: "social-private@example.com" },
  ]);
});

describe("shome social graph", () => {
  it("finds public members by handle or display name without returning the viewer", async () => {
    await expect(searchPeople(db, "social-alice", "@bobby")).resolves.toEqual([
      expect.objectContaining({ id: "social-bob", handle: "bobby", isFollowing: false }),
    ]);
    await expect(searchPeople(db, "social-alice", "Bea")).resolves.toEqual([
      expect.objectContaining({ id: "social-bee", handle: "bea", isFollowing: false }),
    ]);
    await expect(searchPeople(db, "social-alice", "alice")).resolves.toEqual([]);
    await expect(searchPeople(db, "social-alice", "Unlisted")).resolves.toEqual([]);
  });

  it("creates a single directed follow and reports it to both people", async () => {
    await expect(followPerson(db, "social-alice", "social-alice")).resolves.toBeNull();

    const created = await followPerson(db, "social-alice", "social-bob");
    expect(created).toMatchObject({
      created: true,
      person: { id: "social-bob", handle: "bobby", displayName: "Robert Pine" },
    });
    await expect(followPerson(db, "social-alice", "social-bob")).resolves.toMatchObject({
      created: false,
    });

    await expect(searchPeople(db, "social-alice", "bobby")).resolves.toEqual([
      expect.objectContaining({ id: "social-bob", isFollowing: true }),
    ]);
    await expect(socialGraph(db, "social-alice")).resolves.toMatchObject({
      followerCount: 0,
      followingCount: 1,
      followers: [],
      following: [expect.objectContaining({ id: "social-bob", handle: "bobby" })],
    });
    await expect(socialGraph(db, "social-bob")).resolves.toMatchObject({
      followerCount: 1,
      followingCount: 0,
      followers: [expect.objectContaining({ id: "social-alice", handle: "alice" })],
    });
  });

  it("removes a follow idempotently", async () => {
    await unfollowPerson(db, "social-alice", "social-bob");
    await unfollowPerson(db, "social-alice", "social-bob");

    await expect(
      db.select().from(follows).where(eq(follows.followerId, "social-alice")),
    ).resolves.toEqual([]);
    await expect(socialGraph(db, "social-bob")).resolves.toMatchObject({
      followerCount: 0,
      followers: [],
    });
  });
});
