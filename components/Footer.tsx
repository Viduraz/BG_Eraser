import Link from "next/link";

const footerSections = [
  {
    heading: "Top Niches",
    links: [
      { href: "/car-photos",     label: "Car Photos" },
      { href: "/real-estate",    label: "Real Estate Photos" },
      { href: "/id-cards",       label: "ID Cards & Passport Photos" },
      { href: "/product-photos", label: "Product Photos" },
      { href: "/profile-photos", label: "Profile Photos" },
    ],
  },
  {
    heading: "Product",
    links: [
      { href: "/", label: "Remove Background" },
      { href: "/about", label: "How It Works" },
      { href: "/", label: "API (Coming Soon)" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms",          label: "Terms of Service" },
      { href: "/cookies",        label: "Cookie Policy" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-transparent dark:border-slate-900">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4.5 h-4.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6l9-4 9 4v6c0 5-4 9-9 9s-9-4-9-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">BgEraser</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-4">
              Free, private AI background removal. No uploads, no accounts, no watermarks. 
              Your images never leave your device.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { label: "Twitter/X", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "GitHub", href: "#", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} BgEraser. All rights reserved. Made with ❤️ for privacy.
          </p>
          <div className="flex gap-5 text-xs">
            <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-slate-500 hover:text-slate-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
