import { describe, expect, it } from "vitest";
import { blueskyConnector } from "../src/index";

describe("blueskyConnector imported author sources", () => {
  it("keeps the handle for display while using the DID as the durable key", () => {
    const config = blueskyConnector.parseConfig({
      mode: "author",
      actor: "@Alice.Bsky.Social",
      did: "did:plc:alice",
    });

    expect(config).toEqual({
      mode: "author",
      actor: "alice.bsky.social",
      did: "did:plc:alice",
    });
    expect(blueskyConnector.canonicalKey(config)).toBe("bluesky:author:did:plc:alice");
  });
});
