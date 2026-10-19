"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ease } from "../motion";
import { img, industries } from "@/lib/site";

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" style={{ transform: dir === "l" ? "scaleX(-1)" : undefined }}>
    <path d="M0 4h9M6 1l3 3-3 3" stroke="#1d2228" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Scroll sequence: the sticky stage first slides the big "INDUSTRIES" title in,
 * then — after further scrolling — the cards rise in beneath it.
 * Card size adapts to the viewport height so nothing hides under the header.
 */
export function IndustriesSlider() {
  const n = industries.length;
  const [a, setA] = useState(3);
  const [size, setSize] = useState(560);
  const [gap, setGap] = useState(102);
  const go = (d: number) => setA((v) => (v + d + n) % n);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const on = () => {
      const small = window.innerWidth < 810;
      // header (76) + title (~120) + paddings — what's left is the card square
      const avail = window.innerHeight - (small ? 260 : 300);
      setSize(Math.round(Math.max(280, Math.min(small ? 320 : 600, avail))));
      setGap(small ? 24 : 102);
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleX = useTransform(scrollYProgress, [0, 0.22], ["-45vw", "0vw"]);
  const titleO = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.28, 0.5], [260, 0]);
  const cardsO = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
  const pitch = size + gap;

  return (
    <section ref={ref} className="relative h-[230vh] bg-sand max-[1000px]:h-auto max-[1000px]:py-20">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[84px] max-[1000px]:static max-[1000px]:h-auto max-[1000px]:pt-0">
        <motion.h2 style={{ x: titleX, opacity: titleO }} className="h-mega text-center max-[1000px]:!transform-none max-[1000px]:!opacity-100">
          Industries
        </motion.h2>
        <motion.div style={{ y: cardsY, opacity: cardsO, height: size }} className="relative mx-auto mt-6 w-full max-[1000px]:!transform-none max-[1000px]:!opacity-100">
          {industries.map((s, i) => {
            let d = i - a;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const active = d === 0;
            return (
              <motion.div
                key={s.slug}
                animate={{ x: d * pitch, scale: active ? 1 : 0.9, opacity: Math.abs(d) > 2 ? 0 : 1 }}
                transition={{ duration: 0.9, ease }}
                className="absolute left-1/2 top-0 cursor-pointer"
                style={{ width: size, height: size, marginLeft: -size / 2 }}
                onClick={() => !active && setA(i)}
              >
                <Link href={`/industries/${s.slug}`} tabIndex={active ? 0 : -1} onClick={(e) => !active && e.preventDefault()} className="group relative block h-full w-full overflow-hidden rounded-lg">
                  <Image src={img(s.img)} alt={s.title} fill sizes="600px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <motion.div animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }} transition={{ duration: 0.6, ease }} className="absolute inset-x-5 bottom-5 flex h-[76px] items-center justify-between rounded-lg bg-white px-5">
                    <h6 className="h6">{s.title}</h6>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand transition-transform duration-500 group-hover:rotate-45">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 13 13 5M6 5h7v7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </motion.div>
                </Link>
                {active && (
                  <>
                    {(["l", "r"] as const).map((dir) => (
                      <button
                        key={dir}
                        aria-label={dir === "l" ? "Previous" : "Next"}
                        onClick={(e) => { e.stopPropagation(); go(dir === "l" ? -1 : 1); }}
                        className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-transform hover:scale-110 ${dir === "l" ? "left-4" : "right-4"}`}
                      >
                        <Arrow dir={dir} />
                      </button>
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
