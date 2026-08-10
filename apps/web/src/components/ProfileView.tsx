"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const STARTER = `<style>
  body { margin: 0; font-family: Georgia, serif; background: #f7f3ec; color: #2b2620; }
  .hero { padding: 4rem 2rem; text-align: center; }
  .hero h1 { font-size: 3rem; margin: 0; }
  .hero p { color: #7a6f5f; }
  .links { display: flex; gap: 1rem; justify-content: center; padding-bottom: 3rem; }
  .links a { color: #2b2620; border: 1px solid #2b2620; padding: .5rem 1rem; border-radius: 999px; text-decoration: none; }
</style>
<div class="hero">
  <h1>hi, I'm me.</h1>
  <p>this corner of the internet is mine. no scripts, all vibes.</p>
</div>
<div class="links">
  <a href="https://bsky.app">bluesky</a>
  <a href="https://example.com">my blog</a>
</div>`;

export function ProfileView({ handle }: { handle: string | null }) {
  const [html, setHtml] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    api
      .get<{ html: string }>("/api/profile")
      .then((res) => setHtml(res.html))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  async function save() {
    setBusy(true);
    setError(null);
    try {
      await api.put("/api/profile", { html: html ?? "" });
      setSaved(true);
      setVersion((v) => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold">My page</h2>
        <div className="flex-1" />
        {saved && <span className="text-sm text-emerald-400">saved ✓</span>}
        {handle && (
          <a
            className="text-accent hover:underline"
            href={`/p/${handle}`}
            target="_blank"
            rel="noreferrer"
          >
            view public page ↗
          </a>
        )}
        <button type="button" className="btn" onClick={save} disabled={busy || html === null}>
          {busy ? "saving…" : "save"}
        </button>
      </div>
      <p className="mb-4 text-sm text-zinc-400">
        Write any HTML + CSS — vibe-code it, paste it from an LLM, whatever. It renders in a locked
        sandbox (no scripts, for now), served at your public page.
      </p>
      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <div className="mb-3 grid min-h-[26rem] grid-cols-1 gap-4 lg:grid-cols-2">
        <textarea
          className="input min-h-[26rem] resize-y font-mono text-[0.85rem] leading-relaxed whitespace-pre"
          value={html ?? ""}
          onChange={(e) => {
            setHtml(e.target.value);
            setSaved(false);
          }}
          spellCheck={false}
          placeholder={"<style>…</style>\n<h1>hi</h1>"}
        />
        {handle ? (
          <iframe
            key={version}
            className="min-h-[26rem] w-full rounded-xl border border-zinc-800 bg-white"
            sandbox="allow-popups allow-popups-to-escape-sandbox"
            src={`/p/${handle}/content?v=${version}`}
            title="preview"
          />
        ) : (
          <div className="card flex items-center justify-center">
            <p className="text-zinc-400">save once to see your preview</p>
          </div>
        )}
      </div>

      {(html ?? "") === "" && (
        <button type="button" className="btn-ghost" onClick={() => setHtml(STARTER)}>
          insert starter template
        </button>
      )}
    </section>
  );
}
