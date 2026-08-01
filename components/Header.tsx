"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            aria-label="BgEraser Home"
          >
            {/* SVG Logo Mark */}
            <div className="relative w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
              <svg
                className="w-5 h-5 text-white"
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
            <span className="text-xl font-800 tracking-tight">
              <span className="gradient-text font-extrabold">Bg</span>
              <span className="text-slate-800 font-bold">Eraser</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold text-white gradient-brand hover:opacity-90 hover:shadow-md transition-all duration-200 shadow-sm"
            >
              Remove Background →
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 pb-4 border-t border-slate-100 bg-white/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg mx-1 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-2">
              <Link
                href="/"
                className="block text-center px-4 py-3 rounded-xl text-sm font-semibold text-white gradient-brand transition-opacity hover:opacity-90"
                onClick={() => setMobileOpen(false)}
              >
                Remove Background →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
