import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export class BlockedHostError extends Error {}

function ipv4ToInt(ip: string): number {
  return ip.split(".").reduce((acc, part) => acc * 256 + Number(part), 0);
}

const PRIVATE_V4_RANGES: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

function isPrivateV4(ip: string): boolean {
  const value = ipv4ToInt(ip);
  return PRIVATE_V4_RANGES.some(
    ([base, bits]) => value >>> (32 - bits) === ipv4ToInt(base) >>> (32 - bits),
  );
}

function isPrivateAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 4) return isPrivateV4(address);
  if (family === 6) {
    const lower = address.toLowerCase();
    if (lower === "::" || lower === "::1") return true;
    if (lower.startsWith("::ffff:")) {
      const mapped = lower.slice(7);
      return isIP(mapped) === 4 ? isPrivateV4(mapped) : true;
    }
    if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local fc00::/7
    if (/^fe[89ab]/.test(lower)) return true; // link-local fe80::/10
    return false;
  }
  return true; // unparseable → refuse
}

/**
 * SSRF guard for user-supplied URLs the server will fetch (RSS feeds, Mastodon
 * instances): only http(s), and the host must not sit in private/reserved
 * address space. Known gap: DNS can change between this check and the fetch
 * (rebinding); closing that needs a pinning dispatcher — see docs/architecture.md.
 */
export async function assertPublicHttpUrl(rawUrl: string): Promise<void> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new BlockedHostError("invalid URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new BlockedHostError("only http(s) URLs are allowed");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) {
    if (isPrivateAddress(host))
      throw new BlockedHostError(`address ${host} is not publicly routable`);
    return;
  }
  const lowerHost = host.toLowerCase();
  if (
    lowerHost === "localhost" ||
    lowerHost.endsWith(".localhost") ||
    lowerHost.endsWith(".local") ||
    lowerHost.endsWith(".internal")
  ) {
    throw new BlockedHostError(`host ${host} is not allowed`);
  }
  let addresses: { address: string }[];
  try {
    addresses = await lookup(lowerHost, { all: true });
  } catch {
    throw new BlockedHostError(`cannot resolve host ${host}`);
  }
  for (const { address } of addresses) {
    if (isPrivateAddress(address)) {
      throw new BlockedHostError(`host ${host} resolves to a non-public address`);
    }
  }
}
