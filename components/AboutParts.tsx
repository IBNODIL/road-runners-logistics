"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type Variants } from "motion/react";
import { Counter, ease } from "./motion";
import { img } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* shared: pointer-drag horizontal scrolling, optionally endless       */
/* Content must be rendered 3× when loop is on; the middle copy is     */
/* the "home" position and we silently jump by one period at the edges */
/* ------------------------------------------------------------------ */
function useDragScroll(loop = false) {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ down: false, x: 0, left: 0 });
  const [dragging, setDragging] = useState(false);

  const wrap = () => {
    const el = ref.current;
    if (!el || !loop) return 0;
    const W = el.scrollWidth / 3;
    if (!W) return 0;
    if (el.scrollLeft < W * 0.5) { el.scrollLeft += W; return W; }
    if (el.scrollLeft > W * 1.5) { el.scrollLeft -= W; return -W; }
    return 0;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !loop) return;
    const home = () => { el.scrollLeft = el.scrollWidth / 3; };
    home();
    const t = window.setTimeout(home, 400); // after images settle
    let timer = 0;
    const onScroll = () => {
      if (st.current.down) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(wrap, 140);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(t); window.clearTimeout(timer); el.removeEventListener("scroll", onScroll); };
  }, [loop]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // native touch scrolling
    const el = ref.current;
    if (!el) return;
    st.current = { down: true, x: e.clientX, left: el.scrollLeft };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;
    const el = ref.current;
    if (!s.down || !el) return;
    el.scrollLeft = s.left - (e.clientX - s.x);
    const shift = wrap();
    if (shift) s.left += shift;
  };
  const end = () => {
    st.current.down = false;
    setDragging(false);
  };
  const by = (d: number, step: number) => ref.current?.scrollBy({ left: d * step, behavior: "smooth" });
  return { ref, dragging, by, handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end, onDragStart: (e: React.DragEvent) => e.preventDefault() } };
}

