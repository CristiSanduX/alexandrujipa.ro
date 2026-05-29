"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Despre", href: "#despre" },
  { label: "Spectacole", href: "#spectacole" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-md py-3 shadow-sm"
            : "bg-transparent py-5 md:py-7"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className={`relative w-11 h-11 md:w-16 md:h-16 transition-all duration-500 ${scrolled || menuOpen ? "mix-blend-multiply" : "mix-blend-screen"}`}>
              <Image
                src="/images/logo.png"
                alt="Jipa Școala de Dans"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col leading-[1.1] items-center">
              <span
                className={`text-xs md:text-sm tracking-normal uppercase font-medium transition-colors duration-500 ${scrolled || menuOpen ? "text-[var(--brand-dark)]/60" : "text-white/80"}`}
              >
                Școala de Dans
              </span>
              <span
                className={`text-lg md:text-2xl font-bold tracking-wide transition-colors duration-500 ${scrolled || menuOpen ? "text-[var(--brand-dark)]" : "text-white"}`}
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Alexandru Jipa
              </span>
            </div>
          </Link>

          {/* Nav links — desktop */}
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

          {/* CTA — desktop */}
          <a
            href="#contact"
            className={`group relative hidden md:inline-flex items-center text-xs tracking-[0.25em] uppercase font-semibold px-6 py-3 transition-all duration-300 overflow-hidden hover:-translate-y-0.5 ${scrolled ? "text-[var(--brand-dark)]" : "text-white"}`}
          >
            <span className={`absolute inset-0 border transition-colors duration-300 ${scrolled ? "border-[var(--brand-dark)]/30 group-hover:border-[var(--brand-red)]" : "border-white/50 group-hover:border-white"}`} />
            <span className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${scrolled ? "bg-[var(--brand-red)]" : "bg-white"}`} />
            <span className={`relative z-10 transition-colors duration-300 ${scrolled ? "group-hover:text-white" : "group-hover:text-[var(--brand-dark)]"}`}>Înscrie-te</span>
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 relative z-[60]"
            aria-label="Meniu"
          >
            <span className={`block w-6 h-0.5 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""} ${scrolled || menuOpen ? "bg-[var(--brand-dark)]" : "bg-white"}`} />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""} ${scrolled || menuOpen ? "bg-[var(--brand-dark)]" : "bg-white"}`} />
            <span className={`block w-6 h-0.5 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""} ${scrolled || menuOpen ? "bg-[var(--brand-dark)]" : "bg-white"}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[var(--brand-cream)] flex flex-col md:hidden"
          >
            {/* Links centrate vertical */}
            <div className="flex flex-col items-center justify-center flex-1 gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group flex items-center gap-3 px-8 py-3 w-full justify-center"
                >
                  <span className="text-[var(--brand-red)] text-[10px] font-light tracking-widest opacity-60">
                    0{i + 1}
                  </span>
                  <span
                    className="text-[var(--brand-dark)] text-2xl font-semibold tracking-[0.15em] uppercase group-hover:text-[var(--brand-red)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {link.label}
                  </span>
                </motion.a>
              ))}

              {/* Linie separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                style={{ transformOrigin: "center" }}
                className="w-8 h-px bg-[var(--brand-red)] my-4"
              />

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-[var(--brand-red)] text-white px-10 py-3 text-xs tracking-[0.25em] uppercase font-semibold"
              >
                Înscrie-te
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
