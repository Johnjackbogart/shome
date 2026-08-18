"use client";

import { useEffect, useState } from "react";
import { api } from "#/lib/api";

type ProductView = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  checkoutUrl: string;
  visible: boolean;
  sortOrder: number;
};

type ProductDraft = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  checkoutUrl: string;
  visible: boolean;
  sortOrder: string;
};

const BLOCKS = [
  {
    label: "posts",
    source: "<shome-posts />",
    description: "your first-party posts",
  },
  {
    label: "shop",
    source: "<shome-products />",
    description: "your visible products",
  },
];

function emptyDraft(): ProductDraft {
  return {
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    checkoutUrl: "",
    visible: true,
    sortOrder: "0",
  };
}

function draftFromProduct(product: ProductView): ProductDraft {
  return {
    title: product.title,
    description: product.description ?? "",
    price: product.price ?? "",
    imageUrl: product.imageUrl ?? "",
    checkoutUrl: product.checkoutUrl,
    visible: product.visible,
    sortOrder: String(product.sortOrder),
  };
}

function productPayload(draft: ProductDraft) {
  return {
    title: draft.title,
    description: draft.description || null,
    price: draft.price || null,
    imageUrl: draft.imageUrl || null,
    checkoutUrl: draft.checkoutUrl,
    visible: draft.visible,
    sortOrder: Number.parseInt(draft.sortOrder, 10) || 0,
  };
}

