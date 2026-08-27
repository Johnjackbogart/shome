/**
 * The world both seeders write: eleven accounts with their styles, posts,
 * subscriptions and saved feeds, plus the sources they subscribe to and the
 * items already fetched from them.
 *
 * It lives apart from the two scripts so a change to the cast is a change in
 * one file. seed.mts writes it straight to the database; seed-http.mts drives
 * the running app's API with it, and ignores the parts no endpoint exposes.
 */

import {
  type AppStyle,
  DEFAULT_APP_STYLE,
  DEFAULT_POST_STYLE,
  type FeedRules,
  type MediaRef,
  type PostStyle,
  type SourceKind,
} from "@shome/core";

/** The password every seeded account signs in with. */
export const PASSWORD = "testtest";

// ---------------------------------------------------------------------------
// Shapes of the data tables below
// ---------------------------------------------------------------------------

export interface SeedPost {
  text: string;
  hoursAgo: number;
  /**
   * Styling chosen for this one post. The API resolves a post's style at write
   * time — author's saved style, then whatever the composer overrode — and
   * stores the result, so seeded posts carry a full style too, never nulls.
   */
  style?: Partial<PostStyle>;
  crossPostedTo?: ("bluesky" | "mastodon")[];
}

export interface SeedFeed {
  name: string;
  rules: FeedRules;
  /** Seed-source slugs, resolved to real ids and merged into `rules.sourceIds`. */
  ruleSources?: string[];
}

export interface SeedSubscription {
  source: string;
  customTitle?: string;
}

export interface SeedUser {
  handle: string;
  displayName: string;
  /**
   * Written out in full for every account. The columns are nullable and the
   * app falls back to DEFAULT_POST_STYLE when they are null, but a seeded
   * account should never sit in that half-configured state.
   */
  style: PostStyle;
  /**
   * The signed-in chrome, also written out in full. These columns are NOT NULL
   * with database defaults, so omitting them would still produce a working
   * row — but then the seed would not say what style an account has.
   */
  appStyle: AppStyle;
  /** Empty renders the default profile: every read path goes through profileHtmlOrDefault. */
  profileHtml?: string;
  subscriptions: SeedSubscription[];
  feeds?: SeedFeed[];
  posts: SeedPost[];
}

export interface SeedItem {
  /** What the connector would dedupe on: an RSS guid, an at:// uri, a status id. */
  externalId: string;
  url: string;
  title?: string;
  text: string;
  authorName?: string;
  authorHandle?: string;
  media?: MediaRef[];
  hoursAgo: number;
}

export interface SeedSource {
  slug: string;
  kind: SourceKind;
  /** Raw config, passed through the real connector so keys match the app's own rows. */
  config: Record<string, unknown>;
  /** The name the feed itself reported. */
  title: string;
  /** Set on one source so the "cant fetch from source" state has a subject. */
  failing?: boolean;
  items: SeedItem[];
}

// ---------------------------------------------------------------------------
// Post styles — one palette per account
// ---------------------------------------------------------------------------

const PAPER: PostStyle = {
  postBorderStyle: "#d9cfae",
  postBorderRadius: "8px",
  postBorderLineStyle: "solid",
  postBackgroundColor: "#fdf6e3",
  postFont: "serif",
  postFontColor: "#073642",
  postSecondaryTextColor: "#657b83",
};

const TERMINAL: PostStyle = {
  postBorderStyle: "#1f3d2b",
  postBorderRadius: "0px",
  postBorderLineStyle: "dashed",
  postBackgroundColor: "#0b0f0a",
  postFont: "monospace",
  postFontColor: "#7ef29d",
  postSecondaryTextColor: "#3f9c62",
};

const BLOSSOM: PostStyle = {
  postBorderStyle: "#f0a6bd",
  postBorderRadius: "24px",
  postBorderLineStyle: "solid",
  postBackgroundColor: "#fff1f5",
  postFont: "sans-serif",
  postFontColor: "#6b1f3a",
  postSecondaryTextColor: "#b06f88",
};

const NOTEBOOK: PostStyle = {
  postBorderStyle: "#475569",
  postBorderRadius: "8px",
  postBorderLineStyle: "dotted",
  postBackgroundColor: "#1e293b",
  postFont: "serif",
  postFontColor: "#e2e8f0",
  postSecondaryTextColor: "#94a3b8",
};

