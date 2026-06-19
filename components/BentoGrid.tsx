"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Zap, ShieldCheck, PackageSearch, HeadphonesIcon, 
  Building2, Factory, Cpu, Wrench
} from "lucide-react";

// ── WHY CHOOSE US BENTO ITEMS ─────────────────────────────────────────────────
const BENTO_ITEMS = [
  {
    size: "col-span-2",   // wide card
    Icon: PackageSearch,
    title: "Single-Source Simplicity",
    body: "Stop juggling 10 vendors. Every material — MS, SS, and Fasteners — from one trusted partner. Less friction, more focus on your production.",
    accent: "var(--primary)",
    bg: "from-emerald-50 to-white",
    image: "/img/Channels.jpg",
    hasImage: true,
  },
  {
    size: "col-span-1",
    Icon: Zap,
    title: "Speed That Matches Demand",
    body: "Urgent order? We move fast. Our supply chain is built for velocity without compromising verification.",
    accent: "var(--secondary)",
    bg: "from-orange-50 to-white",
    hasImage: false,
  },
  {
    size: "col-span-1",
    Icon: ShieldCheck,
    title: "Zero-Compromise Quality",
    body: "Every product is sourced from verified suppliers and checked before it leaves our facility.",
    accent: "var(--primary)",
    bg: "from-emerald-50 to-white",
    hasImage: false,
  },
  {
    size: "col-span-1",
    Icon: HeadphonesIcon,
    title: "Dedicated Support",
    body: "A real person answers when you call. One point of contact, full accountability.",
    accent: "var(--secondary)",
    bg: "from-orange-50 to-white",
    hasImage: false,
  },
  {
    size: "col-span-2",   // wide card
    Icon: Factory,
    title: "Built for Every Industry",
    body: "Manufacturing, construction, pharma, food processing, auto — we understand your sector's material standards and deliver accordingly.",
    accent: "var(--dark)",
    bg: "from-slate-50 to-white",
    hasImage: false,
    industries: ["Manufacturing", "Construction", "Pharma", "Auto", "Food Processing"],
  },
];

// ── INDUSTRIES SERVED ─────────────────────────────────────────────────────────
const INDUSTRIES = [
  { Icon: Factory,   name: "Manufacturing" },
  { Icon: Building2, name: "Construction" },
  { Icon: Cpu,       name: "Electronics" },
  { Icon: Wrench,    name: "Engineering" },
];

export default function BentoGrid() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={ref}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
      aria-labelledby="whyus-heading"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-30 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,105,34,0.10), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ──────────────────────────────────────────── */}
        <div
          className={`max-w-2xl mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-badge mb-4 inline-flex" aria-label="Why choose us">
            Why Stellar Global
          </span>
          <h2 id="whyus-heading" className="section-heading mb-3">
            Why Thousands of Buyers{" "}
            <span className="text-gradient">Choose Us</span>
          </h2>
          <p className="section-sub">
            We&apos;ve built our reputation on four pillars: speed, quality, transparency, 
            and support. Here&apos;s what that looks like in practice.
          </p>
        </div>

        {/* ── BENTO GRID ──────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          role="list"
          aria-label="Why choose Stellar Global Supplies"
        >
          {BENTO_ITEMS.map(({ size, Icon, title, body, accent, bg, image, hasImage, industries }, idx) => (
            <div
              key={title}
              className={[
                "bento-card border border-gray-100 p-6 bg-gradient-to-br",
                bg,
                // Full-width on md for 2-col items, then shrink on smaller
                size === "col-span-2" ? "md:col-span-2" : "md:col-span-1",
                "transition-all duration-500",
              ].join(" ")}
              style={{
                transitionDelay: `${idx * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
              }}
              role="listitem"
            >
              {/* Wide card with image */}
              {hasImage && image ? (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${accent}18` }}
                      aria-hidden="true"
                    >
                      <Icon size={20} style={{ color: accent }} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--dark)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                  </div>
                  <div className="relative w-full md:w-48 h-36 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="200px"
                      className="object-cover img-zoom"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : industries ? (
                /* Wide card with industry chips */
                <>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${accent}18` }}
                    aria-hidden="true"
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--dark)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{body}</p>
                  <div className="flex flex-wrap gap-2" aria-label="Industries served">
                    {industries.map((ind) => (
                      <span
                        key={ind}
                        className="px-3 py-1 rounded-full text-xs font-semibold border"
                        style={{
                          borderColor: "rgba(14,46,80,0.15)",
                          color: "var(--dark)",
                          background: "rgba(14,46,80,0.04)",
                        }}
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                /* Standard card */
                <>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${accent}18` }}
                    aria-hidden="true"
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: "var(--dark)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ── INDUSTRIES ROW ──────────────────────────────────── */}
        <div
          className={`mt-14 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          aria-labelledby="industries-heading"
        >
          <p
            id="industries-heading"
            className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6"
          >
            Industries We Serve
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {INDUSTRIES.map(({ Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 group"
                aria-label={name}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 border group-hover:shadow-glass"
                  style={{
                    background: "rgba(0,185,142,0.06)",
                    borderColor: "rgba(0,185,142,0.15)",
                  }}
                >
                  <Icon
                    size={22}
                    aria-hidden="true"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
