const WEBM_HEADER = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3]);
const SEGMENT_ID = new Uint8Array([0x18, 0x53, 0x80, 0x67]);
const INFO_ID = 0x1549a966;
const TIMESTAMP_SCALE_ID = 0x2ad7b1;
const DURATION_ID = 0x4489;

type EbmlSize = {
  value: number;
  length: number;
  unknown: boolean;
};

type EbmlId = {
  value: number;
  length: number;
};

function indexOf(bytes: Uint8Array, needle: Uint8Array, start = 0): number {
  outer: for (let offset = start; offset <= bytes.length - needle.length; offset += 1) {
    for (let index = 0; index < needle.length; index += 1) {
      if (bytes[offset + index] !== needle[index]) continue outer;
    }
    return offset;
  }
  return -1;
}

function readEbmlSize(bytes: Uint8Array, offset: number): EbmlSize | null {
  const first = bytes[offset];
  if (first === undefined) return null;
  let mask = 0x80;
  let length = 1;
  while ((first & mask) === 0 && length <= 8) {
    mask >>= 1;
    length += 1;
  }
  if (length > 8 || offset + length > bytes.length) return null;
  let value = first & (mask - 1);
  for (let index = 1; index < length; index += 1) {
    const byte = bytes[offset + index];
    if (byte === undefined) return null;
    value = value * 256 + byte;
  }
  return { value, length, unknown: value === 2 ** (7 * length) - 1 };
}

function readEbmlId(bytes: Uint8Array, offset: number): EbmlId | null {
  const first = bytes[offset];
  if (first === undefined) return null;
  let mask = 0x80;
  let length = 1;
  while ((first & mask) === 0 && length <= 4) {
    mask >>= 1;
    length += 1;
  }
  if (length > 4 || offset + length > bytes.length) return null;
  let value = 0;
  for (let index = 0; index < length; index += 1) {
    const byte = bytes[offset + index];
    if (byte === undefined) return null;
    value = value * 256 + byte;
  }
  return { value, length };
}

function readUnsigned(bytes: Uint8Array, offset: number, length: number): number | null {
  if (length < 1 || length > 6 || offset + length > bytes.length) return null;
  let value = 0;
  for (let index = 0; index < length; index += 1) {
    const byte = bytes[offset + index];
    if (byte === undefined) return null;
    value = value * 256 + byte;
  }
  return value;
}

function writeEbmlSize(value: number, preferredLength?: number): Uint8Array | null {
  if (!Number.isSafeInteger(value) || value < 0) return null;
  let length = preferredLength ?? 1;
  while (length <= 8) {
    const maximumValue = 2 ** (7 * length) - 2;
    if (value <= maximumValue) {
      const encoded = new Uint8Array(length);
      let remaining = value;
      for (let index = length - 1; index >= 0; index -= 1) {
        encoded[index] = remaining & 0xff;
        remaining = Math.floor(remaining / 256);
      }
      encoded[0] = (encoded[0] ?? 0) | (1 << (8 - length));
      return encoded;
    }
    length += 1;
  }
  return null;
}

function join(...parts: readonly Uint8Array[]): Uint8Array {
  const length = parts.reduce((total, part) => total + part.length, 0);
  const joined = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    joined.set(part, offset);
    offset += part.length;
  }
  return joined;
}

/**
 * Adds a Matroska Duration element to a browser-generated WebM recording.
 * MediaRecorder output commonly leaves this optional element out, causing
 * browser metadata APIs to report an infinite duration even after recording
 * has stopped.
 */
export function stampWebmDuration(bytes: Uint8Array, durationMs: number): Uint8Array | null {
  if (!Number.isFinite(durationMs) || durationMs <= 0 || indexOf(bytes, WEBM_HEADER) !== 0) {
    return null;
  }

  const segmentOffset = indexOf(bytes, SEGMENT_ID, WEBM_HEADER.length);
  if (segmentOffset < 0) return null;
  const segmentSizeOffset = segmentOffset + SEGMENT_ID.length;
  const segmentSize = readEbmlSize(bytes, segmentSizeOffset);
  if (!segmentSize) return null;
  const segmentPayloadOffset = segmentSizeOffset + segmentSize.length;

  const segmentEnd = segmentSize.unknown ? bytes.length : segmentPayloadOffset + segmentSize.value;
  if (segmentEnd > bytes.length) return null;

  let infoSize: EbmlSize | null = null;
  let infoSizeOffset = 0;
  let infoPayloadOffset = 0;
  let infoEnd = 0;
  for (let offset = segmentPayloadOffset; offset < segmentEnd; ) {
    const id = readEbmlId(bytes, offset);
    if (!id) return null;
    const sizeOffset = offset + id.length;
    const size = readEbmlSize(bytes, sizeOffset);
    if (!size) return null;
    const payloadOffset = sizeOffset + size.length;
    const payloadEnd = payloadOffset + size.value;
    if (payloadEnd > segmentEnd) return null;
    if (id.value === INFO_ID) {
      if (size.unknown) return null;
      infoSize = size;
      infoSizeOffset = sizeOffset;
      infoPayloadOffset = payloadOffset;
      infoEnd = payloadEnd;
      break;
    }
    // A browser-generated, unknown-sized Cluster can only be the final
    // top-level element. It cannot be skipped safely to find later metadata.
    if (size.unknown) return null;
    offset = payloadEnd;
  }
  if (!infoSize) return null;

  let timestampScale = 1_000_000;
  for (let offset = infoPayloadOffset; offset < infoEnd; ) {
    const id = readEbmlId(bytes, offset);
    if (!id) return null;
    const size = readEbmlSize(bytes, offset + id.length);
    if (!size || size.unknown) return null;
    const payloadOffset = offset + id.length + size.length;
    const payloadEnd = payloadOffset + size.value;
    if (payloadEnd > infoEnd) return null;
    if (id.value === DURATION_ID) return bytes;
    if (id.value === TIMESTAMP_SCALE_ID) {
      const value = readUnsigned(bytes, payloadOffset, size.value);
      if (value === null || value <= 0) return null;
      timestampScale = value;
    }
    offset = payloadEnd;
  }

  const durationValue = (durationMs * 1_000_000) / timestampScale;
  if (!Number.isFinite(durationValue) || durationValue <= 0) return null;
  const duration = new Uint8Array(11);
  duration.set([0x44, 0x89, 0x88]);
  new DataView(duration.buffer).setFloat64(3, durationValue, false);

  const nextInfoSize = writeEbmlSize(infoSize.value + duration.length, infoSize.length);
  if (!nextInfoSize) return null;
  const addedBytes = nextInfoSize.length - infoSize.length + duration.length;
  const nextSegmentSize = segmentSize.unknown
    ? bytes.subarray(segmentSizeOffset, segmentPayloadOffset)
    : writeEbmlSize(segmentSize.value + addedBytes, segmentSize.length);
  if (!nextSegmentSize) return null;

  return join(
    bytes.subarray(0, segmentSizeOffset),
    nextSegmentSize,
    bytes.subarray(segmentPayloadOffset, infoSizeOffset),
    nextInfoSize,
    bytes.subarray(infoPayloadOffset, infoEnd),
    duration,
    bytes.subarray(infoEnd),
  );
}