const CITRUS: PostStyle = {
  postBorderStyle: "#fbbf24",
  postBorderRadius: "16px",
  postBorderLineStyle: "solid",
  postBackgroundColor: "#fffbeb",
  postFont: "sans-serif",
  postFontColor: "#7c2d12",
  postSecondaryTextColor: "#b45309",
};

const DEEP_SEA: PostStyle = {
  postBorderStyle: "#0f766e",
  postBorderRadius: "24px",
  postBorderLineStyle: "dashed",
  postBackgroundColor: "#042f2e",
  postFont: "sans-serif",
  postFontColor: "#ccfbf1",
  postSecondaryTextColor: "#5eead4",
};

const NEWSPRINT: PostStyle = {
  postBorderStyle: "#a8a29e",
  postBorderRadius: "0px",
  postBorderLineStyle: "solid",
  postBackgroundColor: "#f5f5f4",
  postFont: "serif",
  postFontColor: "#1c1917",
  postSecondaryTextColor: "#57534e",
};

const NEON: PostStyle = {
  postBorderStyle: "#7e22ce",
  postBorderRadius: "16px",
  postBorderLineStyle: "dotted",
  postBackgroundColor: "#1a0b2e",
  postFont: "monospace",
  postFontColor: "#f0abfc",
  postSecondaryTextColor: "#a855f7",
};

const FOREST: PostStyle = {
  postBorderStyle: "#86efac",
  postBorderRadius: "8px",
  postBorderLineStyle: "solid",
  postBackgroundColor: "#f0fdf4",
  postFont: "sans-serif",
  postFontColor: "#14532d",
  postSecondaryTextColor: "#4d7c0f",
};

// ---------------------------------------------------------------------------
// App styles — the signed-in chrome, which is a separate choice from post
// styles. Most accounts run the shipped default; a few are customized so the
// feature has something to show, including the two settings with no equivalent
// on the post side: `appSpacing`, and `appOverridePostStyles`.
// ---------------------------------------------------------------------------

const APP_DEFAULT: AppStyle = { ...DEFAULT_APP_STYLE };

const APP_PAPER: AppStyle = {
  appBackgroundColor: "#f6f1e7",
  appSecondaryBackgroundColor: "#fdf6e3",
  appAccentBackgroundColor: "#eee8d5",
  appAccentColor: "#b58900",
  appSecondaryAccentColor: "#cb4b16",
  appBorderStyle: "#d9cfae",
  appBorderRadius: "8px",
  appBorderLineStyle: "solid",
  appFont: "serif",
  appFontColor: "#073642",
  appAccentFontColor: "#b58900",
  appSecondaryTextColor: "#657b83",
  appSpacing: "20px",
  appOverridePostStyles: false,
};

const APP_TERMINAL: AppStyle = {
  appBackgroundColor: "#000000",
  appSecondaryBackgroundColor: "#aaaaaa",
  appAccentBackgroundColor: "#071a0d",
  appAccentColor: "#22c55e",
  appSecondaryAccentColor: "#84cc16",
  appBorderStyle: "#1f3d2b",
  appBorderRadius: "0px",
  appBorderLineStyle: "dashed",
  appFont: "monospace",
  appFontColor: "#7ef29d",
  appAccentFontColor: "#22c55e",
  appSecondaryTextColor: "#3f9c62",
  appSpacing: "4px",
  appOverridePostStyles: false,
};

/** The one account that flattens every post into its own chrome. */
const APP_DEEP_SEA: AppStyle = {
  appBackgroundColor: "#021d1c",
  appSecondaryBackgroundColor: "#042f2e",
  appAccentBackgroundColor: "#073b3a",
  appAccentColor: "#14b8a6",
  appSecondaryAccentColor: "#06b6d4",
  appBorderStyle: "#0f766e",
  appBorderRadius: "24px",
  appBorderLineStyle: "solid",
  appFont: "sans-serif",
  appFontColor: "#ccfbf1",
  appAccentFontColor: "#14b8a6",
  appSecondaryTextColor: "#5eead4",
  appSpacing: "12px",
  appOverridePostStyles: true,
};

