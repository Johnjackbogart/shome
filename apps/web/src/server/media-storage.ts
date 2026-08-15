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

function mp4DurationMs(bytes: Buffer): number | null {
  const inspectBoxes = (start: number, end: number, depth: number): number | null => {
    if (depth > 8) return null;
    for (let offset = start; offset + 8 <= end; ) {
      const box = readBoxSize(bytes, offset, end);
      if (!box || offset + box.size > end) return null;
      const type = bytes.subarray(offset + 4, offset + 8).toString("ascii");
      const payloadStart = offset + box.header;
      const boxEnd = offset + box.size;
      if (type === "mvhd") {
        if (payloadStart + 4 > boxEnd) return null;
        const version = bytes.readUInt8(payloadStart);
        const timescaleOffset = payloadStart + (version === 1 ? 20 : 12);
        const durationOffset = payloadStart + (version === 1 ? 24 : 16);
        const durationLength = version === 1 ? 8 : 4;
        if (timescaleOffset + 4 > boxEnd || durationOffset + durationLength > boxEnd) return null;
        const timescale = bytes.readUInt32BE(timescaleOffset);
        if (timescale === 0) return null;
        const duration =
          version === 1
            ? bytes.readBigUInt64BE(durationOffset)
            : BigInt(bytes.readUInt32BE(durationOffset));
        if (duration === 0xffffffffn || duration > BigInt(Number.MAX_SAFE_INTEGER)) return null;
        const milliseconds = (Number(duration) * 1000) / timescale;
        return Number.isFinite(milliseconds) && milliseconds > 0 ? Math.ceil(milliseconds) : null;
      }
      if (type === "moov") {
        const duration = inspectBoxes(payloadStart, boxEnd, depth + 1);
        if (duration !== null) return duration;
      }
      offset = boxEnd;
    }
    return null;
  };

  return inspectBoxes(0, bytes.length, 0);
}

function readEbmlSize(bytes: Buffer, offset: number): { value: number; length: number } | null {
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
  // Unknown-sized elements cannot give us a reliable Info boundary.
  if (value === 2 ** (7 * length) - 1) return null;
  return { value, length };
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
  const infoOffset = bytes.indexOf(Buffer.from([0x15, 0x49, 0xa9, 0x66]));
  if (infoOffset < 0) return null;
  const infoSize = readEbmlSize(bytes, infoOffset + 4);
  if (!infoSize) return null;
  let offset = infoOffset + 4 + infoSize.length;
  const end = offset + infoSize.value;
  if (end > bytes.length) return null;

  let timestampScale = 1_000_000;
  let duration: number | null = null;
  while (offset < end) {
    const id = readEbmlId(bytes, offset);
    if (!id) return null;
    const size = readEbmlSize(bytes, offset + id.length);
    if (!size) return null;
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
