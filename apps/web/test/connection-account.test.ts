import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveConnectionAccount } from "../src/server/connection-account";

afterEach(() => vi.unstubAllGlobals());

describe("connection accounts", () => {
  it("names a Bluesky connection from its handle, but not from an email login", async () => {
    await expect(
      resolveConnectionAccount("bluesky", { identifier: " @alice.bsky.social ", appPassword: "x" }),
    ).resolves.toBe("alice.bsky.social");
    await expect(
      resolveConnectionAccount("bluesky", { identifier: "alice@example.com", appPassword: "x" }),
    ).resolves.toBeNull();
    await expect(resolveConnectionAccount("bluesky", {})).resolves.toBeNull();
  });

  it("asks a Mastodon instance who the token belongs to and qualifies the account", async () => {
    const fetch = vi.fn(async () => Response.json({ acct: "alice" }));
    vi.stubGlobal("fetch", fetch);

    await expect(
      resolveConnectionAccount("mastodon", {
        server: "https://mastodon.social",
        accessToken: "token",
      }),
    ).resolves.toBe("@alice@mastodon.social");

    const [url, init] = fetch.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://mastodon.social/api/v1/accounts/verify_credentials");
    expect((init as RequestInit | undefined)?.headers).toMatchObject({
      authorization: "Bearer token",
    });
  });

  it("keeps an already-qualified remote Mastodon account as it is", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ acct: "alice@elsewhere.example" })),
    );
    await expect(
      resolveConnectionAccount("mastodon", {
        server: "https://mastodon.social",
        accessToken: "token",
      }),
    ).resolves.toBe("@alice@elsewhere.example");
  });

  it("leaves a connection unnamed rather than failing when the instance refuses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 403 })),
    );
    await expect(
      resolveConnectionAccount("mastodon", {
        server: "https://mastodon.social",
        accessToken: "token",
      }),
    ).resolves.toBeNull();

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );
    await expect(
      resolveConnectionAccount("mastodon", {
        server: "https://mastodon.social",
        accessToken: "token",
      }),
    ).resolves.toBeNull();
  });

  it("never contacts a non-https or private Mastodon server", async () => {
    const fetch = vi.fn(async () => Response.json({ acct: "alice" }));
    vi.stubGlobal("fetch", fetch);

    await expect(
      resolveConnectionAccount("mastodon", {
        server: "http://mastodon.social",
        accessToken: "token",
      }),
    ).resolves.toBeNull();
    await expect(
      resolveConnectionAccount("mastodon", { server: "https://127.0.0.1", accessToken: "token" }),
    ).resolves.toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("has no account to show for a provider that is only an API key", async () => {
    await expect(resolveConnectionAccount("youtube", { apiKey: "k" })).resolves.toBeNull();
  });
});
