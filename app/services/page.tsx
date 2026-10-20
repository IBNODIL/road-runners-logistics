import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import * as motion from "motion/react-client";
import LoadMoreCards from "@/components/LoadMoreCards";
import { FadeLetters, Reveal, SplitWords, ease } from "@/components/motion";
import { services, img } from "@/lib/site";

export const metadata: Metadata = { title: "Services - Road Runners Logistics SIA" };

export default function Services() {
  return (
    <>
      {/* light hero: orange keyword, photo on the right, copy bottom-left */}
      <section data-hero-light className="relative h-[1113px] bg-mist max-[1000px]:h-auto max-[1000px]:px-[var(--pad)] max-[1000px]:pb-16 max-[1000px]:pt-[150px]">
        <h1 className="h-hero absolute left-[var(--pad)] top-[250px] w-[640px] max-w-full max-[1000px]:static" aria-label="Logistics built around your business.">
          <FadeLetters as="span" className="text-brand" text="Logistics" delay={0.3} />{" "}
          <FadeLetters as="span" text="Built Around Your Business." delay={1} />
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 140 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          className="absolute right-[var(--pad)] top-[373px] h-[600px] w-[729px] overflow-hidden rounded-lg max-[1000px]:relative max-[1000px]:right-auto max-[1000px]:top-auto max-[1000px]:mt-10 max-[1000px]:h-[420px] max-[1000px]:w-full"
        >
          <Image src={img("w412NgzOWhJzJHxEHkzMfqTb1U.jpg")} alt="Logistics Built Around Your Business" fill priority sizes="729px" className="object-cover" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.4, ease }} className="p20 absolute bottom-[140px] left-[var(--pad)] w-[483px] max-w-full max-[1000px]:static max-[1000px]:mt-8">
          From a single shipment to a complex international supply chain, Road Runners Logistics SIA brings transportation, storage, and logistics services together to keep your business moving.
        </motion.p>
      </section>

      <section className="px-[var(--pad)] pb-[260px] pt-[225px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mx-auto mb-[150px] max-w-[807px] text-center max-[809px]:mb-12" text="One Partner. Every Logistics Need." />
        <LoadMoreCards cols={2} tall hrefPrefix="/services" initial={4} items={services.map((s) => ({ slug: s.slug, t: s.title, d: s.text, img: s.img, icon: s.icon }))} />
      </section>

      <section className="relative overflow-hidden px-[var(--pad)] pb-[220px] pt-[100px] max-[809px]:pb-20">
        <div className="grid grid-cols-[640px_1fr] items-center gap-10 max-[1100px]:grid-cols-1">
          <div className="relative z-10">
            <Reveal><p className="label text-brand">Why Road Runners Logistics SIA</p></Reveal>
            <SplitWords as="h2" className="h2 mt-3 max-w-[640px]" text="Experience Behind Every Shipment." />
            <Reveal delay={0.1}><p className="mt-8 max-w-[640px] text-[20px] leading-[30px]">Choosing a logistics partner means choosing the people, infrastructure, and network responsible for keeping your goods moving. Road Runners Logistics SIA combines more than 25 years of industry experience with established transportation capabilities, trusted global partners, and experienced logistics professionals.</p></Reveal>
            <Reveal delay={0.2} className="mt-10"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
            <ul className="mt-[70px] flex flex-col gap-[22px]">
              {["Decades of Experience in Global Logistics", "Experienced People Behind Every Journey", "Technology That Keeps Shipments Connected", "A Global Network Across 80+ Countries"].map((t, i) => (
                <motion.li key={t} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12, ease }} className="flex items-center gap-4 text-[20px]">
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-brand">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div initial={{ opacity: 0, x: 120 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.2, ease }} className="relative -mr-[var(--pad)] h-[820px] max-[1100px]:mr-0 max-[1100px]:h-[480px]">
            <Image src={img("RzTzqr04aGS81WFA3sekc43tdk.png")} alt="Experience Behind Every Shipment" fill sizes="55vw" className="object-contain object-right" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
