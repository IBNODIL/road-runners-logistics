import type { Metadata } from "next";
import Button from "@/components/Button";
import { PageHero, StatsRow, ParallaxImage } from "@/components/ui";
import { Counter, Reveal, SplitWords } from "@/components/motion";

export const metadata: Metadata = { title: "Partners - Road Runners Logistics SIA" };

const groups = [
  { t: "Transportation Partners", h: "Reliable capacity where you need it.", d: "Trusted carriers and transportation providers supporting road, air, and ocean freight across regions and routes.", l: "Includes:", items: ["Road Transportation", "Air Freight", "Ocean Freight", "Dedicated Capacity", "Last-Mile Delivery"] },
  { t: "Technology Partners", h: "Better Coordination Through Practical Technology.", d: "Technology helps our teams manage information, coordinate shipments, improve visibility, and keep customers connected throughout the logistics process.", l: "Supports:", items: ["Shipment Visibility", "Tracking & Updates", "Data Management", "Operational Coordination", "Digital Communication"] },
  { t: "Global Logistics Partners", h: "Local Expertise. Global Reach.", d: "Our international relationships help connect shipments across borders and provide local knowledge where it matters most.", l: "Network Support:", items: ["International Freight", "Cross-Border Transportation", "Customs Coordination", "Regional Logistics", "Global Distribution"] },
  { t: "Industry Partners", h: "Expertise That Strengthens Every Shipment.", d: "We collaborate with organizations and specialists across the industries we serve, helping us better understand operational requirements, regulations, and changing supply chain needs.", l: "Industry Focus:", items: ["Automotive", "Manufacturing", "Retail", "Construction", "Distribution"] },
];

const heroStats = [["25+", "Years Industry Experience"], ["98+", "Countries Global Network"], ["1M+", "Shipments Delivered"]];

export default function Partners() {
  return (
    <>
      <PageHero textBelow title="Partner network" text="Behind every reliable shipment is a trusted network working together to deliver." image="BeTe7PRaUTHLsPW697vONR7REwY.jpg">
        <div className="flex gap-8 max-[1000px]:flex-wrap">
          {heroStats.map(([n, l]) => (
            <div key={l} className="flex items-baseline gap-3">
              <Counter value={n} className="h3 !tracking-[-0.06em]" />
              <span className="max-w-[125px] text-[16px]">{l}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="px-[var(--pad)] py-[150px] text-center max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mx-auto max-w-[629px]" text="Connected Through Trusted Partnerships." />
        <Reveal><p className="mx-auto mt-8 max-w-[629px]">No logistics company operates alone. Road Runners Logistics SIA works with carefully selected partners to extend our capabilities, strengthen coverage, and help customers move freight reliably across different markets. Our partnerships give our teams access to the capacity, local knowledge, and operational support needed to keep shipments moving.</p></Reveal>
        <div className="mt-8"><Button href="/global-network" variant="dark" className="!px-5 !py-3">Explore our network</Button></div>
        <div className="mt-[130px] text-left"><ParallaxImage src="c1ow0oviJq1tiHfeLbx8Bgd3MRM.jpg" alt="Connected through trusted partnerships" ratio="1345/654" /></div>
      </section>

      <section className="px-[114px] pb-[150px] max-[1200px]:px-[var(--pad)] max-[809px]:pb-20">
        <Reveal><p className="label">The network, by discipline.</p></Reveal>
        <SplitWords as="h3" className="h3 mt-4 max-w-[905px]" text="Four groups of partners cover the range of what a shipment actually needs: capacity, coordination, reach, and know-how." stagger={0.02} />
        <div className="mt-[100px]">
          {groups.map((g) => (
            <Reveal key={g.t} className="grid grid-cols-[1fr_1fr] gap-10 border-t border-ink/15 py-12 max-[809px]:grid-cols-1">
              <div className="pl-16 max-[809px]:pl-0">
                <h5 className="h5 max-w-[244px]">{g.t}</h5>
                <p className="mt-6 max-w-[244px]">{g.h}</p>
              </div>
              <div className="max-w-[464px]">
                <p>{g.d}</p>
                <p className="label mt-8">{g.l}</p>
                <ul className="mt-3 space-y-0 pl-5">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <SplitWords as="h3" className="h3 mx-auto mb-[60px] max-w-[672px] text-center" text="Partner Network" />
        <StatsRow items={[["80+", "Countries Global Network"], ["98%", "On-Time Delivery"]]} />
      </section>

      <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <div className="grid grid-cols-[1fr_659px] items-center gap-16 max-[1100px]:grid-cols-1">
          <div>
            <SplitWords as="h2" className="h2 max-w-[557px]" text="Built on Trust. Driven by Performance." />
            <Reveal><p className="mt-6 max-w-[557px]">We believe strong logistics partnerships are built through clear communication, shared standards, and consistent performance.</p></Reveal>
            <Reveal><p className="mt-4 max-w-[557px]">Road Runners Logistics SIA works closely with partners to understand capabilities, coordinate operations, and maintain the level of reliability our customers expect. Whether a shipment moves across a city or across multiple borders, every partner plays an important role.</p></Reveal>
            <div className="mt-8"><Button href="/contact" variant="dark" className="!px-5 !py-3">Contact us</Button></div>
            <SplitWords as="h2" className="h5 mt-[120px] max-w-[503px] max-[1100px]:mt-16" text="Reliable Partners. Connected Operations. Better Logistics." />
          </div>
          <ParallaxImage src="sGO3uVj4JjqDzfbdDVbcVwta0w.jpg" alt="Built on Trust" ratio="659/698" />
        </div>
      </section>
    </>
  );
}