function ProductEditor({
  product,
  onSaved,
  onDeleted,
}: {
  product?: ProductView;
  onSaved: (product: ProductView) => void;
  onDeleted: (id: string) => void;
}) {
  const [draft, setDraft] = useState<ProductDraft>(() =>
    product ? draftFromProduct(product) : emptyDraft(),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isNew = !product;

  function update<K extends keyof ProductDraft>(
    key: K,
    value: ProductDraft[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const response = isNew
        ? await api.post<{ product: ProductView }>(
            "/api/products",
            productPayload(draft),
          )
        : await api.put<{ product: ProductView }>(
            `/api/products/${product.id}`,
            productPayload(draft),
          );
      onSaved(response.product);
      if (isNew) setDraft(emptyDraft());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!product) return;
    setBusy(true);
    setError(null);
    try {
      await api.del(`/api/products/${product.id}`);
      onDeleted(product.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="grid gap-3 rounded-xl border border-white/10 bg-black/10 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        void save();
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-slate-300">
          Name
          <input
            className="input"
            required
            value={draft.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Limited-run print"
          />
        </label>
        <label className="grid gap-1 text-sm text-slate-300">
          Price label
          <input
            className="input"
            value={draft.price}
            onChange={(event) => update("price", event.target.value)}
            placeholder="$20 CAD"
          />
        </label>
      </div>
      <label className="grid gap-1 text-sm text-slate-300">
        Description
        <textarea
          className="input min-h-20 resize-y"
          value={draft.description}
          onChange={(event) => update("description", event.target.value)}
          placeholder="A short note about the product."
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-slate-300">
          Image URL
          <input
            className="input"
            type="url"
            value={draft.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            placeholder="https://…"
          />
        </label>
        <label className="grid gap-1 text-sm text-slate-300">
          Checkout URL
          <input
            className="input"
            required
            type="url"
            value={draft.checkoutUrl}
            onChange={(event) => update("checkoutUrl", event.target.value)}
            placeholder="https://checkout…"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={draft.visible}
            onChange={(event) => update("visible", event.target.checked)}
          />
          visible on my page
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          Order
          <input
            className="input w-20"
            type="number"
            value={draft.sortOrder}
            onChange={(event) => update("sortOrder", event.target.value)}
          />
        </label>
        <div className="ml-auto flex gap-2">
          {!isNew && (
            <button
              type="button"
              className="btn-ghost text-red-300"
              onClick={() => void remove()}
              disabled={busy}
            >
              delete
            </button>
          )}
          <button type="submit" className="btn" disabled={busy}>
            {busy ? "saving…" : isNew ? "add product" : "save product"}
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

export function ProfileView({ handle }: { handle: string | null }) {
  const [html, setHtml] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductView[] | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    Promise.all([
      api.get<{ html: string }>("/api/profile"),
      api.get<{ products: ProductView[] }>("/api/products"),
    ])
      .then(([profile, catalog]) => {
        setHtml(profile.html);
        setProducts(catalog.products);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err)),
      );
  }, []);

  // The preview renders the current draft through the same server-side
  // component + sanitize pipeline as the published page, so generated or
  // hand-typed HTML appears without saving first. `version` re-runs it when the
  // data behind a block changes (products, posts) but the draft text does not.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `version` is a manual refetch trigger, not read inside the effect.
  useEffect(() => {
    if (html === null) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      api
        .post<{ doc: string }>("/api/profile/preview", { html })
        .then((res) => {
          if (cancelled) return;
          setPreviewDoc(res.doc);
          setPreviewError(null);
        })
        .catch((err) => {
          if (cancelled) return;
          setPreviewError(err instanceof Error ? err.message : String(err));
        });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [html, version]);

  function refreshPreview() {
    setVersion((current) => current + 1);
  }

  function onProductSaved(product: ProductView) {
    setProducts((current) => {
      const next = [
        ...(current ?? []).filter((item) => item.id !== product.id),
        product,
      ];
      return next.sort((a, b) => a.sortOrder - b.sortOrder);
    });
    setAddingProduct(false);
    refreshPreview();
  }

  function onProductDeleted(id: string) {
    setProducts((current) =>
      (current ?? []).filter((product) => product.id !== id),
    );
    refreshPreview();
  }

  function insertBlock(source: string) {
    setHtml((current) => `${current?.trimEnd() ?? ""}\n\n${source}\n`);
    setSaved(false);
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      await api.put("/api/profile", { html: html ?? "" });
      setSaved(true);
      refreshPreview();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function generatePortfolio() {
    setGenerating(true);
    setError(null);
    setGenerated(false);
    try {
      const res = await api.post<{ html: string }>("/api/profile/generate", {
        prompt,
        currentHtml: html ?? undefined,
      });
      setHtml(res.html);
      setSaved(false);
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setGenerating(false);
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
        <button
          type="button"
          className="btn"
          onClick={save}
          disabled={busy || generating || html === null}
        >
          {busy ? "saving…" : "save"}
        </button>
      </div>
      <p className="mb-4 text-sm text-slate-400">
        Write HTML + CSS, then drop in shome blocks wherever you want them.
        Pages remain locked to a no-script sandbox.
      </p>
      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <div className="card mb-4">
        <p className="mb-2 font-semibold">Building blocks</p>
        <div className="flex flex-wrap gap-2">
          {BLOCKS.map((block) => (
            <button
              key={block.label}
              type="button"
              className="btn-ghost"
              onClick={() => insertBlock(block.source)}
            >
              add {block.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Inserts a small, editable tag.{" "}
          <code className="text-slate-200">&lt;shome-posts /&gt;</code> shows
          your posts;{" "}
          <code className="text-slate-200">&lt;shome-products /&gt;</code> shows
          visible catalog items.
        </p>
      </div>

      <div className="card mb-4">
        <label
          className="mb-1.5 block font-semibold"
          htmlFor="portfolio-prompt"
        >
          Vibe-code your page
        </label>
        <p className="mb-2 text-sm text-slate-400">
          Describe the look and content you want. OpenAI creates an editable
          HTML + CSS draft that can include shome blocks.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="portfolio-prompt"
            className="input min-w-0 flex-1"
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
            placeholder="e.g. playful creative director portfolio, bright cobalt, editorial type"
          />
          <button
            type="button"
            className="btn"
            onClick={() => void generatePortfolio()}
            disabled={generating || prompt.trim().length < 2}
          >
            {generating ? "creating…" : "generate with OpenAI"}
          </button>
        </div>
        {generated && (
          <p className="mt-2 text-sm text-emerald-400">
            Draft ready — review it, then save to publish.
          </p>
        )}
      </div>

      <div className="mb-3 grid min-h-[26rem] grid-cols-1 gap-4 lg:grid-cols-2">
        <textarea
          className="input min-h-[26rem] resize-y font-mono text-[0.85rem] leading-relaxed whitespace-pre"
          value={html ?? ""}
          onChange={(event) => {
            setHtml(event.target.value);
            setSaved(false);
          }}
          spellCheck={false}
          placeholder={"<style>…</style>\n<h1>hi</h1>\n<shome-products />"}
        />
        {previewDoc === null ? (
          <div className="card flex items-center justify-center">
            <p className="text-slate-400">{previewError ?? "building your preview…"}</p>
          </div>
        ) : (
          <div className="relative min-h-[26rem]">
            <iframe
              className="h-full min-h-[26rem] w-full rounded-2xl border border-white/10 bg-white"
              sandbox="allow-popups allow-popups-to-escape-sandbox"
              srcDoc={previewDoc}
              title="preview"
            />
            {previewError && (
              <p className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-red-950/90 px-3 py-2 text-sm text-red-200">
                preview is out of date: {previewError}
              </p>
            )}
          </div>
        )}
      </div>

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div>
            <h3 className="text-lg font-bold">Shop</h3>
            <p className="text-sm text-slate-400">
              Add products and send visitors to your existing checkout.
            </p>
          </div>
          <button
            type="button"
            className="btn ml-auto"
            onClick={() => setAddingProduct(true)}
            disabled={addingProduct}
          >
            add product
          </button>
        </div>
        {addingProduct && (
          <div className="mb-3">
            <ProductEditor
              onSaved={onProductSaved}
              onDeleted={onProductDeleted}
            />
          </div>
        )}
        {products === null ? (
          <p className="text-sm text-slate-400">loading products…</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-slate-400">
            No products yet. Add one, then insert the shop block into your page.
          </p>
        ) : (
          <div className="grid gap-3">
            {products.map((product) => (
              <details
                key={product.id}
                className="rounded-xl border border-white/10 bg-white/[0.025]"
                open={products.length === 1}
              >
                <summary className="cursor-pointer px-4 py-3 font-medium">
                  {product.title}{" "}
                  {!product.visible && (
                    <span className="text-sm font-normal text-slate-500">
                      (hidden)
                    </span>
                  )}
                </summary>
                <div className="px-3 pb-3">
                  <ProductEditor
                    product={product}
                    onSaved={onProductSaved}
                    onDeleted={onProductDeleted}
                  />
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
