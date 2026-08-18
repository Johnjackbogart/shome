import { randomUUID } from "node:crypto";
import { mkdir, open, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export const MAX_PHOTOS_PER_POST = 10;
export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 512 * 1024 * 1024;
export const MAX_VIDEO_DURATION_MS = 3 * 60 * 1000;
export const MAX_POST_UPLOAD_BYTES = MAX_VIDEO_BYTES + MAX_PHOTOS_PER_POST * MAX_IMAGE_BYTES;

export type PreparedPostMedia = {
  id: string;
  type: "image" | "video";
  contentType: string;
  byteSize: number;
  durationMs: number | null;
  originalName: string;
  bytes: Buffer;
};

type UploadLike = {
  name: string;
  size: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

type DetectedMedia = {
  type: "image" | "video";
  contentType: string;
};

const JPEG = Buffer.from([0xff, 0xd8, 0xff]);
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const WEBM = Buffer.from([0x1a, 0x45, 0xdf, 0xa3]);
const WEBM_SEGMENT = Buffer.from([0x18, 0x53, 0x80, 0x67]);
const WEBM_INFO_ID = 0x1549a966;

function uploadDirectory(): string {
  return process.env.SHOME_UPLOAD_DIR ?? path.join(process.cwd(), ".data", "uploads");
}

function storagePath(id: string): string {
  // IDs are generated server-side and also validated by the route before this
  // is called, so an uploaded filename can never influence the filesystem path.
  return path.join(uploadDirectory(), id);
}

function detectMedia(bytes: Buffer): DetectedMedia | null {
  if (bytes.subarray(0, JPEG.length).equals(JPEG)) {
    return { type: "image", contentType: "image/jpeg" };
  }
  if (bytes.subarray(0, PNG.length).equals(PNG)) {
    return { type: "image", contentType: "image/png" };
  }
  const gif = bytes.subarray(0, 6).toString("ascii");
  if (gif === "GIF87a" || gif === "GIF89a") {
    return { type: "image", contentType: "image/gif" };
  }
  if (
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { type: "image", contentType: "image/webp" };
  }
  if (
    bytes.subarray(4, 8).toString("ascii") === "ftyp" &&
    bytes.subarray(8, 32).includes(Buffer.from("avif"))
  ) {
    return { type: "image", contentType: "image/avif" };
  }
  if (bytes.subarray(4, 8).toString("ascii") === "ftyp") {
    if (bytes.subarray(8, 12).toString("ascii") === "qt  ") {
      return { type: "video", contentType: "video/quicktime" };
    }
    return { type: "video", contentType: "video/mp4" };
  }
  if (bytes.subarray(0, WEBM.length).equals(WEBM)) {
    return { type: "video", contentType: "video/webm" };
  }
  return null;
}

function readBoxSize(
  bytes: Buffer,
  offset: number,
  end: number,
): { size: number; header: number } | null {
  if (offset + 8 > end) return null;
  const initialSize = bytes.readUInt32BE(offset);
  if (initialSize === 0) return { size: end - offset, header: 8 };
  if (initialSize !== 1) return initialSize >= 8 ? { size: initialSize, header: 8 } : null;
  if (offset + 16 > end) return null;
  const extendedSize = bytes.readBigUInt64BE(offset + 8);
  if (extendedSize > BigInt(Number.MAX_SAFE_INTEGER)) return null;
  const size = Number(extendedSize);
  return size >= 16 ? { size, header: 16 } : null;
}

type Mp4Box = {
  type: string;
  payloadStart: number;
  end: number;
};

function mp4Boxes(bytes: Buffer, start: number, end: number): Mp4Box[] | null {
  const boxes: Mp4Box[] = [];
  for (let offset = start; offset + 8 <= end; ) {
    const box = readBoxSize(bytes, offset, end);
    if (!box || offset + box.size > end) return null;
    boxes.push({
      type: bytes.subarray(offset + 4, offset + 8).toString("ascii"),
      payloadStart: offset + box.header,
      end: offset + box.size,
    });
    offset += box.size;
  }
  return boxes;
}

function fullBoxFlags(bytes: Buffer, box: Mp4Box): { version: number; flags: number } | null {
  if (box.payloadStart + 4 > box.end) return null;
  return {
    version: bytes.readUInt8(box.payloadStart),
    flags: bytes.readUIntBE(box.payloadStart + 1, 3),
  };
}

function readMp4Unsigned(bytes: Buffer, offset: number, length: number): bigint | null {
  if ((length !== 4 && length !== 8) || offset + length > bytes.length) return null;
  return length === 4 ? BigInt(bytes.readUInt32BE(offset)) : bytes.readBigUInt64BE(offset);
}

function durationFromUnits(duration: bigint, timescale: number): number | null {
  if (duration <= 0n || timescale <= 0 || duration > BigInt(Number.MAX_SAFE_INTEGER)) return null;
  const milliseconds = (Number(duration) * 1000) / timescale;
  return Number.isFinite(milliseconds) && milliseconds > 0 ? Math.ceil(milliseconds) : null;
}

function movieHeader(
  bytes: Buffer,
  box: Mp4Box,
): { timescale: number; duration: bigint | null } | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox) return null;
  const timescaleOffset = box.payloadStart + (fullBox.version === 1 ? 20 : 12);
  const durationOffset = box.payloadStart + (fullBox.version === 1 ? 24 : 16);
  const durationLength = fullBox.version === 1 ? 8 : 4;
  if (timescaleOffset + 4 > box.end || durationOffset + durationLength > box.end) return null;
  const timescale = bytes.readUInt32BE(timescaleOffset);
  const duration = readMp4Unsigned(bytes, durationOffset, durationLength);
  if (timescale === 0 || duration === null) return null;
  const unknownDuration = fullBox.version === 1 ? 0xffffffffffffffffn : 0xffffffffn;
  return { timescale, duration: duration === unknownDuration || duration === 0n ? null : duration };
}

