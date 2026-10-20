"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "./motion";

type Pin = { label: string; text: string; left: string; top: string };

/** Dark label chips on the globe; hovering one opens a white info card under it. */
export default function NetworkPins({ pins }: { pins: Pin[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {pins.map((p, i) => {
        const on = open === i;
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 + i * 0.2, ease }}
            className={`absolute max-[1000px]:hidden ${on ? "z-30" : "z-10"}`}
            style={{ left: p.left, top: p.top }}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen((v) => (v === i ? null : v))}
          >
            <button
              onFocus={() => setOpen(i)}
              onBlur={() => setOpen((v) => (v === i ? null : v))}
              aria-expanded={on}
              className="label relative z-10 flex cursor-pointer items-center gap-3 rounded bg-ink px-4 py-3 text-[15px] text-white"
            >
              {p.label}
              {/* "–" that becomes "+" while open */}
              <span className="relative block h-3 w-3">
                <span className="absolute left-0 top-1/2 h-[2px] w-3 -translate-y-1/2 rounded bg-white" />
                <motion.span animate={{ rotate: on ? 0 : 90, scaleY: on ? 1 : 0 }} transition={{ duration: 0.3, ease }} className="absolute left-1/2 top-0 h-3 w-[2px] -translate-x-1/2 rounded bg-white" />
              </span>
            </button>
            <AnimatePresence>
              {on && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                  className="absolute left-0 top-full mt-px w-[292px] rounded-lg bg-white p-4 text-[16px] leading-[23px] text-ink shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
                >
                  {p.text}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
}
