import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { ParallaxImage } from "@/components/ui";
import * as motion from "motion/react-client";
import { Counter, FadeLetters, Reveal, SplitWords, SplitLetters, ease } from "@/components/motion";
import { img } from "@/lib/site";
import NetworkPins from "@/components/NetworkPins";

export const metadata: Metadata = { title: "Global Network - Road Runners Logistics SIA" };

const regions = [
  ["North America", "Road, air, ocean, warehousing, and cross-border logistics connecting major commercial markets."],
  ["Europe", "Supporting international freight movement across established European trade routes and logistics hubs."],
  ["Asia", "Supporting international freight movement across established European trade routes and logistics hubs."],
  ["Middle East", "Supporting strategic trade routes connecting businesses across regional and international markets."],
  ["Africa", "Extending logistics connections across emerging markets and major commercial destinations."],
  ["Australia", "Connecting businesses with transportation and international freight solutions across Australia."],
];

const ways = [
  ["International Freight", "Move cargo between global markets through coordinated air, ocean, and ground transportation.", "tArq4eT1ki5oHRnDYQEMRl2KhH0.svg"],
  ["Cross-Border Transportation", "Coordinate freight movement across borders with the transportation and documentation support required along the way.", "4VJMBjZ5VJmgq2AILBKyy4qgVuc.svg"],
  ["Customs Clearance", "Navigate customs requirements and documentation to help international shipments move through borders efficiently.", "oIBpDPB33J2O6XJ7UR4GlQihthU.svg"],
  ["Warehousing", "Store and manage inventory through strategically positioned logistics facilities.", "kWIcZDaR99DRXhWjIMCf2V5z0w.svg"],
  ["Last-Mile Delivery", "Connect international freight with local transportation and final delivery.", "uGAiHVm6r6aaTqVT8JmWaEhsEg.svg"],
];

const stats = [["150+", "Connected Operations"], ["80+", "Global Coverage"], ["2M+", "Shipments Delivered"], ["24/7", "Global Support"]];

const pins = [
  { label: "North America", text: "Road, air, ocean, warehousing, and cross-border logistics connecting major commercial markets.", left: "68.7%", top: "300px" },
  { label: "Europe", text: "Reliable freight solutions across established trade routes and regional distribution networks.", left: "60.4%", top: "461px" },
  { label: "Australia", text: "Strategic connections across one of the world's largest manufacturing and supply chain regions.", left: "73.2%", top: "495px" },
];

