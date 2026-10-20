"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Button from "./Button";
import { Counter, FadeLetters, Reveal, SplitLetters, SplitWords, ease } from "./motion";
import { img } from "@/lib/site";
import { Icon } from "./home/Why";

/** Full-bleed hero used by every inner page. */
export function PageHero({ title, text, image, cta, align = "bottom", tall, textBelow, lift, textRight, belowTitle, letterReveal, centered, dim, textMid, children }: { title: string; text?: string; image: string; cta?: boolean; align?: "top" | "bottom"; tall?: boolean; textBelow?: boolean; lift?: number; textRight?: boolean; belowTitle?: React.ReactNode; letterReveal?: boolean; centered?: boolean; dim?: boolean; textMid?: boolean; children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  return (
    <section ref={ref} className={`relative min-h-[680px] overflow-hidden bg-ink text-white ${tall ? "h-[1150px] max-[1000px]:h-screen" : "h-screen"}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={img(image)} alt={title} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
      {dim && <div className="absolute inset-0 bg-black/30" />}
      <div style={lift !== undefined ? { bottom: lift } : undefined} className={`absolute inset-x-0 flex items-end justify-between gap-10 px-[var(--pad)] max-[1000px]:flex-col max-[1000px]:items-start max-[1000px]:gap-6 ${centered ? "top-1/2 -translate-y-[48%] max-[1000px]:top-[40%]" : align === "top" ? "top-[250px] max-[1000px]:top-[170px]" : lift !== undefined ? "" : "bottom-0 pb-12"}`}>
        <div>
          {letterReveal ? <FadeLetters as="h1" className="h-hero max-w-[760px]" text={title} delay={0.3} stagger={0.07} /> : <SplitWords as="h1" className="h-hero max-w-[760px]" text={title} delay={0.2} stagger={0.08} />}
          {belowTitle}
          {textBelow && text && (
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease }} className="p20 mt-8 max-w-[779px]">{text}</motion.p>
          )}
        </div>
        {(!textBelow && !textMid && (text || cta)) && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease }} className={`w-[463px] max-w-full ${textRight ? "text-right max-[1000px]:text-left" : ""}`}>
            {text && <p className="p20 whitespace-pre-line">{text}</p>}
            {cta && <div className="mt-8"><Button href="/request-a-quote">Request a Quote</Button></div>}
          </motion.div>
        )}
        {children}
      </div>
      {textMid && text && (
        <motion.p initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9, ease }} className="p20 absolute right-[var(--pad)] top-1/2 w-[463px] max-w-[calc(100%-var(--pad)*2)] -translate-y-1/2 text-right max-[1000px]:top-[38%] max-[1000px]:w-[70%] max-[809px]:text-[17px]">
          {text}
        </motion.p>
      )}
    </section>
  );
}

/** Light hero (contact style): heading + text on a pale background. */
export function PlainHero({ title, text }: { title: string; text?: string }) {
  return (
    <section className="px-[var(--pad)] pb-10 pt-[170px]">
      <SplitWords as="h1" className="h-hero max-w-[860px]" text={title} stagger={0.08} />
      {text && <Reveal delay={0.4}><p className="p20 mt-8 max-w-[520px]">{text}</p></Reveal>}
    </section>
  );
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Reveal><p className={`label ${className}`}>{children}</p></Reveal>;
}

export function ParallaxImage({ src, alt, className = "", ratio = "16/9" }: { src: string; alt: string; className?: string; ratio?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-lg ${className}`} style={{ aspectRatio: ratio }}>
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image src={img(src)} alt={alt} fill sizes="(max-width:1000px) 100vw, 60vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

export function StatsRow({ items, dark = false }: { items: [string, string][]; dark?: boolean }) {
  return (
    <div className={`grid gap-6 ${items.length === 4 ? "grid-cols-4 max-[1000px]:grid-cols-2" : items.length === 3 ? "grid-cols-3 max-[809px]:grid-cols-1" : "grid-cols-2"}`}>
      {items.map(([n, l], i) => (
        <motion.div key={l} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease }} className={`border-l pl-6 ${dark ? "border-white/20" : "border-ink/15"}`}>
          <Counter value={n} className="h-mega !block" />
          <p className="p20 mt-4">{l}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function FeatureGrid({ items, cols = 4, dark = false }: { items: { t: string; d?: string }[]; cols?: 2 | 3 | 4; dark?: boolean }) {
  const c = cols === 4 ? "grid-cols-4 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1" : cols === 3 ? "grid-cols-3 max-[1000px]:grid-cols-1" : "grid-cols-2 max-[809px]:grid-cols-1";
  return (
    <div className={`grid gap-x-6 gap-y-12 ${c}`}>
      {items.map((f, i) => (
        <Reveal key={f.t} delay={(i % cols) * 0.1}>
          <div className={`mb-6 h-[2px] ${dark ? "bg-white/30" : "bg-ink/10"}`} />
          <h6 className="h6">{f.t}</h6>
          {f.d && <p className="mt-3">{f.d}</p>}
        </Reveal>
      ))}
    </div>
  );
}

export function CardGrid({ items, cols = 3, hrefPrefix, tall, photo }: { items: { slug?: string; t: string; d?: string; img?: string; icon?: string }[]; cols?: 2 | 3; hrefPrefix?: string; tall?: boolean; photo?: boolean }) {
  return (
    <div className={`grid gap-6 ${cols === 3 ? "grid-cols-3 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1" : "grid-cols-2 max-[809px]:grid-cols-1"}`}>
      {items.map((s, i) => {
        const body = photo && s.img ? (
          // tall photo card, title top-left, photo scales to 1.2 on hover
          <div className="group relative aspect-[580/600] overflow-hidden rounded-lg bg-ink text-white">
            <Image src={img(s.img)} alt={s.t} fill sizes="580px" className="scale-100 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.44,0,.56,1)] group-hover:scale-[1.2]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 40%)" }} />
            <h6 className="h6 absolute left-8 top-8 max-[809px]:left-5 max-[809px]:top-5">{s.t}</h6>
            {/* arrow button, only visible on hover */}
            <span className="absolute bottom-6 right-6 flex h-[50px] w-[50px] scale-75 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(.44,0,.56,1)] group-hover:scale-100 group-hover:opacity-100">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 14 14 4M5.5 4H14v8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        ) : s.icon ? (
          // photo always visible; on hover it only scales to 1.2 inside the box
          <div className={`group relative flex flex-col justify-between overflow-hidden rounded-lg bg-ink p-8 text-white max-[809px]:h-[460px] ${tall ? "h-[650px]" : "h-[447px]"}`}>
            {s.img && <Image src={img(s.img)} alt={s.t} fill sizes="660px" className="scale-100 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.44,0,.56,1)] group-hover:scale-[1.2]" />}
            <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,.65) 100%)" }} />
            <div className="relative flex h-[94px] w-[94px] items-center justify-center rounded-full border border-white text-white">
              <Icon k={s.icon} size={40} />
            </div>
            <div className="relative">
              <h5 className="h5">{s.t}</h5>
              {s.d && <p className="mt-4 max-w-[560px]">{s.d}</p>}
            </div>
          </div>
        ) : (
          <div className={`group relative flex flex-col justify-end overflow-hidden rounded-lg bg-mist p-8 transition-colors duration-500 hover:text-white max-[809px]:h-[380px] ${tall ? "h-[650px]" : "h-[447px]"}`}>
            {s.img && <Image src={img(s.img)} alt={s.t} fill sizes="432px" className="object-cover" />}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "linear-gradient(rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%)" }} />
            {s.img && <div className="absolute inset-0 bg-mist transition-transform duration-[800ms] ease-[cubic-bezier(.65,0,.35,1)] group-hover:-translate-y-full" />}
            <div className="relative">
              <h5 className="h5">{s.t}</h5>
              {s.d && <p className="mt-4 max-w-[368px]">{s.d}</p>}
            </div>
          </div>
        );
        return (
          <motion.div key={s.t} initial={{ opacity: 0, y: 140 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 1, delay: (i % cols) * 0.12, ease }}>
            {hrefPrefix && s.slug ? <Link href={`${hrefPrefix}/${s.slug}`}>{body}</Link> : body}
          </motion.div>
        );
      })}
    </div>
  );
}

