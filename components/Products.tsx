"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── PRODUCT DATA (CEO-mandated images & names) ────────────────────────────────
const CATEGORIES = [
  {
    id: "mild-steel",
    label: "Mild Steel",
    short: "MS",
    tagline: "Structural strength for every application",
    products: [
      { name: "MS Angles",           img: "/img/MS-Angles.jpg",       desc: "Versatile angular sections for structural frameworks." },
      { name: "MS Flats",            img: "/img/MS-Flats.jpg",        desc: "Precision-rolled flat bars for fabrication needs." },
      { name: "MS Round Pipes",      img: "/img/MS-Round-Pipes.jpg",  desc: "Seamless round pipes for fluid & structural use." },
      { name: "MS Sheet",            img: "/img/MS-Sheet.jpg",        desc: "Hot-rolled sheets for industrial fabrication." },
      { name: "MS Square Tubes",     img: "/img/Square-Tubes.jpg",    desc: "Hollow square sections for construction & furniture." },
      { name: "MS Channels",         img: "/img/Channels.jpg",        desc: "C-section channels for beams and support structures." },
      { name: "MS Chequered Plate",  img: "/img/Chequered-plate.jpg", desc: "Anti-slip patterned plates for flooring & ramps." },
      { name: "MS Galvanised Sheets",img: "/img/Galvanised-Sheets.jpg",desc: "Zinc-coated sheets for superior corrosion resistance." },
    ],
  },
  {
    id: "stainless-steel",
    label: "Stainless Steel",
    short: "SS",
    tagline: "Corrosion-resistant precision materials",
    products: [
      { name: "SS Channels",   img: "/img/SS-Channels.jpg",   desc: "Grade 304/316 channels for hygienic & structural use." },
      { name: "SS Circles",    img: "/img/SS-Circles.jpg",    desc: "Precision-cut circles for flanges and blanks." },
      { name: "SS Flats",      img: "/img/SS-Flats.jpg",      desc: "Polished SS flat bars for food & pharma industries." },
      { name: "SS Round Bars", img: "/img/SS-Round-Bars.jpg", desc: "Solid round bars for machining & fabrication." },
      { name: "SS Round Pipe", img: "/img/SS-Round-Pipe.jpg", desc: "Seamless & welded pipes in multiple grades." },
      { name: "SS Sheets",     img: "/img/SS-Sheets.jpg",     desc: "Mirror, matte & brushed finish sheets available." },
    ],
  },
  {
    id: "fastening",
    label: "Locking & Fastening",
    short: "L&F",
    tagline: "Every fastener, precisely engineered",
    products: [
      { name: "Brass Hex Spacers (M-F)",  img: "/img/Brass-Hex-Spacers.jpg",         desc: "Male-to-female PCB standoffs in multiple lengths." },
      { name: "KM Lock Nuts",             img: "/img/KM-Lock-Nuts.jpg",               desc: "Bearing retention lock nuts for precision shafts." },
      { name: "MB Lock Washer",           img: "/img/MB-Lock-Washer.jpg",             desc: "Tab washers for KM nut locking applications." },
      { name: "External Circlip",         img: "/img/External-Circlip.png",           desc: "Snap rings for shaft retention in assemblies." },
      { name: "Internal Circlip",         img: "/img/Internal-Circlip.png",           desc: "Bore snap rings for housing & bore retention." },
      { name: "Dowel Pins",               img: "/img/Dowel-Pins.jpg",                 desc: "Precision ground pins for accurate alignment." },
      { name: "Studs",                    img: "/img/Studs.jpg",                       desc: "Threaded studs for high-load bolt joints." },
      { name: "Nylock Nuts",              img: "/img/Nylock-Nuts.jpg",                desc: "Nylon insert nuts for vibration-proof fastening." },
      { name: "Castle Nuts",              img: "/img/Castle-nuts.jpg",                desc: "Slotted nuts for cotter pin security." },
      { name: "Grub Screws",             img: "/img/Grub-Screws-1.jpg",              desc: "Headless set screws for shaft-collar locking." },
      { name: "Spring Dowel Pins",        img: "/img/spring-dowel-pin.jpg",           desc: "Coiled spring pins for self-locking joints." },
      { name: "Allen CSK Bolts",          img: "/img/Allen-CSK-Bolts.jpg",            desc: "Countersunk socket head bolts for flush fitting." },
      { name: "Hex Bolts",                img: "/img/Hex-Bolts.jpg",                  desc: "Standard hex head bolts in various grades." },
      { name: "Allen Bolts",              img: "/img/Allen-Bolts.jpg",                desc: "Socket head cap screws for tight-space fastening." },
    ],
  },
];

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({
  name,
  img,
  desc,
  category,
  delay,
}: {
  name: string;
  img: string;
  desc: string;
  category: string;
  delay: number;
}) {
  return (
    <article
      className="product-card group"
      aria-label={`${name} – ${category}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <Image
          src={img}
          alt={`${name} – industrial supply product`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover img-zoom"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
            style={{ background: "var(--primary)" }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-bold text-sm mb-1 line-clamp-1"
          style={{ color: "var(--dark)" }}
        >
          {name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{desc}</p>

        {/* Subtle CTA */}
        <button
          className="mt-3 text-xs font-semibold flex items-center gap-1 group/btn"
          style={{ color: "var(--primary)" }}
          onClick={() => {
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label={`Enquire about ${name}`}
        >
          Enquire Now
          <span
            className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </div>
    </article>
  );
}

// ── PRODUCTS SECTION ──────────────────────────────────────────────────────────
export default function Products() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const current = CATEGORIES[activeTab];

  return (
    <section
      id="products"
      ref={ref}
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "var(--light)" }}
      aria-labelledby="products-heading"
    >
      {/* Faint accent top-left */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-72 h-72 pointer-events-none opacity-40 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,185,142,0.12), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SECTION HEADER ──────────────────────────────────── */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-badge mb-4 inline-flex" aria-label="Products section">
            Our Products
          </span>
          <h2 id="products-heading" className="section-heading mb-3">
            Everything Your Industry Needs,{" "}
            <span className="text-gradient">In One Place</span>
          </h2>
          <p className="section-sub mx-auto">
            Browse our wide-ranging catalogue of industrial materials — each product 
            precision-sourced and quality-verified before delivery.
          </p>
        </div>

        {/* ── TABS ────────────────────────────────────────────── */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          role="tablist"
          aria-label="Product categories"
        >
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              role="tab"
              id={`tab-${cat.id}`}
              aria-selected={activeTab === idx}
              aria-controls={`panel-${cat.id}`}
              onClick={() => setActiveTab(idx)}
              className={[
                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                activeTab === idx
                  ? "tab-active"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600",
              ].join(" ")}
            >
              {/* Short label on mobile */}
              <span className="sm:hidden">{cat.short}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ── CATEGORY TAGLINE ───────────────────────────────── */}
        <p
          className="text-center text-sm text-gray-500 mb-8 font-medium"
          aria-live="polite"
        >
          {current.tagline} — {current.products.length} products
        </p>

        {/* ── PRODUCT GRID ────────────────────────────────────── */}
        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          key={current.id}
        >
          {current.products.map((product, idx) => (
            <ProductCard
              key={product.name}
              {...product}
              category={current.label}
              delay={idx * 60}
            />
          ))}
        </div>

        {/* ── BOTTOM CTA ──────────────────────────────────────── */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Need something not listed? We source custom requirements too.
          </p>
          <button
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
            aria-label="Contact us for custom requirements"
          >
            Discuss Your Requirements
          </button>
        </div>
      </div>
    </section>
  );
}