function trackId(bytes: Buffer, box: Mp4Box): number | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox) return null;
  const offset = box.payloadStart + (fullBox.version === 1 ? 20 : 12);
  return offset + 4 <= box.end ? bytes.readUInt32BE(offset) : null;
}

function mediaTimescale(bytes: Buffer, box: Mp4Box): number | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox) return null;
  const offset = box.payloadStart + (fullBox.version === 1 ? 20 : 12);
  if (offset + 4 > box.end) return null;
  const timescale = bytes.readUInt32BE(offset);
  return timescale > 0 ? timescale : null;
}

function movieExtendsDuration(bytes: Buffer, box: Mp4Box): bigint | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox) return null;
  return readMp4Unsigned(bytes, box.payloadStart + 4, fullBox.version === 1 ? 8 : 4);
}

function trackExtendsDefaultDuration(
  bytes: Buffer,
  box: Mp4Box,
): { id: number; duration: number } | null {
  if (!fullBoxFlags(bytes, box) || box.payloadStart + 16 > box.end) return null;
  const id = bytes.readUInt32BE(box.payloadStart + 4);
  const duration = bytes.readUInt32BE(box.payloadStart + 12);
  return id > 0 && duration > 0 ? { id, duration } : null;
}

function trackFragmentHeader(
  bytes: Buffer,
  box: Mp4Box,
): { id: number; defaultDuration: number | null } | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox || box.payloadStart + 8 > box.end) return null;
  let offset = box.payloadStart + 4;
  const id = bytes.readUInt32BE(offset);
  offset += 4;
  if (fullBox.flags & 0x000001) offset += 8;
  if (fullBox.flags & 0x000002) offset += 4;
  let defaultDuration: number | null = null;
  if (fullBox.flags & 0x000008) {
    if (offset + 4 > box.end) return null;
    defaultDuration = bytes.readUInt32BE(offset);
  }
  return id > 0 ? { id, defaultDuration } : null;
}

function trackFragmentDecodeTime(bytes: Buffer, box: Mp4Box): bigint | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox) return null;
  return readMp4Unsigned(bytes, box.payloadStart + 4, fullBox.version === 1 ? 8 : 4);
}

