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

## ToS deep-dive: automating access to *your own* data

The intuitive position — "it's my account, I should be able to automate
pulling my own posts/timeline" — is rejected by all four platforms' terms,
and three of them pre-empt the logged-in-to-my-own-account argument by name:

### What the terms actually say

- **X** (Terms of Service): *"crawling or scraping the Services in any form,
  for any purpose without our prior written consent is expressly prohibited."*
  Access is limited to "published interfaces" (the paid API), and the terms
  set liquidated damages of **$15,000 per 1,000,000 posts accessed in any
  24-hour period**.
- **Facebook** (Meta Terms, §3.2(3)): *"You may not access or collect data
  from our Products using automated means … without our prior permission"* —
  applying *"regardless of whether such automated access or collection is
  undertaken while logged-in to a Facebook account."*
- **Instagram** (Terms of Use): no *"accessing or collecting information in an
  automated way without our express permission, regardless of whether such
  automated access or collection is undertaken while logged-in to an
  Instagram account."*
- **LinkedIn** (User Agreement §8.2): members may not *"develop, support or
  use software, devices, scripts, robots or any other means or processes
  (such as crawlers, **browser plugins and add-ons** or any other technology)
  to scrape or copy the Services"*, nor use *"bots or other unauthorized
  automated methods to access the Services"* (§8.2(13)). Note that browser
  extensions are named explicitly.

### Legal nuances

- Data-portability **rights** are real — GDPR Art. 20 (EU), CCPA/CPRA access
  rights (California) — but they are fulfilled through the platform's own
  export channels; they do not authorize personal bots against the service.
- *hiQ v. LinkedIn* established that scraping **public** pages is not federal
  hacking (CFAA), but logged-in automation is still a clean breach of
  contract. For personal own-data automation, the realistic enforcement is
  **account suspension**, not litigation.

### Sanctioned ways to get your own content

| Platform  | Official channel                                                                 |
| --------- | -------------------------------------------------------------------------------- |
| X         | Settings → "Download an archive of your data"; or the metered API ("owned reads" ~$0.001/resource) |
| Facebook  | "Download Your Information" / "Transfer Your Information" (JSON export)           |
| Instagram | Same Meta export tools; Business/Creator accounts can use the official API for their own media |
| LinkedIn  | "Get a copy of your data" export; EU members: DMA Member Data Portability APIs    |

### Aside: how does Google index X posts, then?

Because Google is on the consent side of the "without our prior written
consent" clause — scraping at X is *permissioned*, not absent:

1. **Explicit crawler whitelisting.** `x.com/robots.txt` (checked 2026-08-09)
   opens with a dedicated `# Google Search Engine Robot` section allowing
   Googlebot into profiles, statuses, hashtags, and search pages while carving
   out likes/followers/analytics. Other user-agents get far more restrictive
   rules. robots.txt is the operational form of "prior written consent."
2. **Commercial data deals.** Realtime tweets in Google's search carousels
   historically came from the 2015 Google–Twitter "firehose" agreement — a
   paid, direct API stream, not HTML scraping. When X briefly login-walled
   public tweets (July 2023), tweets largely fell out of Google until access
   was restored: indexing exists exactly to the extent X permits it.
3. **Crawler-friendly public permalinks.** Tweet URLs server-render for
   logged-out agents X chooses to serve, so they can be indexed and drive
   traffic back.

The asymmetry is intentional: the ToS defaults everyone to "no," then X
grants exceptions to parties that bring traffic (Google) or pay (API
customers). Consent is available at Google's negotiating scale, not an
individual's — which is why shome's channels remain exports, the metered
API, and user-triggered saves.

### Implication for shome

Every export above is machine-readable JSON/CSV. **Archive importers** give
users "automated access to my own data" with one manual click per platform
per refresh — fully ToS-clean, no credentials stored, no ban risk. That is
the planned approach; running browser automation server-side on users'
behalf is not (it would put every user's account and shome itself in breach).
Users who choose to run local browser automation against their own accounts
do so on their own machines and their own risk; shome's role is limited to
accepting whatever they push into their own ingest endpoint.

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

ToS deep-dive sources:

- [Meta Terms of Service](https://www.facebook.com/legal/terms) (§3.2, fetched 2026-08-09)
- [LinkedIn User Agreement](https://www.linkedin.com/legal/user-agreement) (§8.2, fetched 2026-08-09)
- [TechCrunch: X bans crawling and scraping in its terms](https://techcrunch.com/2023/09/08/x-updates-its-terms-to-ban-crawling-and-scraping)
- [opentweet: X automation rules 2026](https://opentweet.io/blog/twitter-automation-rules-2026)
- [Instagram Terms of Use, court-filed copy (PDF)](https://www.lb7.uscourts.gov/documents/19-1861URL1Termsofuse.pdf)
- [TLDRLegal: Instagram Terms of Use explained](https://www.tldrlegal.com/license/instagram-terms-of-use)
