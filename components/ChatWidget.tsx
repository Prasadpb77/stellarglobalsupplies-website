"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, Mail, MessageSquare } from "lucide-react";

const OPTIONS = [
  {
    label: "Get a Quote",
    desc: "Share your requirement for pricing",
    icon: Phone,
    action: "tel:+919637655556",
    actionLabel: "Call Now",
  },
  {
    label: "WhatsApp Us",
    desc: "Chat with our team instantly",
    icon: MessageSquare,
    action: "https://wa.me/919637655556?text=Hi%20Stellar%20Global%20Supplies%2C%20I%20need%20help%20with%20a%20requirement.",
    actionLabel: "Open WhatsApp",
  },
  {
    label: "Email Us",
    desc: "Send your detailed requirement",
    icon: Mail,
    action: "mailto:stellarglobalsupplies@gmail.com?subject=Industrial%20Supply%20Requirement",
    actionLabel: "Send Email",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between" style={{ background: "var(--dark)" }}>
            <div>
              <p className="text-white font-bold text-sm">How can we help?</p>
              <p className="text-white/60 text-xs mt-0.5">Choose an option below to reach us</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Options */}
          <div className="p-3 flex flex-col gap-2 overflow-y-auto">
            {OPTIONS.map((opt) => (
              <a
                key={opt.label}
                href={opt.action}
                target={opt.action.startsWith("http") ? "_blank" : undefined}
                rel={opt.action.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary)", color: "white" }}>
                  <opt.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-brand-dark group-hover:text-primary-600 transition-colors">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                  {opt.actionLabel}
                </span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-[11px] text-gray-400 text-center">
              Typically replies within a few minutes during business hours
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ background: "var(--primary)" }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>
    </div>
  );
}