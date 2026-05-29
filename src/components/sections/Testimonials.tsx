"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Mihai Duca",
    img: "/images/reviews/duca.jpg",
    text: "Instructorul Jipa Alexandru este mai mult decât un profesor de dans – este un adevărat formator de caractere și un om care inspiră.",
  },
  {
    name: "Luca Ilade",
    img: "/images/reviews/ilade.jpg",
    text: "Recomand cu cel mai mare drag.",
  },
  {
    name: "Georgiana Ferariu",
    img: "/images/reviews/ferariu.jpg",
    text: "Recomand! Îți perfecționezi stilul de dans, colectiv super prietenos și instructor de dans implicat.",
  },
  {
    name: "Georgiana Andrei",
    img: "/images/reviews/andrei.jpg",
    text: "Recomand din toată inima!",
  },
  {
    name: "Bianca Larisa",
    img: "/images/reviews/larisa.jpg",
    text: "Recomand cu toată încrederea! Instructor dedicat și serios!",
  },
  {
    name: "Arsene Dennis-Florin",
    img: "/images/reviews/arsene.jpg",
    text: "Recomand cu toată încrederea.",
  },
  {
    name: "Alexandru Stejar",
    img: "/images/reviews/stejar.jpg",
    text: "Recomand! Este locul unde perfecțiunea este la ea acasă.",
  },
  {
    name: "Eliza-Parascheva Horneț-Bulgaru",
    img: "/images/reviews/hornet.jpg",
    text: "Recomand cu mare drag!!",
  },
  {
    name: "Alessia Maria Ciobanu",
    img: "/images/reviews/ciobanu.jpg",
    text: "Recomand cu mare mare drag.",
  },
];

const doubled = [...reviews, ...reviews];

function Avatar({ name, img }: { name: string; img: string }) {
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
      <Image src={img} alt={name} width={36} height={36} className="object-cover w-full h-full" />
    </div>
  );
}

function FacebookCard({ name, img, text }: { name: string; img: string; text: string }) {
  return (
    <div className="flex-shrink-0 w-[260px] md:w-[300px] mx-3 bg-white rounded-lg shadow-sm border border-gray-200/80 p-5 flex flex-col justify-between items-center h-[210px] text-center overflow-hidden">
      {/* Text recenzie */}
      <p className="text-[13px] text-gray-700 leading-relaxed flex-1 flex items-center">{text}</p>

      {/* Separator */}
      <div className="w-8 h-px bg-gray-200 my-2 flex-shrink-0" />

      {/* Nume + Avatar */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Avatar name={name} img={img} />
        <span className="text-[12px] font-semibold text-gray-900">{name}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      data-navbar-theme="light"
      className="bg-[var(--brand-cream)] py-20 md:py-28 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 justify-center"
        >
          <span className="h-px w-10 bg-[var(--brand-red)]/25" />
          <span className="text-[var(--brand-red)]/50 text-[8px]">◆</span>
          <p className="text-[var(--brand-red)] text-xs tracking-[0.3em] uppercase font-medium">
            Recenzii
          </p>
          <span className="text-[var(--brand-red)]/50 text-[8px]">◆</span>
          <span className="h-px w-10 bg-[var(--brand-red)]/25" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-3xl md:text-4xl font-bold text-[var(--brand-dark)] leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Ce spun cei care{" "}
          <em className="not-italic text-[var(--brand-red)]">ne-au ales</em>
        </motion.h2>
      </div>

      {/* Carusel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--brand-cream), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--brand-cream), transparent)" }} />

        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((r, i) => (
            <FacebookCard key={i} name={r.name} img={r.img} text={r.text} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
