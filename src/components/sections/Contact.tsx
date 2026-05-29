"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WA_NUMBER = "40754662354";
const PHONE = "+40754662354";
const FB_URL = "https://www.facebook.com/profile.php?id=61582932840289";
const TT_URL = "https://www.tiktok.com/@alexandrujipa0";

const contacts = [
  {
    label: "WhatsApp",
    sublabel: "Trimite un mesaj",
    href: `https://wa.me/${WA_NUMBER}`,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Telefon",
    sublabel: "Sună direct",
    href: `tel:${PHONE}`,
    color: "var(--brand-red)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    sublabel: "Urmărește-ne",
    href: FB_URL,
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    sublabel: "@alexandrujipa0",
    href: TT_URL,
    color: "var(--brand-dark)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contact"
      ref={ref}
      data-navbar-theme="light"
      className="bg-[var(--brand-cream)] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 justify-center mb-4"
          >
            <span className="h-px w-10 bg-[var(--brand-red)]/30" />
            <span className="text-[var(--brand-red)]/50 text-[8px]">◆</span>
            <p className="text-[var(--brand-red)] text-xs tracking-[0.3em] uppercase font-medium">Contact</p>
            <span className="text-[var(--brand-red)]/50 text-[8px]">◆</span>
            <span className="h-px w-10 bg-[var(--brand-red)]/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Hai să dansăm{" "}
            <em className="not-italic text-[var(--brand-red)]">împreună</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-[var(--brand-dark)]/50 text-sm md:text-base max-w-sm mx-auto leading-relaxed"
          >
            Contactează-ne prin orice metodă preferi.
          </motion.p>
        </div>

        {/* Carduri contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col items-center justify-center gap-4 py-10 px-4 bg-white border border-[var(--brand-dark)]/8 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Linie color top la hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: c.color }}
              />

              {/* Icon */}
              <div
                className="transition-colors duration-300"
                style={{ color: c.color }}
              >
                {c.icon}
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-[var(--brand-dark)] text-sm font-semibold">{c.label}</p>
                <p className="text-[var(--brand-dark)]/40 text-[11px] mt-0.5">{c.sublabel}</p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
