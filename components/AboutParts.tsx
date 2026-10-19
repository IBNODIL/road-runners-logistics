"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ease, Reveal } from "./motion";
import { img } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* shared: pointer-drag horizontal scrolling                           */
/* ------------------------------------------------------------------ */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ down: false, x: 0, left: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // native touch scrolling
    const el = ref.current;
    if (!el) return;
    st.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.down || !ref.current) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 4) s.moved = true;
    ref.current.scrollLeft = s.left - dx;
  };
  const end = () => {
    st.current.down = false;
    setDragging(false);
  };
  const by = (d: number, step: number) => ref.current?.scrollBy({ left: d * step, behavior: "smooth" });
  return { ref, dragging, by, handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end, onDragStart: (e: React.DragEvent) => e.preventDefault() } };
}

export function Arrows({ onPrev, onNext, dark = false, big = false }: { onPrev: () => void; onNext: () => void; dark?: boolean; big?: boolean }) {
  const b = dark ? "border-white/40 hover:bg-white" : "border-ink hover:bg-ink hover:[&_path]:stroke-white";
  const sz = big ? "h-[78px] w-[78px]" : "h-10 w-10";
  return (
    <div className="flex gap-[10px]">
      {([-1, 1] as const).map((d) => (
        <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={d < 0 ? onPrev : onNext} className={`flex items-center justify-center rounded-full border transition-colors ${sz} ${b}`}>
          <svg width={big ? 30 : 12} height={big ? 24 : 10} viewBox="0 0 10 8" fill="none" style={{ transform: d < 0 ? "scaleX(-1)" : undefined }}>
            <path d="M0 4h9M6 1l3 3-3 3" stroke={dark ? "#fff" : "#1d2228"} strokeWidth={big ? 0.7 : 1.3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline: vertical columns, drag to scroll, round "Drag" cursor     */
/* ------------------------------------------------------------------ */
export function ZigTimeline({ items }: { items: { y: string; t: string; d: string; img: string }[] }) {
  const { ref, dragging, handlers } = useDragScroll();
  const wrap = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 260, damping: 28, mass: 0.5 });
  const SIZE = 185;

  return (
    <div
      ref={wrap}
      className="relative cursor-none select-none max-[1000px]:cursor-auto"
      onMouseEnter={(e) => { mx.set(e.clientX - SIZE / 2); my.set(e.clientY - SIZE / 2); sx.jump(e.clientX - SIZE / 2); sy.jump(e.clientY - SIZE / 2); setOver(true); }}
      onMouseMove={(e) => { mx.set(e.clientX - SIZE / 2); my.set(e.clientY - SIZE / 2); }}
      onMouseLeave={() => setOver(false)}
    >
      <div ref={ref} {...handlers} className="no-scrollbar -mx-[var(--pad)] flex overflow-x-auto px-[var(--pad)]">
        {items.map((it, i) => {
          const odd = i % 2 === 0;
          const group = (
            <div>
              <div className="relative aspect-[429/340] w-[429px] max-w-full overflow-hidden rounded-lg">
                <Image src={img(it.img)} alt={it.t} fill sizes="429px" draggable={false} className="object-cover" />
              </div>
              <h6 className="h5 mt-8 !text-[32px]">{it.t}</h6>
              <p className="p20 mt-4 max-w-[440px] !text-[18px] !leading-[30px]">{it.d}</p>
            </div>
          );
          const year = <h2 className="h-mega !text-[120px] max-[809px]:!text-[72px]">{it.y}</h2>;
          return (
            <motion.div key={it.y} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px -5% 0px 0px" }} transition={{ duration: 0.9, delay: i * 0.08, ease }} className="flex h-[940px] w-[800px] shrink-0 flex-col justify-between border-l border-ink/70 pl-[30px] pr-8 max-[1000px]:w-[82vw] max-[809px]:h-[780px]">
              {odd ? <>{group}{year}</> : <>{year}{group}</>}
            </motion.div>
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
    <motion.div initial={{ opacity: 0, x: side === "l" ? -140 : 140 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.1, ease }} className="max-w-[330px]">
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
      <div className="relative min-h-[620px] overflow-visible max-[1200px]:min-h-[420px]">
        <motion.div
          style={{ transformOrigin: "50% 0%" }}
          animate={{ rotate: [-2.2, 2.2, -2.2], x: [-10, 10, -10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0" style={{ WebkitMaskImage: "radial-gradient(ellipse 62% 66% at 50% 50%, #000 52%, transparent 100%)", maskImage: "radial-gradient(ellipse 62% 66% at 50% 50%, #000 52%, transparent 100%)" }}>
            <Image src={img("1fQqNEzk6HaFI4mpJriu9XwlPL4.png")} alt="Infrastructure Behind Every Shipment" fill sizes="50vw" className="object-contain" />
          </div>
        </motion.div>
        {/* cloud-like mist that hides where the photo begins */}
        <div className="pointer-events-none absolute inset-x-[-10%] -top-6 z-10 h-[48%]" aria-hidden>
          <div className="absolute inset-0" style={{ background: "linear-gradient(#f9f9f9 0%, #f9f9f9 22%, rgba(249,249,249,.85) 45%, rgba(249,249,249,.4) 72%, rgba(249,249,249,0) 100%)" }} />
          <motion.div animate={{ x: [-20, 20, -20] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[8%] top-[38%] h-[30%] w-[46%] rounded-full bg-[#f9f9f9] blur-[28px]" />
          <motion.div animate={{ x: [24, -24, 24] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[6%] top-[46%] h-[28%] w-[44%] rounded-full bg-[#f9f9f9] blur-[30px]" />
          <motion.div animate={{ x: [-14, 14, -14] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[30%] top-[58%] h-[24%] w-[40%] rounded-full bg-[#f9f9f9]/90 blur-[26px]" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-16 max-[1200px]:gap-10">{right.map((i) => <SideItem key={i.t} {...i} side="r" />)}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Values: cards enter from the right and travel left while scrolling  */
/* ------------------------------------------------------------------ */
export function ValuesRow({ items }: { items: { t: string; d: string; icon: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 35%"] });
  const x = useTransform(scrollYProgress, [0, 1], [640, -560]);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex w-max gap-[30px] will-change-transform max-[1000px]:!transform-none max-[1000px]:w-full max-[1000px]:overflow-x-auto max-[1000px]:pb-4">
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
  );
}

/* ------------------------------------------------------------------ */
/* People: heading + arrows on top, draggable carousel                 */
/* ------------------------------------------------------------------ */
export function TeamSection({ items }: { items: { n: string; r: string; img: string }[] }) {
  const { ref, dragging, by, handlers } = useDragScroll();
  return (
    <div>
      <div className="mb-[60px] flex items-end justify-between gap-6">
        <h2 className="h-mega !text-[120px] max-[809px]:!text-[56px]">Our People</h2>
        <div className="max-[809px]:hidden"><Arrows big onPrev={() => by(-1, 610)} onNext={() => by(1, 610)} /></div>
      </div>
      <div ref={ref} {...handlers} className={`no-scrollbar -mx-[var(--pad)] flex gap-[30px] overflow-x-auto px-[var(--pad)] select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {items.map((p, i) => (
          <motion.div key={p.n} initial={{ opacity: 0, x: 120 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease }} className="w-[580px] shrink-0 max-[809px]:w-[78vw]">
            <div className="relative aspect-[580/760] overflow-hidden rounded-lg bg-mist">
              <Image src={img(p.img)} alt={p.n} fill sizes="580px" draggable={false} className="object-cover" />
            </div>
            <h5 className="h5 mt-6">{p.n}</h5>
            <p>{p.r}</p>
          </motion.div>
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
    <section className="relative h-[900px] overflow-hidden bg-ink text-white max-[809px]:h-[600px]">
      <video ref={vid} src={VIDEO_SRC} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      <motion.div animate={{ opacity: playing ? 0 : 1 }} transition={{ duration: 0.8, ease }} className="absolute inset-0">
        <Image src={img(poster)} alt="Seamless Vehicle Shipping" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
      </motion.div>
      <div className="absolute inset-x-[var(--pad)] bottom-[100px] max-[809px]:bottom-10">
        <motion.div animate={{ opacity: playing ? 0 : 1, y: playing ? -20 : 0 }} transition={{ duration: 0.6, ease }}>{children}</motion.div>
        <button onClick={toggle} aria-pressed={playing} className="label mt-10 flex items-center gap-3 rounded-lg bg-white px-5 py-3 text-ink transition-transform duration-300 hover:scale-105 active:scale-95">
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor"><rect width="4" height="14" /><rect x="8" width="4" height="14" /></svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor"><path d="M0 0l12 7-12 7z" /></svg>
          )}
          {playing ? "Stop video" : "Play video"}
        </button>
      </div>
    </section>
  );
}

export { Reveal };
