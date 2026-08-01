import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackgroundRemover from "@/components/BackgroundRemover";
import { KNOWN_NICHES, getNiche, getGenericNiche } from "@/lib/niches";

// ── Static params ──────────────────────────────────────────────────────────
/**
 * Pre-render all known niche pages at build time for maximum SEO performance.
 * Unknown slugs are still handled at runtime via the fallback below.
 */
export function generateStaticParams() {
  return KNOWN_NICHES.map((slug) => ({ niche: slug }));
}

// ── Dynamic metadata ───────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ niche: string }>;
}): Promise<Metadata> {
  const { niche: slug } = await params;
  const content = getNiche(slug) ?? getGenericNiche(slug);

  return {
    title: content.pageTitle,
    description: content.metaDescription,
    keywords: [
      `background remover ${content.title.toLowerCase()}`,
      `remove background ${content.title.toLowerCase()} photo`,
      `${content.title.toLowerCase()} photo editor`,
      "free background removal",
      "no watermark background remover",
      "online background eraser",
      "AI background remover",
    ],
    openGraph: {
      title: content.pageTitle,
      description: content.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.pageTitle,
      description: content.metaDescription,
    },
    alternates: {
      canonical: `https://eraseimagebg.com/${slug}`,
    },
  };
}

// ── Page component ─────────────────────────────────────────────────────────
export default async function NichePage({
  params,
}: {
  params: Promise<{ niche: string }>;
}) {
  const { niche: slug } = await params;

  // Decode URL-encoded slugs (%20 → space, etc.)
  const decodedSlug = decodeURIComponent(slug);

  // Get niche data — use generic fallback for any unknown slug
  const content = getNiche(decodedSlug) ?? getGenericNiche(decodedSlug);

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────────────────── */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative blob */}
        <div
          className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, #c3d5ff 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 md:pt-16 md:pb-20 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-5" aria-label="Breadcrumb">
            <a href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</a>
            <span aria-hidden="true">›</span>
            <span className="text-slate-600 dark:text-slate-400">{content.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            Free Background Remover for{" "}
            <span className="gradient-text">{content.title}</span>
          </h1>

          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {content.metaDescription}
          </p>
        </div>
      </section>

      {/* ── TOOL SECTION ──────────────────────────────────────────────── */}
      <section
        id="tool"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14"
        aria-label={`Background removal tool for ${content.title}`}
      >
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1.5">
            Remove Background from {content.title}
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">{content.toolSubtitle}</p>
        </div>

        <BackgroundRemover />

        {/* Trust indicators */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            "✓ 100% private — images never uploaded",
            "✓ No sign-up required",
            "✓ Free, no watermark",
            "✓ Works on any device",
          ].map((item) => (
            <span key={item} className="text-xs text-slate-400 dark:text-slate-500">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── NICHE CONTENT ─────────────────────────────────────────────── */}
      <section
        className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-14 md:py-20"
        aria-label={`Guide to background removal for ${content.title}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-600 mb-3">
              Why It Matters
            </span>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.intro}
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-10">
            {content.sections.map(({ heading, body }) => (
              <article key={heading} className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-3">
                  {heading}
                </h3>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                  {body}
                </p>
              </article>
            ))}
          </div>

          {/* Benefits list */}
          {content.benefits.length > 0 && (
            <div className="mt-10 bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-7 border border-brand-100 dark:border-brand-800/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
                Key Benefits for {content.title}
              </h3>
              <ul className="space-y-3">
                {content.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full gradient-brand flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ */}
          {content.faq.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {content.faq.map(({ q, a }) => (
                  <div
                    key={q}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm"
                  >
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">{q}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA back to main tool */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-3">
              Want to try other types of background removal?
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 hover:shadow-md transition-all duration-200 shadow-sm"
            >
              ← Back to Main Tool
            </a>
          </div>
        </div>
      </section>

      {/* ── RELATED NICHES ────────────────────────────────────────────── */}
      <RelatedNiches currentSlug={decodedSlug} />
    </>
  );
}

// ── Related niches component ───────────────────────────────────────────────
function RelatedNiches({ currentSlug }: { currentSlug: string }) {
  const related = [
    { slug: "car-photos",      label: "Car Photos",                icon: "🚗" },
    { slug: "real-estate",     label: "Real Estate Photos",        icon: "🏠" },
    { slug: "id-cards",        label: "ID Cards & Passport Photos", icon: "🪪" },
    { slug: "product-photos",  label: "Product Photos",            icon: "📦" },
    { slug: "profile-photos",  label: "Profile Photos",            icon: "👤" },
  ].filter((n) => n.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="py-12 md:py-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-6 text-center">
          Background Removal for Other Niches
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {related.map(({ slug, label, icon }) => (
            <a
              key={slug}
              href={`/${slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              <span className="text-2xl" role="img" aria-label={label}>{icon}</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
