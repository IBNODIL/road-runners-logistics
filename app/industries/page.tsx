import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui";
import LoadMoreCards from "@/components/LoadMoreCards";
import { Counter, Reveal, SplitWords } from "@/components/motion";
import { CtaBanner } from "@/components/home/Bottom";
import { industries, img } from "@/lib/site";

export const metadata: Metadata = { title: "Industries - Road Runners Logistics SIA" };

export default function Industries() {
  return (
    <>
      <PageHero textMid title="Moving Every Industry" text="From manufacturing floors to retail shelves, Road Runners Logistics SIA provides logistics solutions built around the way each industry operates." image="7VfHFwxLQ22lahFHSNSqKjp62Y.jpg" />
      <section className="px-[var(--pad)] pb-[240px] pt-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-[1fr_532px] gap-10 max-[1000px]:grid-cols-1">
          <SplitWords as="h2" className="h2 max-w-[640px]" text="Different Industries. Different Logistics." />
          <div className="flex flex-col gap-6">
            <Reveal><p>Every industry has its own priorities, timelines, and challenges. A manufacturing plant cannot afford production delays. A retailer needs inventory where customers expect it. A healthcare shipment may depend on precise timing and careful handling.</p></Reveal>
            <Reveal delay={0.1}><p>Road Runners Logistics SIA takes the time to understand what is behind every shipment. We combine transportation, warehousing, customs, and supply chain expertise to create logistics solutions that fit the demands of your industry.</p></Reveal>
          </div>
        </div>

        {/* world map with two staggered figures */}
        <div className="relative mx-auto mt-[120px] h-[640px] w-full max-w-[800px] max-[809px]:mt-16 max-[809px]:h-[520px]">
          <Reveal className="absolute inset-0">
            <Image src={img("BrY8hDQSWdCHscnepLhHft94c.png")} alt="World Map" fill sizes="800px" className="object-contain opacity-30" />
          </Reveal>
          <Reveal delay={0.2} className="absolute left-[12%] top-[8%] text-center max-[809px]:left-0">
            <Counter value="25+" className="h-mega !block !text-[100px] !leading-[100px] !tracking-[-0.06em] max-[809px]:!text-[64px] max-[809px]:!leading-[64px]" />
            <p className="mt-3 text-[20px] leading-[28px]">Years Industry Experience</p>
          </Reveal>
          <Reveal delay={0.4} className="absolute right-[-4%] top-[52%] text-center max-[809px]:right-0">
            <Counter value="80+" className="h-mega !block !text-[100px] !leading-[100px] !tracking-[-0.06em] max-[809px]:!text-[64px] max-[809px]:!leading-[64px]" />
            <p className="mt-3 text-[20px] leading-[28px]">Countries Global Network</p>
          </Reveal>
        </div>
      </section>
      <section className="px-[var(--pad)] pb-[200px] pt-[100px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mb-[100px] text-center max-[809px]:mb-10" text="Industries We Serve" />
        <LoadMoreCards cols={3} photo hrefPrefix="/industries" initial={6} items={industries.map((s) => ({ slug: s.slug, t: s.title, img: s.img }))} />
      </section>
      <CtaBanner title="Let’s Move Your Cargo" image="6s3ULyxQzqQk23wUXmdvgBLFt5U.jpg" text="Tell us what you need to ship — our team will prepare the best logistics solution for you." />
    </>
  );
}
