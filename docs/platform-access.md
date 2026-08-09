# Closed-platform access research (August 2026)

Question: can shome ingest content from X/Twitter, Facebook, Instagram, and
LinkedIn the way it does from RSS/Bluesky/Mastodon/YouTube?

**Short answer: none of them allow a third-party app to read a user's follow
feed.** What remains is (a) *posting out* — which serves the "distribute your
IP" pillar well — and (b) sometimes *reading your own content*. X is the one
exception that sells read access, priced per call.

## Per-platform reality

### X / Twitter — readable, but metered per call

Since February 2026 the X API defaults to **pay-per-use** for new developers:
roughly **$0.005 per post read** (capped at 2M reads/month), $0.010 per user
read, $0.015 per post created ($0.20 if it contains a link). The free tier is
gone; legacy Basic ($200/mo) and Pro ($5,000/mo) exist only for existing
subscribers, and full-archive search is Enterprise-only (~$42k+/mo).
Implication for shome: a timeline connector is *technically* fine but polling
even one active timeline costs real money (100 posts × 96 polls/day ≈ $48/day).
Viable only as **bring-your-own-API-key** with aggressive caching/low cadence.

### Instagram — personal feeds closed; creators can read their own media

The Basic Display API (read access for personal accounts) shut down
**December 4, 2024**. All 2026 access goes through the Instagram Graph API /
"Instagram API with Instagram Login", which requires a **Business or Creator
account**, app review, and tighter rate limits. A creator can pull **their own
media** into shome (good for the distribution pillar) and publish via the
content-publishing endpoints; reading the accounts you *follow* is not possible.

### Facebook — user news feed has been closed since the Cambridge Analytica era

Reading a user's news feed via the Graph API was removed years ago (the 2018
API lockdown finished what started in 2015) and never came back. The 2026
Graph API is Pages/Business-oriented: with app review you can read and publish
to **Pages you manage**. The Public Feed API is restricted to approved media
publishers. So: publish-to-Page yes, aggregate-your-feed no.

### LinkedIn — partner-gated; posting yes, feed reading no

All meaningful LinkedIn API access requires the **Partner Program**. Without
partnership you get basic profile fields and **posting** (`w_member_social`).
Feed reading isn't offered even to most partners; the recent Member Post
Analytics API gives creators their own post metrics through ~11 approved
platforms, and the EU-driven Member Data Portability APIs (Member Changelog
etc.) let members export **their own** data. Distribution pillar: fine.
Aggregation pillar: no.

## What this means for shome

| Capability            | X          | Facebook       | Instagram          | LinkedIn      |
| --------------------- | ---------- | -------------- | ------------------ | ------------- |
| Read your follow feed | 💰 per-read | ❌             | ❌                 | ❌            |
| Read your own content | 💰 per-read | ✅ Pages only  | ✅ Business/Creator | ⚠️ partner/DMA |
| Post outward          | 💰 per-post | ✅ Pages       | ✅ Business/Creator | ✅            |

Compliant ingestion strategies worth building instead:

1. **BYO API key** connector for X (user pays their own metered usage).
2. **"Save to shome"** — browser extension / share-sheet that captures
   individual posts the user explicitly saves (the Pocket model).
3. **Data-export import** — Facebook/Instagram JSON exports and LinkedIn
   archives ingested as historical content.
4. **oEmbed** — official embed endpoints for rendering individual linked posts
   in feeds without scraping.
5. **Newsletters/RSS bridges** — much closed-platform content is mirrored to
   newsletters or personal sites that shome already ingests natively.

Scraping login-walled content violates every one of these platforms' ToS and
is explicitly not on the roadmap.

## Sources

- [Postproxy: X (Twitter) API pricing 2026](https://postproxy.dev/blog/x-api-pricing-2026/)
- [twitterapi.io: X API cost breakdown 2026](https://twitterapi.io/blog/x-api-cost-breakdown-2026)
- [xpoz: Twitter/X API tiers ($0 to $42K) compared](https://www.xpoz.ai/blog/guides/understanding-twitter-api-pricing-tiers-and-alternatives/)
- [keyapi: Instagram Basic Display API — what replaced it in 2026](https://www.keyapi.ai/blog/instagram-basic-display-api/)
- [Phyllo: Instagram Basic Display deprecation](https://www.getphyllo.com/post/instagram-basic-display-api-deprecation-what-it-is-for-developers-and-businesses)
- [Storrito: Instagram API changes in 2026](https://storrito.com/resources/instagram-api-2026/)
- [TechCrunch: Facebook shuts down feed APIs (2018)](https://techcrunch.com/2018/04/24/facebook-api-changes)
- [SocialCrawl: Facebook Data API 2026 guide](https://www.socialcrawl.dev/blog/facebook-data-api-2026)
- [Data365: Facebook Feed API uses](https://data365.co/guides/facebook-feed-api)
- [Microsoft Learn: Getting access to LinkedIn APIs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access)
- [Microsoft Learn: LinkedIn Member Changelog API (data portability)](https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/shared/member-changelog-api)
- [ppc.land: LinkedIn Member Post Analytics API](https://ppc.land/linkedin-enables-third-party-analytics-access-with-new-member-post-api/)
