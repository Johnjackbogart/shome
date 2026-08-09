import { ConnectorConfigError } from "@shome/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mastodonConnector, stripHtml } from "../src/index";

afterEach(() => {
  vi.unstubAllGlobals();
});

const statuses = [
  {
    id: "101",
    url: "https://mastodon.example/@amy/101",
    content: '<p>Hello <a href="https://mastodon.example/tags/world">#world</a> &amp; friends</p>',
    created_at: "2026-08-01T10:00:00.000Z",
    account: {
      display_name: "Amy",
      acct: "amy",
      avatar: "https://mastodon.example/a.png",
    },
    media_attachments: [
      {
        type: "gifv",
        url: "https://files.example/clip.mp4",
        description: "a clip",
      },
      {
        type: "image",
        url: null,
        preview_url: "https://files.example/prev.png",
      },
    ],
    reblog: null,
  },
  {
    id: "102",
    url: "https://mastodon.example/@bob/102",
    content: "",
    created_at: "2026-08-02T10:00:00.000Z",
    account: { display_name: "Bob", acct: "bob", avatar: "" },
    media_attachments: [],
    reblog: {
      id: "90",
      url: "https://other.example/@carol/90",
      content: "<p>original toot</p>",
      created_at: "2026-07-30T10:00:00.000Z",
      account: {
        display_name: "Carol",
        acct: "carol@other.example",
        avatar: "",
      },
      media_attachments: [],
      reblog: null,
    },
  },
];

describe("mastodonConnector.parseConfig", () => {
  it("normalizes server to an origin and hashtags to bare lowercase", () => {
    const config = mastodonConnector.parseConfig({
      server: "mastodon.social/some/path",
      mode: "hashtag",
      hashtag: "#TypeScript",
    });
    expect(config).toEqual({
      server: "https://mastodon.social",
      mode: "hashtag",
      hashtag: "typescript",
    });
    expect(mastodonConnector.canonicalKey(config)).toBe("mastodon:mastodon.social:tag:typescript");
  });

  it("requires an account for home mode so canonical keys stay per-user", () => {
    expect(() =>
      mastodonConnector.parseConfig({
        server: "mastodon.social",
        mode: "home",
      }),
    ).toThrow(ConnectorConfigError);
    const config = mastodonConnector.parseConfig({
      server: "mastodon.social",
      mode: "home",
      account: "@Me@mastodon.social",
    });
    expect(mastodonConnector.canonicalKey(config)).toBe(
      "mastodon:mastodon.social:home:me@mastodon.social",
    );
  });
});

describe("mastodonConnector.fetchLatest", () => {
  it("normalizes statuses and unwraps boosts", async () => {
    const fetchMock = vi.fn(async () => Response.json(statuses));
    vi.stubGlobal("fetch", fetchMock);

    const config = mastodonConnector.parseConfig({
      server: "mastodon.example",
      mode: "public",
    });
    const result = await mastodonConnector.fetchLatest(config, {});

    expect(fetchMock).toHaveBeenCalledWith(
      "https://mastodon.example/api/v1/timelines/public?limit=40",
      expect.anything(),
    );
    expect(result.sourceTitle).toBe("Public timeline · mastodon.example");

    const [plain, boost] = result.items;
    expect(plain?.externalId).toBe("101");
    expect(plain?.author?.handle).toBe("amy");
    expect(plain?.text).toBe("Hello #world & friends");
    expect(plain?.media).toEqual([
      { type: "video", url: "https://files.example/clip.mp4", alt: "a clip" },
      { type: "image", url: "https://files.example/prev.png", alt: undefined },
    ]);

    // Boost: outer id (so re-fetches dedupe), inner author/content/url
    expect(boost?.externalId).toBe("102");
    expect(boost?.author?.handle).toBe("carol@other.example");
    expect(boost?.html).toBe("<p>original toot</p>");
    expect(boost?.url).toBe("https://other.example/@carol/90");
  });

  it("refuses home mode without an access token", async () => {
    const config = mastodonConnector.parseConfig({
      server: "mastodon.example",
      mode: "home",
      account: "me@mastodon.example",
    });
    await expect(mastodonConnector.fetchLatest(config, {})).rejects.toThrow("accessToken");
  });
});

describe("stripHtml", () => {
  it("turns paragraphs and breaks into whitespace and decodes entities", () => {
    expect(stripHtml("<p>one</p><p>two&nbsp;<br>three &lt;ok&gt;</p>".replace("&nbsp;", " "))).toBe(
      "one\n\ntwo \nthree <ok>",
    );
  });
});
