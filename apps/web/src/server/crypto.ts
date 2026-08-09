import { hkdfSync } from "node:crypto";
import { CompactEncrypt, compactDecrypt } from "jose";

/**
 * Envelope encryption for stored platform credentials: compact JWE with direct
 * AES-256-GCM. The key is derived (HKDF-SHA256) from CREDENTIALS_ENCRYPTION_KEY,
 * falling back to BETTER_AUTH_SECRET so zero-config dev still works; set the
 * dedicated variable in production so auth and storage keys can rotate
 * independently.
 */

let cachedKey: Uint8Array | null = null;

function key(): Uint8Array {
  if (cachedKey) return cachedKey;
  const secret = process.env.CREDENTIALS_ENCRYPTION_KEY ?? process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "set CREDENTIALS_ENCRYPTION_KEY (or BETTER_AUTH_SECRET) — required to encrypt stored credentials",
    );
  }
  cachedKey = new Uint8Array(hkdfSync("sha256", secret, "shome", "credentials-at-rest", 32));
  return cachedKey;
}

export async function encryptCredentials(credentials: Record<string, unknown>): Promise<string> {
  const plaintext = new TextEncoder().encode(JSON.stringify(credentials));
  return new CompactEncrypt(plaintext)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(key());
}

export async function decryptCredentials(token: string): Promise<Record<string, unknown>> {
  const { plaintext } = await compactDecrypt(token, key());
  return JSON.parse(new TextDecoder().decode(plaintext)) as Record<string, unknown>;
}
