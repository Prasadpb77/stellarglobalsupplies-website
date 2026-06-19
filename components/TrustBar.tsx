"use client";

import { useEffect, useRef, useState } from "react";
import { Package, Shield, Truck, Award } from "lucide-react";

const STATS = [
  { value: "500",   suffix: "+", label: "Industrial Products",   Icon: Package,  hint: "SS, MS & Fasteners" },
  { value: "100",   suffix: "%", label: "Quality Verified",      Icon: Shield,   hint: "Every batch inspected" },
  { value: "3",     suffix: "",  label: "Product Categories",    Icon: Award,    hint: "MS · SS · Fasteners" },
  { value: "24",    suffix: "h", label: "Quote Turnaround",      Icon: Truck,    hint: "Fast response guaranteed" },
];

function AnimatedNumber({
  value,
  suffix,
  active,
}: {
  value: string;
  suffix: string;
  active: boolean;
}) {
  const num = parseInt(value, 10);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const duration = 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * num));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(num);
    };
    requestAnimationFrame(tick);
  }, [active, num]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative py-12 overflow-hidden"
      style={{ background: "var(--dark)" }}
      aria-label="Key statistics"
      role="region"
    >
      {/* Subtle top/bottom accent lines */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary) 50%, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,185,142,0.3) 50%, transparent)" }}
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,185,142,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
          {STATS.map(({ value, suffix, label, Icon, hint }, idx) => (
            <div
              key={label}
              className="flex flex-col items-center text-center px-4 py-2 group"
              style={{
                animation: active ? `fade-in-up 0.5s ease-out ${idx * 100}ms forwards` : "none",
                opacity: active ? undefined : 0,
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(0,185,142,0.12)" }}
                aria-hidden="true"
              >
                <Icon size={18} style={{ color: "var(--primary)" }} />
              </div>

              {/* Number */}
              <dt
                className="text-3xl font-extrabold mb-1"
                style={{ color: "var(--primary)" }}
                aria-label={`${value}${suffix} ${label}`}
              >
                <AnimatedNumber value={value} suffix={suffix} active={active} />
              </dt>

              {/* Label */}
              <dd className="text-white text-sm font-semibold mb-0.5">{label}</dd>
              <dd className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{hint}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
