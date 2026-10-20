"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Button from "../Button";
import { Reveal, SplitLetters, SplitWords, ease } from "../motion";
import { img, posts } from "@/lib/site";

const people = [
  { name: "Daniel Wong", img: "rxqbWuAOIaWT8bn9HFGqTzlvH8.png", q: "These guys have done a very good job delivering my clients' loads. Very intelligent and responsive dispatch!" },
  { name: "Sarah Mitchell", img: "4rBxLbGMf1ZjVVJ0mSEb2PgZkM.png", q: "Have delivered the load safely. Love the way they communicate and update each step." },
  { name: "James Carter", img: "Icgn1UiRvID1BEsQ67UO7J83kM.png", q: "Very smart people. Take your every effort seriously and make all your desires happen. Thank you for the good job." },
];

export function Testimonials() {
  const [a, setA] = useState(0);
  const go = (d: number) => setA((v) => (v + d + people.length) % people.length);
  return (
    <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
      <div className="grid grid-cols-[1fr_450px] items-start gap-16 max-[1000px]:grid-cols-1">
        <div className="flex min-h-[200px] items-center gap-16 max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-6">
          <div className="relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full">
            <AnimatePresence mode="popLayout">
              <motion.div key={a} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="absolute inset-0">
                <Image src={img(people[a].img)} alt={people[a].name} fill sizes="200px" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-[550px] max-w-full">
            <AnimatePresence mode="wait">
              <motion.div key={a} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease }}>
                <p className="p20">{people[a].q}</p>
                <h6 className="h6 mt-6">Freight Broker</h6>
                <p>Freight Broker</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-end gap-0 pt-[25px] max-[1000px]:justify-start">
          {people.map((p, i) => (
            <button key={p.name} onClick={() => setA(i)} aria-label={p.name} className="relative h-[150px] w-[150px] cursor-pointer overflow-hidden rounded-full transition-all duration-500 hover:scale-105" style={{ transform: `scale(${a === i ? 1 : 0.92})` }}>
              <Image src={img(p.img)} alt={p.name} fill sizes="150px" className={`object-cover transition-[filter] duration-500 ${a === i ? "grayscale-0" : "grayscale"}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {([-1, 1] as const).map((d) => (
          <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={() => go(d)} className="group flex h-10 w-10 items-center justify-center rounded-full border border-ink transition-colors duration-300 hover:bg-ink">
            <svg width="12" height="10" viewBox="0 0 10 8" fill="none" className="transition-[filter] duration-300 group-hover:invert" style={{ transform: d < 0 ? "scaleX(-1)" : undefined }}><path d="M0 4h9M6 1l3 3-3 3" stroke="#1d2228" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        ))}
      </div>
    </section>
  );
}

export function PostCard({ p, delay = 0 }: { p: (typeof posts)[number]; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      <Link href={`/blog/${p.slug}`} className="group block">
        <div className="relative aspect-[432/326] overflow-hidden rounded-lg">
          <Image src={img(p.img)} alt={p.title} fill sizes="432px" className="object-cover transition-transform duration-[900ms] group-hover:scale-105" />
          <span className="label absolute bottom-4 left-4 rounded bg-white px-3 py-1">{p.cat}</span>
        </div>
        <h6 className="h6 mt-6 transition-colors group-hover:text-brand">{p.title}</h6>
        <p className="mt-3">{p.text}</p>
      </Link>
    </motion.div>
  );
}

export function Articles() {
  return (
    <section className="px-[var(--pad)] pb-[150px] pt-[85px] max-[809px]:pb-20">
      <SplitWords as="h2" className="h2 text-center" text="Latest Articles" />
      <div className="mt-[88px] grid grid-cols-3 gap-6 max-[1000px]:grid-cols-1 max-[809px]:mt-10">
        {posts.slice(0, 3).map((p, i) => <PostCard key={p.slug} p={p} delay={i * 0.1} />)}
      </div>
    </section>
  );
}

export function CtaBanner({ title = "Your cargo is on the road with us", text = "Tell us what you need to ship — our team will prepare the best logistics solution for you.", image = "m6dcOvWhq3zaiF4BGvZDiAxGY.png" }: { title?: string; text?: string; image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="relative h-[904px] overflow-hidden bg-black text-white max-[809px]:h-[700px]">
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={img(image)} alt="Every Mile Starts Here" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,.12) 47%)" }} />
      <div className="relative flex h-full flex-col justify-end px-[var(--pad)] pb-[100px] max-[809px]:pb-14">
        <SplitWords as="h2" className="h-mega w-[698px] max-w-full" text={title} stagger={0.06} />
        {text ? <Reveal delay={0.1}><p className="p20 mt-5 w-[384px] max-w-full">{text}</p></Reveal> : null}
        <Reveal delay={0.2} className="mt-10"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
      </div>
    </section>
  );
}