const APP_NEON: AppStyle = {
  appBackgroundColor: "#0f0a1e",
  appSecondaryBackgroundColor: "#1a0b2e",
  appAccentBackgroundColor: "#2a103f",
  appAccentColor: "#d946ef",
  appSecondaryAccentColor: "#8b5cf6",
  appBorderStyle: "#7e22ce",
  appBorderRadius: "16px",
  appBorderLineStyle: "dotted",
  appFont: "monospace",
  appFontColor: "#f0abfc",
  appAccentFontColor: "#d946ef",
  appSecondaryTextColor: "#a855f7",
  appSpacing: "32px",
  appOverridePostStyles: false,
};

/** A profile that replaces the default document, so both render paths get used. */
function customProfile(heading: string, blurb: string): string {
  return `<style>
  body {
    margin: 0;
    background: #101418;
    color: #e7ecf1;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .wrap { width: min(100%, 44rem); margin: 0 auto; padding: clamp(1rem, 5vw, 3rem); }
  h1 { font-size: clamp(2rem, 6vw, 3rem); margin: 0 0 .5rem; letter-spacing: -0.02em; }
  p.blurb { margin: 0 0 2.5rem; color: #9fb0c0; font-size: 1.125rem; line-height: 1.6; }
  h2 { font-size: 1rem; text-transform: uppercase; letter-spacing: .08em; color: #9fb0c0; }
</style>
<main class="wrap">
  <h1>${heading}</h1>
  <p class="blurb">${blurb}</p>
  <h2>Posts</h2>
  <shome-posts />
</main>`;
}

// ---------------------------------------------------------------------------
// Accounts
// ---------------------------------------------------------------------------

