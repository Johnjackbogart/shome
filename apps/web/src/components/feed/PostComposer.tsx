import { DEFAULT_POST_STYLE, POST_FONT_OPTIONS } from "@shome/core";
import { type ChangeEvent, type SubmitEvent, useEffect, useRef, useState } from "react";
import { api } from "#/lib/api";
import type { ConnectionView, FeedItemView } from "#/lib/types";
import CameraCapture, { type CameraMode } from "./Camera";

type PostComposerProps = {
  onPosted: (post: FeedItemView) => void;
  onSuccess?: () => void;
};

type Delivery = {
  provider: "bluesky" | "mastodon";
  ok: boolean;
  url?: string;
  error?: string;
};

type SelectedMedia = {
  localId: string;
  file: File;
  attachmentId?: string;
  status: "uploading" | "processing" | "ready" | "failed";
};

function videoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    const cleanup = () => {
      URL.revokeObjectURL(url);
      video.remove();
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error(`could not read the duration of ${file.name}`));
    }, 10_000);
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      window.clearTimeout(timeout);
      const duration = video.duration;
      cleanup();
      Number.isFinite(duration)
        ? resolve(duration)
        : reject(new Error(`could not read ${file.name}`));
    };
    video.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error(`could not read the duration of ${file.name}`));
    };
    video.src = url;
  });
}

