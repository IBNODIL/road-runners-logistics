"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Button from "../Button";
import { SplitLetters, ease } from "../motion";
import { img, services } from "@/lib/site";

export default function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % services.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = services[i];

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden bg-ink text-white">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={img("At7VazJTUT6lcVf5JbgWlXuEFw4.png")} alt="Hero Image" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(56deg, rgba(0,0,0,.24) 0%, rgba(0,0,0,0) 50.3%, rgba(0,0,0,.24) 100%)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      <div className="wrap absolute inset-0 z-10">
        {/* text group: heading, copy and button stacked at the bottom-left */}
        <div className="absolute bottom-12 left-[var(--pad)] flex max-w-[calc(100%-var(--pad)*2)] flex-col items-start max-[809px]:bottom-8">
          <h1 className="h-hero w-[640px] max-w-full" aria-label="Reliable freight transport">
            <SplitLetters text="Reliable" delay={0.2} />
            <br />
            <SplitLetters text="Freight" delay={0.45} />
            <br />
            <SplitLetters text="Transport" delay={0.7} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1, ease }} className="p20 mt-[52px] w-[480px] max-w-full max-[809px]:mt-6">
            Trucking services that keep your business moving forward with confidence.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.3, ease }} className="mt-[44px] max-[809px]:mt-6">
            <Button href="/request-a-quote">Request a Quote</Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1.2, ease }} className="absolute bottom-12 right-[var(--pad)] flex h-[212px] items-stretch gap-2 max-[1000px]:hidden">
          <div className="relative w-[183px] overflow-hidden rounded-lg">
            <AnimatePresence mode="popLayout">
              <motion.div key={s.slug} initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }} className="absolute inset-0">
                <Image src={img(s.img)} alt={s.title} fill sizes="183px" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative w-[327px] overflow-hidden rounded-lg bg-white p-6 text-ink">
            <div className="flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.a key={s.slug} href={`/services/${s.slug}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="h6">
                  {s.title}
                </motion.a>
              </AnimatePresence>
              <span className="text-[16px]">
                <span className="text-brand">0{i + 1}</span> / 06
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={s.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-3 h-[72px] overflow-hidden">
                {s.text}
              </motion.p>
            </AnimatePresence>
            <div className="absolute inset-x-6 bottom-[24px] h-[2px] bg-ink/10">
              <motion.div key={i} className="h-full bg-ink" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
