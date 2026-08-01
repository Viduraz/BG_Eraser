"use client";

/**
 * BackgroundRemover.tsx
 * ─────────────────────
 * Production-ready AI background removal component using @imgly/background-removal v1.7.x.
 *
 * WASM / Asset handling
 * ─────────────────────
 * @imgly/background-removal fetches its WASM binary and ONNX model files from a CDN
 * at runtime. In Next.js (especially with Turbopack), letting the bundler try to
 * statically analyze these WASM imports causes build errors. The solution is:
 *   1. Use a DYNAMIC import of the library inside the async processing function.
 *   2. Explicitly set `publicPath` so the library knows where to fetch its assets.
 *      We pin to the versioned jsDelivr CDN path — globally cached, no origin traffic.
 *
 * COOP / COEP headers (already configured in next.config.ts) allow SharedArrayBuffer,
 * which enables the multi-threaded WASM path and gives ~2× performance on supported browsers.
 */

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type DragEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Accepted MIME types. Keep in sync with the <input accept> attribute. */
const ACCEPTED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

const MAX_FILE_SIZE_MB = 15;
const MAX_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Granular processing stages.
 * Each maps to a distinct status message + progress indicator variant.
 */
type Stage =
  | "idle"        // Nothing uploaded yet
  | "validating"  // Client-side file checks running
  | "initializing"// Dynamic import + WASM environment check
  | "downloading" // Fetching WASM / ONNX model files (progress tracked)
  | "inferring"   // Neural network running on image data
  | "finalizing"  // Converting mask → PNG Blob
  | "done"        // Processing complete, result ready
  | "error";      // Unrecoverable failure — show error UI

interface ProgressTick {
  /** Raw key emitted by imgly (e.g. "ort-wasm-simd-threaded.wasm", "model.ort") */
  key: string;
  current: number;
  total: number;
}

