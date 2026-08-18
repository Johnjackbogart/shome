import type { PeopleSearchResult, SocialGraphView, SocialUserView } from "@shome/core";
import { type Db, follows, user } from "@shome/db";
import { and, asc, count, desc, eq, ilike, inArray, isNotNull, ne, or } from "drizzle-orm";
import { containsPattern } from "./api";

const PEOPLE_LIMIT = 20;
const RELATIONSHIP_LIST_LIMIT = 50;

type UserRow = {
  id: string;
  handle: string | null;
  displayName: string | null;
  image: string | null;
};

function socialUser(row: UserRow): SocialUserView | null {
  if (!row.handle) return null;
  return {
    id: row.id,
    handle: row.handle,
    displayName: row.displayName,
    image: row.image,
  };
}

/** Finds public shome accounts by handle or display name for the signed-in person. */
export async function searchPeople(
  db: Db,
  viewerId: string,
  rawQuery: string,
): Promise<PeopleSearchResult[]> {
  const query = rawQuery.trim().replace(/^@+/, "");
  if (!query) return [];

  const pattern = containsPattern(query);
  const people = await db
    .select({
      id: user.id,
      handle: user.username,
      displayName: user.name,
      image: user.image,
    })
    .from(user)
    .where(
      and(
        isNotNull(user.username),
        ne(user.id, viewerId),
        or(ilike(user.username, pattern), ilike(user.name, pattern)),
      ),
    )
    .orderBy(asc(user.username))
    .limit(PEOPLE_LIMIT);

  if (!people.length) return [];
  const following = await db
    .select({ followingId: follows.followingId })
    .from(follows)
    .where(
      and(
        eq(follows.followerId, viewerId),
        inArray(
          follows.followingId,
          people.map((person) => person.id),
        ),
      ),
    );
  const followingIds = new Set(following.map((relationship) => relationship.followingId));

  return people.flatMap((person) => {
    const view = socialUser(person);
    return view ? [{ ...view, isFollowing: followingIds.has(view.id) }] : [];
  });
}

/** Returns the signed-in person's follower and following summaries. */
export async function socialGraph(db: Db, viewerId: string): Promise<SocialGraphView> {
  const [[followerTotal], [followingTotal], followerRows, followingRows] = await Promise.all([
    db
      .select({ total: count(follows.followerId) })
      .from(follows)
      .where(eq(follows.followingId, viewerId)),
    db
      .select({ total: count(follows.followingId) })
      .from(follows)
      .where(eq(follows.followerId, viewerId)),
    db
      .select({
        id: user.id,
        handle: user.username,
        displayName: user.name,
        image: user.image,
      })
      .from(follows)
      .innerJoin(user, eq(follows.followerId, user.id))
      .where(eq(follows.followingId, viewerId))
      .orderBy(desc(follows.createdAt), asc(user.username))
      .limit(RELATIONSHIP_LIST_LIMIT),
    db
      .select({
        id: user.id,
        handle: user.username,
        displayName: user.name,
        image: user.image,
      })
      .from(follows)
      .innerJoin(user, eq(follows.followingId, user.id))
      .where(eq(follows.followerId, viewerId))
      .orderBy(desc(follows.createdAt), asc(user.username))
      .limit(RELATIONSHIP_LIST_LIMIT),
  ]);

  return {
    followerCount: Number(followerTotal?.total ?? 0),
    followingCount: Number(followingTotal?.total ?? 0),
    followers: followerRows.flatMap((person) => {
      const view = socialUser(person);
      return view ? [view] : [];
    }),
    following: followingRows.flatMap((person) => {
      const view = socialUser(person);
      return view ? [view] : [];
    }),
  };
}

/**
 * Makes an idempotent follow relationship. The target must have a public
 * handle so every relationship created here can be surfaced in Discover.
 */
export async function followPerson(
  db: Db,
  followerId: string,
  followingId: string,
): Promise<{ person: SocialUserView; created: boolean } | null> {
  if (followerId === followingId) return null;
  const [target] = await db
    .select({
      id: user.id,
      handle: user.username,
      displayName: user.name,
      image: user.image,
    })
    .from(user)
    .where(and(eq(user.id, followingId), isNotNull(user.username)))
    .limit(1);
  const person = target ? socialUser(target) : null;
  if (!person) return null;

  const created = await db
    .insert(follows)
    .values({ followerId, followingId })
    .onConflictDoNothing()
    .returning({ followingId: follows.followingId });
  return { person, created: created.length > 0 };
}

/** Removes a relationship without treating an already-unfollowed person as an error. */
export async function unfollowPerson(
  db: Db,
  followerId: string,
  followingId: string,
): Promise<void> {
  await db
    .delete(follows)
    .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
}
