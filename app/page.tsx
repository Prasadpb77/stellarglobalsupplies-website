import type { Metadata } from "next";
import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import TrustBar    from "@/components/TrustBar";
import About       from "@/components/About";
import BentoGrid   from "@/components/BentoGrid";
import Products    from "@/components/Products";
import CTASection  from "@/components/CTASection";
import Footer      from "@/components/Footer";
import BackToTop   from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Stellar Global Supplies | Premium SS & MS Industrial Materials – Pune",
  description:
    "India's trusted one-stop industrial supply partner. Premium Stainless Steel, Mild Steel & Fastening products — sourced right, delivered fast from Pune.",
};

export default function HomePage() {
  return (
    <>
      {/* ── SKIP NAV (WCAG) ─────────────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-white focus:bg-primary-500"
      >
        Skip to main content
      </a>

      {/* ── NAVIGATION ─────────────────────────────────── */}
      <Navbar />

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <main id="main-content">
        {/* 1. Hero — above the fold, primary CTA */}
        <Hero />

        {/* 2. Trust Bar — animated stats in dark band */}
        <TrustBar />

        {/* 3. About — who we are + core values bento */}
        <About />

        {/* 4. Why Choose Us — 5-card bento grid */}
        <BentoGrid />

        {/* 5. Products — 3-tab filtered product catalogue */}
        <Products />

        {/* 6. CTA Banner + Contact cards */}
        <CTASection />
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <Footer />

      {/* ── BACK TO TOP ────────────────────────────────── */}
      <BackToTop />
    </>
  );
}
