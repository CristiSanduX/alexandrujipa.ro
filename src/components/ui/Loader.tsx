"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Loader() {
  const [phase, setPhase] = useState<"center" | "nav" | "out" | "skip" | null>(null);
  const [navPos, setNavPos] = useState<{ top: number; left: number; scale: number } | null>(null);
  const refEl = useRef<HTMLDivElement>(null);
  const loaderEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("loader_seen")) {
      setPhase("skip");
      return;
    }
    sessionStorage.setItem("loader_seen", "1");
    setPhase("center");
    if (refEl.current) {
      const ref = refEl.current.getBoundingClientRect();
      setNavPos({ top: ref.top, left: ref.left, scale: 1 });
    }

    const t1 = setTimeout(() => setPhase("nav"), 1000);
    const t2 = setTimeout(() => setPhase("out"), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* Referință invizibilă — mereu în DOM pentru măsurare corectă */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-0">
        <div className="max-w-6xl mx-auto px-5 py-3 md:py-4 flex items-center">
          <div ref={refEl} className="flex items-center gap-2 md:gap-3 opacity-0">
            <div className="relative w-11 h-11 md:w-14 md:h-14 flex-shrink-0">
              <Image src="/images/logo.png" alt="" fill className="object-contain" sizes="56px" />
            </div>
            <div className="flex flex-col leading-[1.15] items-start">
              <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase font-medium">Școala de Dans</span>
              <span
                className="text-base md:text-xl font-bold tracking-wide whitespace-nowrap"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Alexandru Jipa
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {phase !== null && phase !== "out" && phase !== "skip" && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
            className="fixed inset-0 z-[100] overflow-hidden"
          >
            {/* Poza hero */}
            <Image
              src="/images/home.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />

            {/* Overlay — același ca în Hero */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(15,10,8,0.55) 0%, rgba(15,10,8,0.55) 50%, rgba(15,10,8,0.85) 100%)",
              }}
            />

            {/* Logo + text — wrapper pozitionat, inner scalat */}
            <motion.div
              ref={loaderEl}
              initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
              animate={
                navPos && phase === "nav"
                  ? { top: navPos.top, left: navPos.left, x: "0%", y: "0%" }
                  : { top: "50%", left: "50%", x: "-50%", y: "-50%" }
              }
              transition={{ duration: 0.75, ease: EASE }}
              className="absolute z-10"
            >
              <motion.div
                initial={{ scale: 2.2 }}
                animate={{ scale: phase === "nav" ? 1 : 2.2 }}
                transition={{ duration: 0.75, ease: EASE }}
                style={{ transformOrigin: "center" }}
                className="flex items-center gap-2 md:gap-3"
              >
                <motion.div
                  className="relative w-11 h-11 md:w-14 md:h-14 mix-blend-screen flex-shrink-0"
                  animate={phase === "center" ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  transition={phase === "center" ? { duration: 1.6, ease: "easeInOut", repeat: Infinity } : { duration: 0.3 }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="Jipa Școala de Dans"
                    fill
                    className="object-contain"
                    sizes="56px"
                    priority
                  />
                </motion.div>
                <div className="flex flex-col leading-[1.15] items-start">
                  <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase font-medium text-white/60">
                    Școala de Dans
                  </span>
                  <span
                    className="text-base md:text-xl font-bold tracking-wide text-white whitespace-nowrap"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Alexandru Jipa
                  </span>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