export default function PostComposer({ onPosted, onSuccess }: PostComposerProps) {
  const [text, setText] = useState("");
  const [borderStyle, setBorderStyle] = useState(DEFAULT_POST_STYLE.borderStyle);
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_POST_STYLE.backgroundColor);
  const [font, setFont] = useState(DEFAULT_POST_STYLE.font);
  const [fontColor, setFontColor] = useState(DEFAULT_POST_STYLE.fontColor);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const [cameraMode, setCameraMode] = useState<CameraMode | null>(null);
  const [connections, setConnections] = useState<ConnectionView[]>([]);
  const [blueskyConnectionId, setBlueskyConnectionId] = useState("");
  const [mastodonConnectionId, setMastodonConnectionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [mediaBusy, setMediaBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  //TODO
  //pull default post styles from user profile
  useEffect(() => {
    api
      .get<{ connections: ConnectionView[] }>("/api/connections")
      .then((res) => setConnections(res.connections))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  const blueskyConnections = connections.filter((connection) => connection.provider === "bluesky");
  const mastodonConnections = connections.filter(
    (connection) => connection.provider === "mastodon",
  );
  const blueskyLength = [...text].length;
  const blueskyTooLong = Boolean(blueskyConnectionId) && blueskyLength > 300;
  const mediaFiles = selectedMedia.map((media) => media.file);
  const incompleteMedia = selectedMedia.some(
    (media) => !media.attachmentId || media.status === "uploading",
  );

  function updateMedia(localId: string, next: Partial<SelectedMedia>) {
    setSelectedMedia((current) =>
      current.map((media) => (media.localId === localId ? { ...media, ...next } : media)),
    );
  }
  const photoCaptureInput = useRef<HTMLInputElement>(null);
  const videoCaptureInput = useRef<HTMLInputElement>(null);

  async function selectFiles(files: File[]) {
    if (files.length === 0) return;
    if (files.some((file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"))) {
      setError("choose photo or video files only");
      return;
    }
    const newlySelected = files.map((file) => ({
      localId: crypto.randomUUID(),
      file,
      status: "uploading" as const,
    }));
    const next = [...selectedMedia, ...newlySelected];
    if (next.filter((media) => media.file.type.startsWith("image/")).length > 10) {
      setError("a post can include up to 10 photos");
      return;
    }
    try {
      const durations = await Promise.all(
        files.filter((file) => file.type.startsWith("video/")).map(videoDuration),
      );
      if (durations.some((duration) => duration > 180)) {
        setError("videos must be 3 minutes or shorter");
        return;
      }
      setError(null);
      setSelectedMedia(next);
      setMediaBusy(true);
      const created = await api.post<{
        uploads: { id: string; type: "image" | "video"; uploadUrl: string }[];
      }>("/api/media/uploads", {
        uploads: files.map((file) => ({
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : "video",
          contentType: file.type,
          byteSize: file.size,
        })),
      });
      await Promise.all(
        created.uploads.map(async (upload, index) => {
          const selected = newlySelected[index];
          if (!selected) return;
          const form = new FormData();
          form.set("file", selected.file);
          const response = await fetch(upload.uploadUrl, {
            method: "POST",
            body: form,
          });
          if (!response.ok) {
            const payload = (await response.json().catch(() => null)) as {
              error?: string;
            } | null;
            throw new Error(payload?.error ?? `could not upload ${selected.file.name}`);
          }
          updateMedia(selected.localId, {
            attachmentId: upload.id,
            status: "processing",
          });
          const completed = await api.post<{ status: SelectedMedia["status"] }>(
            `/api/media/uploads/${upload.id}/complete`,
          );
          updateMedia(selected.localId, {
            attachmentId: upload.id,
            status: completed.status,
          });
        }),
      );
    } catch (mediaError) {
      setSelectedMedia((current) =>
        current.map((media) =>
          media.status === "uploading" ? { ...media, status: "failed" } : media,
        ),
      );
      setError(mediaError instanceof Error ? mediaError.message : "could not read selected media");
    } finally {
      setMediaBusy(false);
    }
  }

  function selectMedia(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    // Let a person select more files later without their old selection being
    // overwritten by the native control.
    event.target.value = "";
    void selectFiles(files);
  }

  function openCamera(mode: CameraMode) {
    const mediaDevices = navigator.mediaDevices as Partial<MediaDevices> | undefined;
    if (typeof mediaDevices?.getUserMedia === "function") {
      setCameraMode(mode);
      return;
    }
    (mode === "photo" ? photoCaptureInput : videoCaptureInput).current?.click();
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await api.post<{
        post: FeedItemView;
        deliveries: Delivery[];
      }>("/api/posts", {
        text,
        borderStyle,
        backgroundColor,
        font,
        fontColor,
        blueskyConnectionId: blueskyConnectionId || undefined,
        mastodonConnectionId: mastodonConnectionId || undefined,
        attachmentIds: selectedMedia.flatMap((media) =>
          media.attachmentId ? [media.attachmentId] : [],
        ),
      });
      setText("");
      setSelectedMedia([]);
      onPosted(res.post);
      if (onSuccess) {
        onSuccess();
      } else {
        if (res.deliveries.length === 0) {
          setNotice("posted to your shome feed");
        } else {
          const succeeded = res.deliveries
            .filter((delivery) => delivery.ok)
            .map((delivery) => delivery.provider);
          const failed = res.deliveries.filter((delivery) => !delivery.ok);
          setNotice(
            [
              "posted to your shome feed",
              succeeded.length > 0 ? `shared to ${succeeded.join(" + ")}` : null,
              ...failed.map(
                (delivery) => `${delivery.provider}: ${delivery.error ?? "could not post"}`,
              ),
            ]
              .filter(Boolean)
              .join(" · "),
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card mb-5 flex flex-col gap-3" onSubmit={submit}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Write a post</h2>
        <span className="text-xs text-slate-500">shows on your public profile</span>
      </div>
      <textarea
        className="input min-h-28 w-full resize-y"
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={5_000}
        placeholder="What’s on your mind?"
        aria-label="Post text"
      />

      <fieldset className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-2">
        <legend className="px-1 text-sm font-medium text-slate-100">Post style</legend>
        <label className="flex items-center gap-2 text-xs text-slate-200">
          <input
            type="color"
            className="input_color size-9 p-1"
            value={borderStyle}
            onChange={(event) => setBorderStyle(event.target.value)}
          />
          Border color
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-200">
          <input
            type="color"
            className="input_color size-9 p-1"
            value={backgroundColor}
            onChange={(event) => setBackgroundColor(event.target.value)}
          />
          Background color
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-200">
          <input
            type="color"
            className="input_color size-9 p-1"
            value={fontColor}
            onChange={(event) => setFontColor(event.target.value)}
          />
          Font color
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-200">
          Font
          <select
            className="input flex-1 py-1.5 text-sm"
            value={font}
            onChange={(event) => setFont(event.target.value as typeof font)}
          >
            {POST_FONT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-ghost cursor-pointer">
          <span>choose photos or videos</span>
          <input
            className="sr-only"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
            multiple
            disabled={mediaBusy}
            onChange={(event) => void selectMedia(event)}
          />
        </label>
        <button type="button" className="btn-ghost" onClick={() => openCamera("photo")}>
          take a photo
        </button>
        <button type="button" className="btn-ghost" onClick={() => openCamera("video")}>
          record a video
        </button>
        <input
          ref={photoCaptureInput}
          className="sr-only"
          type="file"
          accept="image/*"
          capture="environment"
          disabled={mediaBusy}
          onChange={selectMedia}
        />
        <input
          ref={videoCaptureInput}
          className="sr-only"
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          capture="environment"
          disabled={mediaBusy}
          onChange={selectMedia}
        />
        <span className="text-xs text-slate-500">
          Up to 10 photos · MP4/WebM/MOV videos up to 3 min
        </span>
      </div>
      {mediaFiles.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Selected attachments">
          {selectedMedia.map(({ localId, file, status }) => (
            <li
              key={localId}
              className="flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-1 pl-3 text-xs text-slate-300"
            >
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-slate-500">
                {status === "ready" ? "ready" : status === "failed" ? "failed" : `${status}…`}
              </span>
              <button
                type="button"
                className="rounded-full px-1.5 py-0.5 text-slate-400 hover:bg-white/10 hover:text-white"
                onClick={() =>
                  setSelectedMedia((current) =>
                    current.filter((media) => media.localId !== localId),
                  )
                }
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex items-center gap-2 text-slate-200">
          <input
            type="checkbox"
            checked={Boolean(blueskyConnectionId)}
            disabled={blueskyConnections.length === 0}
            onChange={(event) =>
              setBlueskyConnectionId(event.target.checked ? (blueskyConnections[0]?.id ?? "") : "")
            }
          />
          Post to Bluesky
        </label>
        {blueskyConnectionId && blueskyConnections.length > 1 && (
          <select
            className="input py-1 text-sm"
            value={blueskyConnectionId}
            onChange={(event) => setBlueskyConnectionId(event.target.value)}
            aria-label="Bluesky connection"
          >
            {blueskyConnections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                {connection.account ?? connection.label}
              </option>
            ))}
          </select>
        )}
        <label className="flex items-center gap-2 text-slate-200">
          <input
            type="checkbox"
            checked={Boolean(mastodonConnectionId)}
            disabled={mastodonConnections.length === 0}
            onChange={(event) =>
              setMastodonConnectionId(
                event.target.checked ? (mastodonConnections[0]?.id ?? "") : "",
              )
            }
          />
          Post to Mastodon
        </label>
        {mastodonConnectionId && mastodonConnections.length > 1 && (
          <select
            className="input py-1 text-sm"
            value={mastodonConnectionId}
            onChange={(event) => setMastodonConnectionId(event.target.value)}
            aria-label="Mastodon connection"
          >
            {mastodonConnections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                {connection.account ?? connection.label}
              </option>
            ))}
          </select>
        )}
        {(blueskyConnections.length === 0 || mastodonConnections.length === 0) && (
          <span className="text-xs text-slate-500">Link accounts in Sources to cross-post.</span>
        )}
      </div>
      {blueskyConnectionId && (
        <p className={blueskyTooLong ? "text-xs text-rose-300" : "text-xs text-slate-500"}>
          Bluesky: {blueskyLength}/300 characters
        </p>
      )}
      {mediaFiles.length > 0 && (blueskyConnectionId || mastodonConnectionId) && (
        <p className="text-xs text-slate-500">
          Attachments publish to shome. Connected platforms currently receive text only.
        </p>
      )}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="btn"
          disabled={
            busy ||
            mediaBusy ||
            incompleteMedia ||
            (text.trim().length === 0 && mediaFiles.length === 0) ||
            blueskyTooLong
          }
        >
          {busy ? "posting…" : "post"}
        </button>
        {notice && <p className="text-sm text-emerald-400">{notice}</p>}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {cameraMode && (
        <CameraCapture
          mode={cameraMode}
          onCaptured={(file) => {
            void selectFiles([file]);
            setCameraMode(null);
          }}
          onClose={() => setCameraMode(null)}
        />
      )}
    </form>
  );
}
