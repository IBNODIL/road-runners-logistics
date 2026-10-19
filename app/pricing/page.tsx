import type { Metadata } from "next";
import Button from "@/components/Button";
import { PageHero, Faq, FeatureGrid, ParallaxImage } from "@/components/ui";
import { CompactQuoteForm } from "@/components/Forms";
import { Reveal, SplitWords } from "@/components/motion";
import { contact } from "@/lib/site";
import faq from "@/data/faq.json";

export const metadata: Metadata = { title: "Pricing & Rates - Road Runners Logistics SIA" };

const rates = [
  ["Local freight", "From $180", "Short-distance deliveries within a metro area"],
  ["Regional freight", "From $620", "Multi-stop regional distribution"],
  ["Long-haul freight", "From $1,450", "Cross-country, full or partial loads"],
  ["Dedicated transport", "From $2,100", "Priority loads with a dedicated truck"],
];
const picks = ["What logistics services does Road Runners Logistics SIA provide?", "How can I request a quote?", "What types of freight do you transport?", "Can warehousing be combined with transportation?", "How long does international shipping take?", "How quickly will I receive a quote?"];

export default function Pricing() {
  const all = faq.flatMap((c) => c.items);
  const items = picks.map((q) => all.find((i) => i.q === q)).filter(Boolean) as { q: string; a: string }[];
  return (
    <>
      <PageHero cta title="Pricing & Rates" image="fcKfaxhHpfuncNRQleusQ3wjag.jpg" />
      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <Reveal><p className="label text-brand">How rates work</p></Reveal>
        <SplitWords as="h3" className="h3 mt-4 max-w-[1029px] !text-[40px] !leading-[48px]" text="Every load is different, so every rate is too. We build each estimate around four things that actually move the cost: where it's going, what it is, how it needs to travel, and anything extra it needs along the way." stagger={0.015} />
        <div className="mt-20">
          <FeatureGrid items={[
            { t: "Route", d: "Distance, origin, destination, and delivery zone." },
            { t: "Freight", d: "Shipment type, weight, dimensions, and volume." },
            { t: "Service", d: "Transportation method, delivery speed, handling." },
            { t: "Requirements", d: "Special handling, equipment, storage, add-ons." },
          ]} />
        </div>
      </section>

      <section className="bg-sand px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 max-w-[760px]" text="Flexible Rates For Every Journey" />
        <Reveal><p className="p20 mt-8 max-w-[620px]">A rough sense of where costs typically start. Your actual rate depends on the specifics of your shipment — this is a starting point, not a quote.</p></Reveal>
        <div className="mt-16">
          <div className="label hidden grid-cols-[1fr_1fr_1.5fr] gap-6 border-b border-ink/15 pb-4 min-[810px]:grid"><span>Service</span><span>Starting rate</span><span>Best for</span></div>
          {rates.map(([s, r, b]) => (
            <Reveal key={s} className="group grid grid-cols-[1fr_1fr_1.5fr] gap-6 border-b border-ink/15 py-8 transition-colors hover:bg-white/50 max-[809px]:grid-cols-1 max-[809px]:gap-2">
              <h6 className="h6">{s}</h6>
              <h6 className="h6 text-brand">{r}</h6>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-2 gap-10 max-[1000px]:grid-cols-1">
          <div>
            <SplitWords as="h2" className="h2" text="Choose The Service That Fits Your Freight" />
            <Reveal><p className="p20 mt-8 max-w-[520px]">Rates shift with the service you need. Here&apos;s what we run, and where each one fits.</p></Reveal>
            <div className="mt-8"><Button href="/services" variant="dark">Explore Our Services</Button></div>
          </div>
          <ParallaxImage src="0CBAhYx5CKWmxDsLd7d26n5KMOs.jpg" alt="Choose the service" ratio="4/3" />
        </div>
        <div className="mt-20">
          <FeatureGrid items={[
            { t: "Full truckload", d: "Dedicated capacity for larger shipments and time-sensitive freight that shouldn't share space on the trailer." },
            { t: "Less-than-truckload", d: "Cost-efficient transportation for smaller freight volumes, consolidated with other shipments on the same route." },
            { t: "Warehousing", d: "Storage and handling between shipments, so inventory has somewhere to sit while a route comes together." },
            { t: "Distribution", d: "Coordinated delivery across a distribution network, scheduled around the stops that matter most." },
          ]} />
        </div>
      </section>

      <section className="bg-sand px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mb-16" text="Frequently Asked Questions" />
        <Faq items={items} />
      </section>

      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-[1fr_1fr] gap-16 max-[1000px]:grid-cols-1">
          <div>
            <SplitWords as="h2" className="h2" text="Tell Us What You’re Moving." />
            <Reveal><p className="p20 mt-8 max-w-[480px]">Share your shipment details and our logistics team will help determine the right transportation solution and rate.</p></Reveal>
            <Reveal><p className="label mt-12 text-brand">Prefer to talk it through?</p><a href={`mailto:${contact.email}`} className="h6">{contact.email}</a></Reveal>
          </div>
          <div>
            <h6 className="h6 mb-8">Tell us about your shipment.</h6>
            <CompactQuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
