import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

/**
 * Shared shell for all legal / informational pages.
 * Renders a consistent hero band, "last updated" badge,
 * and a constrained prose container.
 */
export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      {/* ── Page hero ──────────────────────────────────────────────── */}
      <section className="gradient-hero border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-6">
            {subtitle}
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-500">
            <svg
              className="w-3.5 h-3.5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Last updated: {lastUpdated}
          </span>
        </div>
      </section>

      {/* ── Prose content ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 
            Tailwind Typography prose class — gives headings, paragraphs,
            lists, links, and hr elements beautiful default styling.
          */}
          <article className="prose prose-slate prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-li:text-slate-600
            prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-800
            prose-hr:border-slate-100 prose-hr:my-10
          ">
            {children}
          </article>
        </div>
      </section>

      {/* ── Back link ───────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 py-8 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to BgEraser Home
        </a>
      </div>
    </>
  );
}
