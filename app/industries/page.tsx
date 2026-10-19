import type { Metadata } from "next";
import { PageHero, StatsRow, ParallaxImage } from "@/components/ui";
import LoadMoreCards from "@/components/LoadMoreCards";
import { Reveal, SplitWords } from "@/components/motion";
import { CtaBanner } from "@/components/home/Bottom";
import { industries } from "@/lib/site";

export const metadata: Metadata = { title: "Industries - Road Runners Logistics SIA" };

export default function Industries() {
  return (
    <>
      <PageHero title="Moving Every Industry" text="From manufacturing floors to retail shelves, Road Runners Logistics SIA provides logistics solutions built around the way each industry operates." image="7VfHFwxLQ22lahFHSNSqKjp62Y.jpg" />
      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-2 gap-10 max-[1000px]:grid-cols-1">
          <SplitWords as="h2" className="h2 max-w-[640px]" text="Different Industries. Different Logistics." />
          <div className="flex flex-col gap-6">
            <Reveal><p>Every industry has its own priorities, timelines, and challenges. A manufacturing plant cannot afford production delays. A retailer needs inventory where customers expect it. A healthcare shipment may depend on precise timing and careful handling.</p></Reveal>
            <Reveal delay={0.1}><p>Road Runners Logistics SIA takes the time to understand what is behind every shipment. We combine transportation, warehousing, customs, and supply chain expertise to create logistics solutions that fit the demands of your industry.</p></Reveal>
          </div>
        </div>
        <div className="mt-24 max-w-[760px]"><StatsRow items={[["25+", "Years Industry Experience"], ["80+", "Countries Global Network"]]} /></div>
        <div className="mt-24"><ParallaxImage src="BrY8hDQSWdCHscnepLhHft94c.png" alt="World Map" ratio="16/8" /></div>
      </section>
      <section className="bg-sand px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mb-[100px]" text="Industries We Serve" />
        <LoadMoreCards cols={3} hrefPrefix="/industries" initial={6} items={industries.map((s) => ({ slug: s.slug, t: s.title, img: s.img }))} />
      </section>
      <CtaBanner title="Let’s Move Your Cargo" image="6s3ULyxQzqQk23wUXmdvgBLFt5U.jpg" text="Tell us what you need to ship — our team will prepare the best logistics solution for you." />
    </>
  );
}