export const SEED_USERS: SeedUser[] = [
  {
    handle: "test0",
    displayName: "Test Zero",
    style: { ...DEFAULT_POST_STYLE },
    appStyle: APP_DEFAULT,
    subscriptions: [
      { source: "hn", customTitle: "HN firehose" },
      { source: "verge" },
      { source: "ars" },
      { source: "rust" },
      { source: "xkcd" },
      { source: "csstricks" },
      { source: "bsky" },
      { source: "masto" },
    ],
    feeds: [
      { name: "Everything", rules: { sort: "newest", limit: 100 } },
      { name: "Pictures only", rules: { requireMedia: true, sort: "newest" } },
    ],
    posts: [
      {
        text: "first post from the seed. if you can read this, the database is fine.",
        hoursAgo: 12,
      },
      {
        text: "following everyone so my timeline has something in it. sorry in advance.",
        hoursAgo: 30,
        crossPostedTo: ["bluesky"],
      },
      {
        text: "poking at every button in the composer until one of them breaks.",
        hoursAgo: 54,
        style: {
          postBackgroundColor: "#111827",
          postFontColor: "#a7f3d0",
          postFont: "monospace",
          postBorderLineStyle: "dashed",
        },
      },
    ],
  },
  {
    handle: "test1",
    displayName: "Test One",
    style: PAPER,
    appStyle: APP_PAPER,
    profileHtml: customProfile(
      "test1",
      "Film photography, mostly expired stock, mostly at the wrong exposure.",
    ),
    subscriptions: [{ source: "verge" }, { source: "xkcd" }, { source: "masto" }],
    posts: [
      {
        text: "shot a roll of expired film and half of it came out. the half that did is the good half.",
        hoursAgo: 5,
      },
      {
        text: "the light between seven and eight right now is doing all the work for me.",
        hoursAgo: 26,
        crossPostedTo: ["mastodon"],
      },
      {
        text: "scanned negatives all evening. my desk is a drying rack.",
        hoursAgo: 70,
      },
    ],
  },
  {
    handle: "test2",
    displayName: "Test Two",
    style: TERMINAL,
    appStyle: APP_TERMINAL,
    subscriptions: [{ source: "hn" }, { source: "rust" }, { source: "bsky" }],
    feeds: [
      {
        name: "Rust only",
        rules: { includeKeywords: ["rust", "async", "borrow"], sort: "newest" },
        ruleSources: ["rust", "hn"],
      },
    ],
    posts: [
      {
        text: "spent the morning removing a lifetime annotation and the afternoon putting it back.",
        hoursAgo: 8,
      },
      {
        text: "async traits stabilizing means i get to delete an entire module. good day.",
        hoursAgo: 33,
        crossPostedTo: ["bluesky", "mastodon"],
      },
      {
        text: "profiler says the bottleneck is the thing i wrote to fix the last bottleneck.",
        hoursAgo: 61,
        style: {
          postBackgroundColor: "#1c1917",
          postFontColor: "#fdba74",
          postBorderStyle: "#78350f",
        },
      },
    ],
  },
  {
    handle: "test3",
    displayName: "Test Three",
    style: BLOSSOM,
    appStyle: APP_DEFAULT,
    subscriptions: [
      { source: "csstricks", customTitle: "Web platform" },
      { source: "verge" },
      { source: "hn" },
    ],
    feeds: [
      {
        name: "Web platform",
        rules: {
          kinds: ["rss"],
          includeKeywords: ["css", "container", "focus", "browser"],
          excludeKeywords: ["crypto"],
          limit: 40,
        },
      },
    ],
    posts: [
      {
        text: "container queries have quietly made half my media queries pointless.",
        hoursAgo: 3,
      },
      {
        text: "spent longer choosing a focus ring color than writing the component it goes on.",
        hoursAgo: 21,
      },
      {
        text: "anchor positioning shipping everywhere means the tooltip dependency can go.",
        hoursAgo: 45,
        crossPostedTo: ["mastodon"],
      },
    ],
  },
  {
    handle: "test4",
    displayName: "Test Four",
    style: NOTEBOOK,
    appStyle: APP_DEFAULT,
    subscriptions: [{ source: "xkcd" }, { source: "hn" }],
    posts: [
      {
        text: "new xkcd is about dependency chains again and it is still too accurate.",
        hoursAgo: 9,
      },
      {
        text: "explaining rss to my mother using a newspaper as a prop. it went better than expected.",
        hoursAgo: 40,
      },
      {
        text: "sometimes the comic is the whole post. that is the format.",
        hoursAgo: 64,
        style: {
          postBackgroundColor: "#fafaf9",
          postFontColor: "#1c1917",
          postSecondaryTextColor: "#78716c",
        },
      },
    ],
  },
  {
    handle: "test5",
    displayName: "Test Five",
    style: CITRUS,
    appStyle: APP_DEFAULT,
    subscriptions: [{ source: "verge" }, { source: "ars" }, { source: "hn" }, { source: "masto" }],
    feeds: [
      {
        name: "Just the news",
        rules: { kinds: ["rss"], sort: "newest", limit: 25 },
      },
    ],
    posts: [
      {
        text: "reading four tech feeds before breakfast is a choice i keep making.",
        hoursAgo: 2,
      },
      {
        text: "every timeline redesign is the same three ideas in a different order.",
        hoursAgo: 18,
        crossPostedTo: ["bluesky"],
      },
      {
        text: "muted the word unprecedented and my feed got thirty percent shorter.",
        hoursAgo: 50,
      },
    ],
  },
  {
    handle: "test6",
    displayName: "Test Six",
    style: DEEP_SEA,
    appStyle: APP_DEEP_SEA,
    profileHtml: customProfile(
      "test6",
      "Self-hosting everything on one small box under a desk. It hums.",
    ),
    subscriptions: [{ source: "hn" }, { source: "rust" }, { source: "ars" }],
    posts: [
      {
        text: "moved the feed reader onto the little box under the desk. it hums now.",
        hoursAgo: 6,
      },
      {
        text: "backups are only real once you have restored from them. did that today.",
        hoursAgo: 29,
      },
      {
        text: "uptime is forty-one days, the longest relationship i have maintained this year.",
        hoursAgo: 58,
        style: {
          postBackgroundColor: "#022c22",
          postFontColor: "#bbf7d0",
          postBorderLineStyle: "solid",
        },
        crossPostedTo: ["mastodon"],
      },
    ],
  },
  {
    handle: "test7",
    displayName: "Test Seven",
    style: NEWSPRINT,
    appStyle: APP_DEFAULT,
    subscriptions: [{ source: "csstricks" }, { source: "verge" }],
    posts: [
      {
        text: "writing the newsletter in the same editor i write commit messages in.",
        hoursAgo: 11,
      },
      { text: "a post is just a note you were brave about.", hoursAgo: 35 },
      {
        text: "three drafts in the folder, none finished, all of them fine where they are.",
        hoursAgo: 72,
      },
    ],
  },
  {
    handle: "test8",
    displayName: "Test Eight",
    style: NEON,
    appStyle: APP_NEON,
    subscriptions: [{ source: "masto" }, { source: "xkcd" }, { source: "ars" }],
    posts: [
      {
        text: "a podcast feed is just rss with bigger enclosures and i will die on this hill.",
        hoursAgo: 4,
      },
      {
        text: "recorded a demo on a phone in a stairwell. the reverb was free.",
        hoursAgo: 24,
        crossPostedTo: ["bluesky"],
      },
      {
        text: "sorting the library by bitrate like it is 2004 again.",
        hoursAgo: 52,
        style: {
          postBackgroundColor: "#0f0a1e",
          postFontColor: "#c4b5fd",
          postBorderRadius: "24px",
        },
      },
    ],
  },
  {
    handle: "test9",
    displayName: "Test Nine",
    style: FOREST,
    appStyle: APP_DEFAULT,
    subscriptions: [{ source: "xkcd" }, { source: "csstricks" }],
    posts: [
      {
        text: "tomatoes are ahead of schedule and the basil is not speaking to me.",
        hoursAgo: 7,
      },
      {
        text: "put the phone in a drawer for a day and the feed waited patiently.",
        hoursAgo: 31,
      },
      {
        text: "compost is just a very slow migration that you cannot roll back.",
        hoursAgo: 66,
        crossPostedTo: ["mastodon"],
      },
    ],
  },
  {
    handle: "test10",
    displayName: "Test Ten",
    // The account that runs entirely on the shipped defaults — written out
    // rather than left null, so its row says so.
    style: { ...DEFAULT_POST_STYLE },
    appStyle: APP_DEFAULT,
    subscriptions: [{ source: "hn" }, { source: "verge" }],
    posts: [
      {
        text: "no saved styling on this account on purpose — this is what the defaults look like.",
        hoursAgo: 10,
      },
      {
        text: "if this post looks different from the others, that is the point.",
        hoursAgo: 34,
      },
      {
        text: "and this one overrides the defaults per-post, without a saved style behind it.",
        hoursAgo: 68,
        style: {
          postBackgroundColor: "#450a0a",
          postFontColor: "#fecaca",
          postBorderStyle: "#b91c1c",
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sources and the items already fetched from them
// ---------------------------------------------------------------------------

/** A placeholder image host, so seeded media renders instead of 404ing. */
function image(seed: string): MediaRef[] {
  return [{ type: "image", url: `https://picsum.photos/seed/${seed}/960/540` }];
}

export const SEED_SOURCES: SeedSource[] = [
  {
    slug: "hn",
    kind: "rss",
    config: { url: "https://hnrss.org/frontpage" },
    title: "Hacker News: Front Page",
    items: [
      {
        externalId: "https://news.ycombinator.com/item?id=40100001",
        url: "https://news.ycombinator.com/item?id=40100001",
        title: "Show HN: A feed reader that runs entirely on my own server",
        text: "I got tired of my reading list living in someone else's product, so I spent a month building one that does not.",
        authorName: "ludic",
        hoursAgo: 1,
      },
      {
        externalId: "https://news.ycombinator.com/item?id=40100002",
        url: "https://news.ycombinator.com/item?id=40100002",
        title: "The forgotten history of RSS autodiscovery",
        text: "A single link tag in the document head was, for a while, the whole distribution story of the web.",
        authorName: "pg_dumps",
        hoursAgo: 4,
      },
      {
        externalId: "https://news.ycombinator.com/item?id=40100003",
        url: "https://news.ycombinator.com/item?id=40100003",
        title: "Postgres full-text search is faster than you think",
        text: "Benchmarks against a dedicated search cluster, on a dataset small enough that the cluster was never worth it.",
        authorName: "tsvector",
        hoursAgo: 11,
      },
      {
        externalId: "https://news.ycombinator.com/item?id=40100004",
        url: "https://news.ycombinator.com/item?id=40100004",
        title: "Why your CI is slow, and the three fixes nobody applies",
        text: "Caching the wrong layer, rebuilding the world on every push, and waiting on a runner pool sized for last year.",
        authorName: "buildbot",
        hoursAgo: 20,
      },
      {
        externalId: "https://news.ycombinator.com/item?id=40100005",
        url: "https://news.ycombinator.com/item?id=40100005",
        title: "Ask HN: What are you building this weekend?",
        text: "The monthly thread. Show the half-finished thing, not the polished one.",
        authorName: "whoishiring",
        hoursAgo: 33,
      },
      {
        externalId: "https://news.ycombinator.com/item?id=40100006",
        url: "https://news.ycombinator.com/item?id=40100006",
        title: "Postgres compiled to WASM, running in a browser tab",
        text: "The whole database, in the page, with a data directory backed by IndexedDB.",
        authorName: "wasmer",
        hoursAgo: 47,
      },
    ],
  },
  {
    slug: "verge",
    kind: "rss",
    config: { url: "https://www.theverge.com/rss/index.xml" },
    title: "The Verge",
    items: [
      {
        externalId: "https://www.theverge.com/2026/open-web-comeback",
        url: "https://www.theverge.com/2026/open-web-comeback",
        title: "The open web's quiet comeback",
        text: "Personal sites, feeds and newsletters are absorbing the attention that platforms keep shedding.",
        authorName: "A. Reporter",
        media: image("verge-open-web"),
        hoursAgo: 2,
      },
      {
        externalId: "https://www.theverge.com/2026/timeline-again",
        url: "https://www.theverge.com/2026/timeline-again",
        title: "Every social network is rebuilding the timeline, again",
        text: "Chronological, algorithmic, then chronological with an algorithmic tab. The cycle is now roughly eighteen months.",
        authorName: "B. Correspondent",
        hoursAgo: 9,
      },
      {
        externalId: "https://www.theverge.com/2026/tiny-eink-reader",
        url: "https://www.theverge.com/2026/tiny-eink-reader",
        title: "Hands-on with the smallest e-ink reader yet",
        text: "It fits in a coat pocket, lasts three weeks, and does exactly one thing.",
        authorName: "C. Reviewer",
        media: image("verge-eink"),
        hoursAgo: 26,
      },
      {
        externalId: "https://www.theverge.com/2026/unbundling-again",
        url: "https://www.theverge.com/2026/unbundling-again",
        title: "Streaming services are unbundling, again",
        text: "Six subscriptions later, the cable package has been reassembled at twice the price.",
        authorName: "D. Analyst",
        hoursAgo: 41,
      },
      {
        externalId: "https://www.theverge.com/2026/own-your-domain",
        url: "https://www.theverge.com/2026/own-your-domain",
        title: "The case for owning your own domain",
        text: "Twelve dollars a year buys an address that no acquisition can take away from you.",
        authorName: "E. Columnist",
        hoursAgo: 63,
      },
    ],
  },
  {
    slug: "ars",
    kind: "rss",
    config: { url: "https://feeds.arstechnica.com/arstechnica/index" },
    title: "Ars Technica",
    // The one source in a failed state, so the "cant fetch" surface has a subject.
    failing: true,
    items: [
      {
        externalId: "https://arstechnica.com/2026/faster-video-compression",
        url: "https://arstechnica.com/2026/faster-video-compression",
        title: "Researchers find a faster way to compress video",
        text: "The trick is throwing away the frames nobody looks at, which turns out to be most of them.",
        authorName: "Ars Staff",
        hoursAgo: 6,
      },
      {
        externalId: "https://arstechnica.com/2026/podcast-protocol",
        url: "https://arstechnica.com/2026/podcast-protocol",
        title: "The 40-year-old protocol keeping your podcasts alive",
        text: "An XML document, an enclosure tag, and no gatekeeper in the middle.",
        authorName: "Ars Staff",
        hoursAgo: 17,
      },
      {
        externalId: "https://arstechnica.com/2026/datacenter-cooling",
        url: "https://arstechnica.com/2026/datacenter-cooling",
        title: "Inside the datacenter cooling arms race",
        text: "Water, immersion, and a surprising amount of just moving the building somewhere colder.",
        authorName: "Ars Staff",
        media: image("ars-cooling"),
        hoursAgo: 38,
      },
      {
        externalId: "https://arstechnica.com/2026/bit-rot",
        url: "https://arstechnica.com/2026/bit-rot",
        title: "Why bit rot still eats your photo library",
        text: "Checksums are cheap, restores are not, and neither happens by accident.",
        authorName: "Ars Staff",
        hoursAgo: 59,
      },
    ],
  },
  {
    slug: "rust",
    kind: "rss",
    config: { url: "https://blog.rust-lang.org/feed.xml" },
    title: "Rust Blog",
    items: [
      {
        externalId: "https://blog.rust-lang.org/2026/announcing-rust-1-99-0",
        url: "https://blog.rust-lang.org/2026/announcing-rust-1-99-0",
        title: "Announcing Rust 1.99.0",
        text: "This release stabilizes async traits in the standard library and improves borrow checker diagnostics.",
        authorName: "The Rust Release Team",
        hoursAgo: 14,
      },
      {
        externalId: "https://blog.rust-lang.org/2026/roadmap",
        url: "https://blog.rust-lang.org/2026/roadmap",
        title: "The 2026 roadmap",
        text: "Compile times, async ergonomics, and finishing the things started in 2024.",
        authorName: "The Rust Core Team",
        hoursAgo: 36,
      },
      {
        externalId: "https://blog.rust-lang.org/2026/security-advisory",
        url: "https://blog.rust-lang.org/2026/security-advisory",
        title: "Security advisory for the standard library",
        text: "A path handling bug on Windows. Patched in 1.99.1; upgrading is the entire mitigation.",
        authorName: "The Rust Security Response WG",
        hoursAgo: 55,
      },
      {
        externalId: "https://blog.rust-lang.org/2026/borrow-checker-notes",
        url: "https://blog.rust-lang.org/2026/borrow-checker-notes",
        title: "Notes on the next borrow checker",
        text: "What Polonius changes, what it does not, and why the error messages get shorter.",
        authorName: "The Rust Compiler Team",
        hoursAgo: 78,
      },
    ],
  },
  {
    slug: "xkcd",
    kind: "rss",
    config: { url: "https://xkcd.com/rss.xml" },
    title: "xkcd.com",
    items: [
      {
        externalId: "https://xkcd.com/3001/",
        url: "https://xkcd.com/3001/",
        title: "Dependency Chain",
        text: "All modern infrastructure rests on one package maintained by a person who has not slept.",
        media: image("xkcd-3001"),
        hoursAgo: 8,
      },
      {
        externalId: "https://xkcd.com/3002/",
        url: "https://xkcd.com/3002/",
        title: "Feed Reader",
        text: "I subscribed to everything and now I read nothing. This is called information architecture.",
        media: image("xkcd-3002"),
        hoursAgo: 30,
      },
      {
        externalId: "https://xkcd.com/3003/",
        url: "https://xkcd.com/3003/",
        title: "Standards, Revisited",
        text: "There are now sixteen competing standards, which is one more than last time.",
        media: image("xkcd-3003"),
        hoursAgo: 52,
      },
      {
        externalId: "https://xkcd.com/3004/",
        url: "https://xkcd.com/3004/",
        title: "Time Zones",
        text: "The meeting is at nine, in a timezone that briefly existed in 1943.",
        media: image("xkcd-3004"),
        hoursAgo: 74,
      },
    ],
  },
  {
    slug: "csstricks",
    kind: "rss",
    config: { url: "https://css-tricks.com/feed/" },
    title: "CSS-Tricks",
    items: [
      {
        externalId: "https://css-tricks.com/container-queries-one-year-on/",
        url: "https://css-tricks.com/container-queries-one-year-on/",
        title: "Container queries in production, one year on",
        text: "What survived contact with a real design system, and which media queries are still doing real work.",
        authorName: "Geoff",
        hoursAgo: 5,
      },
      {
        externalId: "https://css-tricks.com/modern-focus-styles/",
        url: "https://css-tricks.com/modern-focus-styles/",
        title: "A modern approach to focus styles",
        text: "focus-visible, an outline offset, and never removing the ring without replacing it.",
        authorName: "Chris",
        hoursAgo: 23,
      },
      {
        externalId: "https://css-tricks.com/anchor-positioning-is-here/",
        url: "https://css-tricks.com/anchor-positioning-is-here/",
        title: "Anchor positioning is finally here",
        text: "Tooltips and popovers, positioned by the browser, with no measuring in JavaScript.",
        authorName: "Sunkanmi",
        media: image("csstricks-anchor"),
        hoursAgo: 44,
      },
      {
        externalId: "https://css-tricks.com/styling-details/",
        url: "https://css-tricks.com/styling-details/",
        title: "Styling the details element",
        text: "The disclosure widget you already have, made to look like the one you were going to build.",
        authorName: "Geoff",
        hoursAgo: 69,
      },
    ],
  },
  {
    slug: "bsky",
    kind: "bluesky",
    // Author mode reads a public feed, so it needs no linked connection.
    config: { mode: "author", actor: "bsky.app" },
    title: "@bsky.app on Bluesky",
    items: [
      {
        externalId: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3ksd1",
        url: "https://bsky.app/profile/bsky.app/post/3ksd1",
        text: "Custom feeds are rolling out to everyone this week.",
        authorName: "Bluesky",
        authorHandle: "bsky.app",
        hoursAgo: 13,
      },
      {
        externalId: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3ksd2",
        url: "https://bsky.app/profile/bsky.app/post/3ksd2",
        text: "A short thread on how the firehose works, and why you can run your own.",
        authorName: "Bluesky",
        authorHandle: "bsky.app",
        hoursAgo: 28,
      },
      {
        externalId: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3ksd3",
        url: "https://bsky.app/profile/bsky.app/post/3ksd3",
        text: "Reminder that your handle can be your own domain.",
        authorName: "Bluesky",
        authorHandle: "bsky.app",
        media: image("bsky-handles"),
        hoursAgo: 49,
      },
      {
        externalId: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3ksd4",
        url: "https://bsky.app/profile/bsky.app/post/3ksd4",
        text: "Maintenance is done. Thanks for waiting.",
        authorName: "Bluesky",
        authorHandle: "bsky.app",
        hoursAgo: 71,
      },
    ],
  },
  {
    slug: "masto",
    kind: "mastodon",
    // Hashtag timelines are public, so this needs no linked connection either.
    config: {
      server: "https://mastodon.social",
      mode: "hashtag",
      hashtag: "rss",
    },
    title: "#rss on mastodon.social",
    items: [
      {
        externalId: "111000000000000001",
        url: "https://mastodon.social/@feedhead/111000000000000001",
        text: "Ten years of the same OPML file, moved between six readers. #rss",
        authorName: "feedhead",
        authorHandle: "feedhead@mastodon.social",
        hoursAgo: 3,
      },
      {
        externalId: "111000000000000002",
        url: "https://mastodon.social/@quietweb/111000000000000002",
        text: "Every blog I still read, I read because of #rss. None of them found me.",
        authorName: "quiet web",
        authorHandle: "quietweb@mastodon.social",
        hoursAgo: 16,
      },
      {
        externalId: "111000000000000003",
        url: "https://mastodon.social/@opml/111000000000000003",
        text: "Reminder: your podcast app is an #rss client wearing a nicer coat.",
        authorName: "opml enjoyer",
        authorHandle: "opml@mastodon.social",
        hoursAgo: 37,
      },
      {
        externalId: "111000000000000004",
        url: "https://mastodon.social/@smallweb/111000000000000004",
        text: "Added a feed to the site. It took four lines. #rss #smallweb",
        authorName: "small web",
        authorHandle: "smallweb@mastodon.social",
        media: image("masto-smallweb"),
        hoursAgo: 57,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// The follow graph
// ---------------------------------------------------------------------------

/**
 * test0 follows everyone, so one account always has a full timeline; everyone
 * else follows the two accounts after them, which leaves the counts uneven
 * enough to be worth looking at. Derived once and shared, so the direct and
 * HTTP seeders cannot build different graphs from the same cast.
 */
function derivePairs(): [follower: string, following: string][] {
  const handles = SEED_USERS.map((seedUser) => seedUser.handle);
  const pairs = new Map<string, [string, string]>();
  for (const [index, follower] of handles.entries()) {
    const targets: string[] = handles[0] === follower ? handles.slice(1) : [];
    for (const offset of [1, 3]) {
      const target = handles[(index + offset) % handles.length];
      if (target) targets.push(target);
    }
    for (const target of targets) {
      if (target !== follower) pairs.set(`${follower}>${target}`, [follower, target]);
    }
  }
  return [...pairs.values()];
}

export const FOLLOW_PAIRS: readonly [follower: string, following: string][] = derivePairs();
