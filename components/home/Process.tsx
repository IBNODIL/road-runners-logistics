"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../Button";
import { SplitWords, ease } from "../motion";
import { img } from "@/lib/site";

const steps = [
  { t: "Submit a Request", d: "Tell us what cargo needs to move, from where to where, and when. Our team will review your requirements and offer the best solution.", img: "dAIdW2i7K7ry8srYFkRLCp9jR78.png" },
  { t: "Planning & Loading", d: "We choose the best route and vehicle, prepare the documents and pick up your cargo at the agreed time.", img: "XdbWcD2pH47t96ZMcf0X1I3eWJk.png" },
  { t: "Transportation", d: "Your cargo travels safely along the optimal route with experienced drivers and trusted partners.", img: "fdOmGyyCKLjj1MRwsBfRUEK8TSM.jpg" },
  { t: "Delivered", d: "Your cargo arrives on time and intact. We keep you informed throughout the entire process.", img: "NKtCrkI3GABXqqkU8hbpADwoGY0.jpg" },
];

export function Process() {
  // Steps change only when one is chosen (click / keyboard), never by scrolling.
  const [a, setA] = useState(0);
  return (
    <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
      <div className="grid grid-cols-[574px_1fr] gap-[63px] max-[1000px]:grid-cols-1">
        <div className="flex flex-col justify-between max-[1000px]:gap-12">
          <div>
            <SplitWords as="h2" className="h2 w-[455px] max-w-full" text="From Request to Delivery — It's All Simple." />
            <div className="mt-10"><Button href="/request-a-quote">Request a Quote</Button></div>
          </div>
          <div className="mt-24 flex flex-col gap-12 max-[1000px]:mt-0">
            {steps.map((s, i) => (
              <motion.button key={s.t} onClick={() => setA(i)} animate={{ opacity: a === i ? 1 : 0.35 }} transition={{ duration: 0.5 }} className="grid grid-cols-[117px_1fr] text-left max-[600px]:grid-cols-[70px_1fr]">
                <span>( 0{i + 1} )</span>
                <span>
                  <span className="h6 block">{s.t}</span>
                  <motion.span initial={false} animate={{ height: a === i ? "auto" : 0, opacity: a === i ? 1 : 0, marginTop: a === i ? 14 : 0 }} transition={{ duration: 0.5, ease }} className="block max-w-[425px] overflow-hidden">
                    {s.d}
                  </motion.span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className="sticky top-[100px] h-[825px] self-start overflow-hidden rounded-lg max-[1000px]:static max-[1000px]:h-[520px]">
          <AnimatePresence initial={false}>
            <motion.div key={a} initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }} animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }} exit={{ opacity: 1 }} transition={{ duration: 1, ease }} className="absolute inset-0">
              <Image src={img(steps[a].img)} alt={steps[a].t} fill sizes="708px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
