"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Target, TrendingUp, CheckCircle2, Globe } from "lucide-react";

const VALUES = [
  {
    Icon: Target,
    title: "Mission-Driven Sourcing",
    body: "We don't just procure — we partner. Every order is matched to your exact requirement, spec, and budget.",
    accent: "var(--primary)",
    bg: "rgba(0,185,142,0.06)",
  },
  {
    Icon: TrendingUp,
    title: "Quality You Can Count On",
    body: "Every batch is verified before dispatch. No shortcuts, no substitutions — only materials that meet the mark.",
    accent: "var(--secondary)",
    bg: "rgba(255,105,34,0.06)",
  },
  {
    Icon: Globe,
    title: "One-Stop Procurement",
    body: "Mild Steel, Stainless Steel, Fasteners — sourced from verified suppliers and delivered to your doorstep.",
    accent: "var(--primary)",
    bg: "rgba(0,185,142,0.06)",
  },
  {
    Icon: CheckCircle2,
    title: "On-Time, Every Time",
    body: "Your production schedule won't slip because of us. We treat deadlines as a commitment, not a target.",
    accent: "var(--secondary)",
    bg: "rgba(255,105,34,0.06)",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Subtle background shape */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 90% 20%, rgba(0,185,142,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT – IMAGE ─────────────────────────────────────── */}
          <div
            className={`relative transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover aspect-[4/5]">
              <Image
                src="/img/MS-Angles.jpg"
                alt="MS Angles – Stellar Global Supplies product quality"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover img-zoom"
              />
              {/* Overlay tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(160deg, transparent 50%, rgba(14,46,80,0.35) 100%)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating year badge */}
            <div
              className="absolute bottom-6 right-6 glass rounded-2xl px-5 py-4 shadow-glass text-center"
              aria-label="Founded 2025"
            >
              <p
                className="text-3xl font-extrabold leading-none"
                style={{ color: "var(--primary)" }}
              >
                2025
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">Est. Year</p>
            </div>

            {/* Decorative grid dot pattern */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-24 h-24 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--primary) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          {/* ── RIGHT – COPY ─────────────────────────────────────── */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Label */}
            <span className="section-badge w-fit" aria-label="About us section">
              About Us
            </span>

            {/* Heading */}
            <h2
              id="about-heading"
              className="section-heading"
            >
              The #1 Place to Source{" "}
              <span className="text-gradient">All Your Industrial</span>{" "}
              Materials
            </h2>

            {/* Body */}
            <p className="section-sub text-base">
              Stellar Global Supplies is a one-stop solution for all industrial procurement needs — 
              specialising in trading and sourcing of high-quality raw materials. We cater to diverse 
              industries with a commitment to seamless sourcing, reliable quality, and on-time delivery.
            </p>

            {/* Value grid – 2×2 bento */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
              aria-label="Our core values"
            >
              {VALUES.map(({ Icon, title, body, accent, bg }, idx) => (
                <div
                  key={title}
                  className={`bento-card p-5 border border-gray-100 transition-all duration-500`}
                  style={{
                    background: bg,
                    transitionDelay: `${idx * 80}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                  }}
                  role="article"
                  aria-labelledby={`value-${idx}`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${accent}18` }}
                    aria-hidden="true"
                  >
                    <Icon size={18} style={{ color: accent }} />
                  </div>
                  <h3
                    id={`value-${idx}`}
                    className="text-sm font-bold mb-1"
                    style={{ color: "var(--dark)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
