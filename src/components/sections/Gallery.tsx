"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const photos = [
  { src: "/images/gallery/foto-1.jpg",  alt: "Spectacol de dans tradițional" },
  { src: "/images/gallery/foto-2.jpg",  alt: "Repetiție ansamblu" },
  { src: "/images/gallery/foto-3.jpg",  alt: "Costum popular moldovenesc" },
  { src: "/images/gallery/foto-4.jpg",  alt: "Dans în grup" },
  { src: "/images/gallery/foto-5.jpg",  alt: "Spectacol pe scenă" },
  { src: "/images/gallery/foto-6.jpg",  alt: "Elevi în costum" },
  { src: "/images/gallery/foto-7.jpg",  alt: "Ansamblu tradițional" },
  { src: "/images/gallery/foto-8.jpg",  alt: "Dans moldovenesc" },
  { src: "/images/gallery/foto-9.jpg",  alt: "Repetiție" },
  { src: "/images/gallery/foto-10.jpg", alt: "Costum tradițional" },
  { src: "/images/gallery/foto-11.jpg", alt: "Pe scenă" },
  { src: "/images/gallery/foto-12.jpg", alt: "Elevi la spectacol" },
  { src: "/images/gallery/foto-13.jpg", alt: "Dans popular" },
  { src: "/images/gallery/foto-14.jpg", alt: "Ansamblu pe scenă" },
  { src: "/images/gallery/foto-15.jpg", alt: "Costum popular" },
  { src: "/images/gallery/foto-16.jpg", alt: "Spectacol tradițional" },
  { src: "/images/gallery/foto-17.jpg", alt: "Dans în costum" },
  { src: "/images/gallery/foto-18.jpg", alt: "Repetiție ansamblu" },
  { src: "/images/gallery/foto-19.jpg", alt: "Scenă și dans" },
  { src: "/images/gallery/foto-20.jpg", alt: "Elevi în dans" },
  { src: "/images/gallery/foto-21.jpg", alt: "Tradiție și bucurie" },
  { src: "/images/gallery/foto-22.jpg", alt: "Dans moldovenesc" },
  { src: "/images/gallery/foto-23.jpg", alt: "Amintiri din spectacol" },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selected !== null) {
        if (e.key === "Escape") setSelected(null);
        if (e.key === "ArrowRight") setSelected((s) => s !== null ? (s + 1) % photos.length : null);
        if (e.key === "ArrowLeft") setSelected((s) => s !== null ? (s - 1 + photos.length) % photos.length : null);
      } else {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Vizibile: current-1, current, current+1 (3 poze)
  const getVisible = () => {
    return [-1, 0, 1].map((offset) => ({
      index: (current + offset + photos.length) % photos.length,
      offset,
    }));
  };

  return (
    <section id="galerie" data-navbar-theme="light" className="py-20 md:py-28 bg-[var(--brand-cream)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[var(--brand-red)]/60 text-[10px] tracking-[0.35em] uppercase font-medium mb-3">
            ◆ — Galerie — ◆
          </p>
          <h2
            className="text-[var(--brand-dark)] text-4xl md:text-5xl leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Amintiri și{" "}
            <em className="not-italic text-[var(--brand-red)]">tradiție</em>
          </h2>
        </motion.div>

      </div>

      {/* Carusel — full width cu săgeți în margini */}
      <div className="relative flex items-center justify-center gap-0 sm:gap-2 md:gap-3 h-[220px] sm:h-[260px] md:h-[420px]">

          {getVisible().map(({ index, offset }) => {
            const isCenter = offset === 0;

            return (
              <motion.div
                key={index}
                layout
                animate={{
                  scale: isCenter ? 1 : 0.82,
                  opacity: isCenter ? 1 : 0.6,
                  zIndex: isCenter ? 10 : 5,
                }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => isCenter ? setSelected(index) : (offset < 0 ? prev() : next())}
                className={`relative flex-shrink-0 overflow-hidden cursor-pointer ${
                  isCenter
                    ? "w-[60vw] max-w-[560px] h-[180px] sm:h-[240px] md:h-[420px]"
                    : "w-[20vw] max-w-[300px] h-[135px] sm:h-[180px] md:h-[320px]"
                }`}
              >
                <Image
                  src={photos[index].src}
                  alt={photos[index].alt}
                  fill
                  className={`object-cover transition-transform duration-500 ${isCenter ? "hover:scale-105" : ""}`}
                  sizes="(max-width: 768px) 42vw, 480px"
                />
                {!isCenter && (
                  <div className="absolute inset-0 bg-[var(--brand-dark)]/20" />
                )}
                {/* Săgeți peste pozele laterale sub md */}
                {!isCenter && (
                  <button
                    onClick={(e) => { e.stopPropagation(); offset < 0 ? prev() : next(); }}
                    className="absolute inset-0 md:hidden flex items-center justify-center z-20"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-white/90 shadow-md text-[var(--brand-dark)]">
                      {offset < 0
                        ? <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      }
                    </span>
                  </button>
                )}
              </motion.div>
            );
          })}

          {/* Săgeți ca flex items — vizibile doar de la sm în sus */}
          <button
            onClick={prev}
            className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center bg-white shadow-md border border-[var(--brand-dark)]/8 text-[var(--brand-dark)] hover:text-[var(--brand-red)] hover:-translate-x-0.5 transition-all duration-200 z-20 order-first"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="hidden md:flex flex-shrink-0 w-10 h-10 items-center justify-center bg-white shadow-md border border-[var(--brand-dark)]/8 text-[var(--brand-dark)] hover:text-[var(--brand-red)] hover:translate-x-0.5 transition-all duration-200 z-20 order-last"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-8 px-5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-5 h-1.5 bg-[var(--brand-red)]"
                  : "w-1.5 h-1.5 bg-[var(--brand-dark)]/20 hover:bg-[var(--brand-dark)]/40"
              }`}
            />
          ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-[90vw] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image src={photos[selected].src} alt={photos[selected].alt} fill className="object-contain" sizes="90vw" priority />
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); setSelected((s) => s !== null ? (s - 1 + photos.length) % photos.length : null); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setSelected((s) => s !== null ? (s + 1) % photos.length : null); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all duration-200">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === selected ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
