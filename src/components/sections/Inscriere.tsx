"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICE_ID = "service_izgaepd";
const TEMPLATE_ID = "template_fw1147o";
const PUBLIC_KEY = "lX1KT0a_e5qi662Xo";

export default function Inscriere() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ nume: "", telefon: "", varsta: "", mesaj: "" });

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
    <section id="inscriere" data-navbar-theme="light" className="py-20 md:py-28 bg-[var(--brand-cream)]">
      <div className="max-w-xl mx-auto px-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[var(--brand-red)]/60 text-[10px] tracking-[0.35em] uppercase font-medium mb-3">
            ◆ — Înscriere — ◆
          </p>
          <h2
            className="text-[var(--brand-dark)] text-4xl md:text-5xl leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Începe{" "}
            <em className="not-italic text-[var(--brand-red)]">călătoria</em>
          </h2>
          <p className="text-[var(--brand-dark)]/55 text-sm md:text-base leading-relaxed">
            Completează formularul și te contactăm noi în cel mai scurt timp.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Nume */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--brand-dark)]/50">
              Nume complet *
            </label>
            <input
              type="text"
              name="nume"
              value={form.nume}
              onChange={handleChange}
              required
              placeholder="Ion Popescu"
              className="w-full px-4 py-3.5 bg-white border border-[var(--brand-dark)]/10 text-[var(--brand-dark)] text-sm placeholder:text-[var(--brand-dark)]/25 focus:outline-none focus:border-[var(--brand-red)]/50 transition-colors duration-200"
            />
          </div>

          {/* Telefon */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--brand-dark)]/50">
              Număr de telefon *
            </label>
            <input
              type="tel"
              name="telefon"
              value={form.telefon}
              onChange={handleChange}
              required
              placeholder="+40 7XX XXX XXX"
              className="w-full px-4 py-3.5 bg-white border border-[var(--brand-dark)]/10 text-[var(--brand-dark)] text-sm placeholder:text-[var(--brand-dark)]/25 focus:outline-none focus:border-[var(--brand-red)]/50 transition-colors duration-200"
            />
          </div>

          {/* Vârsta */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--brand-dark)]/50">
              Vârsta copilului
            </label>
            <select
              name="varsta"
              value={form.varsta}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-white border border-[var(--brand-dark)]/10 text-[var(--brand-dark)] text-sm focus:outline-none focus:border-[var(--brand-red)]/50 transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="">Selectează grupa de vârstă</option>
              <option value="6-8 ani">6 – 8 ani</option>
              <option value="9-12 ani">9 – 12 ani</option>
              <option value="13-16 ani">13 – 16 ani</option>
              <option value="Peste 16 ani">Peste 16 ani</option>
            </select>
          </div>

          {/* Mesaj */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--brand-dark)]/50">
              Mesaj (opțional)
            </label>
            <textarea
              name="mesaj"
              value={form.mesaj}
              onChange={handleChange}
              rows={4}
              placeholder="Orice informație suplimentară..."
              className="w-full px-4 py-3.5 bg-white border border-[var(--brand-dark)]/10 text-[var(--brand-dark)] text-sm placeholder:text-[var(--brand-dark)]/25 focus:outline-none focus:border-[var(--brand-red)]/50 transition-colors duration-200 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="group relative overflow-hidden mt-2 w-full py-4 text-xs tracking-[0.25em] uppercase font-semibold bg-[var(--brand-red)] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-700" />
            {status === "loading" ? "Se trimite..." : "Trimite cererea"}
          </button>

          {/* Feedback */}
          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-green-600"
              >
                ✓ Cererea a fost trimisă! Te contactăm în curând.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-red-500"
              >
                A apărut o eroare. Încearcă din nou sau contactează-ne direct.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

      </div>
    </section>
  );
}
