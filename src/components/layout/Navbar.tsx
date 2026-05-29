"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Despre", href: "#despre" },
  { label: "Recenzii", href: "#recenzii" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-navbar-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset.navbarTheme;
            setIsDark(theme === "dark");
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isLight = !isDark && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark && !menuOpen ? "py-3 md:py-4" : "py-1.5 md:py-2"
        } ${
          menuOpen
            ? "bg-white/95 backdrop-blur-md"
            : isLight
            ? "bg-white/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        {/* Linie decorativă jos — apare pe light */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 ${
          isLight || menuOpen
            ? "bg-gradient-to-r from-transparent via-[var(--brand-red)]/30 to-transparent opacity-100"
            : "opacity-0"
        }`} />

        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 group"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div className={`relative transition-all duration-500 ${
              isDark && !menuOpen ? "w-11 h-11 md:w-14 md:h-14" : "w-9 h-9 md:w-11 md:h-11"
            } ${!isDark || menuOpen ? "mix-blend-multiply" : "mix-blend-screen"}`}>
              <Image
                src="/images/logo.png"
                alt="Jipa Școala de Dans"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>

            <div className="flex flex-col leading-[1.15] items-start">
              <span className={`text-[10px] md:text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-500 ${
                isDark && !menuOpen ? "text-white/60" : "text-[var(--brand-red)]/70"
              }`}>
                Școala de Dans
              </span>
              <span
                className={`text-base md:text-xl font-bold tracking-wide transition-all duration-500 ${
                  isDark && !menuOpen ? "text-white" : "text-[var(--brand-dark)]"
                }`}
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Alexandru Jipa
              </span>
            </div>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 group ${
                  isDark ? "text-white/80 hover:text-white" : "text-[var(--brand-dark)]/70 hover:text-[var(--brand-dark)]"
                }`}
              >
                {link.label}
                {/* linie roșie animată jos */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[var(--brand-red)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA — desktop */}
          <a
            href="#contact"
            className={`group relative hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-semibold px-5 py-2.5 transition-all duration-300 overflow-hidden hover:-translate-y-px ${
              isDark ? "text-white" : "text-[var(--brand-dark)]"
            }`}
          >
            {/* Border */}
            <span className={`absolute inset-0 transition-colors duration-300 ${
              isDark
                ? "border border-white/40 group-hover:border-white/80"
                : "border border-[var(--brand-red)]/40 group-hover:border-[var(--brand-red)]"
            }`} />
            {/* Fill */}
            <span className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${
              isDark ? "bg-white" : "bg-[var(--brand-red)]"
            }`} />
            {/* Ornament */}
            <span className={`relative z-10 text-[var(--brand-red)] transition-colors duration-300 ${
              isDark ? "group-hover:text-[var(--brand-dark)]" : "group-hover:text-white"
            }`}>✦</span>
            <span className={`relative z-10 transition-colors duration-300 ${
              isDark ? "group-hover:text-[var(--brand-dark)]" : "group-hover:text-white"
            }`}>Înscrie-te</span>
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 gap-1.5 relative z-[60]"
            aria-label="Meniu"
          >
            <span className={`block h-px transition-all duration-300 origin-center ${menuOpen ? "w-5 rotate-45 translate-y-[5px]" : "w-5"} ${isDark && !menuOpen ? "bg-white" : "bg-[var(--brand-dark)]"}`} />
            <span className={`block h-px transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"} ${isDark && !menuOpen ? "bg-white" : "bg-[var(--brand-dark)]"}`} />
            <span className={`block h-px transition-all duration-300 origin-center ${menuOpen ? "w-5 -rotate-45 -translate-y-[5px]" : "w-5"} ${isDark && !menuOpen ? "bg-white" : "bg-[var(--brand-dark)]"}`} />
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
            {/* Ornament top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-red)]/40 to-transparent" />

            <div className="flex flex-col items-center justify-center flex-1 gap-0.5">
              {/* Ornament decorativ deasupra link-urilor */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-[var(--brand-red)]/40 text-xs tracking-[0.3em] uppercase mb-6"
              >
                ✦ &nbsp; Meniu &nbsp; ✦
              </motion.p>

              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative flex items-center gap-4 px-8 py-3 w-full justify-center"
                >
                  <span className="text-[var(--brand-red)]/40 text-[9px] font-light tracking-widest tabular-nums">
                    0{i + 1}
                  </span>
                  <span
                    className="text-[var(--brand-dark)] text-[1.6rem] font-semibold tracking-[0.12em] uppercase group-hover:text-[var(--brand-red)] transition-colors duration-300"
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
                transition={{ delay: 0.42, duration: 0.5 }}
                style={{ transformOrigin: "center" }}
                className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--brand-red)]/50 to-transparent my-5"
              />

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="group relative overflow-hidden bg-[var(--brand-red)] text-white px-10 py-3 text-[10px] tracking-[0.28em] uppercase font-semibold flex items-center gap-2"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-110%] skew-x-[-20deg] group-hover:translate-x-[110%] transition-transform duration-700" />
                <span>✦</span>
                <span>Înscrie-te</span>
              </motion.a>
            </div>

            {/* Ornament bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-red)]/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
