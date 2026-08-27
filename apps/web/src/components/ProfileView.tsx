"use client";

import {
  APP_SPACING_OPTIONS,
  type AppStyle,
  DEFAULT_APP_STYLE,
  DEFAULT_POST_STYLE,
  POST_BORDER_LINE_STYLE_OPTIONS,
  POST_BORDER_RADIUS_OPTIONS,
  POST_FONT_OPTIONS,
  type PostStyle,
} from "@shome/core";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { ProfilePageEditor } from "#/components/ProfilePageEditor";
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

function AppStyleEditor({
  value,
  onChange,
  onSave,
  saving,
  saved,
}: {
  value: AppStyle;
  onChange: (style: AppStyle) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  function update<K extends keyof AppStyle>(key: K, next: AppStyle[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="card mb-4">
      <div className="mb-4 flex flex-wrap items-start gap-3">
        <div>
          <h3 className="font-semibold">App style</h3>
          <p className="mt-1 text-sm text-slate-400">
            Choose the colors, type, borders, and shape that follow you across the signed-in app.
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="btn-ghost"
            style={{ color: value.appFontColor, fontFamily: value.appFont }}
            onClick={() => onChange({ ...DEFAULT_APP_STYLE })}
          >
            reset
          </button>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: value.appAccentBackgroundColor }}
            onClick={onSave}
            disabled={saving || saved}
          >
            {saving ? "saving…" : saved ? "saved ✓" : "save app style"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)]">
        <fieldset className="grid gap-3 rounded-xl border bg-white/[0.02] p-3 sm:grid-cols-2">
          <legend className="px-1 text-sm font-medium text-slate-100">Style controls</legend>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appBackgroundColor}
              onChange={(event) => update("appBackgroundColor", event.target.value)}
            />
            Background color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appSecondaryBackgroundColor}
              onChange={(event) => update("appSecondaryBackgroundColor", event.target.value)}
            />
            Secondary background
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appAccentBackgroundColor}
              onChange={(event) => update("appAccentBackgroundColor", event.target.value)}
            />
            Accent background
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appAccentColor}
              onChange={(event) => update("appAccentColor", event.target.value)}
            />
            Accent color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appSecondaryAccentColor}
              onChange={(event) => update("appSecondaryAccentColor", event.target.value)}
            />
            Secondary accent
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appBorderStyle}
              onChange={(event) => update("appBorderStyle", event.target.value)}
            />
            Border color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            Border radius
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.appBorderRadius}
              onChange={(event) =>
                update("appBorderRadius", event.target.value as AppStyle["appBorderRadius"])
              }
            >
              {POST_BORDER_RADIUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            Border style
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.appBorderLineStyle}
              onChange={(event) =>
                update("appBorderLineStyle", event.target.value as AppStyle["appBorderLineStyle"])
              }
            >
              {POST_BORDER_LINE_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appFontColor}
              onChange={(event) => update("appFontColor", event.target.value)}
            />
            Font color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appAccentFontColor}
              onChange={(event) => update("appAccentFontColor", event.target.value)}
            />
            Accent font
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.appSecondaryTextColor}
              onChange={(event) => update("appSecondaryTextColor", event.target.value)}
            />
            Secondary text
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            Font
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.appFont}
              onChange={(event) => update("appFont", event.target.value as AppStyle["appFont"])}
            >
              {POST_FONT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            App spacing
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.appSpacing}
              onChange={(event) =>
                update("appSpacing", event.target.value as AppStyle["appSpacing"])
              }
            >
              {APP_SPACING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-start gap-2 text-sm text-slate-200 sm:col-span-2">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-indigo-300"
              checked={value.appOverridePostStyles}
              onChange={(event) => update("appOverridePostStyles", event.target.checked)}
            />
            <span>
              Override post styles
              <span className="mt-0.5 block text-xs leading-5 text-slate-400">
                Use this complete app style on first-party posts instead of each post’s saved look.
              </span>
            </span>
          </label>
        </fieldset>

        <div
          className="grid min-h-40 place-items-center border p-4"
          style={{
            borderColor: value.appBorderStyle,
            borderRadius: value.appBorderRadius,
            borderStyle: value.appBorderLineStyle,
            backgroundColor: value.appBackgroundColor,
            backgroundImage: `radial-gradient(circle at 10% 100%, color-mix(in srgb, ${value.appAccentColor} 4%, transparent), transparent 26%), radial-gradient(circle at 88% 100%, color-mix(in srgb, ${value.appSecondaryAccentColor} 2%, transparent), transparent 22%)`,
            color: value.appFontColor,
            fontFamily: value.appFont,
          }}
        >
          <div className="flex w-full flex-col" style={{ gap: value.appSpacing }}>
            <div
              className="w-full border px-3 py-2 text-sm"
              style={{
                backgroundColor: value.appAccentBackgroundColor,
                borderColor: value.appBorderStyle,
                borderRadius: value.appBorderRadius,
                borderStyle: value.appBorderLineStyle,
                color: value.appSecondaryTextColor,
              }}
            >
              Search your feed…
            </div>
            <div className="flex gap-2">
              {[
                ["filters", value.appSecondaryBackgroundColor],
                ["refresh", value.appSecondaryBackgroundColor],
                ["Create post", value.appAccentBackgroundColor],
              ].map(([label, backgroundColor]) => (
                <span
                  key={label}
                  className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor,
                    borderColor: value.appBorderStyle,
                    color: value.appAccentFontColor,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="flex flex-col" style={{ gap: value.appSpacing }}>
              {["Your shome", "Another post"].map((title) => (
                <div
                  key={title}
                  className="w-full rounded-xl border bg-white/[0.035] p-4 text-slate-100"
                  style={{
                    borderColor: value.appBorderStyle,
                    borderRadius: value.appBorderRadius,
                    borderStyle: value.appBorderLineStyle,
                    backgroundColor: value.appSecondaryBackgroundColor,
                    color: value.appFontColor,
                    fontFamily: value.appFont,
                  }}
                >
                  <p className="font-semibold" style={{ color: value.appFontColor }}>
                    {title}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: value.appSecondaryTextColor }}>
                    Previewing the space between feed posts.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function DefaultPostStyleEditor({
  value,
  appStyle,
  onChange,
  onSave,
  saving,
  saved,
}: {
  value: PostStyle;
  appStyle: AppStyle;
  onChange: (style: PostStyle) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  function update<K extends keyof PostStyle>(key: K, next: PostStyle[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <div className="card mb-4">
      <div className="mb-4 flex flex-wrap items-start gap-3">
        <div>
          <h3 className="font-semibold">Default post style</h3>
          <p className="mt-1 text-sm text-slate-400">
            New posts start with this look. You can still customize an individual post before
            publishing it.
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="btn-ghost"
            style={{
              color: appStyle.appFontColor,
              fontFamily: appStyle.appFont,
            }}
            onClick={() => onChange({ ...DEFAULT_POST_STYLE })}
          >
            reset
          </button>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
            onClick={onSave}
            disabled={saving || saved}
          >
            {saving ? "saving…" : saved ? "saved ✓" : "save default"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)]">
        <fieldset className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-2">
          <legend className="px-1 text-sm font-medium text-slate-100">Style controls</legend>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.postBorderStyle}
              onChange={(event) => update("postBorderStyle", event.target.value)}
            />
            Border color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            Border radius
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.postBorderRadius}
              onChange={(event) =>
                update("postBorderRadius", event.target.value as PostStyle["postBorderRadius"])
              }
            >
              {POST_BORDER_RADIUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            Border style
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.postBorderLineStyle}
              onChange={(event) =>
                update(
                  "postBorderLineStyle",
                  event.target.value as PostStyle["postBorderLineStyle"],
                )
              }
            >
              {POST_BORDER_LINE_STYLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.postBackgroundColor}
              onChange={(event) => update("postBackgroundColor", event.target.value)}
            />
            Background color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.postFontColor}
              onChange={(event) => update("postFontColor", event.target.value)}
            />
            Font color
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200">
            <input
              type="color"
              className="input_color size-9 p-1"
              value={value.postSecondaryTextColor}
              onChange={(event) => update("postSecondaryTextColor", event.target.value)}
            />
            Secondary text
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-200 sm:col-span-2">
            Font
            <select
              className="input flex-1 py-1.5 text-sm"
              value={value.postFont}
              onChange={(event) => update("postFont", event.target.value as PostStyle["postFont"])}
            >
              {POST_FONT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <article
          className="border p-4"
          style={{
            borderColor: value.postBorderStyle,
            borderRadius: value.postBorderRadius,
            borderStyle: value.postBorderLineStyle,
            backgroundColor: value.postBackgroundColor,
            color: value.postFontColor,
            fontFamily: value.postFont,
          }}
        >
          <p className="font-semibold">Your next post</p>
          <p className="mt-2">This preview updates as you edit your default style.</p>
          <p className="mt-3 text-xs" style={{ color: value.postSecondaryTextColor }}>
            @you · just now
          </p>
        </article>
      </div>
    </div>
  );
}

function ProductEditor({
  product,
  appStyle,
  onSaved,
  onDeleted,
}: {
  product?: ProductView;
  appStyle: AppStyle;
  onSaved: (product: ProductView) => void;
  onDeleted: (id: string) => void;
}) {
  const [draft, setDraft] = useState<ProductDraft>(() =>
    product ? draftFromProduct(product) : emptyDraft(),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isNew = !product;

  function update<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const response = isNew
        ? await api.post<{ product: ProductView }>("/api/products", productPayload(draft))
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
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
            disabled={busy}
          >
            {busy ? "saving…" : isNew ? "add product" : "save product"}
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}

export function ProfileView({
  handle,
  onAvatarChange,
  appStyle,
  onAppStyleChange,
}: {
  handle: string | null;
  onAvatarChange: (image: string | null) => void;
  appStyle: AppStyle;
  onAppStyleChange: (style: AppStyle) => void;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const [defaultPostStyle, setDefaultPostStyle] = useState<PostStyle>({
    ...DEFAULT_POST_STYLE,
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [pendingAvatarUploadId, setPendingAvatarUploadId] = useState<string | null>(null);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarNotice, setAvatarNotice] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductView[] | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [styleBusy, setStyleBusy] = useState(false);
  const [appStyleBusy, setAppStyleBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [styleSaved, setStyleSaved] = useState(false);
  const [appStyleSaved, setAppStyleSaved] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const avatarInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      api.get<{ html: string; image: string | null }>("/api/profile"),
      api.get<{ defaultPostStyle: PostStyle }>("/api/post-style"),
      api.get<{ appStyle: AppStyle }>("/api/app-style"),
      api.get<{ products: ProductView[] }>("/api/products"),
    ])
      .then(([profile, postStyle, savedAppStyle, catalog]) => {
        setHtml(profile.html);
        setAvatarUrl(profile.image);
        setDefaultPostStyle(postStyle.defaultPostStyle);
        setStyleSaved(true);
        onAppStyleChange(savedAppStyle.appStyle);
        setAppStyleSaved(true);
        onAvatarChange(profile.image);
        setProducts(catalog.products);
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, [onAvatarChange, onAppStyleChange]);

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
      const next = [...(current ?? []).filter((item) => item.id !== product.id), product];
      return next.sort((a, b) => a.sortOrder - b.sortOrder);
    });
    setAddingProduct(false);
    refreshPreview();
  }

  function onProductDeleted(id: string) {
    setProducts((current) => (current ?? []).filter((product) => product.id !== id));
    refreshPreview();
  }

  async function finishAvatarUpload(uploadId: string) {
    setAvatarBusy(true);
    setError(null);
    try {
      const completed = await api.post<{
        status: "uploading" | "processing" | "ready" | "failed";
      }>(`/api/media/uploads/${uploadId}/complete`);
      if (completed.status === "failed") {
        throw new Error("your profile picture could not be processed");
      }
      if (completed.status !== "ready") {
        setPendingAvatarUploadId(uploadId);
        setAvatarNotice("Your profile picture is still processing. Check again in a moment.");
        return;
      }
      const savedAvatar = await api.put<{ image: string | null }>("/api/profile", {
        avatarUploadId: uploadId,
      });
      setAvatarUrl(savedAvatar.image);
      onAvatarChange(savedAvatar.image);
      setPendingAvatarUploadId(null);
      setAvatarNotice("Profile picture saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setAvatarBusy(false);
    }
  }

  async function uploadAvatar(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("choose an image file for your profile picture");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("profile pictures must be 20 MB or smaller");
      return;
    }

    setAvatarBusy(true);
    setAvatarNotice(null);
    setError(null);
    try {
      const created = await api.post<{
        uploads: { id: string; type: "image"; uploadUrl: string }[];
      }>("/api/media/uploads", {
        uploads: [
          {
            name: file.name,
            type: "image",
            contentType: file.type,
            byteSize: file.size,
          },
        ],
      });
      const upload = created.uploads[0];
      if (!upload) throw new Error("could not create a profile picture upload");
      const form = new FormData();
      form.set("file", file);
      const response = await fetch(upload.uploadUrl, {
        method: "POST",
        body: form,
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "could not upload your profile picture");
      }
      setAvatarBusy(false);
      await finishAvatarUpload(upload.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setAvatarBusy(false);
    }
  }

  function selectAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void uploadAvatar(file);
  }

  async function removeAvatar() {
    setAvatarBusy(true);
    setAvatarNotice(null);
    setError(null);
    try {
      const savedAvatar = await api.put<{ image: string | null }>("/api/profile", {
        avatarUploadId: null,
      });
      setAvatarUrl(savedAvatar.image);
      onAvatarChange(savedAvatar.image);
      setPendingAvatarUploadId(null);
      setAvatarNotice("Profile picture removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setAvatarBusy(false);
    }
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

  async function saveDefaultPostStyle() {
    setStyleBusy(true);
    setError(null);
    try {
      await api.put("/api/post-style", { defaultPostStyle });
      setStyleSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setStyleBusy(false);
    }
  }

  async function saveAppStyle() {
    setAppStyleBusy(true);
    setError(null);
    try {
      await api.put("/api/app-style", { appStyle });
      setAppStyleSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setAppStyleBusy(false);
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
      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <div className="card mb-4 flex flex-wrap items-center gap-4">
        {avatarUrl ? (
          <img className="size-20 rounded-full bg-slate-800 object-cover" src={avatarUrl} alt="" />
        ) : (
          <div
            className="grid size-20 place-items-center rounded-full bg-indigo-300 text-2xl font-bold text-slate-950"
            aria-hidden="true"
          >
            {(handle ?? "s").slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-48 flex-1">
          <h3 className="font-semibold">Profile picture</h3>
          <p className="mt-1 text-sm text-slate-400">
            Use a square image for the best result. JPEG, PNG, GIF, WebP, or AVIF up to 20 MB.
          </p>
          {avatarNotice && <p className="mt-2 text-sm text-emerald-400">{avatarNotice}</p>}
        </div>
        <input
          ref={avatarInput}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
          onChange={selectAvatar}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-ghost"
            style={{
              color: appStyle.appFontColor,
              fontFamily: appStyle.appFont,
            }}
            onClick={() => avatarInput.current?.click()}
            disabled={avatarBusy}
          >
            {avatarBusy ? "uploading…" : avatarUrl ? "change photo" : "add photo"}
          </button>
          {pendingAvatarUploadId && (
            <button
              type="button"
              className="btn"
              onClick={() => void finishAvatarUpload(pendingAvatarUploadId)}
              disabled={avatarBusy}
            >
              check photo
            </button>
          )}
          {avatarUrl && (
            <button
              type="button"
              className="btn-ghost text-red-300"
              onClick={() => void removeAvatar()}
              disabled={avatarBusy}
            >
              remove
            </button>
          )}
        </div>
      </div>

      <AppStyleEditor
        value={appStyle}
        onChange={(style) => {
          onAppStyleChange(style);
          setAppStyleSaved(false);
        }}
        onSave={() => void saveAppStyle()}
        saving={appStyleBusy}
        saved={appStyleSaved}
      />

      <DefaultPostStyleEditor
        value={defaultPostStyle}
        onChange={(style) => {
          setDefaultPostStyle(style);
          setStyleSaved(false);
          setSaved(false);
        }}
        onSave={() => void saveDefaultPostStyle()}
        appStyle={appStyle}
        saving={styleBusy}
        saved={styleSaved}
      />

      <div className="card mb-4">
        <label className="mb-1.5 block font-semibold" htmlFor="portfolio-prompt">
          Vibe-code your page
        </label>
        <p className="mb-2 text-sm text-slate-400">
          Describe the look and content you want. OpenAI creates an editable HTML + CSS draft that
          can include shome blocks.
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
            style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
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

      <ProfilePageEditor
        html={html ?? ""}
        appStyle={appStyle}
        onChange={(nextHtml) => {
          setHtml(nextHtml);
          setSaved(false);
        }}
        previewDoc={previewDoc}
        previewError={previewError}
        onSave={() => void save()}
        saving={busy}
        saved={saved}
        disabled={busy || generating || html === null}
      />

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
            style={{ backgroundColor: appStyle.appAccentBackgroundColor }}
            onClick={() => setAddingProduct(true)}
            disabled={addingProduct}
          >
            add product
          </button>
        </div>
        {addingProduct && (
          <div className="mb-3">
            <ProductEditor
              appStyle={appStyle}
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
                    <span className="text-sm font-normal text-slate-500">(hidden)</span>
                  )}
                </summary>
                <div className="px-3 pb-3">
                  <ProductEditor
                    product={product}
                    appStyle={appStyle}
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
