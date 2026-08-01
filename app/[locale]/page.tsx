import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import BackgroundRemover from "@/components/BackgroundRemover";
import {useTranslations} from 'next-intl';

export const metadata: Metadata = {
  title: "Free AI Background Remover – Instant, Private, No Watermark",
  description:
    "Remove image backgrounds in seconds using our free AI tool. Works entirely in your browser — your photos are never uploaded. No sign-up, no watermark, no cost. Perfect for product photos, portraits, and creative projects.",
};

// ── Stat data ─────────────────────────────────────────────────────────────
const stats = [
  { value: "100%", label: "Private & Secure" },
  { value: "< 3s", label: "Average Processing" },
  { value: "Free", label: "No Hidden Cost" },
  { value: "0", label: "Watermarks Added" },
];

// ── How It Works steps ────────────────────────────────────────────────────
const steps = [
  {
    step: "01",
    title: "Upload Your Image",
    description:
      "Select any PNG, JPG, or WEBP image from your device. Our tool supports images up to 12 megapixels. No account, no email address, and absolutely no data is ever sent to a remote server — your image stays 100% on your device.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "AI Analyses Your Photo",
    description:
      "The moment your image loads, our on-device AI model — powered by WebAssembly and ONNX Runtime — begins analysing every pixel. It identifies the foreground subject (person, product, animal, or object) using a sophisticated encoder-decoder neural network trained on millions of diverse images.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Background is Removed",
    description:
      "Within seconds, you receive a crisp, high-quality result with a transparent background (PNG format). The AI preserves fine details like flyaway hair, fur, and translucent edges that simpler tools typically struggle with. You can also choose to replace the background with a solid colour or a custom image.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Download for Free",
    description:
      "Click download and receive your transparent PNG instantly. No watermarks, no compression artefacts, no subscription fees. The file is yours to use commercially or personally without any restrictions. Export at the original resolution — we never downscale your image.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

// ── Privacy benefit cards ─────────────────────────────────────────────────
const privacyBenefits = [
  {
    title: "Fully On-Device Processing",
    description:
      "Unlike cloud-based tools that upload your images to remote servers in the US, Europe, or Asia, BgEraser runs the entire AI model inside your web browser using WebAssembly. Your image pixels never travel over the internet to any server we control. This design choice is not just a marketing promise — it is an architectural guarantee.",
    icon: "🔒",
  },
  {
    title: "No Account, No Tracking",
    description:
      "We do not require you to create an account, verify an email, or provide any personal information. We display contextual advertisements via Google AdSense to keep the service free, but we do not build user profiles, sell your data, or track your usage beyond standard anonymised analytics. You are a person, not a product.",
    icon: "👤",
  },
  {
    title: "GDPR & CCPA Compliant",
    description:
      "We take legal compliance seriously. Our service is designed to meet the standards of the General Data Protection Regulation (GDPR) applicable to our UK and EU users, and the California Consumer Privacy Act (CCPA) applicable to our US users. You have the right to know, access, and delete any data we hold — which, given our architecture, is essentially none.",
    icon: "⚖️",
  },
  {
    title: "No Watermarks, Ever",
    description:
      "Many free background removal tools degrade your results with visible watermarks or logos unless you pay. We believe that is a dishonest practice. BgEraser is funded entirely by non-intrusive Google AdSense advertising, which means our tool is completely free with zero limitations on output quality, resolution, or watermarking — for everyone, forever.",
    icon: "✨",
  },
  {
    title: "Works Offline (After First Load)",
    description:
      "After your first visit, the AI model is cached in your browser. On subsequent visits, BgEraser works even without an internet connection. This makes it ideal for professionals working in environments with limited connectivity, or for anyone who values having a tool that truly belongs to them.",
    icon: "📶",
  },
  {
    title: "Open & Transparent Technology",
    description:
      "Our background removal model is based on open-source research in the field of salient object detection and portrait matting. We use publicly available model architectures so that the technology underpinning our tool can be independently audited. We believe transparency in AI is not optional — it is essential.",
    icon: "🔍",
  },
];

// ── Use case cards ────────────────────────────────────────────────────────
const useCases = [
  {
    title: "E-Commerce Product Photos",
    description:
      "UK and US e-commerce sellers on Amazon, eBay, Etsy, and Shopify know that clean, white-background product images dramatically increase click-through rates and conversions. Professional photography studios charge £50–£200 per image. BgEraser lets you achieve the same results for free in seconds — giving small businesses a level playing field.",
  },
  {
    title: "Professional Headshots & LinkedIn",
    description:
      "A professional profile photo on LinkedIn can increase profile views by over 14 times according to LinkedIn's own data. Removing a distracting background and replacing it with a clean solid colour or professional blur can transform an ordinary phone selfie into a compelling professional headshot without visiting a photographer.",
  },
  {
    title: "Social Media & Content Creation",
    description:
      "Content creators on Instagram, TikTok, YouTube, and Pinterest regularly need to cut out subjects for compositing, thumbnails, and creative graphics. BgEraser handles everything from portraits with complex hair to objects on cluttered backgrounds, giving creators professional results without Photoshop expertise or subscription costs.",
  },
  {
    title: "Graphic Design & Marketing",
    description:
      "Graphic designers and marketing teams frequently need transparent PNGs of products, people, and logos to assemble presentations, advertisements, and web graphics. BgEraser integrates seamlessly into creative workflows — just drag, drop, and download. Works alongside Canva, Figma, Adobe Express, and any other tool that accepts PNG files.",
  },
];

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #c3d5ff 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #e9d5ff 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Free · Private · No Sign-Up Required
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              {t('hero_title_prefix')}{" "}
              <span className="gradient-text">{t('hero_title_highlight')}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <a
                href="#tool"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-white gradient-brand hover:opacity-90 hover:shadow-lg transition-all duration-200 shadow-md"
              >
                {t('upload_button')}
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all duration-200"
              >
                {t('how_it_works_button')}
              </a>
            </div>

            {/* Stats bar */}
            <div className="inline-flex flex-wrap justify-center gap-x-8 gap-y-4 glass rounded-2xl px-6 py-4 border border-slate-200/60 dark:border-slate-700/60 dark:bg-slate-900/50">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AD SLOT 1 — Below Hero ────────────────────────────────────────── */}
      {/* 
        ADSENSE INTEGRATION:
        Replace <AdBanner> with:
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="YOUR_SLOT_ID_HERE"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        Then call: (window.adsbygoogle = window.adsbygoogle || []).push({});
        in a useEffect on the client side.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner
          label="Advertisement — Leaderboard (728×90)"
          heightClass="h-24 md:h-28"
          className="rounded-xl"
        />
      </div>

      {/* ── TOOL SECTION ──────────────────────────────────────────────────── */}
      <section
        id="tool"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        aria-label="Background removal tool"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Background Remover Tool
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Drop your image below to get started — it stays on your device.
          </p>
        </div>

        <BackgroundRemover />
      </section>

      {/* ── HOW IT WORKS SECTION ─────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-16 md:py-24"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-600 mb-3">
              The Process
            </span>
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              How Our AI Background Remover Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Understanding the technology behind BgEraser helps you use it more
              effectively and trust the privacy guarantees we make. Here is a detailed,
              step-by-step breakdown of what happens when you process an image.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {steps.map(({ step, title, description, icon }) => (
              <div
                key={step}
                className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  {/* Step number + icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
                      {icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold tracking-widest text-slate-300 dark:text-slate-500 uppercase">
                        Step {step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical deep-dive paragraph block — important for AdSense content quality */}
          <div className="mt-14 bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-4">
              The Technology Behind the Magic: A Deeper Explanation
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base leading-relaxed space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                Traditional background removal software relied on colour-keying (chroma key),
                where a specific colour — most commonly bright green or blue — was selected
                and removed. This required a controlled studio environment and failed
                completely on images with natural backgrounds. Even more advanced techniques
                like the GrabCut algorithm required manual input to define the foreground and
                background regions.
              </p>
              <p>
                Modern AI background removal uses deep convolutional neural networks (CNNs)
                and, increasingly, Vision Transformer (ViT) architectures to perform{" "}
                <strong className="text-slate-800 dark:text-white">semantic image segmentation</strong>.
                The AI has learned to understand what constitutes a foreground subject (a
                person, a product, an animal) versus background context, even in complex,
                cluttered scenes. This is achieved by training on datasets containing
                millions of images paired with hand-crafted or semi-automatically generated
                segmentation masks.
              </p>
              <p>
                Our specific implementation uses a model optimised for browser-based
                inference via ONNX Runtime Web. ONNX (Open Neural Network Exchange) is an
                open format designed to represent machine learning models, enabling
                interoperability between different frameworks. By converting the model to
                ONNX format and running it in WebAssembly — and on devices with suitable
                graphics hardware, via WebGPU — we achieve performance that approaches
                native application speed, all within your browser tab.
              </p>
              <p>
                One of the most technically challenging aspects of background removal is
                handling <strong className="text-slate-800 dark:text-white">alpha matting</strong> — the
                smooth, semi-transparent transition between foreground and background. Human
                hair is the canonical example: individual strands, each potentially a few
                pixels wide, blending at their edges with the background colour. Our model
                is specifically trained to handle these{" "}
                <em>trimap-free alpha matting</em> scenarios, producing natural-looking
                edges without the halo artefacts common in older tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE PRIVATE AI SECTION ────────────────────────────────── */}
      <section
        id="why-private-ai"
        className="py-16 md:py-24"
        aria-labelledby="why-private-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-500 mb-3">
              Why It Matters
            </span>
            <h2
              id="why-private-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Why Choose Our Private AI Approach?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              There are dozens of background removal tools online. Here is an honest,
              detailed explanation of why we built BgEraser differently — and why that
              difference matters to you.
            </p>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyBenefits.map(({ title, description, icon }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-3xl mb-4" role="img" aria-label={title}>
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Use cases */}
          <div className="mt-14">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
              Who Uses BgEraser? Real-World Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map(({ title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center">
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
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-1.5">{title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <div className="mt-14">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
              BgEraser vs Other Background Removal Tools
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <table className="w-full text-sm text-left bg-white dark:bg-slate-800">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50">Feature</th>
                    <th className="px-6 py-4 font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 text-center">BgEraser ✓</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-center">Cloud Tools</th>
                    <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-center">Desktop Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {[
                    ["Free to use", "✅ Always free", "⚠️ Limited free tier", "⚠️ One-time or subscription cost"],
                    ["No watermark", "✅ Never", "❌ Paid only", "✅ Yes"],
                    ["Privacy / No upload", "✅ 100% on-device", "❌ Images uploaded", "✅ Yes"],
                    ["No account needed", "✅ No sign-up", "❌ Usually required", "⚠️ Sometimes"],
                    ["Works in browser", "✅ Yes", "✅ Yes", "❌ Install required"],
                    ["Handles complex hair", "✅ AI-powered", "✅ AI-powered", "⚠️ Varies"],
                    ["GDPR / CCPA compliant", "✅ By design", "⚠️ Depends on policy", "✅ Generally"],
                  ].map(([feature, bgeraser, cloud, desktop]) => (
                    <tr key={feature} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-slate-700 dark:text-slate-200">{feature}</td>
                      <td className="px-6 py-3.5 text-center text-slate-700 dark:text-brand-300 bg-brand-50/30 dark:bg-brand-900/10">{bgeraser}</td>
                      <td className="px-6 py-3.5 text-center text-slate-500 dark:text-slate-400">{cloud}</td>
                      <td className="px-6 py-3.5 text-center text-slate-500 dark:text-slate-400">{desktop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── AD SLOT 2 — Above Footer ──────────────────────────────────────── */}
      {/*
        ADSENSE INTEGRATION (same as above — use a different data-ad-slot value):
        Replace <AdBanner> with your <ins class="adsbygoogle" …> element.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdBanner
          label="Advertisement — Leaderboard (728×90)"
          heightClass="h-24 md:h-28"
          className="rounded-xl"
        />
      </div>
    </>
  );
}
