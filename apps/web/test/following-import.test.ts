import { connections, type Db, openDatabase, sources, subscriptions, user } from "@shome/db";
import { eq } from "drizzle-orm";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const { bluesky } = vi.hoisted(() => ({
  bluesky: {
    login: vi.fn(),
    getFollows: vi.fn(),
  },
}));
const { lookup } = vi.hoisted(() => ({ lookup: vi.fn() }));

vi.mock("@atproto/api", () => ({
  AtpAgent: class {
    login = bluesky.login;
    getFollows = bluesky.getFollows;
  },
}));
vi.mock("node:dns/promises", () => ({ lookup }));

import { importFollowingSources } from "../src/server/following-import";

let db: Db;

beforeAll(async () => {
  db = await openDatabase({ pgliteDir: ":memory:" });
});

beforeEach(() => {
  lookup.mockResolvedValue([{ address: "93.184.216.34" }]);
  bluesky.login.mockReset();
  bluesky.getFollows.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function linkedConnection(provider: "bluesky" | "mastodon", suffix: string) {
  const [person] = await db
    .insert(user)
    .values({
      id: `following-import-${suffix}`,
      name: "Importer",
      email: `following-import-${suffix}@example.com`,
    })
    .returning();
  if (!person) throw new Error("failed to create user");
  const [connection] = await db
    .insert(connections)
    .values({ userId: person.id, provider, label: "default", credentials: "encrypted" })
    .returning();
  if (!connection) throw new Error("failed to create connection");
  return { person, connection };
}

describe("following import", () => {
  it("paginates Bluesky follows into stable author sources and is idempotent", async () => {
    const { person, connection } = await linkedConnection("bluesky", "bsky");
    bluesky.login.mockResolvedValue({ data: { did: "did:plc:owner" } });
    bluesky.getFollows
      .mockResolvedValueOnce({
        data: {
          follows: [{ did: "did:plc:alice", handle: "Alice.Bsky.Social" }],
          cursor: "next-page",
        },
      })
      .mockResolvedValueOnce({
        data: {
          follows: [
            { did: "did:plc:alice", handle: "alice-renamed.bsky.social" },
            { did: "did:plc:bob", handle: "bob.bsky.social" },
          ],
        },
      });

    await expect(
      importFollowingSources(db, person.id, connection, {
        identifier: "owner.bsky.social",
        appPassword: "app-password",
      }),
    ).resolves.toEqual({ imported: 2, alreadySubscribed: 0 });

    expect(bluesky.login).toHaveBeenCalledWith({
      identifier: "owner.bsky.social",
      password: "app-password",
    });
    expect(bluesky.getFollows).toHaveBeenNthCalledWith(1, {
      actor: "did:plc:owner",
      limit: 100,
    });
    expect(bluesky.getFollows).toHaveBeenNthCalledWith(2, {
      actor: "did:plc:owner",
      limit: 100,
      cursor: "next-page",
    });

    const imported = await db
      .select({ config: sources.config, connectionId: subscriptions.connectionId })
      .from(subscriptions)
      .innerJoin(sources, eq(subscriptions.sourceId, sources.id))
      .where(eq(subscriptions.userId, person.id));
    expect(imported).toEqual(
      expect.arrayContaining([
        {
          config: { mode: "author", actor: "alice.bsky.social", did: "did:plc:alice" },
          connectionId: connection.id,
        },
        {
          config: { mode: "author", actor: "bob.bsky.social", did: "did:plc:bob" },
          connectionId: connection.id,
        },
      ]),
    );

    bluesky.getFollows.mockReset().mockResolvedValue({
      data: {
        follows: [
          { did: "did:plc:alice", handle: "alice-renamed.bsky.social" },
          { did: "did:plc:bob", handle: "bob.bsky.social" },
        ],
      },
    });
    await expect(
      importFollowingSources(db, person.id, connection, {
        identifier: "owner.bsky.social",
        appPassword: "app-password",
      }),
    ).resolves.toEqual({ imported: 0, alreadySubscribed: 2 });
  });

  it("paginates Mastodon follows and stores each account's status endpoint", async () => {
    const { person, connection } = await linkedConnection("mastodon", "mastodon");
    const fetch = vi.fn(async (rawUrl: string) => {
      const url = new URL(rawUrl);
      if (url.pathname === "/api/v1/accounts/verify_credentials") {
        return Response.json({ id: "owner", acct: "owner" });
      }
      if (url.searchParams.has("max_id")) {
        return Response.json([{ id: "3", acct: "carol@remote.example" }]);
      }
      return Response.json(
        [
          { id: "1", acct: "alice" },
          { id: "2", acct: "bob@remote.example" },
        ],
        {
          headers: {
            link: '<https://mastodon.social/api/v1/accounts/owner/following?max_id=3&limit=80>; rel="next"',
          },
        },
      );
    });
    vi.stubGlobal("fetch", fetch);

    await expect(
      importFollowingSources(db, person.id, connection, {
        server: "https://mastodon.social",
        accessToken: "token",
      }),
    ).resolves.toEqual({ imported: 3, alreadySubscribed: 0 });

    const imported = await db
      .select({ config: sources.config, connectionId: subscriptions.connectionId })
      .from(subscriptions)
      .innerJoin(sources, eq(subscriptions.sourceId, sources.id))
      .where(eq(subscriptions.userId, person.id));
    expect(imported).toEqual(
      expect.arrayContaining([
        {
          config: {
            mode: "account",
            server: "https://mastodon.social",
            account: "alice@mastodon.social",
            accountId: "1",
          },
          connectionId: connection.id,
        },
        {
          config: {
            mode: "account",
            server: "https://mastodon.social",
            account: "bob@remote.example",
            accountId: "2",
          },
          connectionId: connection.id,
        },
        {
          config: {
            mode: "account",
            server: "https://mastodon.social",
            account: "carol@remote.example",
            accountId: "3",
          },
          connectionId: connection.id,
        },
      ]),
    );
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
