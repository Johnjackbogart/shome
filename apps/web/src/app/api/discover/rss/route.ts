import { NextResponse } from "next/server";
import { jsonError } from "#/server/api";
import { getSessionOrNull } from "#/server/auth";
import { assertPublicHttpUrl, BlockedHostError } from "#/server/netguard";
import {
  discoverRssFeeds,
  looksLikeWebsite,
  normalizeDiscoveryUrl,
  RssDiscoveryError,
  searchFeedlyRssFeeds,
} from "#/server/rss-discovery";

export async function GET(req: Request) {
  const session = await getSessionOrNull();
  if (!session) return jsonError(401, "not signed in");

  const rawInput =
    new URL(req.url).searchParams.get("q") ?? new URL(req.url).searchParams.get("url");
  if (rawInput === null) return jsonError(400, "search is required");

  try {
    if (!looksLikeWebsite(rawInput)) {
      return NextResponse.json({ feeds: await searchFeedlyRssFeeds(rawInput) });
    }
    const siteUrl = normalizeDiscoveryUrl(rawInput);
    await assertPublicHttpUrl(siteUrl);
    return NextResponse.json({ feeds: await discoverRssFeeds(siteUrl) });
  } catch (err) {
    if (err instanceof RssDiscoveryError) return jsonError(err.status, err.message);
    if (err instanceof BlockedHostError) return jsonError(400, err.message);
    throw err;
  }
}
