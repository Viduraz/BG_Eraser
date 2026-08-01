"use client";

import { useEffect, useRef, useState } from "react";
import { getConsent, CONSENT_EVENT, type ConsentValue } from "./CookieBanner";

// ── Types ──────────────────────────────────────────────────────────────────
interface AdBannerProps {
  /**
   * Your AdSense data-ad-slot value (e.g. "1234567890").
   * Leave undefined to keep the visual placeholder without attempting to load an ad.
   */
  adSlot?: string;
  /**
   * Your AdSense publisher ID (e.g. "ca-pub-1234567890123456").
   * Defaults to NEXT_PUBLIC_ADSENSE_CLIENT env var.
   */
  adClient?: string;
  /**
   * AdSense ad format. Defaults to "auto".
   * Other values: "fluid", "rectangle", "vertical", "horizontal"
   */
  adFormat?: string;
  /** Whether to make the ad responsive to the container width. */
  fullWidthResponsive?: boolean;
  /** Label shown on the placeholder (development / no-consent / ad-blocked). */
  label?: string;
  /** Tailwind height class for the placeholder box. */
  heightClass?: string;
  /** Extra classes on the wrapper div. */
  className?: string;
}

/**
 * AdBanner
 * ────────
 * Dual-mode Google AdSense banner with GDPR consent gating and
 * graceful ad-blocker handling.
 *
 * PRODUCTION SETUP (3 steps):
 *   1. Add your publisher ID to .env.local:
 *        NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 *   2. Add your AdSense <script> to app/layout.tsx (see comments there).
 *   3. Pass the adSlot prop from your AdSense dashboard:
 *        <AdBanner adSlot="1234567890" />
 *
 * The component will:
 *   ✓ Show a labelled placeholder in development / before consent / if ad blocked
 *   ✓ Initialize the ad automatically once consent is granted
 *   ✓ Never throw — all adsbygoogle calls are wrapped in try/catch
 *   ✓ Re-initialize if the consent event fires while the component is mounted
 */
export default function AdBanner({
  adSlot,
  adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT,
  adFormat = "auto",
  fullWidthResponsive = true,
  label = "Advertisement",
  heightClass = "h-24",
  className = "",
}: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  // Track whether we are in a "live" state:
  // live = adSlot provided + adClient configured + consent accepted
  const [liveMode, setLiveMode] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);

  // ── Determine if we can and should show a real ad ────────────────────
  const isConfigured = Boolean(adSlot && adClient && adClient.startsWith("ca-pub-"));

  function tryPushAd() {
    if (!isConfigured || pushed.current) return;
    try {
      // adsbygoogle may be undefined if the script hasn't loaded yet
      // or if an ad blocker removed it.
      const adsByGoogle = (window as any).adsbygoogle;
      if (adsByGoogle === undefined) {
        // Script not loaded or blocked — show placeholder
        setAdBlocked(true);
        return;
      }
      (window as any).adsbygoogle.push({});
      pushed.current = true;
      setLiveMode(true);
    } catch (err) {
      // Ad blocker throws when it intercepts the push call
      console.warn("[AdBanner] Ad push blocked:", err);
      setAdBlocked(true);
    }
  }

  useEffect(() => {
    if (!isConfigured) return;

    // Check existing consent on mount
    const consent: ConsentValue = getConsent();
    if (consent === "accepted") {
      tryPushAd();
    }

    // Listen for real-time consent change (when user clicks Accept in CookieBanner)
    function onConsent(e: Event) {
      const detail = (e as CustomEvent<ConsentValue>).detail;
      if (detail === "accepted") {
        tryPushAd();
      }
    }

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured]);

  // ── Render ────────────────────────────────────────────────────────────

  // Show the real AdSense <ins> element when live
  if (liveMode && isConfigured) {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
          aria-label="Advertisement"
        />
      </div>
    );
  }

  // ── Placeholder (development / no consent / ad blocked) ───────────────
  const placeholderLabel = adBlocked
    ? "Ad Blocked"
    : !isConfigured
    ? `${label} — Add adSlot prop`
    : `${label} — Awaiting Consent`;

  const sublabel = adBlocked
    ? "Ad blocker detected — no revenue lost on our end"
    : !isConfigured
    ? "Set NEXT_PUBLIC_ADSENSE_CLIENT and adSlot prop to go live"
    : "Ad will load once the user accepts cookies";

  return (
    <div
      className={`
        w-full flex flex-col items-center justify-center gap-1.5
        bg-slate-100 border border-dashed border-slate-300 rounded-lg
        ${heightClass} ${className}
      `}
      aria-label="Advertisement placeholder"
      role="complementary"
    >
      <div className="flex items-center gap-2 text-slate-400 pointer-events-none select-none">
        <svg
          className="w-4 h-4 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <span className="text-xs font-medium tracking-wide">{placeholderLabel}</span>
      </div>
      <span className="text-[10px] text-slate-300 text-center px-4 leading-tight">
        {sublabel}
      </span>
    </div>
  );
}
