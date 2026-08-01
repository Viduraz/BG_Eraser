"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";

// ── Constants ──────────────────────────────────────────────────────────────
export const CONSENT_KEY = "bge_consent";
export const CONSENT_EVENT = "bge:consent";

export type ConsentValue = "accepted" | "declined" | null;

/** Read current consent from localStorage (safe for SSR). */
export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null;
}

/** Dispatch the consent event so any mounted AdBanner can react immediately. */
function dispatchConsent(value: ConsentValue) {
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

// ── Component ──────────────────────────────────────────────────────────────
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Only show if no preference has been saved yet
    if (getConsent() === null) {
      // Small delay so it doesn't flash on SSR hydration
      const t = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => setAnimateIn(true));
      }, 800);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    dispatchConsent("accepted");
    dismiss();
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    dispatchConsent("declined");
    dismiss();
  }

  function dismiss() {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 350); // wait for slide-out
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
      className={`
        fixed bottom-0 inset-x-0 z-[100]
        transition-transform duration-350 ease-in-out
        ${animateIn ? "translate-y-0" : "translate-y-full"}
      `}
    >
      {/* Backdrop gradient fade */}
      <div
        className="absolute inset-x-0 -top-16 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.08))" }}
        aria-hidden="true"
      />

      {/* Banner card */}
      <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            {/* Cookie icon */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-lg hidden sm:flex"
              aria-hidden="true"
            >
              🍪
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-white mb-0.5">
                We value your privacy
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We use cookies to display relevant advertising via{" "}
                <strong className="font-medium text-slate-600 dark:text-slate-300">Google AdSense</strong>{" "}
                (including the DoubleClick DART cookie). Your images are{" "}
                <strong className="font-medium text-slate-600 dark:text-slate-300">always processed locally</strong>{" "}
                — never uploaded. Accepting enables personalised ads that keep this tool free.{" "}
                <Link
                  href="/privacy-policy"
                  className="text-brand-600 hover:underline font-medium"
                >
                  Privacy Policy ↗
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all duration-150 whitespace-nowrap"
                aria-label="Decline optional cookies"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs font-semibold text-white gradient-brand hover:opacity-90 active:scale-95 transition-all duration-150 whitespace-nowrap shadow-sm"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>

            {/* Close ×  (same as decline) */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 sm:static sm:flex-shrink-0 p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close cookie banner"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
