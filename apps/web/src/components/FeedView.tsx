"use client";

import { type ChangeEvent, type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { api } from "#/lib/api";
import { timeAgo, truncate } from "#/lib/format";
import type { ConnectionView, FeedItemView } from "#/lib/types";

const KINDS = ["post", "rss", "bluesky", "mastodon", "youtube"];

// Static map so Tailwind's scanner sees every class (no template-built names).
const KIND_COLORS: Record<string, string> = {
  post: "text-emerald-300",
  rss: "text-orange-300",
  bluesky: "text-sky-300",
  mastodon: "text-violet-300",
  youtube: "text-red-300",
};

export function FeedView() {
  const [items, setItems] = useState<FeedItemView[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [appliedQ, setAppliedQ] = useState("");
  const [kind, setKind] = useState("");
  const [composerVisible, setComposerVisible] = useState(false);
  const refreshedOnMount = useRef(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (appliedQ) params.set("q", appliedQ);
      if (kind) params.set("kind", kind);
      const res = await api.get<{ items: FeedItemView[] }>(`/api/feed?${params}`);
      setItems(res.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [appliedQ, kind]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await api.post("/api/refresh");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, [load]);

  useEffect(() => {
    if (refreshedOnMount.current) return;
    refreshedOnMount.current = true;
    void refreshAll();
  }, [refreshAll]);

  function search(e: FormEvent) {
    e.preventDefault();
    setAppliedQ(q.trim());
  }

  useEffect(() => {
    if (!composerVisible) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setComposerVisible(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [composerVisible]);

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <form className="min-w-48 flex-1" onSubmit={search}>
          <input
            className="input w-full"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search your feed…"
          />
        </form>
        <select className="input" value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="">all kinds</option>
          {KINDS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <button type="button" className="btn" onClick={refreshAll} disabled={busy}>
          {busy ? "refreshing…" : "refresh"}
        </button>
      </div>

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      {items === null ? (
        <p className="text-slate-400">loading…</p>
      ) : items.length === 0 ? (
        <div className="card py-12 text-center">
          <p>Nothing here yet.</p>
          <p className="text-slate-400">
            Create your first post, or add a source in the Sources tab.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <button
        type="button"
        className="btn fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full px-5 py-3 shadow-lg shadow-black/40 sm:right-6 sm:bottom-6"
        onClick={() => setComposerVisible(true)}
        aria-haspopup="dialog"
        aria-expanded={composerVisible}
      >
        <span aria-hidden="true" className="text-xl leading-none">
          +
        </span>
        Create post
      </button>

      {composerVisible && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Create post"
        >
          <div className="mx-auto flex min-h-full w-full max-w-2xl items-center">
            <div className="w-full py-4">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  className="btn-ghost px-3 py-1.5"
                  onClick={() => setComposerVisible(false)}
                >
                  close
                </button>
              </div>
              <PostComposer
                onPosted={(post) => {
                  setItems((current) => [post, ...(current ?? [])]);
                  setKind("");
                  setQ("");
                  setAppliedQ("");
                }}
                onSuccess={() => setComposerVisible(false)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FeedItem({ item }: { item: FeedItemView }) {
  const images = item.media.filter((m) => m.type === "image");
  const videos = item.media.filter((m) => m.type === "video");
  const other = item.media.filter((m) => m.type !== "image" && m.type !== "video");
  const crossPosts = item.crossPosts ?? [];
  return (
    <article className="card">
      <header className="mb-2 flex items-center gap-2.5">
        {item.authorAvatarUrl && (
          <img
            className="h-9 w-9 rounded-full bg-slate-800 object-cover"
            src={item.authorAvatarUrl}
            alt=""
            loading="lazy"
          />
        )}
        <div className="flex min-w-0 flex-col">
          <span className="font-semibold">
            {item.authorName ?? item.sourceTitle ?? item.sourceKind}
            {item.authorHandle && (
              <span className="font-normal text-slate-400"> @{item.authorHandle}</span>
            )}
          </span>
          <span className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span className={`badge ${KIND_COLORS[item.sourceKind] ?? ""}`}>{item.sourceKind}</span>
            {item.sourceTitle ? <span>{item.sourceTitle} ·</span> : null}
            <span>{timeAgo(item.publishedAt ?? item.fetchedAt)}</span>
          </span>
        </div>
      </header>

      {item.title && (
        <h3 className="mt-0.5 mb-1 text-[1.05rem] font-semibold">
          {item.url ? (
            <a
              className="text-slate-100 hover:text-indigo-100 hover:underline"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
      )}

      {item.html ? (
        // Sanitized server-side at ingest (tight allowlist, no styles/scripts).
        <div
          className="prose prose-sm prose-invert max-w-none [overflow-wrap:anywhere]"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
      ) : item.text ? (
        <p className="[overflow-wrap:anywhere]">{truncate(item.text, 500)}</p>
      ) : null}

      {images.length > 0 && (
        <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
          {images.map((media) =>
            media.status && media.status !== "ready" ? (
              <MediaState key={media.url} status={media.status} type="photo" />
            ) : (
              <img
                key={media.url}
                className="max-h-80 w-full rounded-lg object-cover"
                src={media.url}
                alt={media.alt ?? ""}
                loading="lazy"
              />
            ),
          )}
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-2.5 grid gap-2">
          {videos.map((media) => {
            if (media.status && media.status !== "ready") {
              return <MediaState key={media.url} status={media.status} type="video" />;
            }
            if (media.embedUrl) {
              return (
                <iframe
                  key={media.url}
                  className="aspect-video w-full rounded-lg border-0 bg-black"
                  src={media.embedUrl}
                  title="Post video"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              );
            }
            return (
              // biome-ignore lint/a11y/useMediaCaption: caption uploads are not part of the current media contract.
              <video
                key={media.url}
                className="max-h-[70vh] w-full rounded-lg bg-black object-contain"
                controls
                playsInline
                preload="metadata"
              >
                <source src={media.url} />
                Your browser does not support this video.
              </video>
            );
          })}
        </div>
      )}

      {(other.length > 0 || item.url || crossPosts.length > 0) && (
        <footer className="mt-2.5 flex items-center gap-3 text-sm">
          {other.map((m) => (
            <a
              key={m.url}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-slate-100"
              href={m.url}
              target="_blank"
              rel="noreferrer"
            >
              ▶ {m.type}
            </a>
          ))}
          {item.url && (
            <a
              className="text-slate-400 hover:text-indigo-100"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              open ↗
            </a>
          )}
          {crossPosts.map((crossPost) => (
            <a
              key={crossPost.provider}
              className="text-slate-400 hover:text-indigo-100"
              href={crossPost.url}
              target="_blank"
              rel="noreferrer"
            >
              {crossPost.provider} ↗
            </a>
          ))}
        </footer>
      )}
    </article>
  );
}

function MediaState({ status, type }: { status: string; type: "photo" | "video" }) {
  const message =
    status === "failed"
      ? `${type} processing failed`
      : status === "uploading"
        ? `${type} uploading…`
        : `${type} processing…`;
  return (
    <div className="grid min-h-32 place-items-center rounded-lg border border-white/10 bg-black/30 px-4 text-sm text-slate-400">
      {message}
    </div>
  );
}

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

type CameraMode = "photo" | "video";

function CameraCapture({
  mode,
  onCaptured,
  onClose,
}: {
  mode: CameraMode;
  onCaptured: (file: File) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const saveRecordingRef = useRef(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let activeStream: MediaStream | null = null;
    void navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        ...(mode === "video" ? { audio: true } : {}),
      })
      .then((nextStream) => {
        activeStream = nextStream;
        if (cancelled) {
          nextStream.getTracks().forEach((track) => {
            track.stop();
          });
          return;
        }
        setStream(nextStream);
      })
      .catch(() =>
        setError("could not access the camera — check its browser permission and try again"),
      );
    return () => {
      cancelled = true;
      saveRecordingRef.current = false;
      const recorder = recorderRef.current;
      if (recorder?.state === "recording") recorder.stop();
      activeStream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [mode]);

  useEffect(() => {
    if (!stream || !videoRef.current) return;
    videoRef.current.srcObject = stream;
    void videoRef.current.play().catch(() => undefined);
  }, [stream]);

  useEffect(() => {
    if (!recording) return;
    const timeout = window.setTimeout(() => {
      const recorder = recorderRef.current;
      if (recorder?.state === "recording") {
        saveRecordingRef.current = true;
        recorder.stop();
      }
    }, 180_000);
    return () => window.clearTimeout(timeout);
  }, [recording]);

  function takePhoto() {
    const preview = videoRef.current;
    if (!preview || preview.videoWidth === 0 || preview.videoHeight === 0) {
      setError("the camera is still starting — please try again");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = preview.videoWidth;
    canvas.height = preview.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setError("could not create a photo from this camera");
      return;
    }
    context.drawImage(preview, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("could not create a photo from this camera");
        return;
      }
      onCaptured(new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" }));
    }, "image/jpeg");
  }

  function startRecording() {
    if (!stream) {
      setError("the camera is still starting — please try again");
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setError("this browser cannot record video — use the upload control instead");
      return;
    }
    const mimeType = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
      "video/mp4",
    ].find((type) => MediaRecorder.isTypeSupported(type));
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
      setRecording(false);
      if (!saveRecordingRef.current || chunks.length === 0) return;
      const type = recorder.mimeType || chunks[0]?.type || "video/webm";
      const extension = type.includes("mp4") ? "mp4" : "webm";
      onCaptured(
        new File([new Blob(chunks, { type })], `video-${Date.now()}.${extension}`, { type }),
      );
    };
    saveRecordingRef.current = false;
    recorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    const recorder = recorderRef.current;
    if (recorder?.state === "recording") {
      saveRecordingRef.current = true;
      recorder.stop();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "photo" ? "Take a photo" : "Record a video"}
    >
      <div className="card w-full max-w-xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-semibold">{mode === "photo" ? "Take a photo" : "Record a video"}</h3>
          <button type="button" className="btn-ghost px-3 py-1.5" onClick={onClose}>
            close
          </button>
        </div>
        <video
          ref={videoRef}
          className="aspect-video w-full rounded-lg bg-black object-contain"
          autoPlay
          muted
          playsInline
        />
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <div className="mt-3 flex items-center gap-3">
          {mode === "photo" ? (
            <button type="button" className="btn" disabled={!stream} onClick={takePhoto}>
              take photo
            </button>
          ) : recording ? (
            <button type="button" className="btn" onClick={stopRecording}>
              stop recording
            </button>
          ) : (
            <button type="button" className="btn" disabled={!stream} onClick={startRecording}>
              start recording
            </button>
          )}
          {mode === "video" && (
            <span className="text-xs text-slate-500">
              Video recordings stop automatically at 3 minutes.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

type PostComposerProps = {
  onPosted: (post: FeedItemView) => void;
  onSuccess?: () => void;
};

function PostComposer({ onPosted, onSuccess }: PostComposerProps) {
  const [text, setText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const [cameraMode, setCameraMode] = useState<CameraMode | null>(null);
  const [connections, setConnections] = useState<ConnectionView[]>([]);
  const [blueskyConnectionId, setBlueskyConnectionId] = useState("");
  const [mastodonConnectionId, setMastodonConnectionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [mediaBusy, setMediaBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
          const response = await fetch(upload.uploadUrl, { method: "POST", body: form });
          if (!response.ok) {
            const payload = (await response.json().catch(() => null)) as { error?: string } | null;
            throw new Error(payload?.error ?? `could not upload ${selected.file.name}`);
          }
          updateMedia(selected.localId, { attachmentId: upload.id, status: "processing" });
          const completed = await api.post<{ status: SelectedMedia["status"] }>(
            `/api/media/uploads/${upload.id}/complete`,
          );
          updateMedia(selected.localId, { attachmentId: upload.id, status: completed.status });
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

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const res = await api.post<{ post: FeedItemView; deliveries: Delivery[] }>("/api/posts", {
        text,
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
                {connection.label}
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
                {connection.label}
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