/** Structured error with user-facing message and optional technical detail. */
interface AppError {
  title: string;
  body: string;
  /** Collapsible raw error string for power users / bug reports */
  technical?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(n: number): string {
  if (n === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(n) / Math.log(1024));
  return `${(n / 1024 ** i).toFixed(1)} ${units[i]}`;
}

/**
 * Classify raw errors thrown by imglyRemoveBackground into user-friendly messages.
 * Order matters — check most-specific conditions first.
 */
function classifyError(err: unknown): AppError {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();

  if (
    lower.includes("webassembly") ||
    lower.includes("wasm") ||
    lower.includes("not supported")
  ) {
    return {
      title: "WebAssembly not supported",
      body:
        "Your browser does not support WebAssembly, which is required to run the AI model locally. " +
        "Please try a modern browser such as Chrome 90+, Firefox 89+, Safari 15+, or Edge 90+.",
      technical: raw,
    };
  }

  if (
    lower.includes("out of memory") ||
    lower.includes("oom") ||
    lower.includes("allocation failed") ||
    lower.includes("memory")
  ) {
    return {
      title: "Device ran out of memory",
      body:
        "Your device did not have enough RAM to process this image. " +
        "Try uploading a smaller image (under 4MP), close other browser tabs, " +
        "or use a device with more memory.",
      technical: raw,
    };
  }

  if (
    lower.includes("fetch") ||
    lower.includes("network") ||
    lower.includes("failed to fetch") ||
    lower.includes("load")
  ) {
    return {
      title: "Failed to download AI model",
      body:
        "BgEraser could not download the AI model files. " +
        "Please check your internet connection and try again. " +
        "Once downloaded, the model is cached and no further downloads are needed.",
      technical: raw,
    };
  }

  if (lower.includes("timeout") || lower.includes("timed out")) {
    return {
      title: "Processing timed out",
      body:
        "The AI model took too long to process your image. " +
        "This can happen on slower devices or with very large images. " +
        "Try a smaller image or refresh and try again.",
      technical: raw,
    };
  }

  // Generic fallback
  return {
    title: "Background removal failed",
    body:
      "An unexpected error occurred while processing your image. " +
      "Please try again with a different image. If the problem persists, " +
      "try refreshing the page to reset the AI engine.",
    technical: raw,
  };
}

/** Map an imgly progress key to a human-readable label and stage. */
function interpretProgressKey(key: string): { label: string; stage: Stage } {
  const k = key.toLowerCase();

  // WASM binary download
  if (k.includes("wasm")) {
    return { label: "Downloading AI engine…", stage: "downloading" };
  }
  // ONNX model download (model.ort, model_quantized.ort, etc.)
  if (k.includes("model") || k.includes(".ort") || k.includes("fetch")) {
    return { label: "Downloading AI model (cached after first use)…", stage: "downloading" };
  }
  // Neural network inference
  if (k.includes("compute") || k.includes("inference") || k.includes("session")) {
    return { label: "Running neural network analysis…", stage: "inferring" };
  }
  // Mask post-processing
  if (k.includes("post") || k.includes("mask") || k.includes("alpha")) {
    return { label: "Refining edges and transparency…", stage: "inferring" };
  }

  return { label: "Processing…", stage: "downloading" };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated SVG progress ring. */
function ProgressRing({ percent }: { percent: number }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 76 76"
      className="-rotate-90"
      aria-hidden="true"
    >
      <circle cx="38" cy="38" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle
        cx="38"
        cy="38"
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b65f5" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Three bouncing dots — shown during indeterminate stages. */
function BouncingDots() {
  return (
    <div className="flex gap-1.5 items-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-brand-400"
          style={{
            animation: `bge-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bge-bounce {
          0%,80%,100% { transform:scale(.6); opacity:.35; }
          40%         { transform:scale(1.15); opacity:1; }
        }
      `}</style>
    </div>
  );
}

/** Indeterminate shimmer bar — used for stages with no byte-level progress. */
function ShimmerBar() {
  return (
    <div
      className="w-full max-w-sm h-1.5 rounded-full bg-slate-100 overflow-hidden"
      role="progressbar"
      aria-label="Processing…"
    >
      <div
        className="h-full w-1/3 gradient-brand rounded-full"
        style={{ animation: "bge-shimmer 1.5s ease-in-out infinite" }}
      />
      <style>{`
        @keyframes bge-shimmer {
          0%   { margin-left: -33%; }
          100% { margin-left: 133%; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BackgroundRemover() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [stage, setStage] = useState<Stage>("idle");
  const [isDragOver, setIsDragOver] = useState(false);

  // Image URLs (object URLs — revoked on cleanup)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [originalName, setOriginalName] = useState("image");

  // Progress state
  const [progressTick, setProgressTick] = useState<ProgressTick | null>(null);
  const [progressPct, setProgressPct] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  // Error state
  const [appError, setAppError] = useState<AppError | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const origUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  // Derived: are we in a busy state (block all inputs)?
  const isBusy =
    stage === "validating" ||
    stage === "initializing" ||
    stage === "downloading" ||
    stage === "inferring" ||
    stage === "finalizing";

  // ── Cleanup object URLs on unmount ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (origUrlRef.current) URL.revokeObjectURL(origUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  // ── File validation ────────────────────────────────────────────────────────
  function validateFile(file: File): AppError | null {
    if (!ACCEPTED_MIME.has(file.type)) {
      const ext = file.name.split(".").pop()?.toUpperCase() ?? "unknown";
      return {
        title: "Unsupported file type",
        body: `".${ext}" files are not supported. Please upload a JPG, PNG, or WEBP image.`,
      };
    }
    if (file.size > MAX_BYTES) {
      return {
        title: "File too large",
        body:
          `Your file is ${formatBytes(file.size)}, which exceeds the ${MAX_FILE_SIZE_MB} MB limit. ` +
          "Please compress the image or use a smaller one.",
      };
    }
    if (file.size === 0) {
      return {
        title: "Empty file",
        body: "The selected file appears to be empty. Please choose a different image.",
      };
    }
    return null;
  }

  // ── Core processing pipeline ───────────────────────────────────────────────
  const processImage = useCallback(async (file: File) => {
    // ── 1. Reset previous state ────────────────────────────────────────────
    if (origUrlRef.current) URL.revokeObjectURL(origUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    setResultUrl(null);
    setResultBlob(null);
    setAppError(null);
    setShowTechnical(false);
    setProgressTick(null);
    setProgressPct(0);
    setProgressLabel("");

    // ── 2. Validate ────────────────────────────────────────────────────────
    setStage("validating");
    const validationError = validateFile(file);
    if (validationError) {
      setAppError(validationError);
      setStage("error");
      return;
    }

    // ── 3. Build original preview ──────────────────────────────────────────
    const prevUrl = URL.createObjectURL(file);
    origUrlRef.current = prevUrl;
    setOriginalUrl(prevUrl);
    setOriginalName(file.name.replace(/\.[^/.]+$/, ""));

    // ── 4. Check WebAssembly availability ─────────────────────────────────
    setStage("initializing");
    setProgressLabel("Initializing AI engine…");

    if (typeof WebAssembly === "undefined") {
      setAppError({
        title: "WebAssembly not supported",
        body:
          "Your browser does not support WebAssembly, which is required to run the AI model. " +
          "Please upgrade to a modern browser (Chrome 90+, Firefox 89+, Safari 15+, Edge 90+).",
      });
      setStage("error");
      return;
    }

    // ── 5. Dynamic import (avoids Turbopack/SSR WASM bundling issues) ──────
    let imglyRemoveBackground: any;

    try {
      const mod = await import("@imgly/background-removal");
      imglyRemoveBackground = mod.removeBackground || mod.default?.removeBackground || mod.default;
      
      if (typeof imglyRemoveBackground !== "function") {
        throw new Error("Could not find the removeBackground function in the loaded module.");
      }
    } catch (importErr) {
      setAppError({
        title: "Failed to load AI module",
        body:
          "The AI background removal library could not be loaded. " +
          "Please check your internet connection and refresh the page.",
        technical: importErr instanceof Error ? importErr.message : String(importErr),
      });
      setStage("error");
      return;
    }

    // ── 6. Run imglyRemoveBackground ────────────────────────────────────────
    try {
      const blob: Blob = await imglyRemoveBackground(file, {
        /** "medium" gives the best quality/speed tradeoff for production use. */
        model: "medium",

        output: {
          format: "image/png",
          quality: 1.0,
          type: "foreground",
        },

        /**
         * Progress callback — called repeatedly during:
         *   • WASM download      (key contains "wasm")
         *   • Model download     (key contains "model" or ".ort")
         *   • Inference          (key contains "compute" or "inference")
         *   • Post-processing    (key contains "mask" or "alpha")
         */
        progress: (key: string, current: number, total: number) => {
          setProgressTick({ key, current, total });

          const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
          setProgressPct(pct);

          const { label, stage: inferredStage } = interpretProgressKey(key);
          setProgressLabel(label);
          setStage(inferredStage);
        },
      });

      // ── 7. Finalizing ────────────────────────────────────────────────────
      setStage("finalizing");
      setProgressLabel("Generating transparent PNG…");
      setProgressPct(100);

      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResultBlob(blob);
      setResultUrl(url);

      setStage("done");
    } catch (err) {
      console.error("[BgEraser] Processing error:", err);
      setAppError(classifyError(err));
      setStage("error");
    }
  }, []);

  // ── Event handlers ──────────────────────────────────────────────────────────

  const handleFile = useCallback(
    (file: File | null | undefined) => {
      if (!file || isBusy) return;
      processImage(file);
    },
    [isBusy, processImage]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
    // Reset so the same file can be re-uploaded after an error
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!isBusy) handleFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isBusy) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${originalName}-no-bg.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setStage("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
    setAppError(null);
    setShowTechnical(false);
    setProgressTick(null);
    setProgressPct(0);
    setProgressLabel("");
  };

  const handleUploadAnother = () => {
    handleReset();
    // Small delay so state has settled before triggering file picker
    setTimeout(() => fileInputRef.current?.click(), 80);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !isBusy) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  // ── Derived display values ──────────────────────────────────────────────────

  const stageLabel: Record<Stage, string> = {
    idle: "",
    validating: "Checking file…",
    initializing: "Initializing AI engine…",
    downloading: progressLabel || "Downloading AI model…",
    inferring: progressLabel || "Running AI analysis…",
    finalizing: "Generating transparent PNG…",
    done: "Done!",
    error: "",
  };

  const showProgressRing =
    stage === "downloading" || stage === "inferring" || stage === "finalizing";

  const showShimmer = stage === "validating" || stage === "initializing";

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full" aria-live="polite" aria-atomic="false">
      {/* ── Hidden file input ───────────────────────────────────────────────── */}
      <input
        ref={fileInputRef}
        id="bg-remover-file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
        disabled={isBusy}
        aria-label="Upload image for background removal"
      />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* IDLE — drop zone                                                    */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {stage === "idle" && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Click or drag and drop an image here to remove its background"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center gap-6 p-10 min-h-[380px]
            select-none outline-none
            focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
            ${
              isDragOver
                ? "border-brand-400 bg-brand-50/80 shadow-lg shadow-brand-100/60 scale-[1.015]"
                : "border-slate-200 bg-slate-50/60 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-sm"
            }
          `}
        >
          {/* Upload icon card */}
          <div
            className={`
              w-20 h-20 rounded-2xl flex items-center justify-center
              border border-white shadow-sm transition-all duration-300
              ${isDragOver ? "gradient-brand shadow-md scale-110" : "bg-white"}
            `}
            aria-hidden="true"
          >
            <svg
              className={`w-9 h-9 transition-colors duration-300 ${isDragOver ? "text-white" : "text-brand-500"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          {/* Labels */}
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-800 mb-1">
              {isDragOver ? "Release to process" : "Drag & drop your image here"}
            </p>
            <p className="text-sm text-slate-400 mb-4">
              or{" "}
              <span className="text-brand-600 font-medium underline underline-offset-2 decoration-dotted">
                click to browse files
              </span>
            </p>

            {/* Format badges */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["JPG", "PNG", "WEBP"].map((fmt) => (
                <span
                  key={fmt}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-500"
                >
                  {fmt}
                </span>
              ))}
              <span className="text-xs text-slate-400">
                · up to {MAX_FILE_SIZE_MB} MB
              </span>
            </div>
          </div>

          {/* Privacy badge */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] text-slate-400 pointer-events-none"
            aria-label="Privacy guarantee"
          >
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Your image never leaves your device — 100% private
          </div>

          {/* Drag pulse ring */}
          {isDragOver && (
            <div
              className="absolute inset-0 rounded-2xl border-2 border-brand-400 animate-pulse pointer-events-none"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* BUSY STATES — validating / initializing / downloading /            */}
      {/*               inferring / finalizing                               */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {isBusy && (
        <div
          className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden"
          role="status"
          aria-label={stageLabel[stage]}
        >
          {/* Original image preview with scanning sweep */}
          {originalUrl && (
            <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Image being processed"
                className="w-full h-full object-contain"
              />
              {/* Scanning light sweep */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                style={{ animation: "bge-scan 2s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <style>{`
                @keyframes bge-scan {
                  0%   { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
              `}</style>
            </div>
          )}

          {/* Processing body */}
          <div className="p-8 flex flex-col items-center gap-6 text-center">
            {/* Progress indicator: ring for trackable stages, shimmer for others */}
            {showProgressRing ? (
              <div className="relative flex-shrink-0">
                <ProgressRing percent={progressPct} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-700" aria-live="off">
                    {progressPct}%
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
            )}

            {/* Status text */}
            <div>
              <p className="text-base font-semibold text-slate-800 mb-1">
                {stageLabel[stage]}
              </p>

              {/* Byte-level detail for download stages */}
              {progressTick && progressTick.total > 0 && (
                <p className="text-xs text-slate-400 mt-1">
                  {formatBytes(progressTick.current)}{" "}
                  <span className="text-slate-300">/</span>{" "}
                  {formatBytes(progressTick.total)}
                </p>
              )}

              {/* Stage-specific hint messages */}
              {stage === "initializing" && (
                <p className="text-xs text-slate-400 mt-1">
                  Checking WebAssembly environment…
                </p>
              )}
              {stage === "downloading" && progressPct === 0 && (
                <p className="text-xs text-slate-400 mt-1">
                  First run only — model is cached locally afterwards
                </p>
              )}
              {stage === "inferring" && (
                <p className="text-xs text-slate-400 mt-1">
                  AI is running on your device — this may take 3–15 seconds
                </p>
              )}
            </div>

            {/* Animated indicator */}
            {showShimmer ? <ShimmerBar /> : <BouncingDots />}

            {/* Progress bar (shown when we have real byte progress) */}
            {showProgressRing && (
              <div
                className="w-full max-w-sm bg-slate-100 rounded-full h-1.5 overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full gradient-brand rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}

            {/* Privacy reminder */}
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              AI is running directly in your browser — your image is never uploaded
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* DONE — side-by-side result + download                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {stage === "done" && resultUrl && originalUrl && (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {/* Before / After grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {/* Original */}
            <div className="p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
                Original
              </p>
              <div
                className="rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center"
                style={{ minHeight: "240px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original image before background removal"
                  className="max-h-64 w-auto object-contain"
                />
              </div>
            </div>

            {/* Result — CSS checkered pattern shows transparency */}
            <div className="p-5">
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-3 text-center">
                Background Removed ✓
              </p>
              <div
                className="rounded-xl overflow-hidden flex items-center justify-center"
                style={{
                  minHeight: "240px",
                  backgroundImage: `
                    linear-gradient(45deg, #d1d5db 25%, transparent 25%),
                    linear-gradient(-45deg, #d1d5db 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #d1d5db 75%),
                    linear-gradient(-45deg, transparent 75%, #d1d5db 75%)
                  `,
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                  backgroundColor: "#f3f4f6",
                }}
                aria-label="Processed image with background removed, shown on checkered transparency pattern"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resultUrl}
                  alt={`${originalName} with background removed`}
                  className="max-h-64 w-auto object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="px-5 pb-5 pt-4 border-t border-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Download — primary CTA */}
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 hover:shadow-md active:scale-[0.98] transition-all duration-200 shadow-sm"
              aria-label={`Download ${originalName}-no-bg.png`}
            >
              <svg
                className="w-4.5 h-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PNG — No Watermark
            </button>

            {/* File size info */}
            {resultBlob && (
              <span className="text-xs text-slate-400 text-center sm:text-left px-1 whitespace-nowrap">
                {formatBytes(resultBlob.size)} · Transparent PNG
              </span>
            )}

            <div className="flex gap-2.5 sm:ml-auto">
              {/* Process same image again (drag a new one in) */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 active:scale-[0.98] transition-all duration-200 border border-brand-100"
                aria-label="Upload a new image"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                New Image
              </button>

              {/* Try another (shows drop zone again) */}
              <button
                onClick={handleUploadAnother}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all duration-200"
                aria-label="Remove background from a different image"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Try Another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* ERROR — categorised alert with collapsible technical detail        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {stage === "error" && appError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 overflow-hidden"
        >
          {/* Header bar */}
          <div className="px-6 py-5 flex items-start gap-4">
            {/* Error icon */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              <svg
                className="w-6 h-6 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {/* Error text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-red-800 mb-1">
                {appError.title}
              </h3>
              <p className="text-sm text-red-700/80 leading-relaxed">
                {appError.body}
              </p>

              {/* Collapsible technical detail */}
              {appError.technical && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowTechnical((v) => !v)}
                    className="text-xs text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
                    aria-expanded={showTechnical}
                  >
                    {showTechnical ? "Hide" : "Show"} technical details
                  </button>
                  {showTechnical && (
                    <pre className="mt-2 p-3 rounded-lg bg-red-100 text-[11px] text-red-700 overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed">
                      {appError.technical}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-5 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Try Again
            </button>
            <button
              onClick={handleUploadAnother}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
            >
              Upload Different Image
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input linked to the "New Image" button in result state */}
      {/* (Keyboard/accessibility: the drop zone handles Enter/Space when idle) */}
    </div>
  );
}
