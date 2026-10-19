"use client";
import { motion, useInView, useMotionValue, animate, type Variants } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export const ease = [0.44, 0, 0.56, 1] as const;

/** Fade + rise on scroll into view. */
export function Reveal({ children, delay = 0, y = 30, className = "", as = "div", once = true }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "p" | "span" | "li" | "h1" | "h2" | "h3"; once?: boolean }) {
  const M = motion[as] as ElementType;
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </M>
  );
}

/** Per-letter reveal (hero style) — splits text by words, then letters. */
export function SplitLetters({ text, className = "", delay = 0, stagger = 0.03, as = "span" }: { text: string; className?: string; delay?: number; stagger?: number; as?: "span" | "h1" | "h2" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const words = text.split(" ");
  let n = 0;
  const M = motion[as] as ElementType;
  return (
    <M ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {[...w].map((c, ci) => {
            const i = n++;
            return (
              <motion.span key={ci} className="inline-block" initial={{ opacity: 0, y: "60%" }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: delay + i * stagger, ease }}>
                {c}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </M>
  );
}

/** Per-word reveal for body headings. */
export function SplitWords({ text, className = "", delay = 0, as = "div", stagger = 0.04 }: { text: string; className?: string; delay?: number; as?: "div" | "h1" | "h2" | "h3" | "p"; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const M = motion[as] as ElementType;
  return (
    <M ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i, a) => (
        <Fragment key={i}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top" aria-hidden>
            <motion.span className="inline-block" initial={{ y: "105%", opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: delay + i * stagger, ease }}>
              {w}
            </motion.span>
          </span>
          {i < a.length - 1 ? " " : null}
        </Fragment>
      ))}
    </M>
  );
}

/** Count-up number: "25+", "98%", "1M+" etc. */
export function Counter({ value, className = "", duration = 2 }: { value: string; className?: string; duration?: number }) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const mv = useMotionValue(0);
  const [out, setOut] = useState(0);
  useEffect(() => {
    if (!m || !inView) return;
    const c = animate(mv, parseFloat(m[2]), { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setOut(Math.round(v)) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      {m[1]}
      {out}
      {m[3]}
    </span>
  );
}

export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
export const item: Variants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
