import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { ParallaxImage } from "@/components/ui";
import { Counter, Reveal, SplitWords, SplitLetters } from "@/components/motion";
import { img } from "@/lib/site";

export const metadata: Metadata = { title: "Global Network - Road Runners Logistics SIA" };

const regions = [
  ["North America", "Road, air, ocean, warehousing, and cross-border logistics connecting major commercial markets."],
  ["Europe", "Supporting international freight movement across established European trade routes and logistics hubs."],
  ["Asia", "Connecting manufacturing centers and growing consumer markets with dependable freight coordination."],
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
  ["North America", "left-[79%] top-[28%]"],
  ["Europe", "left-[69%] top-[46%]"],
  ["Australia", "left-[85%] top-[53%]"],
];

export default function GlobalNetwork() {
  return (
    <>
      {/* Hero: light grey stage with the globe, stats pinned to the bottom */}
      <section className="relative h-[1137px] overflow-hidden bg-mist max-[1000px]:h-auto max-[1000px]:pb-16 max-[1000px]:pt-[150px]">
        <Reveal className="absolute inset-y-0 right-0 w-[62%] max-[1000px]:relative max-[1000px]:mt-10 max-[1000px]:w-full max-[1000px]:h-[420px]">
          <Image src={img("jOmzFIKukXo333LNDDNNLQpxes.png")} alt="Earth" fill priority sizes="62vw" className="object-contain object-right" />
          {pins.map(([t, pos]) => (
            <span key={t} className={`label absolute ${pos} flex items-center gap-2 rounded bg-white px-2 py-1`}>
              <span className="h-2 w-2 rounded-full bg-brand" />
              {t}
            </span>
          ))}
        </Reveal>
        <div className="absolute left-[var(--pad)] top-[277px] max-[1000px]:static max-[1000px]:px-[var(--pad)]">
          <SplitWords as="h1" className="h-hero max-w-[713px]" text="Connected to the World." stagger={0.08} />
          <Reveal delay={0.5}><p className="p20 mt-8 w-[563px] max-w-full">From local pickup to international delivery, Road Runners Logistics SIA connects businesses to the markets, partners, and logistics capabilities they need to keep freight moving.</p></Reveal>
          <Reveal delay={0.7} className="mt-8"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
        </div>
        <div className="absolute inset-x-[var(--pad)] bottom-[40px] grid grid-cols-4 gap-6 max-[1000px]:static max-[1000px]:mt-12 max-[1000px]:grid-cols-2 max-[1000px]:px-[var(--pad)]">
          {stats.map(([n, l]) => (
            <Reveal key={l} className="flex items-baseline gap-3 border-t border-ink/20 pt-4">
              <Counter value={n} className="h2 !tracking-[-0.06em]" />
              <span className="max-w-[90px]">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[100px] pt-[225px] text-center max-[809px]:py-20">
        <Reveal><p className="label">One Network. Connected Across the World.</p></Reveal>
        <SplitWords as="h3" className="h3 mx-auto mt-6 max-w-[1060px]" text="Road Runners Logistics SIA connects suppliers, ports, warehouses, and markets worldwide, coordinating every shipment across borders with dependable logistics and global expertise." stagger={0.02} />
        <div className="mt-[100px] text-left"><ParallaxImage src="2HO8w5yyNA9AbYKzmILJypGRlQ.jpg" alt="Connecting Businesses" ratio="1345/760" /></div>
      </section>

      <section className="px-[var(--pad)] pb-[150px] pt-[100px] max-[809px]:pb-20">
        <div className="grid grid-cols-[647px_464px] justify-between gap-10 max-[1200px]:grid-cols-1">
          <SplitWords as="h2" className="h2" text="Connecting Businesses Across Major Markets." />
          <Reveal><p className="pt-4">Our network extends across key global regions, giving businesses access to transportation, logistics partners, and operational support wherever their cargo needs to go.</p></Reveal>
        </div>
        <div className="mt-[100px] grid grid-cols-3 gap-x-[163px] gap-y-[75px] max-[1200px]:gap-x-10 max-[1000px]:grid-cols-1">
          {regions.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.1}>
              <div className="mb-6 h-[2px] bg-ink/10" />
              <h6 className="h6">{t}</h6>
              <p className="mt-4">{d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-24"><ParallaxImage src="gFxFfYhDV9ztMlRp0NHNZR7KuO0.jpg" alt="Major Markets" ratio="1345/600" /></div>
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

      <section className="relative h-[850px] overflow-hidden bg-ink text-white max-[809px]:h-[640px]">
        <Image src={img("lcmzR8Fpn2ZcxeNXMTrDCkTHSU.jpg")} alt="Wherever Your Business Moves" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-[104px] bottom-[120px] max-[1200px]:inset-x-[var(--pad)]">
          <SplitWords as="h2" className="h2 max-w-[490px]" text="Wherever Your Business Moves, We're Connected." />
          <Reveal><p className="mt-6 max-w-[490px]">Whether you are sourcing materials internationally, expanding into new markets, or managing an established global supply chain.</p></Reveal>
          <Reveal className="mt-8"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
        </div>
      </section>
    </>
  );
}
