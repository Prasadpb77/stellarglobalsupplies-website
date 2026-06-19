"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Package, Star } from "lucide-react";

// ── HERO CAROUSEL IMAGES (CEO-mandated) ──────────────────────────────────────
const CAROUSEL_IMAGES = [
  { src: "/img/SS-Circles.jpg",     alt: "Stainless Steel Circles" },
  { src: "/img/MS-Round-Pipes.jpg", alt: "MS Round Pipes" },
  { src: "/img/SS-Round-Pipe.jpg",  alt: "SS Round Pipes" },
  { src: "/img/Hex-Bolts.jpg",      alt: "Hex Bolts" },
];

// ── TRUST STATS ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "500+",   label: "Products",      Icon: Package },
  { value: "100%",   label: "Quality Check", Icon: ShieldCheck },
  { value: "3",      label: "Categories",    Icon: Star },
  { value: "Fast",   label: "Delivery",      Icon: Truck },
];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);
  const [isVisible,  setIsVisible]  = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImg((i) => (i + 1) % CAROUSEL_IMAGES.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-mesh relative overflow-hidden min-h-[88vh] flex items-center"
      aria-label="Hero – Stellar Global Supplies"
    >
      {/* Decorative circles */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "var(--primary)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "var(--secondary)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN – COPY ─────────────────────────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">

            {/* Badge */}
            <div
              className={`section-badge w-fit transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--primary)" }}
                aria-hidden="true"
              />
              Established 2025 · Pune, India
            </div>

            {/* Headline */}
            <h1
              className={[
                "section-heading transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              India&apos;s Most{" "}
              <span className="shimmer-text">Reliable</span>
              <br />
              Industrial Supply{" "}
              <span
                className="relative inline-block"
                style={{ color: "var(--dark)" }}
              >
                Partner
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                  style={{ background: "var(--primary)", opacity: 0.35 }}
                />
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className={[
                "section-sub transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              One shop. Every material. Zero compromise. We source premium{" "}
              <strong className="font-semibold" style={{ color: "var(--dark)" }}>
                Stainless Steel, Mild Steel & Fastening
              </strong>{" "}
              products — tailored to your spec, delivered on time.
            </p>

            {/* Value props */}
            <ul
              className={[
                "flex flex-col gap-2 transition-all duration-700 delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              aria-label="Key benefits"
            >
              {[
                "500+ industrial products under one roof",
                "Precision-sourced to your exact specifications",
                "Reliable quality · on-time, every time",
              ].map((item) => (
                <li key={item} className="dot-accent text-sm text-gray-600">
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div
              className={[
                "flex flex-wrap gap-3 mt-2 transition-all duration-700 delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            >
              <button
                onClick={scrollToProducts}
                className="btn-primary"
                aria-label="Browse all products"
              >
                Browse Products
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                onClick={scrollToContact}
                className="btn-ghost"
                aria-label="Contact us for a quote"
              >
                Get a Free Quote
              </button>
            </div>

            {/* Inline stats strip */}
            <div
              className={[
                "grid grid-cols-4 gap-3 mt-4 transition-all duration-700 delay-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              aria-label="Key statistics"
            >
              {STATS.map(({ value, label, Icon }) => (
                <div
                  key={label}
                  className="stat-chip"
                  role="figure"
                  aria-label={`${value} ${label}`}
                >
                  <Icon
                    size={16}
                    aria-hidden="true"
                    className="mb-1"
                    style={{ color: "var(--primary)" }}
                  />
                  <span
                    className="text-lg font-extrabold leading-none"
                    style={{ color: "var(--dark)" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-gray-500 text-center leading-tight mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN – VISUAL ─────────────────────────────────── */}
          <div
            className={[
              "order-1 lg:order-2 relative transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            ].join(" ")}
          >
            {/* Main image frame */}
            <div className="relative rounded-4xl overflow-hidden shadow-glass-dark aspect-[4/3] lg:aspect-[5/4]">
              {CAROUSEL_IMAGES.map((img, idx) => (
                <div
                  key={img.src}
                  className={[
                    "absolute inset-0 transition-opacity duration-700",
                    idx === currentImg ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                  aria-hidden={idx !== currentImg}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover img-zoom"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 55%, rgba(14,46,80,0.45) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Carousel dots */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                role="tablist"
                aria-label="Image carousel controls"
              >
                {CAROUSEL_IMAGES.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setCurrentImg(idx)}
                    role="tab"
                    aria-selected={idx === currentImg}
                    aria-label={`View image ${idx + 1}: ${img.alt}`}
                    className={[
                      "h-1.5 rounded-full transition-all duration-300",
                      idx === currentImg
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50 hover:bg-white/75",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>

            {/* Floating glass card – top-right */}
            <div
              className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-glass animate-float hidden sm:block"
              aria-label="On-time delivery badge"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,185,142,0.12)" }}
                  aria-hidden="true"
                >
                  <Truck size={16} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--dark)" }}>
                    On-Time Delivery
                  </p>
                  <p className="text-xs text-gray-500">Guaranteed</p>
                </div>
              </div>
            </div>

            {/* Floating glass card – bottom-left */}
            <div
              className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-glass animate-float hidden sm:block"
              style={{ animationDelay: "1.5s" }}
              aria-label="Quality assurance badge"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,105,34,0.10)" }}
                  aria-hidden="true"
                >
                  <ShieldCheck size={16} style={{ color: "var(--secondary)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--dark)" }}>
                    Quality Assured
                  </p>
                  <p className="text-xs text-gray-500">Every batch</p>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-4xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,185,142,0.12) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
