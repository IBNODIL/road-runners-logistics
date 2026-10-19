import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { PageHero, StatsRow, ParallaxImage } from "@/components/ui";
import { Reveal, SplitWords, SplitLetters } from "@/components/motion";
import { img } from "@/lib/site";

export const metadata: Metadata = { title: "Sustainability - Road Runners Logistics SIA" };

const progress = [
  ["Fuel Efficiency", "Improving vehicle performance and driving practices to reduce fuel consumption.", "ODpxeUD4Sy6JDrrhhLXT8DTnlc.svg"],
  ["Route Optimization", "Planning smarter routes to reduce unnecessary miles and improve delivery efficiency.", "Gghl0M8px5LxjzOEQzbufWRkOQ.svg"],
  ["Fleet Modernization", "Investing in more efficient vehicles to improve performance and reduce transportation impact.", "Is17XSkT4rtY5eXWFPmiJQqSMJE.svg"],
  ["Reduced Emissions", "Lowering emissions while keeping freight moving efficiently.", "8wAcC81yXi4Bcu3nXS0Iv70.svg"],
  ["Sustainable Warehousing", "Improving energy use, resource management, and operational efficiency across our facilities.", "MS9bjxp79U7XcMeG2bq34Mj3roI.svg"],
];

const Item = ([t, d, ic]: string[]) => (
  <Reveal key={t} className="max-w-[351px]">
    <Image src={img(ic)} alt="" width={24} height={24} className="mb-5" />
    <h6 className="h6">{t}</h6>
    <p className="mt-3">{d}</p>
  </Reveal>
);

export default function Sustainability() {
  return (
    <>
      <PageHero textBelow title="Moving Forward, Responsibly." text="We’re improving how goods move by reducing emissions, using resources efficiently, and building smarter logistics operations." image="dessTQ6gMt5T3KOYmrmRLsRiahA.jpg" />

      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-[1fr_659px] items-start gap-10 max-[1000px]:grid-cols-1">
          <div className="pt-[190px] max-[1000px]:pt-0">
            <SplitWords as="h2" className="h2 max-w-[500px]" text="Efficiency That Moves Us Forward." />
            <Reveal><p className="mt-8 max-w-[500px]">Better logistics can deliver better outcomes for businesses and the environment. We focus on practical improvements across transportation, fleet management, and operations.</p></Reveal>
            <div className="mt-8"><Button href="/services" variant="dark" className="!px-5 !py-3">Explore our services</Button></div>
          </div>
          <div className="relative">
            <ParallaxImage src="bWyGQDen0sXhigkGwFD5SYjMZk.jpg" alt="Efficiency That Moves Us Forward" ratio="659/698" />
            <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-3 text-white">
              {["Efficiency", "Optimization", "Responsibility"].map((t) => <span key={t} className="rounded bg-black/40 px-3 py-1 backdrop-blur">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
        <SplitWords as="h3" className="h3 mx-auto mb-[100px] max-w-[672px] text-center" text="Results That Move Beyond Numbers." />
        <StatsRow items={[["25+", "Years Industry Experience"], ["80+", "Countries Global Network"], ["1M+", "Shipments Delivered"], ["98%", "On-Time Delivery"]]} />
      </section>

      <section className="bg-mist px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <div className="grid grid-cols-[735px_1fr] gap-10 max-[1100px]:grid-cols-1">
          <div className="relative h-[600px] overflow-hidden rounded-lg text-white max-[809px]:h-[460px]">
            <Image src={img("uAOKOGJFx46ATNovutIfVjMl0M.jpg")} alt="Progress Across Every Mile" fill sizes="735px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-12 bottom-12 max-[809px]:inset-x-6 max-[809px]:bottom-6">
              <SplitWords as="h2" className="h2 max-w-[433px]" text="Progress Across Every Mile." />
              <Reveal><p className="mt-4 max-w-[385px]">We’re improving the way freight moves by focusing on efficiency across transportation, fleet operations, and warehousing.</p></Reveal>
            </div>
          </div>
          <div className="grid grid-cols-1 content-between gap-10 pl-[56px] pt-4 max-[1100px]:pl-0">
            {progress.slice(0, 2).map(Item)}
          </div>
        </div>
        <div className="mt-[100px] grid grid-cols-3 gap-[105px] px-8 max-[1100px]:gap-10 max-[809px]:grid-cols-1 max-[809px]:px-0">
          {progress.slice(2).map(Item)}
        </div>
      </section>

      <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <div className="text-center">
          <Reveal><p className="label">Efficient Transportation</p></Reveal>
          <SplitWords as="h3" className="h3 mx-auto mt-4 max-w-[1040px]" text="Smarter transportation starts with better planning. We optimize routes and fleet performance to keep every journey efficient." stagger={0.02} />
        </div>
        <div className="mt-[100px]"><ParallaxImage src="3Dxo8fDwF4COia3rDZYXF0iASM8.jpg" alt="Efficient Transportation" ratio="1345/654" /></div>
        <div className="mt-[100px] grid grid-cols-3 gap-[60px] max-[1000px]:grid-cols-1 max-[1000px]:gap-10">
          {[
            ["Optimize Every Journey", "Plan efficient routes that reduce unnecessary distance while keeping deliveries on schedule."],
            ["Improve Fleet Performance", "Use modern vehicles and smarter practices to improve fleet efficiency."],
            ["Reduce Empty Miles", "Coordinate loads and routes more effectively to make better use of available capacity."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="grid grid-cols-[31px_1fr]">
              <p>0{i + 1}</p>
              <div><h6 className="h6">{t}</h6><p className="mt-2">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <div className="grid grid-cols-[659px_1fr] items-center gap-10 max-[1100px]:grid-cols-1">
          <ParallaxImage src="y6kXeoeU2Ex0rqCFBZI884Os.jpg" alt="Efficiency Beyond the Road" ratio="659/698" />
          <div className="min-[1100px]:pl-[60px]">
            <SplitWords as="h2" className="h2 max-w-[500px]" text="Efficiency Beyond the Road." />
            <Reveal><p className="mt-6 max-w-[500px]">Our approach to sustainability extends beyond transportation. We improve warehouse operations to use energy, space, equipment, and resources more efficiently.</p></Reveal>
            <Reveal><p className="mt-4 max-w-[500px]">From smarter facility planning to streamlined workflows, every improvement helps reduce waste while supporting reliable logistics.</p></Reveal>
            <div className="mt-8"><Button href="/contact" variant="dark" className="!px-5 !py-3">Contact us</Button></div>
          </div>
        </div>
      </section>

      <section className="relative h-[850px] overflow-hidden bg-ink text-white max-[809px]:h-[640px]">
        <Image src={img("9Ug3axRVaHsckogEHBF3GDnKHDg.jpg")} alt="The road ahead" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-[var(--pad)] bottom-[100px] flex items-end justify-between gap-10 max-[1000px]:flex-col max-[1000px]:items-start">
          <h2 className="h-mega max-w-[570px]"><SplitLetters text="The Road A Head" stagger={0.03} /></h2>
          <div className="w-[372px] max-w-full">
            <Reveal><p className="p20">Build a more efficient supply chain with transportation and logistics solutions designed for the road ahead.</p></Reveal>
            <Reveal className="mt-8"><Button href="/request-a-quote">Request a Quote</Button></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
