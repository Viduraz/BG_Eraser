import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { ThemeProvider } from "@/components/ThemeProvider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EraseImageBg – Free AI Background Remover | Instant & Private",
    template: "%s | EraseImageBg",
  },
  description:
    "Remove image backgrounds instantly with our free AI-powered tool. 100% private — processing happens in your browser. No upload, no account, no watermark. Perfect for e-commerce, design, and social media.",
  keywords: [
    "background remover",
    "remove background",
    "AI background removal",
    "free background remover",
    "online background eraser",
    "transparent background",
    "background remover no watermark",
    "background remover UK",
    "background remover US",
  ],
  authors: [{ name: "EraseImageBg" }],
  creator: "EraseImageBg",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eraseimagebg.com",
    siteName: "EraseImageBg",
    title: "EraseImageBg – Free AI Background Remover",
    description:
      "Instantly remove image backgrounds with AI. 100% private browser-based processing. No sign-up required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EraseImageBg – Free AI Background Remover",
    description: "Remove backgrounds instantly. Free, private, no watermark.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://eraseimagebg.com"),
};

// ── AdSense publisher ID ───────────────────────────────────────────────────
// Set this in .env.local:  NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

// ── Google Analytics 4 Measurement ID ─────────────────────────────────────
// Set this in .env.local:  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
// When blank the <GoogleAnalytics> component is simply not rendered.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

        {/* ── Cookie Consent Banner ───────────────────────────────────
            Renders fixed at the bottom of the viewport.
            Saves user choice to localStorage under key "bge_consent".
            AdBanner components listen for the "bge:consent" custom event. */}
        <CookieBanner />

        {/* ── Google AdSense Script ───────────────────────────────────
            strategy="afterInteractive" loads after hydration, which is
            correct for AdSense — it must not block the main thread.

            HOW TO ACTIVATE:
            1. Create .env.local in your project root
            2. Add:  NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
            3. Uncomment the <Script> block below
            4. Redeploy / restart the dev server

            VERIFICATION:
            For AdSense site verification, Google may also ask you to add
            a <meta> tag. Add it inside <head> via Next.js metadata:
              export const metadata = {
                verification: { google: "YOUR_VERIFICATION_CODE" }
              }

            AD BLOCKER NOTE:
            The AdBanner component wraps all adsbygoogle.push() calls
            in try/catch, so an ad blocker will show the placeholder
            gracefully instead of crashing the page. */}
        {ADSENSE_CLIENT && (
          <Script
            id="google-adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
            // onError fires if the script is blocked by an ad blocker or network error
            onError={() => {
              console.warn("[AdSense] Script failed to load — ad blocker likely active.");
            }}
          />
        )}

        {/* ── Google Analytics 4 ─────────────────────────────────────────
            Rendered by @next/third-parties/google.
            • Loads via strategy="afterInteractive" (no hydration block)
            • Only renders when NEXT_PUBLIC_GA_ID is set in .env.local
            • Fully compatible with the cookie banner — GA collects no PII
              beyond what is already anonymised by Google's own defaults.
            • To add consent mode v2 (recommended for EU traffic), see:
              https://developers.google.com/tag-platform/security/guides/consent  */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

        {/*
          ── HOW TO USE AdBanner IN PAGES ─────────────────────────────
          Once you have your AdSense slot IDs, update the AdBanner usages
          in app/page.tsx and app/[niche]/page.tsx from:

            <AdBanner label="Advertisement — Leaderboard (728×90)" ... />

          to:

            <AdBanner
              adSlot="1234567890"
              label="Advertisement"
              heightClass="h-24 md:h-28"
              className="rounded-xl"
            />

          The adClient is read automatically from NEXT_PUBLIC_ADSENSE_CLIENT.
          The component shows a placeholder until:
            • NEXT_PUBLIC_ADSENSE_CLIENT is set
            • adSlot prop is provided
            • The user has accepted cookies
        */}
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
