"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const segments = [
  { w: "clamp(20px, 5vw, 80px)",    delay: 0.35, opacity: 0.65, diamond: true,  fill: false },
  { w: "clamp(30px, 7vw, 120px)",   delay: 0.55, opacity: 0.45, diamond: true,  fill: true  },
  { w: "clamp(24px, 6vw, 100px)",   delay: 0.72, opacity: 0.32, diamond: true,  fill: false },
  { w: "clamp(20px, 5vw, 80px)",    delay: 0.87, opacity: 0.2,  diamond: true,  fill: false },
  { w: "clamp(60px, 16vw, 300px)",  delay: 1.0,  opacity: 0.12, diamond: false, fill: false },
];

export default function TraditionalDivider({ theme = "light" }: { theme?: "light" | "dark" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const stroke = theme === "dark" ? "white" : "var(--brand-red)";
  const lineBg = theme === "dark"
    ? "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)"
    : "linear-gradient(to right, transparent, oklch(0.45 0.19 25 / 0.13) 20%, oklch(0.45 0.19 25 / 0.13) 80%, transparent)";

  const lineColor = (op: number) =>
    theme === "dark"
      ? `rgba(255,255,255,${op})`
      : `oklch(0.45 0.19 25 / ${op})`;

  return (
    <div
      ref={ref}
      className="relative w-full flex flex-col items-center py-10 md:py-12"
      style={{ background: theme === "dark" ? "var(--brand-dark)" : "var(--brand-cream)" }}
    >

      {/* Ornament central + brațe */}
      <div className="relative flex items-center w-full justify-center">

        {/* Braț stâng */}
        <div className="flex items-center flex-row-reverse">
          {segments.map((seg, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: seg.delay, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "right", display: "flex", alignItems: "center" }}
            >
              {seg.diamond && (
                <svg width="13" height="13" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
                  <polygon
                    points="5.5,1 10,5.5 5.5,10 1,5.5"
                    fill={seg.fill ? stroke : "none"}
                    fillOpacity={seg.fill ? 0.15 : 0}
                    stroke={stroke}
                    strokeOpacity={seg.opacity * 1.1}
                    strokeWidth="0.9"
                  />
                </svg>
              )}
              <div style={{ width: seg.w, flexShrink: 0, display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{ height: "1px", background: lineColor(seg.opacity) }} />
                <div style={{ height: "1px", background: lineColor(seg.opacity * 0.5) }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Romb central */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.4, 0.64, 1] }}
          style={{ flexShrink: 0, zIndex: 10 }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            {/* Diamond outer */}
            <polygon points="13,1 25,13 13,25 1,13"
              fill={stroke} fillOpacity="0.18"
              stroke={stroke} strokeOpacity="0.85" strokeWidth="1.4"/>
            {/* Diamond inner */}
            <polygon points="13,6 20,13 13,20 6,13"
              fill={stroke} fillOpacity="0.28" stroke="none"/>
          </svg>
        </motion.div>

        {/* Braț drept */}
        <div className="flex items-center">
          {segments.map((seg, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: seg.delay, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", display: "flex", alignItems: "center" }}
            >
              <div style={{ width: seg.w, flexShrink: 0, display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{ height: "1px", background: lineColor(seg.opacity) }} />
                <div style={{ height: "1px", background: lineColor(seg.opacity * 0.5) }} />
              </div>
              {seg.diamond && (
                <svg width="13" height="13" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
                  <polygon
                    points="5.5,1 10,5.5 5.5,10 1,5.5"
                    fill={seg.fill ? stroke : "none"}
                    fillOpacity={seg.fill ? 0.15 : 0}
                    stroke={stroke}
                    strokeOpacity={seg.opacity * 1.1}
                    strokeWidth="0.9"
                  />
                </svg>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
