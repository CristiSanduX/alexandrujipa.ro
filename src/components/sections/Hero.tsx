"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: video se mișcă mai lent decât scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Text fade out la scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-10%"]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Background image cu parallax */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full scale-110"
      >
        <Image
          src="/images/home.jpg"
          alt="Spectacol de dans tradițional românesc"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,10,8,0.4) 0%, rgba(15,10,8,0.55) 50%, rgba(15,10,8,0.85) 100%)",
        }}
      />

      {/* Linie decorativă stânga */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
        style={{ transformOrigin: "top" }}
        className="absolute left-8 top-1/4 bottom-1/4 w-px bg-[var(--brand-red)]/60 z-20 hidden lg:block"
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Supratitlu */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-[var(--brand-red)] text-xs tracking-[0.35em] uppercase mb-6 font-light"
        >
          Școala de Dans ✦ Iași
        </motion.p>

        {/* Titlu principal */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="text-white text-5xl md:text-7xl lg:text-8xl leading-none mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Tradiția,
          <br />
          <em className="text-[var(--brand-red)] not-italic">trăită</em> cu
          <br />
          mândrie.
        </motion.h1>

        {/* Subtitlu */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          Dansuri populare românești pentru copii și tineri,
          <br className="hidden md:block" /> cu specific moldovenesc autentic.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#despre"
            className="group inline-flex items-center gap-3 bg-[var(--brand-red)] hover:bg-[oklch(0.4_0.19_25)] text-white px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300"
          >
            Descoperă
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300"
          >
            Înscrie-te
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
