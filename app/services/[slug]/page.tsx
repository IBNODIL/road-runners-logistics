import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero, ParallaxImage, FeatureGrid } from "@/components/ui";
import { CompactQuoteForm } from "@/components/Forms";
import { Counter, Reveal, SplitWords } from "@/components/motion";
import { getDetail, section, pairs, txt, find } from "@/lib/details";
import { services, img } from "@/lib/site";

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return { title: s ? `${s.title} - Road Runners Logistics SIA` : "Service" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getDetail("services", slug);
  const meta = services.find((s) => s.slug === slug);
  if (!b || !meta) notFound();

  const title = txt(b, "h1");
  const lead = b[b.findIndex((x) => x.t === "h1") + 1]?.text ?? "";
  const overview = section(b, "h2", /^Overview$/);
  const challenge = section(b, "h2", /^The Challenge$/);
  const why = b.find((x) => x.t === "h3" && /^Why /.test(x.text ?? ""));
  const whyItems = pairs(section(b, "h3", /^Why /));
  const what = section(b, "h3", /^What we do$/);
  const whatItems = pairs(what);
  const scaleIdx = find(b, "h3", /^The Scale/);
  const stats: [string, string][] = [];
  for (let i = scaleIdx + 1; i < b.length && stats.length < 3; i++) if (b[i].t === "h2" && b[i + 1]?.t === "p") stats.push([b[i].text!, b[i + 1].text!]);
  const stepIdx = find(b, "h3", /^From First/);
  const stepTitle = b[stepIdx]?.text ?? "From First Request to Final Delivery.";
  const stepLead = b[stepIdx + 1]?.t === "p" && !/^\d+$/.test(b[stepIdx + 1].text ?? "") ? b[stepIdx + 1].text : "";
  const steps: { t: string; d: string }[] = [];
  for (let i = stepIdx + 1; i < b.length; i++) if (b[i].t === "h6" && b[i + 1]?.t === "p" && !/^Tell us/.test(b[i].text ?? "")) steps.push({ t: b[i].text!, d: b[i + 1].text! });
  const quote = txt(b, "h5");
  const ctaH = find(b, "h2", /commitment/i);
  const ctaT = b[ctaH + 1]?.text ?? "";
  const imgs = b.filter((x) => x.t === "img").map((x) => x.id!);
  const [heroImg, overviewImg, processImg, endImg] = imgs;

  return (
    <>
      <PageHero cta title={title} text={lead} image={heroImg ?? meta.img} />

      {/* Overview */}
      <section className="px-[115px] pb-[100px] pt-[250px] max-[1200px]:px-[var(--pad)] max-[809px]:py-20">
        <SplitWords as="h2" className="h2" text="Overview" />
        <Reveal><h6 className="h6 mt-6">{overview.find((x) => x.t === "h6")?.text}</h6></Reveal>
        <Reveal delay={0.1}><p className="mt-4 max-w-[760px]">{overview.find((x) => x.t === "p")?.text}</p></Reveal>
        {overviewImg && <div className="mt-[100px]"><ParallaxImage src={overviewImg} alt={title} ratio="1196/820" /></div>}
      </section>

      {/* Challenge + why */}
      <section className="px-[115px] pb-[100px] max-[1200px]:px-[var(--pad)]">
        <div className="grid grid-cols-[610px_340px] justify-between gap-10 max-[1000px]:grid-cols-1">
          <div>
            <SplitWords as="h2" className="h2" text="The Challenge" />
            <Reveal><p className="mt-8">{challenge.find((x) => x.t === "p")?.text}</p></Reveal>
          </div>
          <Reveal><h6 className="h6 pt-4 text-brand">{challenge.find((x) => x.t === "h6")?.text}</h6></Reveal>
        </div>
      </section>

      <section className="bg-mist px-[115px] py-[100px] max-[1200px]:px-[var(--pad)] max-[809px]:py-20">
        <SplitWords as="h3" className="h3 max-w-[1196px]" text={why?.text ?? ""} stagger={0.02} />
        <div className="mt-[90px]">
          {whyItems.map((p) => (
            <Reveal key={p.t} className="grid grid-cols-[1fr_400px] items-start gap-10 border-t border-ink/15 py-8 max-[809px]:grid-cols-1 max-[809px]:gap-3">
              <h6 className="h6">{p.t}</h6>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="px-[115px] py-[100px] max-[1200px]:px-[var(--pad)] max-[809px]:py-20">
        <div className="grid grid-cols-[497px_586px] justify-between gap-10 max-[1200px]:grid-cols-1">
          <div>
            <SplitWords as="h3" className="h3" text="What we do" />
            <Reveal><p className="p20 mt-6">{what.find((x) => x.t === "p")?.text}</p></Reveal>
          </div>
          <Reveal><p className="pt-4">{what.filter((x) => x.t === "p")[1]?.text}</p></Reveal>
        </div>
        <div className="mt-[100px] px-8 max-[809px]:px-0"><FeatureGrid cols={3} items={whatItems.map((p) => ({ t: p.t, d: p.d }))} /></div>
      </section>

      {/* Scale */}
      <section className="px-[115px] pb-[100px] max-[1200px]:px-[var(--pad)] max-[809px]:pb-20">
        <SplitWords as="h3" className="h3" text="The Scale Behind Every Mile" />
        <div className="mt-[60px] grid grid-cols-3 gap-[185px] max-[1200px]:gap-10 max-[809px]:grid-cols-1">
          {stats.map(([n, l]) => (
            <Reveal key={l}>
              <Counter value={n} className="h-mega !block" />
              <p className="p20 mt-4">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-[115px] pb-[100px] max-[1200px]:px-[var(--pad)] max-[809px]:pb-20">
        <div className="grid grid-cols-2 gap-16 max-[1000px]:grid-cols-1">
          {processImg && <ParallaxImage src={processImg} alt="From first request to final delivery" ratio="3/4" />}
          <div className="flex flex-col justify-center">
            <SplitWords as="h3" className="h3" text={stepTitle} stagger={0.03} />
            {stepLead && <Reveal><p className="mt-6">{stepLead}</p></Reveal>}
            <div className="mt-12">
              {steps.slice(0, 4).map((s, i) => (
                <Reveal key={s.t} className="grid grid-cols-[46px_1fr] gap-2 py-4">
                  <p>0{i + 1}</p>
                  <div><h6 className="h6">{s.t}</h6><p className="mt-2">{s.d}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      {quote && (
        <section className="px-[var(--pad)] py-[100px] text-center max-[809px]:py-16">
          <SplitWords as="h2" className="h5 mx-auto max-w-[892px] text-brand" text={quote} stagger={0.02} />
        </section>
      )}

      {/* CTA form */}
      <section className="relative overflow-hidden bg-ink text-white">
        {endImg && <Image src={img(endImg)} alt="Your cargo" fill sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative grid grid-cols-[1fr_529px] items-center gap-16 px-[var(--pad)] py-[100px] max-[1000px]:grid-cols-1">
          <div>
            <SplitWords as="h2" className="h2 max-w-[414px]" text="Your cargo. Our commitment." />
            <Reveal><p className="mt-6 max-w-[331px]">{ctaT}</p></Reveal>
          </div>
          <Reveal className="rounded-lg bg-white p-8 text-ink">
            <h6 className="h6 mb-6">Tell us about your shipment.</h6>
            <CompactQuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
