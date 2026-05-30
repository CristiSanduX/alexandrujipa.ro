"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  {
    q: "Este nevoie de experiență anterioară în dans?",
    a: "Nu, deloc! Cursurile sunt structurate pas cu pas, accesibile pentru oricine — de la cei care nu au dansat niciodată până la cei cu experiență. Mulți dintre elevii noștri au început de la zero și au ajuns să urce pe scenă.",
  },
  {
    q: "De la ce vârstă pot participa copiii?",
    a: "Primim copii începând de la 6 ani. Avem grupe separate pe vârste, astfel încât fiecare să evolueze în ritmul lui, alături de colegi de vârstă apropiată.",
  },
  {
    q: "Câte ore de dans sunt pe săptămână?",
    a: "De regulă, o grupă se întâlnește de 2-3 ori pe săptămână, câte 60-90 de minute per ședință. Programul exact îl stabilim în funcție de grupă și disponibilitate.",
  },
  {
    q: "Este obligatoriu costumul popular?",
    a: "Nu imediat. La început, hainele comode sunt suficiente. Costumul tradițional devine important odată cu participarea la spectacole și concursuri, moment în care îți oferim îndrumări pentru achiziționarea lui.",
  },
  {
    q: "Participă elevii la spectacole și concursuri?",
    a: "Da! Organizăm spectacole periodice și participăm la festivaluri și concursuri de dans popular. Este una dintre cele mai frumoase experiențe pentru elevi — să urce pe scenă și să reprezinte tradiția românească.",
  },
  {
    q: "Cum mă pot înscrie?",
    a: "Simplu — mă poți contacta pe WhatsApp sau telefon la numărul +40 754 662 354 și stabilim împreună detaliile. Poți și să completezi formularul de înscriere de pe site.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" data-navbar-theme="light" className="py-20 md:py-28 bg-[var(--brand-cream)]">
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[var(--brand-red)]/60 text-[10px] tracking-[0.35em] uppercase font-medium mb-3">
            ◆ — Întrebări frecvente — ◆
          </p>
          <h2
            className="text-[var(--brand-dark)] text-4xl md:text-5xl leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Ai{" "}
            <em className="not-italic text-[var(--brand-red)]">întrebări?</em>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-[var(--brand-dark)]/8">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
              >
                <span
                  className={`text-base md:text-lg font-medium leading-snug transition-colors duration-300 ${
                    open === i ? "text-[var(--brand-red)]" : "text-[var(--brand-dark)] group-hover:text-[var(--brand-red)]"
                  }`}
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {faq.q}
                </span>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border transition-colors duration-300 ${
                    open === i
                      ? "border-[var(--brand-red)] text-[var(--brand-red)]"
                      : "border-[var(--brand-dark)]/20 text-[var(--brand-dark)]/40 group-hover:border-[var(--brand-red)]/40 group-hover:text-[var(--brand-red)]"
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="text-[var(--brand-dark)]/65 text-sm md:text-base leading-relaxed pb-5 pr-10">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
