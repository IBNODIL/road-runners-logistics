"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Button from "../Button";
import { Reveal, SplitWords, Counter, ease } from "../motion";
import { img } from "@/lib/site";

const stats = [
  ["25+", "Years of industry experience", 450, "i0t9bDFpv74mnDT7cV9jP5LSI.png"],
  ["80+", "Countries in our partner network", 560, "6qNOMxVGo4gN0TaTj1nukcGzZt8.png"],
  ["1M+", "Loads delivered", 450, "num-trucks.png"],
  ["98%", "On-time delivery", 560, "R9fSXQ5FkKWPaLhdHVVIHkYS0A.png"],
] as const;

export function Business() {
  const ref = useRef<HTMLDivElement>(null);
  // Truck drives in from the right, parks while the section is on screen, then leaves to the left.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.4, 0.62, 1], ["70vw", "0vw", "0vw", "-80vw"]);
  return (
    <section className="relative overflow-hidden px-[var(--pad)] py-[150px] max-[809px]:py-20">
      <SplitWords as="h2" className="h2 relative z-10 w-[445px] max-w-full" text="Logistics That Keeps Your Business Moving" />
      <div ref={ref} className="relative mt-0 flex justify-start pl-[18px] max-[809px]:pl-0">
        <motion.div style={{ x }} className="relative aspect-[1736/906] w-[1009px] max-w-full will-change-transform">
          <Image src={img("URcznmc9y0aJJhWoQOxna5c5k.png")} alt="Truck" fill sizes="1009px" className="object-contain" />
        </motion.div>
      </div>
      <div className="flex justify-end max-[1000px]:mt-8">
        <div className="w-[586px] max-w-full">
          <Reveal>
            <p>A late delivery affects production. A missed trip can break a promise made to a client. The right logistics partner doesn&apos;t just move freight — it moves your entire operation forward.</p>
            <p className="mt-6">Road Runners Logistics SIA helps businesses plan, transport and deliver their cargo. Our experienced team, reliable partners and hands-on logistics expertise make every trip simple and predictable.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Button href="/about" variant="dark" className="!px-[22px] !py-[15px]">Learn More</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const PW = 300;
const PH = 360;

export function Numbers() {
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 170, damping: 22, mass: 0.6 });
  const move = (e: React.MouseEvent) => {
    mx.set(e.clientX - PW / 2);
    my.set(e.clientY + 28);
  };
  const enter = (i: number, e: React.MouseEvent) => {
    if (hover === null) {
      mx.set(e.clientX - PW / 2);
      my.set(e.clientY + 28);
      sx.jump(e.clientX - PW / 2);
      sy.jump(e.clientY + 28);
    }
    setHover(i);
  };
  return (
    <section className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
      <Reveal>
        <p className="label mb-12">Road Runners in Numbers</p>
      </Reveal>
      <div className="grid grid-cols-4 items-start max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1" onMouseMove={move} onMouseLeave={() => setHover(null)}>
        {stats.map(([n, l, h], i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease }}
            onMouseEnter={(e) => enter(i, e)}
            className={`relative flex cursor-default flex-col justify-between border-l border-ink/15 px-6 transition-colors duration-500 max-[1000px]:!h-auto max-[1000px]:gap-16 max-[1000px]:py-6 ${hover === i ? "text-brand" : "text-ink"}`}
            style={{ height: h }}
          >
            <p className="text-ink">0{i + 1}</p>
            <div>
              <Counter value={n} className="h-mega !block !tracking-[-0.06em]" />
              <p className="p20 mt-6 w-[141px]">{l}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Cursor-following photo, slides in below the pointer */}
      <motion.div style={{ x: sx, y: sy, width: PW, height: PH }} className="pointer-events-none fixed left-0 top-0 z-30 max-[1000px]:hidden">
        <AnimatePresence>
          {hover !== null && (
            <motion.div key={hover} initial={{ opacity: 0, y: 40, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.92 }} transition={{ duration: 0.5, ease }} className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <Image src={img(stats[hover][3])} alt="" fill sizes="300px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const angle = useTransform(scrollYProgress, [0.2, 0.8], [90, 450]);
  const dotX = useTransform(angle, (a) => 175 + 175 * Math.cos((a * Math.PI) / 180));
  const dotY = useTransform(angle, (a) => 175 + 175 * Math.sin((a * Math.PI) / 180));
  return (
    <section ref={ref} className="relative h-[900px] overflow-hidden bg-black text-white max-[809px]:h-auto max-[809px]:py-24">
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[10%] inset-x-0">
        <Image src={img("hqG0fOzjzcNnRhBmiSVPDNaZvPU.png")} alt="Experience You Can Move With" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full px-[var(--pad)] max-[809px]:h-auto">
        <Reveal className="absolute right-[var(--pad)] top-[326px] h-[350px] w-[350px] max-[1000px]:hidden">
          <div className="absolute inset-0 rounded-full border border-white/80" />
          <span className="h3 absolute inset-0 flex items-center justify-center pb-6">1240Km</span>
          <span className="label absolute inset-x-0 top-1/2 mt-8 text-center text-sun">18 Hours</span>
          <motion.span style={{ left: dotX, top: dotY }} className="absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-sun" />
        </Reveal>
        <div className="absolute inset-x-[var(--pad)] bottom-[100px] max-[809px]:static">
          <SplitWords as="h3" className="h3 w-[815px] max-w-full" text="Road Runners Logistics SIA is built on a simple idea: logistics should be reliable from the first mile to the last." />
          <div className="mt-[88px] flex gap-[64px] max-[809px]:mt-10 max-[809px]:flex-col max-[809px]:gap-6">
            <Reveal className="label w-[155px] shrink-0 text-sun"><p>Experience you can trust</p></Reveal>
            <Reveal delay={0.1} className="w-[596px] max-w-full text-paper">
              <p>What started as truck freight is now a full logistics service: international road transport, warehousing, customs clearance and logistics management. Our team takes a personal approach with every client — we understand exactly what needs to be delivered, where and when, and what matters most to your business.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
