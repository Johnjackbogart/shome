import { describe, expect, it } from "vitest";
import {
  inspectPostMedia,
  MAX_VIDEO_DURATION_MS,
  preparePostMedia,
} from "../src/server/media-storage";

function box(type: string, payload: Buffer): Buffer {
  const header = Buffer.alloc(8);
  header.writeUInt32BE(header.length + payload.length, 0);
  header.write(type, 4, "ascii");
  return Buffer.concat([header, payload]);
}

function mp4WithDuration(durationMs: number): Buffer {
  const movieHeader = Buffer.alloc(20);
  movieHeader.writeUInt32BE(1_000, 12); // timescale: 1,000 units per second
  movieHeader.writeUInt32BE(durationMs, 16);
  return Buffer.concat([
    box("ftyp", Buffer.from("isom\0\0\0\x01isommp42", "binary")),
    box("moov", box("mvhd", movieHeader)),
  ]);
}

function movWithDuration(durationMs: number): Buffer {
  const movieHeader = Buffer.alloc(20);
  movieHeader.writeUInt32BE(1_000, 12); // timescale: 1,000 units per second
  movieHeader.writeUInt32BE(durationMs, 16);
  return Buffer.concat([
    box("ftyp", Buffer.from("qt  \0\0\0\0qt  ", "binary")),
    box("moov", box("mvhd", movieHeader)),
  ]);
}

function upload(name: string, bytes: Buffer) {
  return {
    name,
    size: bytes.length,
    arrayBuffer: async () =>
      bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer,
  };
}

describe("first-party media validation", () => {
  it("accepts a three-minute MP4 and records its authoritative duration", () => {
    const inspected = inspectPostMedia("clip.mp4", mp4WithDuration(MAX_VIDEO_DURATION_MS));
    expect(inspected).toMatchObject({
      type: "video",
      contentType: "video/mp4",
      durationMs: MAX_VIDEO_DURATION_MS,
    });
  });

  it("rejects an MP4 that is even slightly over three minutes", () => {
    expect(() =>
      inspectPostMedia("too-long.mp4", mp4WithDuration(MAX_VIDEO_DURATION_MS + 1)),
    ).toThrow("videos must be 3 minutes or shorter");
  });

  it("accepts a MOV recorded by an iPhone camera", () => {
    const inspected = inspectPostMedia("clip.mov", movWithDuration(1_000));
    expect(inspected).toMatchObject({
      type: "video",
      contentType: "video/quicktime",
      durationMs: 1_000,
    });
  });

  it("limits a post to ten photos", async () => {
    const jpeg = Buffer.from([0xff, 0xd8, 0xff]);
    await expect(
      preparePostMedia(
        Array.from({ length: 11 }, (_, index) => upload(`photo-${index}.jpg`, jpeg)),
      ),
    ).rejects.toThrow("a post can include up to 10 photos");
  });
});
