"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const photos = [
  { src: "/images/gallery/foto-1.jpg",  alt: "Spectacol de dans tradițional", tall: true  },
  { src: "/images/gallery/foto-2.jpg",  alt: "Repetiție ansamblu",            tall: false },
  { src: "/images/gallery/foto-3.jpg",  alt: "Costum popular moldovenesc",    tall: false },
  { src: "/images/gallery/foto-4.jpg",  alt: "Dans în grup",                  tall: true  },
  { src: "/images/gallery/foto-5.jpg",  alt: "Spectacol pe scenă",            tall: false },
  { src: "/images/gallery/foto-6.jpg",  alt: "Elevi în costum",               tall: true  },
  { src: "/images/gallery/foto-7.jpg",  alt: "Ansamblu tradițional",          tall: false },
  { src: "/images/gallery/foto-8.jpg",  alt: "Dans moldovenesc",              tall: false },
  { src: "/images/gallery/foto-9.jpg",  alt: "Repetiție",                     tall: true  },
  { src: "/images/gallery/foto-10.jpg", alt: "Costum tradițional",            tall: false },
  { src: "/images/gallery/foto-11.jpg", alt: "Pe scenă",                      tall: false },
  { src: "/images/gallery/foto-12.jpg", alt: "Elevi la spectacol",            tall: true  },
  { src: "/images/gallery/foto-13.jpg", alt: "Dans popular",                  tall: false },
  { src: "/images/gallery/foto-14.jpg", alt: "Ansamblu pe scenă",             tall: false },
  { src: "/images/gallery/foto-15.jpg", alt: "Costum popular",                tall: true  },
  { src: "/images/gallery/foto-16.jpg", alt: "Spectacol tradițional",         tall: false },
  { src: "/images/gallery/foto-17.jpg", alt: "Dans în costum",                tall: false },
  { src: "/images/gallery/foto-18.jpg", alt: "Repetiție ansamblu",            tall: true  },
  { src: "/images/gallery/foto-19.jpg", alt: "Scenă și dans",                 tall: false },
  { src: "/images/gallery/foto-20.jpg", alt: "Elevi în dans",                 tall: false },
  { src: "/images/gallery/foto-21.jpg", alt: "Tradiție și bucurie",           tall: true  },
  { src: "/images/gallery/foto-22.jpg", alt: "Dans moldovenesc",              tall: false },
  { src: "/images/gallery/foto-23.jpg", alt: "Amintiri din spectacol",        tall: false },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((s) => s !== null ? (s + 1) % photos.length : null);
      if (e.key === "ArrowLeft") setSelected((s) => s !== null ? (s - 1 + photos.length) % photos.length : null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="galerie" data-navbar-theme="light" className="py-20 md:py-28 bg-[var(--brand-cream)]">
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

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              className={`relative break-inside-avoid overflow-hidden cursor-pointer group ${
                photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[var(--brand-dark)]/0 group-hover:bg-[var(--brand-dark)]/40 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15" stroke="white" strokeOpacity="0.8" strokeWidth="1"/>
                    <path d="M12 16h8M16 12v8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

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
            {/* Imagine */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-[90vw] max-w-4xl max-h-[85vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={photos[selected].src}
                  alt={photos[selected].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelected((s) => s !== null ? (s - 1 + photos.length) % photos.length : null); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelected((s) => s !== null ? (s + 1) % photos.length : null); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/60 text-white/60 hover:text-white transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === selected ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
