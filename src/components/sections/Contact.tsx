"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICE_ID  = "service_izgaepd";
const TEMPLATE_ID = "template_fw1147o";
const PUBLIC_KEY  = "lX1KT0a_e5qi662Xo";

const WA_NUMBER = "40754662354";
const PHONE     = "+40754662354";
const FB_URL    = "https://www.facebook.com/profile.php?id=61582932840289";
const TT_URL    = "https://www.tiktok.com/@alexandrujipa0";

const contacts = [
  {
    label: "WhatsApp",
    sublabel: "+40 754 662 354",
    href: `https://wa.me/${WA_NUMBER}`,
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Telefon",
    sublabel: "+40 754 662 354",
    href: `tel:${PHONE}`,
    color: "oklch(0.45 0.19 25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    sublabel: "Școala de Dans Alexandru Jipa",
    href: FB_URL,
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    sublabel: "@alexandrujipa0",
    href: TT_URL,
    color: "#010101",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
  },
];

const inputClass = "w-full mt-2 pb-3 bg-transparent border-b border-[var(--brand-dark)]/15 text-[var(--brand-dark)] text-sm placeholder:text-[var(--brand-dark)]/25 focus:outline-none focus:border-[var(--brand-red)]/50 transition-colors duration-300";
const labelClass = "text-[9px] tracking-[0.28em] uppercase font-medium text-[var(--brand-dark)]/40";

export default function Contact() {
  const [form, setForm] = useState({ nume: "", telefon: "", varsta: "", mesaj: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setStatus("success");
      setForm({ nume: "", telefon: "", varsta: "", mesaj: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-navbar-theme="light" className="bg-[var(--brand-cream)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 min-h-[680px]">

        {/* Stânga — info contact */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col px-8 md:px-14 py-20 border-r border-[var(--brand-dark)]/8"
        >
          {/* Ornament */}
          <p className="text-[var(--brand-red)]/50 text-[9px] tracking-[0.35em] uppercase font-medium mb-6">
            ◆ — Contact — ◆
          </p>

          <h2
            className="text-[var(--brand-dark)] text-4xl md:text-5xl leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Hai să dansăm{" "}
            <em className="not-italic text-[var(--brand-red)]">împreună</em>
          </h2>

          <p className="text-[var(--brand-dark)]/45 text-sm leading-relaxed mb-12 max-w-xs">
            Contactează-ne prin orice metodă sau completează formularul — te sunăm noi.
          </p>

          {/* Contacte */}
          <div className="flex flex-col gap-1">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
                className="group relative flex items-center gap-4 py-4 border-b border-[var(--brand-dark)]/8 transition-colors duration-300 overflow-hidden"
              >
                {/* Linie colorată jos la hover */}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: c.color }}
                />
                <div
                  className="w-10 h-10 flex items-center justify-center border transition-all duration-300 flex-shrink-0"
                  style={{ color: c.color, borderColor: c.color + "40" }}
                >
                  {c.icon}
                </div>
                <div>
                  <p className="text-[var(--brand-dark)]/80 text-sm font-medium group-hover:text-[var(--brand-dark)] transition-colors duration-200">{c.label}</p>
                  <p className="text-[var(--brand-dark)]/35 text-xs mt-0.5">{c.sublabel}</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[var(--brand-dark)]/15 group-hover:text-[var(--brand-dark)]/40 transition-colors duration-300" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Dreapta — formular */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="flex flex-col px-8 md:px-14 py-20"
        >
          <p className="text-[var(--brand-red)]/50 text-[9px] tracking-[0.35em] uppercase font-medium mb-6">
            ◆ — Înscriere — ◆
          </p>

          <h3
            className="text-[var(--brand-dark)] text-4xl md:text-5xl leading-[1.1] mb-10"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Începe{" "}
            <em className="not-italic text-[var(--brand-red)]">călătoria</em>
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <div>
              <label className={labelClass}>Nume complet *</label>
              <input type="text" name="nume" value={form.nume} onChange={handleChange} required placeholder="Ion Popescu" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Număr de telefon *</label>
              <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} required placeholder="+40 7XX XXX XXX" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Vârsta copilului</label>
              <select name="varsta" value={form.varsta} onChange={handleChange} className={inputClass + " appearance-none cursor-pointer"}>
                <option value="">Selectează grupa de vârstă</option>
                <option value="6-8 ani">6 – 8 ani</option>
                <option value="9-12 ani">9 – 12 ani</option>
                <option value="13-16 ani">13 – 16 ani</option>
                <option value="Peste 16 ani">Peste 16 ani</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Mesaj (opțional)</label>
              <textarea name="mesaj" value={form.mesaj} onChange={handleChange} rows={2} placeholder="Orice informație suplimentară..." className={inputClass + " resize-none"} />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative overflow-hidden w-full py-4 text-xs tracking-[0.28em] uppercase font-semibold bg-[var(--brand-red)] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-700" />
              {status === "loading" ? "Se trimite..." : "✦  Trimite cererea"}
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-green-400">
                  ✓ Cererea a fost trimisă! Te contactăm în curând.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-red-400">
                  A apărut o eroare. Încearcă din nou.
                </motion.p>
              )}
            </AnimatePresence>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