function trackRunDuration(
  bytes: Buffer,
  box: Mp4Box,
  defaultDuration: number | null,
): bigint | null {
  const fullBox = fullBoxFlags(bytes, box);
  if (!fullBox || box.payloadStart + 8 > box.end) return null;
  const sampleCount = bytes.readUInt32BE(box.payloadStart + 4);
  let offset = box.payloadStart + 8;
  if (fullBox.flags & 0x000001) offset += 4;
  if (fullBox.flags & 0x000004) offset += 4;
  const sampleFields =
    (fullBox.flags & 0x000100 ? 4 : 0) +
    (fullBox.flags & 0x000200 ? 4 : 0) +
    (fullBox.flags & 0x000400 ? 4 : 0) +
    (fullBox.flags & 0x000800 ? 4 : 0);
  if (
    offset > box.end ||
    sampleCount > 1_000_000 ||
    sampleFields * sampleCount > box.end - offset
  ) {
    return null;
  }
  if (!(fullBox.flags & 0x000100)) {
    return defaultDuration && defaultDuration > 0
      ? BigInt(defaultDuration) * BigInt(sampleCount)
      : null;
  }

  let duration = 0n;
  for (let sample = 0; sample < sampleCount; sample += 1) {
    duration += BigInt(bytes.readUInt32BE(offset));
    offset += sampleFields;
  }
  return duration > 0n ? duration : null;
}

function mp4DurationMs(bytes: Buffer): number | null {
  const topLevel = mp4Boxes(bytes, 0, bytes.length);
  const moov = topLevel?.find((box) => box.type === "moov");
  if (!topLevel || !moov) return null;
  const movieBoxes = mp4Boxes(bytes, moov.payloadStart, moov.end);
  const mvhd = movieBoxes?.find((box) => box.type === "mvhd");
  if (!movieBoxes || !mvhd) return null;
  const movie = movieHeader(bytes, mvhd);
  if (!movie) return null;
  const headerDuration = movie.duration ? durationFromUnits(movie.duration, movie.timescale) : null;
  if (headerDuration !== null) return headerDuration;

  const mvex = movieBoxes.find((box) => box.type === "mvex");
  const mvexBoxes = mvex ? mp4Boxes(bytes, mvex.payloadStart, mvex.end) : null;
  const mehd = mvexBoxes?.find((box) => box.type === "mehd");
  const extendsDuration = mehd ? movieExtendsDuration(bytes, mehd) : null;
  const mehdDuration = extendsDuration ? durationFromUnits(extendsDuration, movie.timescale) : null;
  if (mehdDuration !== null) return mehdDuration;

  const timescales = new Map<number, number>();
  for (const trak of movieBoxes.filter((box) => box.type === "trak")) {
    const trakBoxes = mp4Boxes(bytes, trak.payloadStart, trak.end);
    const tkhd = trakBoxes?.find((box) => box.type === "tkhd");
    const mdia = trakBoxes?.find((box) => box.type === "mdia");
    const mdiaBoxes = mdia ? mp4Boxes(bytes, mdia.payloadStart, mdia.end) : null;
    const mdhd = mdiaBoxes?.find((box) => box.type === "mdhd");
    const id = tkhd ? trackId(bytes, tkhd) : null;
    const timescale = mdhd ? mediaTimescale(bytes, mdhd) : null;
    if (id !== null && timescale !== null) timescales.set(id, timescale);
  }
  if (timescales.size === 0) return null;

  const defaultDurations = new Map<number, number>();
  for (const trex of mvexBoxes?.filter((box) => box.type === "trex") ?? []) {
    const value = trackExtendsDefaultDuration(bytes, trex);
    if (value) defaultDurations.set(value.id, value.duration);
  }

  let latestEnd = 0;
  for (const moof of topLevel.filter((box) => box.type === "moof")) {
    const moofBoxes = mp4Boxes(bytes, moof.payloadStart, moof.end);
    if (!moofBoxes) return null;
    for (const traf of moofBoxes.filter((box) => box.type === "traf")) {
      const trafBoxes = mp4Boxes(bytes, traf.payloadStart, traf.end);
      const tfhd = trafBoxes?.find((box) => box.type === "tfhd");
      const tfdt = trafBoxes?.find((box) => box.type === "tfdt");
      const header = tfhd ? trackFragmentHeader(bytes, tfhd) : null;
      const start = tfdt ? trackFragmentDecodeTime(bytes, tfdt) : null;
      const timescale = header ? timescales.get(header.id) : null;
      if (!trafBoxes || !header || start === null || !timescale) return null;
      const defaultDuration = header.defaultDuration ?? defaultDurations.get(header.id) ?? null;
      let duration = 0n;
      for (const trun of trafBoxes.filter((box) => box.type === "trun")) {
        const runDuration = trackRunDuration(bytes, trun, defaultDuration);
        if (runDuration === null) return null;
        duration += runDuration;
      }
      const end = durationFromUnits(start + duration, timescale);
      if (end !== null) latestEnd = Math.max(latestEnd, end);
    }
  }
  return latestEnd > 0 ? latestEnd : null;
}

