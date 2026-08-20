import { useEffect, useRef, useState } from "react";
import { stampWebmDuration } from "#/lib/webm";

export type CameraMode = "photo" | "video";

export default function CameraCapture({
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
  const recordingStartedAtRef = useRef<number | null>(null);
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
        setError(
          "could not access the camera — check its browser permission and try again",
        ),
      );
    return () => {
      cancelled = true;
      saveRecordingRef.current = false;
      const recorder = recorderRef.current;
      if (recorder?.state === "recording") recorder.stop();
      recordingStartedAtRef.current = null;
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
      onCaptured(
        new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" }),
      );
    }, "image/jpeg");
  }

  function startRecording() {
    if (!stream) {
      setError("the camera is still starting — please try again");
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setError(
        "this browser cannot record video — use the upload control instead",
      );
      return;
    }
    // Safari only gained WebM recording support recently, and recordings made
    // with it can fail to load in older Safari players. Prefer its native MP4
    // (H.264/AAC) output whenever it is available; Chromium and Firefox keep
    // their well-supported WebM fallback.
    const mimeType = [
      "video/mp4",
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ].find((type) => MediaRecorder.isTypeSupported(type));
    const recorder = mimeType
      ? new MediaRecorder(stream, { mimeType })
      : new MediaRecorder(stream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
      setRecording(false);
      const saveRecording = saveRecordingRef.current;
      saveRecordingRef.current = false;
      const startedAt = recordingStartedAtRef.current;
      recordingStartedAtRef.current = null;
      if (!saveRecording || chunks.length === 0) return;
      const type = recorder.mimeType || chunks[0]?.type || "video/webm";
      const extension = type.includes("mp4") ? "mp4" : "webm";
      const file = new File(
        [new Blob(chunks, { type })],
        `video-${Date.now()}.${extension}`,
        {
          type,
        },
      );
      const durationMs =
        startedAt === null ? null : Math.ceil(performance.now() - startedAt);
      if (!type.includes("webm") || durationMs === null || durationMs <= 0) {
        onCaptured(file);
        return;
      }
      void file
        .arrayBuffer()
        .then((buffer) => stampWebmDuration(new Uint8Array(buffer), durationMs))
        .then((stamped) => {
          onCaptured(
            stamped
              ? new File([new Uint8Array(stamped).buffer], file.name, {
                  type: file.type,
                  lastModified: file.lastModified,
                })
              : file,
          );
        })
        .catch(() => onCaptured(file));
    };
    saveRecordingRef.current = false;
    recorderRef.current = recorder;
    recorder.start();
    recordingStartedAtRef.current = performance.now();
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
          <h3 className="font-semibold">
            {mode === "photo" ? "Take a photo" : "Record a video"}
          </h3>
          <button
            type="button"
            className="btn-ghost px-3 py-1.5"
            onClick={onClose}
          >
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
            <button
              type="button"
              className="btn"
              disabled={!stream}
              onClick={takePhoto}
            >
              take photo
            </button>
          ) : recording ? (
            <button type="button" className="btn" onClick={stopRecording}>
              stop recording
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              disabled={!stream}
              onClick={startRecording}
            >
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
