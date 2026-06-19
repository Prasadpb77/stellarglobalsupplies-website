"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <button
      onClick={scrollUp}
      className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-xl flex items-center justify-center shadow-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400"
      style={{ background: "var(--primary)" }}
      aria-label="Back to top"
    >
      <ArrowUp size={18} className="text-white" aria-hidden="true" />
    </button>
  );
}
