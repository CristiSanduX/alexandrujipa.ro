"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Despre", href: "#despre" },
  { label: "Spectacole", href: "#spectacole" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className={`relative w-20 h-20 transition-all duration-500 ${scrolled ? "mix-blend-multiply" : "mix-blend-screen"}`}>
            <Image
              src="/images/logo.png"
              alt="Jipa Școala de Dans"
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`text-2xl font-bold tracking-wide transition-colors duration-500 ${scrolled ? "text-[var(--brand-dark)]" : "text-white"}`}
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Alexandru Jipa
            </span>
            <span className="text-[var(--brand-red)] text-sm tracking-[0.2em] uppercase font-semibold">
              Școala de Dans
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-base font-bold tracking-widest uppercase transition-colors duration-300 relative group ${scrolled ? "text-[var(--brand-dark)]/80 hover:text-[var(--brand-dark)]" : "text-white/90 hover:text-white"}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--brand-red)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className={`hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 ${scrolled ? "border border-[var(--brand-dark)]/30 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] hover:text-white text-[var(--brand-dark)]" : "border border-white/30 hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)] text-white"}`}
        >
          Înscrie-te
        </a>
      </div>
    </motion.header>
  );
}
