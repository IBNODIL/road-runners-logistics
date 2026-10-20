"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, SplitWords, ease } from "../motion";
import { img, services } from "@/lib/site";

const features = [
  { t: "Reliable Delivery", d: "We plan every trip carefully, stay in clear contact and deliver your cargo on schedule.", img: "XfimUyWbnmq8DkMMHtLZhaTC5w.jpg" },
  { t: "Wide Partner Network", d: "Our trusted partners across Europe and Central Asia help us deliver your cargo to any destination.", img: "jAsboYb2MgvlHGoL9v7EctiEqgI.jpg" },
  { t: "Experienced Team", d: "Our specialists know routes, customs requirements and the freight process inside out, so they solve every issue quickly.", img: "SlQVuueFOFKvVJ3t26LZUiqNXQ.jpg" },
  { t: "Puxta ish jarayoni", d: "Every stage is under control, from planning to delivery: you always know where your cargo is.", img: "XU2GzPc7jHgd0kN0g0mGic9qycE.jpg" },
];

export function Why() {
  const [a, setA] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setA((v) => (v + 1) % 4), 4500);
    return () => clearInterval(t);
  }, [hover]);
  return (
    <section className="px-[var(--pad)] pt-[150px] max-[809px]:pt-20">
      <Reveal><p className="label text-brand">Why Road Runners</p></Reveal>
      <SplitWords as="h3" className="h3 mt-4 w-[1029px] max-w-full !text-[48px] max-[809px]:!text-[30px]" text="Road Runners Logistics SIA combines an experienced team, reliable infrastructure, international partnerships and disciplined processes to give every load the attention it deserves." stagger={0.015} />
      <Reveal className="relative mt-[100px] h-[691px] overflow-hidden rounded-lg bg-ink text-white max-[1000px]:h-auto max-[1000px]:min-h-[620px]">
        <AnimatePresence initial={false}>
          <motion.div key={a} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease }} className="absolute inset-0">
            <Image src={img(features[a].img)} alt={features[a].t} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 50.3%, rgba(0,0,0,.8) 100%)" }} />
        <div className="relative flex h-full min-h-[620px] flex-col justify-between p-8 max-[1000px]:gap-16">
          <div className="flex items-start justify-between gap-6">
            <h5 className="h5 w-[348px]">Built for Reliability. Ready for the Future.</h5>
            <span className="h5">0{a + 1}</span>
          </div>
          <div className="grid grid-cols-4 gap-7 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {features.map((f, i) => (
              <button key={f.t} onMouseEnter={() => setA(i)} onClick={() => setA(i)} className={`group text-left transition-opacity duration-500 ${a === i ? "opacity-100" : "opacity-60 hover:opacity-90"}`}>
                <div className="relative mb-6 h-[2px] bg-white/30">
                  {a === i && <motion.div key={`${a}-${hover}`} className="absolute inset-y-0 left-0 bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: hover ? 0.4 : 4.5, ease: "linear" }} />}
                </div>
                <h6 className="h6">{f.t}</h6>
                <p className="mt-3 text-[16px]">{f.d}</p>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export const Icon = ({ k, size = 28 }: { k: string; size?: number }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (k) {
    case "truck": return <svg {...p}><path d="M2 6h11v10H2zM13 9h5l3 3v4h-8M6 18a1.5 1.5 0 1 0 0 .01M17 18a1.5 1.5 0 1 0 0 .01" /></svg>;
    case "snow": return <svg {...p}><path d="M12 2v20M4 7l16 10M20 7 4 17" /></svg>;
    case "box": return <svg {...p}><path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" /></svg>;
    case "warehouse": return <svg {...p}><path d="M3 21V9l9-5 9 5v12M7 21v-7h10v7M7 17h10" /></svg>;
    case "doc": return <svg {...p}><path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" /></svg>;
    default: return <svg {...p}><path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5" /></svg>;
  }
};

export function ServicesGrid() {
  return (
    <section className="px-[var(--pad)] py-[75px]">
      <SplitWords as="h2" className="h2 mx-auto w-[686px] max-w-full text-center" text="One Logistics Partner. Every Route." />
      <div className="mt-[123px] grid grid-cols-3 gap-6 max-[1000px]:mt-12 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
        {services.map((s, i) => (
          <motion.div key={s.slug} initial={{ opacity: 0, y: 160 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 1, delay: (i % 3) * 0.12, ease }}>
            <Link href={`/services/${s.slug}`} className="group relative flex h-[447px] flex-col justify-between overflow-hidden rounded-lg bg-mist p-8 text-ink transition-colors duration-500 hover:text-white">
              {/* photo sits still underneath */}
              <Image src={img(s.img)} alt={s.title} fill sizes="432px" className="object-cover" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "linear-gradient(rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 49.8%, rgba(0,0,0,.6) 100%)" }} />
              {/* grey card rises like a curtain, uncovering the photo from the bottom */}
              <div className="absolute inset-0 bg-mist transition-transform duration-[800ms] ease-[cubic-bezier(.65,0,.35,1)] group-hover:-translate-y-full" />
              {/* navigation arrow, only visible on hover */}
              <svg aria-hidden width="34" height="34" viewBox="0 0 34 34" fill="none" className="absolute right-8 top-8 z-10 -translate-x-2 translate-y-2 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                <path d="M6 28 28 6M10 6h18v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-paper">
                <span className="text-brand"><Icon k={s.icon} /></span>
              </div>
              <div className="relative">
                <h5 className="h5">{s.title}</h5>
                <p className="mt-4 w-[368px] max-w-full">{s.text}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <Reveal className="mt-9 text-center">
        <Link href="/services" className="label link-roll border-b border-ink pb-[2px]"><span>View All</span><span aria-hidden className="text-brand">View All</span></Link>
      </Reveal>
    </section>
  );
}
