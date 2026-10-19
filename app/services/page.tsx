import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { PageHero } from "@/components/ui";
import LoadMoreCards from "@/components/LoadMoreCards";
import { Reveal, SplitWords } from "@/components/motion";
import { CtaBanner } from "@/components/home/Bottom";
import { services, img } from "@/lib/site";

export const metadata: Metadata = { title: "Services - Road Runners Logistics SIA" };

export default function Services() {
  return (
    <>
      <PageHero align="top" tall title="Logistics Built Around Your Business." image="w412NgzOWhJzJHxEHkzMfqTb1U.jpg">
        <p className="p20 absolute bottom-[100px] left-[var(--pad)] w-[483px] max-w-[calc(100%-var(--pad)*2)]">
          From a single shipment to a complex international supply chain, Road Runners Logistics SIA brings transportation, storage, and logistics services together to keep your business moving.
        </p>
      </PageHero>

      <section className="px-[var(--pad)] pb-[150px] pt-[225px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mx-auto mb-[150px] max-w-[807px] text-center max-[809px]:mb-12" text="One Partner. Every Logistics Need." />
        <LoadMoreCards cols={2} tall hrefPrefix="/services" initial={4} items={services.map((s) => ({ slug: s.slug, t: s.title, d: s.text, img: s.img }))} />
      </section>

      <section className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
        <div className="grid grid-cols-[511px_1fr] justify-between gap-16 max-[1000px]:grid-cols-1">
          <div>
            <Reveal><p className="label">Why Road Runners Logistics SIA</p></Reveal>
            <SplitWords as="h2" className="h2 mt-4" text="Experience Behind Every Shipment." />
            <Reveal><p className="mt-6">Choosing a logistics partner means choosing the people, infrastructure, and network responsible for keeping your goods moving. Road Runners Logistics SIA combines more than 25 years of industry experience with established transportation capabilities, trusted global partners, and a practical approach to every shipment.</p></Reveal>
            <div className="mt-8"><Button href="/request-a-quote" variant="dark" className="!px-[22px] !py-[15px]">Request a Quote</Button></div>
          </div>
          <Reveal className="relative min-h-[520px] overflow-hidden rounded-lg text-white">
            <Image src={img("RzTzqr04aGS81WFA3sekc43tdk.png")} alt="Experience Behind Every Shipment" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <ul className="relative flex h-full min-h-[520px] flex-col justify-end p-8">
              {["Decades of Experience in Global Logistics", "Experienced People Behind Every Journey", "Technology That Keeps Shipments Connected", "A Global Network Across 80+ Countries"].map((t) => (
                <li key={t} className="border-t border-white/30 py-3 first:border-0">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
