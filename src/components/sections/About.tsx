"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Ani de experiență" },
  { value: 120, suffix: "+", label: "Elevi formați" },
  { value: 35, suffix: "+", label: "Spectacole" },
];

function CountUp({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <span>{count}{suffix}</span>;
}

function AnimatedStat({ value, suffix, label, delay, inView }: {
  value: number; suffix: string; label: string; delay: number; inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center gap-2"
    >
      <span
        className="text-5xl md:text-6xl font-bold text-[var(--brand-red)] tabular-nums"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        <CountUp value={value} suffix={suffix} inView={inView} />
      </span>
      <span className="text-xs tracking-widest uppercase text-[var(--brand-dark)]/50 font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section id="despre" ref={sectionRef} data-navbar-theme="light" className="bg-[var(--brand-cream)] pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Imagine */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.97 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Frame dublu — outer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 md:-top-4 md:-left-4 md:w-[calc(100%+6px)] md:h-[calc(100%+6px)] border border-[var(--brand-red)]/50 md:border md:border-[var(--brand-red)]/40 z-0"
            />

            <div className="relative z-10 overflow-hidden aspect-[3/4]">
              <Image
                src="/images/profile.jpg"
                alt="Alexandru Jipa"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--brand-dark)]/40 to-transparent" />
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 10 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-5 -right-5 z-20 bg-[var(--brand-red)] text-white px-5 py-3 text-center"
            >
              <p className="text-xs tracking-widest uppercase font-light">Instructor Coregraf</p>
              <p className="text-base font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Alexandru Jipa
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--brand-red)] text-xs tracking-[0.3em] uppercase font-medium"
            >
              Despre mine
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-bold text-[var(--brand-dark)] leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Pasiunea pentru
              <br />
              <em className="not-italic text-[var(--brand-red)]">tradiție</em>, transmisă
              <br />
              generație cu generație.
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
              className="w-16 h-0.5 bg-[var(--brand-red)]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-[var(--brand-dark)]/70 leading-relaxed text-base md:text-lg"
            >
              Sunt Alexandru Jipa, instructor coregraf de dansuri populare românești din Iași.
              De peste 5 ani, îmi dedic energia și pasiunea pentru a transmite
              copiilor și tinerilor frumusețea folclorului moldovenesc autentic.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="text-[var(--brand-dark)]/70 leading-relaxed text-base md:text-lg"
            >
              Cred că dansul tradițional nu este doar mișcare — este identitate,
              istorie și mândrie. Fiecare spectacol este o lecție despre cine suntem
              și de unde venim.
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="group self-start inline-flex items-center gap-3 text-[var(--brand-dark)] text-xs tracking-[0.25em] uppercase font-semibold mt-2 hover:text-[var(--brand-red)] transition-colors duration-300"
            >
              Înscrie copilul
              <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
            </motion.a>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 md:mt-28 border-t border-[var(--brand-dark)]/10 pt-12">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                {...stat}
                delay={0.1 + i * 0.15}
                inView={statsInView}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
