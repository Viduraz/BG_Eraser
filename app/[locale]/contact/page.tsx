import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & About Us — EraseImageBg",
  description:
    "Contact the EraseImageBg team and learn about our mission to build privacy-first, browser-based AI tools for professionals in the US and UK. No data collection, no servers — just powerful tools that respect your privacy.",
  robots: { index: true, follow: true },
};

// ── FAQ data ───────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Is EraseImageBg really free?",
    a: "Yes, completely. EraseImageBg is funded by non-intrusive Google AdSense advertisements. There are no hidden tiers, no subscription plans, and no watermarks on any output image — for any user, at any time.",
  },
  {
    q: "Do you store my images?",
    a: "No. Your images are processed entirely within your browser using WebAssembly AI technology. Your photos are never uploaded to our servers, never stored, and never transmitted over the internet. This is an architectural guarantee, not just a policy promise.",
  },
  {
    q: "How accurate is the background removal?",
    a: "EraseImageBg uses a high-quality ONNX neural network model trained on millions of images. It handles complex subjects including portrait hair, fur, product edges, and reflective surfaces. Results are comparable to professional tools like remove.bg and Photoshop's Subject Selection.",
  },
  {
    q: "Can I use EraseImageBg for commercial projects?",
    a: "Yes. There are no restrictions on the commercial use of images you produce using EraseImageBg. You own your output images completely.",
  },
  {
    q: "Why is the first processing session slower than subsequent ones?",
    a: "On your first visit, EraseImageBg downloads the AI model files (~50–80 MB) from a CDN and caches them in your browser. On subsequent visits, the cached model is used immediately — making the tool near-instant and even usable offline.",
  },
  {
    q: "Does EraseImageBg work on mobile devices?",
    a: "Yes. EraseImageBg works on modern iOS and Android browsers (Chrome, Safari, Firefox). Performance may be slower on older or lower-powered devices due to the computational intensity of running an AI model in the browser.",
  },
];