function readEbmlSize(
  bytes: Buffer,
  offset: number,
): { value: number; length: number; unknown: boolean } | null {
  if (offset >= bytes.length) return null;
  const first = bytes.readUInt8(offset);
  let mask = 0x80;
  let length = 1;
  while ((first & mask) === 0 && length <= 8) {
    mask >>= 1;
    length += 1;
  }
  if (length > 8 || offset + length > bytes.length) return null;
  let value = first & (mask - 1);
  for (let index = 1; index < length; index += 1) {
    value = value * 256 + bytes.readUInt8(offset + index);
  }
  return { value, length, unknown: value === 2 ** (7 * length) - 1 };
}

function readEbmlId(bytes: Buffer, offset: number): { value: number; length: number } | null {
  if (offset >= bytes.length) return null;
  const first = bytes.readUInt8(offset);
  let mask = 0x80;
  let length = 1;
  while ((first & mask) === 0 && length <= 4) {
    mask >>= 1;
    length += 1;
  }
  if (length > 4 || offset + length > bytes.length) return null;
  let value = 0;
  for (let index = 0; index < length; index += 1) {
    value = value * 256 + bytes.readUInt8(offset + index);
  }
  return { value, length };
}

function readUnsigned(bytes: Buffer, offset: number, length: number): number | null {
  if (length < 1 || length > 6 || offset + length > bytes.length) return null;
  let value = 0;
  for (let index = 0; index < length; index += 1) {
    value = value * 256 + bytes.readUInt8(offset + index);
  }
  return value;
}

function webmDurationMs(bytes: Buffer): number | null {
  const segmentOffset = bytes.indexOf(WEBM_SEGMENT, WEBM.length);
  if (segmentOffset < 0) return null;
  const segmentSizeOffset = segmentOffset + WEBM_SEGMENT.length;
  const segmentSize = readEbmlSize(bytes, segmentSizeOffset);
  if (!segmentSize) return null;
  const segmentPayloadOffset = segmentSizeOffset + segmentSize.length;
  const segmentEnd = segmentSize.unknown ? bytes.length : segmentPayloadOffset + segmentSize.value;
  if (segmentEnd > bytes.length) return null;

  let infoOffset = 0;
  let infoSize: { value: number; length: number; unknown: boolean } | null = null;
  for (let offset = segmentPayloadOffset; offset < segmentEnd; ) {
    const id = readEbmlId(bytes, offset);
    if (!id) return null;
    const sizeOffset = offset + id.length;
    const size = readEbmlSize(bytes, sizeOffset);
    if (!size) return null;
    const payloadOffset = sizeOffset + size.length;
    const payloadEnd = payloadOffset + size.value;
    if (payloadEnd > segmentEnd) return null;
    if (id.value === WEBM_INFO_ID) {
      if (size.unknown) return null;
      infoOffset = payloadOffset;
      infoSize = size;
      break;
    }
    // A browser-generated unknown-sized Cluster cannot be skipped safely.
    if (size.unknown) return null;
    offset = payloadEnd;
  }
  if (!infoSize) return null;

  let offset = infoOffset;
  const end = infoOffset + infoSize.value;

  let timestampScale = 1_000_000;
  let duration: number | null = null;
  while (offset < end) {
    const id = readEbmlId(bytes, offset);
    if (!id) return null;
    const size = readEbmlSize(bytes, offset + id.length);
    if (!size || size.unknown) return null;
    const payloadStart = offset + id.length + size.length;
    const payloadEnd = payloadStart + size.value;
    if (payloadEnd > end) return null;
    if (id.value === 0x2ad7b1) {
      const value = readUnsigned(bytes, payloadStart, size.value);
      if (value === null || value <= 0) return null;
      timestampScale = value;
    } else if (id.value === 0x4489 && (size.value === 4 || size.value === 8)) {
      const view = new DataView(bytes.buffer, bytes.byteOffset + payloadStart, size.value);
      duration = size.value === 4 ? view.getFloat32(0, false) : view.getFloat64(0, false);
    }
    offset = payloadEnd;
  }
  if (duration === null || !Number.isFinite(duration) || duration <= 0) return null;
  const milliseconds = (duration * timestampScale) / 1_000_000;
  return Number.isFinite(milliseconds) && milliseconds > 0 ? Math.ceil(milliseconds) : null;
}

