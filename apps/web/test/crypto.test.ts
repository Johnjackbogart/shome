import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.CREDENTIALS_ENCRYPTION_KEY = "test-secret-key-for-crypto-round-trip";
});

describe("credential encryption", () => {
  it("round-trips credentials through a compact JWE", async () => {
    const { decryptCredentials, encryptCredentials } = await import("../src/server/crypto");
    const input = { identifier: "jack.bsky.social", appPassword: "abcd-efgh-ijkl-mnop" };
    const token = await encryptCredentials(input);

    // Compact JWE: five dot-separated base64url segments, no plaintext leakage.
    expect(token.split(".")).toHaveLength(5);
    expect(token).not.toContain("appPassword");
    expect(token).not.toContain("abcd-efgh");

    await expect(decryptCredentials(token)).resolves.toEqual(input);
  });

  it("rejects tampered ciphertext", async () => {
    const { decryptCredentials, encryptCredentials } = await import("../src/server/crypto");
    const token = await encryptCredentials({ apiKey: "xyz" });
    const tampered = token.slice(0, -4) + (token.endsWith("AAAA") ? "BBBB" : "AAAA");
    await expect(decryptCredentials(tampered)).rejects.toThrow();
  });
});