// ── Team values ────────────────────────────────────────────────────────────
const values = [
  {
    icon: "🔒",
    title: "Privacy by Architecture",
    description:
      "We do not build features that require collecting user data. When faced with a design choice between convenience and privacy, we choose privacy every time.",
  },
  {
    icon: "🆓",
    title: "Genuinely Free",
    description:
      "We believe powerful AI tools should be accessible to everyone, not just those who can afford $20/month subscriptions. Our advertising-funded model makes this possible.",
  },
  {
    icon: "🌐",
    title: "Open Technology",
    description:
      "We build on open-source AI research and open web standards. We believe the web is the ideal distribution platform for AI: no installation, no updates, no platform lock-in.",
  },
  {
    icon: "⚡",
    title: "Performance without Compromise",
    description:
      "On-device AI should not mean slow AI. We invest in model optimisation and WebAssembly compilation to ensure EraseImageBg is fast enough for real-world professional workflows.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── ABOUT US HERO ─────────────────────────────────────────────── */}
      <section className="gradient-hero border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-600 mb-4">
              About EraseImageBg
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
              We Build AI Tools That{" "}
              <span className="gradient-text">Respect Your Privacy</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              EraseImageBg is on a mission to make professional-grade AI tools accessible to
              everyone, without compromising the privacy or security of the people who
              use them. We believe you should not have to choose between a powerful tool
              and one that respects your data.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-3xl mb-3" role="img" aria-label={title}>
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1.5">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ─────────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-h2:text-2xl prose-h2:tracking-tight
            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
            prose-strong:text-slate-800 dark:prose-strong:text-white
          ">
            <h2>Our Story and Mission</h2>
            <p>
              EraseImageBg was founded on a straightforward observation: almost every
              professional AI background removal tool available online requires you to
              upload your photos to a third-party server. Your product shots, your
              passport photo, your agent headshot — they all travel over the internet to
              a datacentre you have never heard of, where they are processed by a
              company whose data practices you may not have read. We thought that was
              unnecessary, and we set out to build something better.
            </p>
            <p>
              Modern web browsers are extraordinarily powerful computing environments.
              Using WebAssembly — a binary instruction format that runs at near-native
              speed in any browser — and ONNX Runtime Web, it is now possible to run
              professional-grade AI models entirely within the browser tab, with no
              server-side processing whatsoever. We built EraseImageBg on this foundation.
              The result is a tool that is simultaneously more private, more accessible
              (no account required), and faster (no round-trip network latency) than
              cloud-based alternatives.
            </p>
            <p>
              We are a small, independent team of developers and designers based in the
              United Kingdom, serving users across the US and UK. We keep our tool free
              to use by displaying contextual Google AdSense advertisements. We chose
              AdSense because it is the most privacy-transparent advertising platform
              available: users can opt out of ad personalisation, and the data practices
              are governed by Google's published privacy policies rather than opaque
              intermediary data brokers.
            </p>
            <p>
              Our roadmap includes additional browser-based AI tools — all built on the
              same privacy-first architecture. If you would like to be notified when new
              tools launch, or if you have a suggestion for a tool you would find
              valuable, we would love to hear from you.
            </p>

            <h2>Who Uses EraseImageBg?</h2>
            <p>
              Our users span a wide range of professional and personal use cases across
              the United States and United Kingdom:
            </p>
            <ul>
              <li>
                <strong>E-commerce sellers</strong> on Amazon, Etsy, eBay, and Shopify
                who need white-background product images without paying $25–$100 per
                image to a photography studio.
              </li>
              <li>
                <strong>Real estate agents and property photographers</strong> who need
                clean headshots and property images for MLS listings, Zillow profiles,
                and agency websites.
              </li>
              <li>
                <strong>Professionals and job seekers</strong> who need a polished
                LinkedIn profile photo without booking a studio headshot photographer.
              </li>
              <li>
                <strong>HR teams and enterprise IT departments</strong> who need a
                privacy-compliant tool for processing employee ID card photos at scale.
              </li>
              <li>
                <strong>Freelancers, designers, and content creators</strong> who need
                transparent PNGs for compositing, thumbnail creation, and brand asset
                production.
              </li>
              <li>
                <strong>Private individuals</strong> preparing passport, visa, and
                government ID photos who value the privacy guarantee that their
                biometric photos never leave their device.
              </li>
            </ul>

            <h2>Our Commitment to AdSense Compliance</h2>
            <p>
              We are transparent about how EraseImageBg is funded. We display advertisements
              from Google AdSense, which allows us to offer the Service completely free
              of charge. We have designed our website to comply fully with Google
              AdSense's programme policies, including providing clear disclosure of our
              advertising practices in our{" "}
              <a href="/privacy-policy">Privacy Policy</a>, ensuring our content is
              original, substantive, and provides genuine value to users, and maintaining
              a clearly accessible contact method for any user or advertiser queries.
            </p>
            <p>
              We do not employ any deceptive ad placement, misleading content, or
              prohibited content categories. Our goal is to be an honest, trustworthy
              publisher that our advertising partners — and our users — can depend on.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ───────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-14 md:py-20 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Contact info */}
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-600 mb-4">
                Get In Touch
              </span>
              <h2
                id="contact-heading"
                className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4"
              >
                Contact the EraseImageBg Team
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                We are a small team and we read every message. Whether you have a
                technical question, a feature request, a press enquiry, or simply want to
                say hello, please reach out — we typically respond within 1–2 business
                days.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    label: "General Enquiries",
                    value: "contactmesolution14@gmail.com",
                    href: "mailto:contactmesolution14@gmail.com",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    ),
                    label: "Privacy & Data Rights",
                    value: "contactmesolution14@gmail.com",
                    href: "mailto:contactmesolution14@gmail.com",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    ),
                    label: "Legal & Terms",
                    value: "contactmesolution14@gmail.com",
                    href: "mailto:contactmesolution14@gmail.com",
                  },
                ].map(({ icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-md transition-all duration-200 group"
                    aria-label={`${label}: ${value}`}
                  >
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 leading-relaxed">
                <strong>Response time:</strong> We aim to respond to all enquiries within
                1–2 business days (Monday–Friday, UK business hours). For urgent issues,
                please include "URGENT" in your email subject line.
              </p>
            </div>

            {/* Right: Contact form (UI only — wire up to a form service like Formspree or Resend) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-7">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Send Us a Message</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
                Fill out the form below and we will get back to you by email.
              </p>

              {/*
                FORM WIRING:
                Replace the action="#" with your form handler:
                  - Formspree: action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
                  - Netlify: add data-netlify="true" attribute
                  - Custom API route: use a React onSubmit handler
              */}
              <form
                action="https://formsubmit.co/contactmesolution14@gmail.com"
                method="POST"
                className="space-y-4"
                aria-label="Contact form"
              >
                {/* Hidden field to set the email subject line */}
                <input type="hidden" name="_subject" value="New Contact Form Submission - EraseImageBg" />
                
                {/* (Optional) Hidden field to disable recaptcha if you want a frictionless experience, 
                    but we leave it on by default to prevent spam.
                    <input type="hidden" name="_captcha" value="false" /> 
                */}
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all duration-150"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email Address <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all duration-150"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all duration-150"
                  >
                    <option value="">Select a topic…</option>
                    <option value="general">General Enquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="privacy">Privacy / Data Rights</option>
                    <option value="advertising">Advertising Partnership</option>
                    <option value="press">Press Enquiry</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Message <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="body"
                    rows={5}
                    placeholder="Tell us how we can help…"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all duration-150 resize-none"
                  />
                </div>

                {/* Privacy note */}
                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-start gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Your message is sent directly to our team. We do not share your contact
                  details with third parties. See our{" "}
                  <a href="/privacy-policy" className="text-brand-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 hover:shadow-md active:scale-[0.98] transition-all duration-200 shadow-sm"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white dark:bg-slate-950" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-600 mb-3">
              Common Questions
            </span>
            <h2
              id="faq-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Can&apos;t find what you&apos;re looking for? Email us at{" "}
              <a href="mailto:contactmesolution14@gmail.com" className="text-brand-600 hover:underline font-medium">
                contactmesolution14@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-2 flex items-start gap-2">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full gradient-brand flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                    aria-hidden="true"
                  >
                    Q
                  </span>
                  {q}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-7">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 dark:border-slate-800 py-10 text-center bg-slate-50 dark:bg-slate-900/50">
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-3">Ready to try the tool?</p>
        <a
          href="/#tool"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 hover:shadow-md transition-all duration-200 shadow-sm"
        >
          Remove a Background Free →
        </a>
      </div>
    </>
  );
}