function durationMsForVideo(bytes: Buffer, contentType: string): number | null {
  return contentType === "video/webm" ? webmDurationMs(bytes) : mp4DurationMs(bytes);
}

export function sanitizeMediaName(name: string): string {
  const normalized = Array.from(name, (character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127 ? "" : character;
  }).join("");
  return (normalized || "upload").slice(0, 255);
}

export function inspectPostMedia(
  _name: string,
  bytes: Buffer,
): Omit<PreparedPostMedia, "id" | "originalName" | "bytes"> {
  const detected = detectMedia(bytes);
  if (!detected) {
    throw new Error("attachments must be JPEG, PNG, GIF, WebP, AVIF, MP4, WebM, or MOV files");
  }
  const maxBytes = detected.type === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (bytes.byteLength > maxBytes) {
    throw new Error(
      detected.type === "image"
        ? "each photo must be 20 MB or smaller"
        : "each video must be 512 MB or smaller",
    );
  }
  const durationMs =
    detected.type === "video" ? durationMsForVideo(bytes, detected.contentType) : null;
  if (detected.type === "video" && durationMs === null) {
    throw new Error(
      "could not read this video’s duration; use a standard MP4, WebM, or MOV export",
    );
  }
  if (durationMs !== null && durationMs > MAX_VIDEO_DURATION_MS) {
    throw new Error("videos must be 3 minutes or shorter");
  }
  return {
    type: detected.type,
    contentType: detected.contentType,
    byteSize: bytes.byteLength,
    durationMs,
  };
}

export async function preparePostMedia(
  files: UploadLike[],
  ids?: readonly string[],
): Promise<PreparedPostMedia[]> {
  if (files.length === 0) return [];
  if (ids && ids.length !== files.length) throw new Error("media upload IDs do not match files");
  if (files.reduce((total, file) => total + file.size, 0) > MAX_POST_UPLOAD_BYTES) {
    throw new Error("this post’s attachments are too large");
  }

  const prepared = await Promise.all(
    files.map(async (file, index) => {
      const bytes = Buffer.from(await file.arrayBuffer());
      const inspected = inspectPostMedia(file.name, bytes);
      return {
        id: ids?.[index] ?? randomUUID(),
        originalName: sanitizeMediaName(file.name),
        bytes,
        ...inspected,
      };
    }),
  );
  if (prepared.filter((media) => media.type === "image").length > MAX_PHOTOS_PER_POST) {
    throw new Error(`a post can include up to ${MAX_PHOTOS_PER_POST} photos`);
  }
  return prepared;
}

export async function persistPostMedia(media: readonly PreparedPostMedia[]): Promise<void> {
  await mkdir(uploadDirectory(), { recursive: true });
  const saved: PreparedPostMedia[] = [];
  try {
    for (const item of media) {
      await writeFile(storagePath(item.id), item.bytes, { flag: "wx" });
      saved.push(item);
    }
  } catch (error) {
    await removeStoredPostMedia(saved.map((item) => item.id));
    throw error;
  }
}

export async function removeStoredPostMedia(ids: readonly string[]): Promise<void> {
  await Promise.all(ids.map((id) => rm(storagePath(id), { force: true }).catch(() => undefined)));
}

export async function storedPostMediaSize(id: string): Promise<number> {
  return (await stat(storagePath(id))).size;
}

export async function readStoredPostMedia(id: string, start: number, end: number): Promise<Buffer> {
  const length = end - start + 1;
  const handle = await open(storagePath(id), "r");
  try {
    const bytes = Buffer.allocUnsafe(length);
    const { bytesRead } = await handle.read(bytes, 0, length, start);
    return bytes.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}
