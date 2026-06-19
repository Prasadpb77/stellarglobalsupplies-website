"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",        href: "#home" },
  { label: "About",       href: "#about" },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "Mild Steel Products",        href: "#mild-steel" },
      { label: "Stainless Steel Products",   href: "#stainless-steel" },
      { label: "Locking & Fastening",        href: "#fastening" },
    ],
  },
  { label: "Clients",     href: "#clients" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll detection
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── TOPBAR ─────────────────────────────────────────── */}
      <div
        className="hidden md:flex items-center justify-between px-6 py-2 text-xs"
        style={{ background: "var(--dark)", color: "rgba(255,255,255,0.7)" }}
        role="banner"
        aria-label="Contact information"
      >
        <span className="flex items-center gap-4">
          <a
            href="tel:+919637655556"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            aria-label="Call us"
          >
            <Phone size={12} aria-hidden="true" />
            +91 9637655556
          </a>
          <a
            href="mailto:stellarglobalsupplies@gmail.com"
            className="hover:text-white transition-colors"
          >
            stellarglobalsupplies@gmail.com
          </a>
        </span>
        <span>Survey No-169, Talawade, Pune – 411062</span>
      </div>

      {/* ── MAIN NAV ───────────────────────────────────────── */}
      <header
        className={[
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "glass shadow-glass py-2"
            : "bg-white/95 backdrop-blur-sm py-3",
        ].join(" ")}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="flex items-center gap-3 group"
              aria-label="Stellar Global Supplies – Home"
            >
              <div className="relative w-20 h-12 rounded-lg overflow-hidden ring-2 ring-primary-200 group-hover:ring-primary-400 transition-all duration-200">
                <img
                  src="/img/logo.jpg"
                  alt="Stellar Global Supplies Logo"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <p className="text-base font-extrabold text-brand-dark leading-none tracking-tight">
                  Stellar Global
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase"
                   style={{ color: "var(--primary)" }}>
                  Supplies
                </p>
              </div>
            </a>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Desktop navigation">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  /* Dropdown */
                  <div key={link.label} className="relative">
                    <button
                      className={`nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary-50 ${
                        activeSection === "products" ? "active" : ""
                      }`}
                      onClick={() => setDropdownOpen((o) => !o)}
                      onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute top-full left-0 mt-2 w-56 glass rounded-2xl shadow-glass overflow-hidden py-1"
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={(e) => { e.preventDefault(); handleNavClick(child.href); }}
                            className="block px-4 py-2.5 text-sm text-brand-dark/80 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            role="menuitem"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`nav-link px-3 py-2 rounded-lg hover:bg-primary-50 ${
                      activeSection === link.href.replace("#", "") ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919637655556"
                className="btn-primary text-sm"
                aria-label="Get a quote by calling us"
              >
                <Phone size={15} aria-hidden="true" />
                Get a Quote
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl text-brand-dark hover:bg-primary-50 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <X size={22} aria-hidden="true" />
                : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ──────────────────────────────────── */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden glass border-t border-primary-100 px-4 pb-4 pt-2"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(child.href); }}
                      className="block px-5 py-2 text-sm text-brand-dark/80 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="block px-3 py-2.5 text-sm font-medium text-brand-dark hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors mt-1"
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="tel:+919637655556"
              className="btn-primary w-full justify-center mt-4"
            >
              <Phone size={15} aria-hidden="true" />
              Get a Quote
            </a>
          </div>
        )}
      </header>
    </>
  );
}