export function Arrows({ onPrev, onNext, dark = false, big = false }: { onPrev: () => void; onNext: () => void; dark?: boolean; big?: boolean }) {
  const b = dark ? "border-white/40 hover:bg-white" : "border-ink hover:bg-ink";
  const sz = big ? "h-[78px] w-[78px]" : "h-10 w-10";
  return (
    <div className="flex gap-[10px]">
      {([-1, 1] as const).map((d) => (
        <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={d < 0 ? onPrev : onNext} className={`group flex items-center justify-center rounded-full border transition-colors duration-300 ${sz} ${b}`}>
          <svg width={big ? 30 : 12} height={big ? 24 : 10} viewBox="0 0 10 8" fill="none" className="transition-[filter] duration-300 group-hover:invert" style={{ transform: d < 0 ? "scaleX(-1)" : undefined }}>
            <path d="M0 4h9M6 1l3 3-3 3" stroke={dark ? "#fff" : "#1d2228"} strokeWidth={big ? 0.7 : 1.3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intro: title → subtitle → text → photo, one after the other         */
/* ------------------------------------------------------------------ */
const seq: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.5, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };
const slideIn: Variants = { hidden: { opacity: 0, x: 180 }, show: { opacity: 1, x: 0, transition: { duration: 1.2, ease } } };

export function IntroRow({ subtitle, paragraphs, photo }: { subtitle: string; paragraphs: string[]; photo: string }) {
  return (
    <motion.div variants={seq} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-[515px_398px_1fr] max-[1200px]:grid-cols-1 max-[1200px]:gap-8">
      <motion.p variants={rise} className="label w-[233px]">{subtitle}</motion.p>
      <div className="flex flex-col gap-6">
        {paragraphs.map((p) => <motion.p key={p} variants={rise}>{p}</motion.p>)}
      </div>
      <motion.div variants={slideIn} className="relative aspect-[425/498] w-[425px] max-w-full justify-self-end overflow-hidden rounded-lg max-[1200px]:justify-self-start">
        <Image src={img(photo)} alt="why we built" fill sizes="425px" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stats: light heading first, then each figure slides in in order     */
/* ------------------------------------------------------------------ */
export function AboutStats({ items }: { items: [string, string][] }) {
  return (
    <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.28, delayChildren: 0.7 } } }} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} className="mt-[110px] grid grid-cols-4 max-[1000px]:grid-cols-2 max-[1000px]:gap-y-16 max-[600px]:grid-cols-1">
      {items.map(([n, l], i) => (
        <motion.div key={l} variants={{ hidden: { opacity: 0, x: -90 }, show: { opacity: 1, x: 0, transition: { duration: 1, ease } } }} className="relative px-4 text-center">
          {i > 0 && <span className="absolute left-0 top-[18px] hidden h-[125px] w-px bg-ink/30 min-[1001px]:block" />}
          <Counter value={n} className="h-mega !block !tracking-[-0.06em]" />
          <p className="mt-6 text-[24px] leading-[30px]">{l}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline: vertical columns, endless drag, round "Drag" cursor       */
/* ------------------------------------------------------------------ */
type TItem = { y: string; t: string; d: string; img: string };

export function ZigTimeline({ items }: { items: TItem[] }) {
  const { ref, dragging, handlers } = useDragScroll(true);
  const [over, setOver] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 260, damping: 28, mass: 0.5 });
  const SIZE = 185;
  const all = [...items, ...items, ...items];

  return (
    <div
      className="relative cursor-none select-none max-[1000px]:cursor-auto"
      onMouseEnter={(e) => { mx.set(e.clientX - SIZE / 2); my.set(e.clientY - SIZE / 2); sx.jump(e.clientX - SIZE / 2); sy.jump(e.clientY - SIZE / 2); setOver(true); }}
      onMouseMove={(e) => { mx.set(e.clientX - SIZE / 2); my.set(e.clientY - SIZE / 2); }}
      onMouseLeave={() => setOver(false)}
    >
      <div ref={ref} {...handlers} className="no-scrollbar -mx-[var(--pad)] flex overflow-x-auto">
        {all.map((it, i) => {
          const odd = (i % items.length) % 2 === 0;
          const group = (
            <div>
              <div className="relative aspect-[429/300] w-[429px] max-w-full overflow-hidden rounded-lg">
                <Image src={img(it.img)} alt={it.t} fill sizes="429px" draggable={false} className="object-cover" />
              </div>
              <h6 className="mt-6 text-[32px] leading-[40px] tracking-[-0.04em]" style={{ fontFamily: "var(--font-jakarta)" }}>{it.t}</h6>
              <p className="mt-3 max-w-[440px] text-[18px] leading-[30px]">{it.d}</p>
            </div>
          );
          const year = <h2 className="h-mega !text-[120px] max-[809px]:!text-[72px]">{it.y}</h2>;
          return (
            <div key={i} className="flex h-[700px] w-[800px] shrink-0 flex-col justify-between border-l border-ink/70 pl-[30px] pr-8 max-[1000px]:w-[82vw] max-[809px]:h-[640px]">
              {odd ? <>{group}{year}</> : <>{year}{group}</>}
            </div>
          );
        })}
      </div>
      <motion.div style={{ x: sx, y: sy, width: SIZE, height: SIZE }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: over ? (dragging ? 0.85 : 1) : 0, opacity: over ? 1 : 0 }} transition={{ duration: 0.3, ease }} className="label pointer-events-none fixed left-0 top-0 z-30 flex items-center justify-center rounded-full bg-white text-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-[1000px]:hidden">
        Drag
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Infrastructure: faded image that sways, text sliding in from sides  */
/* ------------------------------------------------------------------ */
const Check = () => (
  <span className="mb-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);

function SideItem({ t, d, side }: { t: string; d: string; side: "l" | "r" }) {
  return (
    <motion.div initial={{ opacity: 0, x: side === "l" ? -140 : 140 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.1, ease }} className="relative z-20 max-w-[330px]">
      <Check />
      <h6 className="h6">{t}</h6>
      <p className="mt-4">{d}</p>
    </motion.div>
  );
}

export function InfraSection({ left, right }: { left: { t: string; d: string }[]; right: { t: string; d: string }[] }) {
  return (
    <div className="mt-14 grid grid-cols-[330px_1fr_330px] items-stretch gap-10 max-[1200px]:grid-cols-1">
      <div className="flex flex-col justify-between gap-16 max-[1200px]:gap-10">{left.map((i) => <SideItem key={i.t} {...i} side="l" />)}</div>
      <div className="relative z-0 min-h-[640px] max-[1200px]:min-h-[420px]">
        <motion.div animate={{ x: [-22, 22, -22] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0">
          <Image src={img("1fQqNEzk6HaFI4mpJriu9XwlPL4.png")} alt="Infrastructure Behind Every Shipment" fill sizes="50vw" className="object-contain" />
        </motion.div>
        {/* cloud that hides where the photo begins — top edge only, kept inside this column and under the text */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[34%] overflow-hidden" aria-hidden>
          <div className="absolute inset-0" style={{ background: "linear-gradient(#f9f9f9 0%, #f9f9f9 28%, rgba(249,249,249,.8) 52%, rgba(249,249,249,.3) 80%, rgba(249,249,249,0) 100%)" }} />
          <motion.div animate={{ x: [-18, 18, -18] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[4%] top-[30%] h-[46%] w-[52%] rounded-full bg-[#f9f9f9] blur-[26px]" />
          <motion.div animate={{ x: [20, -20, 20] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[2%] top-[38%] h-[44%] w-[50%] rounded-full bg-[#f9f9f9] blur-[28px]" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-16 max-[1200px]:gap-10">{right.map((i) => <SideItem key={i.t} {...i} side="r" />)}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Values: the panel stays pinned while the cards travel right → left  */
/* ------------------------------------------------------------------ */
const CARD_W = 486;
const CARD_GAP = 30;

export function ValuesSection({ items, image, children }: { items: { t: string; d: string; icon: string }[]; image: string; children: React.ReactNode }) {
  const outer = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1300);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const total = items.length * CARD_W + (items.length - 1) * CARD_GAP;
  const start = Math.round(w * 0.64);
  const end = Math.min(0, w - 154 - total);
  const x = useTransform(scrollYProgress, [0.08, 0.92], [start, end]);

  return (
    <section ref={outer} className="relative h-[330vh] max-[1000px]:h-auto">
      <div className="sticky top-[92px] px-[var(--pad)] max-[1000px]:static">
        <div ref={box} className="relative flex h-[calc(100vh-124px)] min-h-[640px] flex-col justify-between overflow-hidden rounded-lg bg-ink py-12 text-white max-[1000px]:h-auto max-[1000px]:gap-12 max-[1000px]:py-8">
          <Image src={img(image)} alt="Logistics Built on Trust." fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative px-[154px] max-[1200px]:px-10 max-[809px]:px-6">{children}</div>
          <div className="relative overflow-hidden max-[1000px]:overflow-x-auto max-[1000px]:px-6">
            <motion.div style={{ x }} className="flex w-max gap-[30px] will-change-transform max-[1000px]:!transform-none">
              {items.map((v) => (
                <div key={v.t} className="flex h-[312px] w-[486px] shrink-0 flex-col justify-between rounded-lg bg-white p-10 text-ink max-[600px]:w-[80vw] max-[600px]:p-6">
                  <span className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-mist">
                    <Image src={img(v.icon)} alt="" width={36} height={36} />
                  </span>
                  <div>
                    <h5 className="h5">{v.t}</h5>
                    <p className="mt-3 text-[18px] leading-[30px]">{v.d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* People: heading + arrows on top, endless draggable carousel         */
/* ------------------------------------------------------------------ */
export function TeamSection({ items }: { items: { n: string; r: string; img: string }[] }) {
  const { ref, dragging, by, handlers } = useDragScroll(true);
  const all = [...items, ...items, ...items];
  return (
    <div>
      <div className="mb-[60px] flex items-end justify-between gap-6">
        <h2 className="h-mega !text-[120px] max-[809px]:!text-[56px]">Our People</h2>
        <div className="max-[809px]:hidden"><Arrows big onPrev={() => by(-1, 430)} onNext={() => by(1, 430)} /></div>
      </div>
      <div ref={ref} {...handlers} className={`no-scrollbar -mx-[var(--pad)] flex gap-[30px] overflow-x-auto select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {all.map((p, i) => (
          <div key={i} className="w-[400px] shrink-0 max-[809px]:w-[70vw]">
            <div className="relative aspect-[400/500] overflow-hidden rounded-lg bg-mist">
              <Image src={img(p.img)} alt={p.n} fill sizes="400px" draggable={false} className="object-cover" />
            </div>
            <h5 className="h5 mt-5 !text-[28px]">{p.n}</h5>
            <p>{p.r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Video section: image first; Play fades it out and loops the video   */
/* ------------------------------------------------------------------ */
export const VIDEO_SRC = "/video/about.mp4";

export function VideoSection({ poster, children }: { poster: string; children?: React.ReactNode }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = async () => {
    const v = vid.current;
    if (!v) return;
    if (playing) {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    } else {
      try {
        await v.play();
        setPlaying(true);
      } catch {
        /* autoplay blocked or file missing: keep the image */
      }
    }
  };
  return (
    <section className="relative h-[900px] overflow-hidden bg-ink text-white max-[809px]:h-[640px]">
      <video ref={vid} src={VIDEO_SRC} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      <motion.div animate={{ opacity: playing ? 0 : 1 }} transition={{ duration: 0.8, ease }} className="absolute inset-0">
        <Image src={img(poster)} alt="Seamless Vehicle Shipping" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      <div className="absolute inset-x-[var(--pad)] bottom-[56px] flex items-end justify-between gap-6 max-[809px]:bottom-8 max-[809px]:flex-col max-[809px]:items-start">
        <motion.div animate={{ opacity: playing ? 0 : 1, y: playing ? -20 : 0 }} transition={{ duration: 0.6, ease }}>{children}</motion.div>
        <button onClick={toggle} aria-pressed={playing} className="label group flex shrink-0 items-stretch gap-[5px] text-ink">
          <span className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-white transition-transform duration-300 group-hover:scale-105">
            {playing ? (
              <svg width="16" height="18" viewBox="0 0 12 14" fill="currentColor"><rect width="4" height="14" /><rect x="8" width="4" height="14" /></svg>
            ) : (
              <svg width="16" height="18" viewBox="0 0 12 14" fill="currentColor"><path d="M0 0l12 7-12 7z" /></svg>
            )}
          </span>
          <span className="flex h-[60px] items-center rounded-lg bg-white px-6 text-[18px] transition-transform duration-300 group-hover:scale-105">{playing ? "Stop video" : "Play video"}</span>
        </button>
      </div>
    </section>
  );
}