export default function GlobalNetwork() {
  return (
    <>
      {/* Hero: light grey stage with the globe, stats pinned to the bottom */}
      <section data-hero-light className="relative h-[1137px] overflow-hidden bg-mist max-[1000px]:h-auto max-[1000px]:pb-16 max-[1000px]:pt-[150px]">
        <motion.div initial={{ opacity: 0, x: 140 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.4, ease }} className="absolute left-[57.7%] top-[247px] h-[573px] w-[800px] max-w-none max-[1000px]:relative max-[1000px]:left-0 max-[1000px]:top-0 max-[1000px]:mt-10 max-[1000px]:h-[420px] max-[1000px]:w-full">
          <Image src={img("jOmzFIKukXo333LNDDNNLQpxes.png")} alt="Earth" fill priority sizes="800px" className="object-contain" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 58%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 58%, transparent 100%)" }} />
        </motion.div>
        <NetworkPins pins={pins} />
        <div className="absolute left-[var(--pad)] top-[250px] max-[1000px]:static max-[1000px]:px-[var(--pad)]">
          <h1 className="h-hero max-w-[760px]" aria-label="Connected to the World.">
            <FadeLetters as="span" text="Connected to the" delay={0.3} />{" "}
            <FadeLetters as="span" className="text-brand" text="World." delay={1.4} />
          </h1>
          <Reveal delay={0.9}><p className="p20 mt-10 w-[563px] max-w-full">From local pickup to international delivery, Road Runners Logistics SIA connects businesses to the markets, partners, and logistics capabilities they need to keep freight moving.</p></Reveal>
          <Reveal delay={1.1} className="mt-10"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
        </div>
        {/* four white stat cards pinned to the bottom of the hero */}
        <div className="absolute bottom-[60px] left-[var(--pad)] flex gap-[15px] max-[1200px]:right-[var(--pad)] max-[1000px]:static max-[1000px]:mt-12 max-[1000px]:grid max-[1000px]:grid-cols-2 max-[1000px]:px-[var(--pad)] max-[600px]:grid-cols-1">
          {stats.map(([n, l], i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 + i * 0.12, ease }}
              className="flex h-[137px] w-[268px] items-center gap-3 rounded-lg bg-white px-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] max-[1200px]:w-full max-[1000px]:h-[120px]"
            >
              <Counter value={n} className="h2 text-brand" />
              <span className="max-w-[110px] text-[16px] leading-[22px]">{l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[100px] pt-[225px] text-center max-[809px]:py-20">
        <Reveal><p className="label">One Network. Connected Across the World.</p></Reveal>
        <SplitWords as="h3" className="h3 mx-auto mt-6 max-w-[1060px]" text="Road Runners Logistics SIA connects suppliers, ports, warehouses, and markets worldwide, coordinating every shipment across borders with dependable logistics and global expertise." stagger={0.02} />
        <div className="mt-[100px] grid grid-cols-[895fr_432fr] gap-[22px] text-left max-[809px]:mt-12 max-[809px]:grid-cols-1">
          <ParallaxImage src="2HO8w5yyNA9AbYKzmILJypGRlQ.jpg" alt="Connecting Businesses" ratio="895/700" />
          <ParallaxImage src="gFxFfYhDV9ztMlRp0NHNZR7KuO0.jpg" alt="Major Markets" ratio="432/700" />
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[200px] pt-[120px] max-[809px]:pb-20">
        <div className="grid grid-cols-[647px_406px] justify-between gap-10 max-[1200px]:grid-cols-1">
          <SplitWords as="h2" className="h2" text="Connecting Businesses Across Major Markets." />
          <Reveal><p className="pt-7 max-[1200px]:pt-0">Our network extends across key global regions, giving businesses access to transportation, logistics partners, and operational support wherever their cargo needs to go.</p></Reveal>
        </div>
        <div className="mt-[105px] grid grid-cols-[repeat(3,289px)] justify-between gap-y-[80px] max-[1200px]:grid-cols-2 max-[1200px]:gap-x-10 max-[809px]:mt-16 max-[809px]:grid-cols-1">
          {regions.map(([t, d], i) => (
            <Reveal key={t + i} delay={(i % 3) * 0.1}>
              <h6 className="h6">{t}</h6>
              <p className="mt-3 max-w-[289px]">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
        <h2 className="h-mega"><SplitLetters text="More Ways to Move Across More Markets." stagger={0.015} /></h2>
        <div className="mt-20 grid grid-cols-[480px_1fr] gap-16 max-[1000px]:grid-cols-1">
          <div>
            {ways.map(([t, d, ic]) => (
              <Reveal key={t} className="grid grid-cols-[48px_1fr] gap-4 py-5">
                <Image src={img(ic)} alt="" width={40} height={40} />
                <div><h6 className="h6">{t}</h6><p className="mt-2">{d}</p></div>
              </Reveal>
            ))}
          </div>
          <ParallaxImage src="88YGdZ05hWvJ3Xukx1LHPGLtSjs.jpg" alt="International Freight" ratio="auto" className="min-h-[520px]" />
        </div>
      </section>

      {/* closing banner: photo with a white card attached to the bottom-left */}
      <section className="relative h-[850px] overflow-hidden bg-ink max-[809px]:h-auto max-[809px]:pt-[320px]">
        <Image src={img("lcmzR8Fpn2ZcxeNXMTrDCkTHSU.jpg")} alt="Wherever Your Business Moves" fill sizes="100vw" className="object-cover" />
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1, ease }}
          className="absolute bottom-0 left-[var(--pad)] flex h-[55%] w-[618px] max-w-[calc(100%-var(--pad)*2)] flex-col justify-center bg-white px-[64px] py-10 text-ink max-[809px]:relative max-[809px]:h-auto max-[809px]:w-full max-[809px]:max-w-none max-[809px]:p-8"
        >
          <SplitWords as="h2" className="h2" text="Wherever Your Business Moves, We're Connected." />
          <Reveal delay={0.2}><p className="mt-6 max-w-[490px] text-[16px] leading-[24px]">Whether you are sourcing materials internationally, expanding into new markets, or managing an established global supply chain.</p></Reveal>
          <Reveal delay={0.35} className="mt-6"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
        </motion.div>
      </section>
    </>
  );
}
