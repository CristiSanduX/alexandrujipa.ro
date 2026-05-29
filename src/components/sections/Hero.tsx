"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

export default function Hero() {
  return (
    <section data-navbar-theme="dark" className="relative h-[100dvh] min-h-[600px] overflow-hidden flex items-center justify-center">

      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/home.jpg"
          alt="Spectacol de dans tradițional românesc"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,10,8,0.55) 0%, rgba(15,10,8,0.55) 50%, rgba(15,10,8,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16 md:mt-20">

        {/* Titlu principal */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1.05] mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Tradiția,
          <br />
          <em
            className="text-[var(--brand-red)] not-italic"
            style={{ WebkitTextStroke: "0.5px white" }}
          >
            trăită
          </em>{" "}
          cu
          <br />
          mândrie.
        </motion.h1>

        {/* Subtitlu */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="text-white text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
        >
          Dansuri populare românești pentru copii și tineri,
          <br className="hidden md:block" /> cu specific moldovenesc autentic.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="flex flex-row items-center justify-center gap-4"
        >
          <a
            href="#despre"
            className="group relative overflow-hidden inline-flex items-center justify-center w-44 sm:w-48 py-4 text-xs tracking-[0.25em] uppercase font-semibold bg-[var(--brand-red)] text-white transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-700" />
            Descoperă
          </a>

          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center w-44 sm:w-48 py-4 text-xs tracking-[0.25em] uppercase font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 border border-white/50 group-hover:border-white transition-colors duration-300" />
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--brand-dark)]">Înscrie-te</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
