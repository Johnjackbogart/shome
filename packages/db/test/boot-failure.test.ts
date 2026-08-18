import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDatabase } from "../src/client";

// A directory PGlite cannot boot from. The real-world trigger is a second
// process holding the data dir (PGlite is single-process), which is awkward to
// stage here; any unbootable dir exercises the same path.
let dir: string;

beforeAll(() => {
  dir = mkdtempSync(path.join(tmpdir(), "shome-badpg-"));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "PG_VERSION"), "17\n");
  writeFileSync(path.join(dir, "postgresql.conf"), "# not a real data dir\n");
});

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("embedded database that cannot boot", () => {
  it("rejects `ready` with an error naming the directory and the cause", async () => {
    const handle = createDatabase({ pgliteDir: dir });
    const err = await handle.ready.then(
      () => undefined,
      (e: Error) => e,
    );
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toContain(dir);
    expect(err?.message).toMatch(/failed to start/);
    expect(err?.message).toMatch(/single-process/);
    // The underlying failure is kept for anyone who needs it; on a WASM abort
    // this is the otherwise-unattributable `RuntimeError: Aborted()`.
    expect(err?.cause).toBeDefined();
  });

  it("surfaces the same error from migrate()", async () => {
    const handle = createDatabase({ pgliteDir: dir });
    await expect(handle.migrate()).rejects.toThrow(/failed to start/);
  });

  it("does not emit an unhandled rejection when nothing awaits the handle", async () => {
    const seen: unknown[] = [];
    const record = (reason: unknown) => seen.push(reason);
    process.on("unhandledRejection", record);
    // Exactly what the Next server does: construct at module scope, await
    // nothing. This used to surface as `RuntimeError: Aborted()` with a stack
    // entirely inside the Emscripten bundle.
    createDatabase({ pgliteDir: dir });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    process.off("unhandledRejection", record);
    expect(seen).toEqual([]);
  });
});