export function Steps({ items, dark = false }: { items: { t: string; d: string }[]; dark?: boolean }) {
  return (
    <div className="flex flex-col">
      {items.map((s, i) => (
        <Reveal key={s.t} className={`grid grid-cols-[110px_1fr] gap-6 border-t py-8 max-[600px]:grid-cols-1 ${dark ? "border-white/20" : "border-ink/15"}`}>
          <span className="h5">0{i + 1}</span>
          <div className="grid grid-cols-2 gap-8 max-[809px]:grid-cols-1">
            <h6 className="h6">{s.t}</h6>
            <p>{s.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Animated FAQ accordion. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((f, i) => {
        const o = open === i;
        return (
          <div key={f.q} className="border-t border-ink/15 last:border-b">
            <button onClick={() => setOpen(o ? null : i)} aria-expanded={o} className="flex w-full items-center justify-between gap-6 py-6 text-left">
              <h6 className="h6">{f.q}</h6>
              <span className="relative h-8 w-8 shrink-0 rounded-full border border-ink/30">
                <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 bg-ink" />
                <motion.span animate={{ rotate: o ? 90 : 0, opacity: o ? 0 : 1 }} className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-ink" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {o && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                  <p className="max-w-[760px] pb-6">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Horizontal milestone carousel with prev/next arrows (drag/scroll-snap too). */
export function Timeline({ items }: { items: { y: string; t: string; d: string; img?: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (d: number) => ref.current?.scrollBy({ left: d * 460, behavior: "smooth" });
  return (
    <div>
      <div ref={ref} className="no-scrollbar -mx-[var(--pad)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--pad)]">
        {items.map((it, i) => (
          <motion.div key={it.y} initial={{ opacity: 0, x: 120 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px -5% 0px 0px" }} transition={{ duration: 0.9, delay: i * 0.08, ease }} className="w-[436px] shrink-0 snap-start max-[600px]:w-[82vw]">
            {it.img && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={img(it.img)} alt={it.t} fill sizes="436px" className="object-cover" />
              </div>
            )}
            <h2 className="h-mega mt-8 !text-[120px] max-[809px]:!text-[72px]">{it.y}</h2>
            <h6 className="h6 mt-4">{it.t}</h6>
            <p className="mt-3 max-w-[400px]">{it.d}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex gap-[10px]">
        {([-1, 1] as const).map((d) => (
          <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={() => by(d)} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:[&_path]:stroke-white">
            <svg width="12" height="10" viewBox="0 0 10 8" fill="none" style={{ transform: d < 0 ? "scaleX(-1)" : undefined }}><path d="M0 4h9M6 1l3 3-3 3" stroke="#1d2228" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
export { SplitLetters };
