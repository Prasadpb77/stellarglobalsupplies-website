"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight, Clock } from "lucide-react";

const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: "Call Us",
    value: "+91 9637655556",
    href: "tel:+919637655556",
    hint: "Mon–Sat, 9 AM–6 PM",
  },
  {
    Icon: Mail,
    label: "Email Us",
    value: "stellarglobalsupplies@gmail.com",
    href: "mailto:stellarglobalsupplies@gmail.com",
    hint: "We reply within 24 hours",
  },
  {
    Icon: MapPin,
    label: "Visit Us",
    value: "Survey No-169, Gala No-3, Pandurang Industrial Complex, Rupee Nagar, Talawade, Pune – 411062",
    href: "https://maps.google.com/?q=Talawade+Pune+411062",
    hint: "Open: Mon–Sat",
  },
];

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── FULL-WIDTH CTA BANNER ──────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "var(--dark)" }}
        aria-labelledby="cta-heading"
      >
        {/* Background image overlay */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/img/Channels.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,46,80,0.96) 0%, rgba(14,46,80,0.88) 100%)",
            }}
          />
        </div>

        {/* Decorative circles */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--primary)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--secondary)" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(0,185,142,0.15)",
              color: "var(--primary)",
              border: "1px solid rgba(0,185,142,0.25)",
            }}
            aria-label="Call to action section"
          >
            <Clock size={12} aria-hidden="true" />
            Get a Quote Today
          </span>

          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
          >
            Ready to Streamline Your{" "}
            <span className="text-gradient">Industrial Procurement?</span>
          </h2>
          <p className="text-white/65 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Tell us your requirement — material, grade, quantity, timeline — and 
            we&apos;ll have a competitive quote back to you within 24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919637655556"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-primary transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "var(--primary)" }}
              aria-label="Call us now for a quote"
            >
              <Phone size={16} aria-hidden="true" />
              Call Us Now
            </a>
            <a
              href="mailto:stellarglobalsupplies@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              style={{
                borderColor: "rgba(255,255,255,0.25)",
                color: "rgba(255,255,255,0.9)",
              }}
              aria-label="Send us an email"
            >
              <Mail size={16} aria-hidden="true" />
              Email a Requirement
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT CARDS ──────────────────────────────────────── */}
      <section
        id="contact"
        ref={ref}
        className="py-16 bg-white"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-badge mb-4 inline-flex" aria-label="Contact section">
              Contact Us
            </span>
            <h2
              id="contact-heading"
              className="text-2xl md:text-3xl font-extrabold"
              style={{ color: "var(--dark)" }}
            >
              We&apos;re Just a Call Away
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CONTACT_ITEMS.map(({ Icon, label, value, href, hint }, idx) => (
              <a
                key={label}
                href={href}
                target={label === "Visit Us" ? "_blank" : undefined}
                rel={label === "Visit Us" ? "noopener noreferrer" : undefined}
                className={[
                  "bento-card border border-gray-100 p-6 flex flex-col gap-3 group no-underline",
                  "hover:border-primary-200 hover:bg-primary-50/30",
                  "transition-all duration-500",
                ].join(" ")}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                }}
                aria-label={`${label}: ${value}`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,185,142,0.10)" }}
                  aria-hidden="true"
                >
                  <Icon size={20} style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: "var(--primary)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-semibold break-all leading-relaxed"
                    style={{ color: "var(--dark)" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{hint}</p>
                </div>
                <span
                  className="text-xs font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: "var(--primary)" }}
                  aria-hidden="true"
                >
                  {label === "Visit Us" ? "Open in Maps" : label === "Email Us" ? "Send Email" : "Call Now"}
                  <ArrowRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
