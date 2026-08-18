import { describe, expect, it } from "vitest";
import { stampWebmDuration } from "../src/lib/webm";
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

function fullBox(type: string, flags: number, payload: Buffer): Buffer {
  const header = Buffer.from([0, (flags >> 16) & 0xff, (flags >> 8) & 0xff, flags & 0xff]);
  return box(type, Buffer.concat([header, payload]));
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

function fragmentedMp4WithDuration(durationMs: number): Buffer {
  const movieHeader = Buffer.alloc(20);
  movieHeader.writeUInt32BE(1_000, 12); // Fragmented files leave mvhd duration at zero.
  const trackHeader = Buffer.alloc(16);
  trackHeader.writeUInt32BE(1, 12);
  const mediaHeader = Buffer.alloc(20);
  mediaHeader.writeUInt32BE(1_000, 12);
  const trackExtends = Buffer.alloc(20);
  trackExtends.writeUInt32BE(1, 0);
  trackExtends.writeUInt32BE(100, 8);
  const trackFragmentHeader = Buffer.alloc(8);
  trackFragmentHeader.writeUInt32BE(1, 0);
  trackFragmentHeader.writeUInt32BE(100, 4);
  const trackRun = Buffer.alloc(4);
  trackRun.writeUInt32BE(durationMs / 100, 0);
  return Buffer.concat([
    box("ftyp", Buffer.from("isom\0\0\0\x01isomiso5", "binary")),
    box(
      "moov",
      Buffer.concat([
        box("mvhd", movieHeader),
        box(
          "trak",
          Buffer.concat([box("tkhd", trackHeader), box("mdia", box("mdhd", mediaHeader))]),
        ),
        box("mvex", fullBox("trex", 0, trackExtends)),
      ]),
    ),
    box(
      "moof",
      box(
        "traf",
        Buffer.concat([
          fullBox("tfhd", 0x000008, trackFragmentHeader),
          fullBox("tfdt", 0, Buffer.alloc(4)),
          fullBox("trun", 0, trackRun),
        ]),
      ),
    ),
    box("mdat", Buffer.alloc(0)),
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

function webmWithoutDuration(): Buffer {
  const timestampScale = Buffer.from([0x2a, 0xd7, 0xb1, 0x83, 0x0f, 0x42, 0x40]);
  return Buffer.concat([
    Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x80]),
    // MediaRecorder writes an unknown-sized Segment.
    Buffer.from([0x18, 0x53, 0x80, 0x67, 0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
    // A SeekHead points to Info by embedding the same four-byte identifier.
    // The duration stamper must not mistake that index entry for Info itself.
    Buffer.from([
      0x11, 0x4d, 0x9b, 0x74, 0x8e, 0x4d, 0xbb, 0x8b, 0x53, 0xab, 0x84, 0x15, 0x49, 0xa9, 0x66,
      0x53, 0xac, 0x81, 0x00,
    ]),
    Buffer.from([0x15, 0x49, 0xa9, 0x66, 0x87]),
    timestampScale,
  ]);
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

  it("accepts a fragmented MP4 recording with duration in its media fragments", () => {
    expect(inspectPostMedia("clip.mp4", fragmentedMp4WithDuration(1_000))).toMatchObject({
      type: "video",
      contentType: "video/mp4",
      durationMs: 1_000,
    });
  });

  it("keeps the three-minute limit for fragmented MP4 recordings", () => {
    expect(() =>
      inspectPostMedia("too-long.mp4", fragmentedMp4WithDuration(MAX_VIDEO_DURATION_MS + 100)),
    ).toThrow("videos must be 3 minutes or shorter");
  });

  it("accepts a browser-recorded WebM after its known capture duration is stamped", () => {
    const stamped = stampWebmDuration(webmWithoutDuration(), 1_234);
    expect(stamped).not.toBeNull();
    expect(inspectPostMedia("video.webm", Buffer.from(stamped ?? []))).toMatchObject({
      type: "video",
      contentType: "video/webm",
      durationMs: 1_234,
    });
  });

  it("keeps the three-minute limit for browser-recorded WebM files", () => {
    const stamped = stampWebmDuration(webmWithoutDuration(), MAX_VIDEO_DURATION_MS + 1);
    expect(() => inspectPostMedia("video.webm", Buffer.from(stamped ?? []))).toThrow(
      "videos must be 3 minutes or shorter",
    );
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
