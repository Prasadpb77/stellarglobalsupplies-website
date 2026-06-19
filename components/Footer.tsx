"use client";

import { Phone, Mail, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home",          href: "#home" },
  { label: "About Us",      href: "#about" },
  { label: "Mild Steel",    href: "#mild-steel" },
  { label: "Stainless Steel", href: "#stainless-steel" },
  { label: "Locking & Fastening", href: "#fastening" },
  { label: "Contact",       href: "#contact" },
];

const PRODUCTS = [
  "MS Angles & Flats",
  "MS Round Pipes",
  "SS Channels & Sheets",
  "SS Round Bars & Pipes",
  "Hex & Allen Bolts",
  "Lock Nuts & Washers",
  "Circlips & Dowel Pins",
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: "var(--dark)" }}
      aria-label="Site footer"
    >
      {/* Subtle top border */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
        aria-hidden="true"
      />

      {/* Decorative blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-5 blur-3xl rounded-full"
        style={{ background: "var(--primary)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── BRAND COL ───────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo text */}
            <div className="mb-4">
              <p className="text-lg font-extrabold text-white tracking-tight">
                Stellar Global
              </p>
              <p
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--primary)" }}
              >
                Supplies
              </p>
            </div>

            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Your one-stop industrial procurement partner — sourcing SS, MS, 
              and fastening materials with precision and reliability since 2025.
            </p>

            {/* Quick contact */}
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+919637655556"
                className="footer-link flex items-center gap-2"
                aria-label="Phone: +91 9637655556"
              >
                <Phone size={14} aria-hidden="true" style={{ color: "var(--primary)" }} />
                +91 9637655556
              </a>
              <a
                href="mailto:stellarglobalsupplies@gmail.com"
                className="footer-link flex items-center gap-2"
                aria-label="Email: stellarglobalsupplies@gmail.com"
              >
                <Mail size={14} aria-hidden="true" style={{ color: "var(--primary)" }} />
                stellarglobalsupplies@gmail.com
              </a>
              <div className="footer-link flex items-start gap-2 cursor-default">
                <MapPin
                  size={14}
                  aria-hidden="true"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Survey No-169, Gala No-3, Pandurang Industrial Complex, 
                  Rupee Nagar, Talawade, Pune – 411062
                </span>
              </div>
            </div>
          </div>

          {/* ── QUICK LINKS ─────────────────────────────────────── */}
          <nav aria-label="Footer quick links">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => handleScroll(href)}
                    className="footer-link text-left hover:text-primary-400 transition-colors"
                    aria-label={`Navigate to ${label}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── PRODUCTS ────────────────────────────────────────── */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Our Products
            </h3>
            <ul className="flex flex-col gap-2.5">
              {PRODUCTS.map((product) => (
                <li
                  key={product}
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>

          {/* ── GET IN TOUCH ────────────────────────────────────── */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Get a Quote
            </h3>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              Have a requirement? Reach out and we&apos;ll get back to you within 24 hours 
              with a competitive price.
            </p>
            <a
              href="tel:+919637655556"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
              style={{ background: "var(--primary)" }}
              aria-label="Call to get a quote"
            >
              <Phone size={15} aria-hidden="true" />
              Call for a Quote
            </a>

            {/* Operating hours */}
            <div
              className="mt-5 px-4 py-3 rounded-xl text-xs"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <p className="font-semibold text-white/70 mb-1">Business Hours</p>
              <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────── */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <p>
            © {year}{" "}
            <button
              onClick={() => handleScroll("#home")}
              className="font-semibold hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Stellar Global Supplies
            </button>
            . All rights reserved.
          </p>
          <p>
            Designed by{" "}
            <a
              href="https://www.linkedin.com/in/prasad-bhavsar-868a3019b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
              aria-label="Designed by Prasad Bhavsar (opens LinkedIn)"
            >
              Prasad Bhavsar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
