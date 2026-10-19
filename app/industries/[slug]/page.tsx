import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero, ParallaxImage, FeatureGrid, CardGrid } from "@/components/ui";
import { CtaBanner } from "@/components/home/Bottom";
import { Reveal, SplitWords } from "@/components/motion";
import { getDetail, section, pairs, txt, find } from "@/lib/details";
import { industries, img } from "@/lib/site";

export const generateStaticParams = () => industries.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = industries.find((x) => x.slug === slug);
  return { title: s ? `${s.title} - Road Runners Logistics SIA` : "Industry" };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getDetail("industries", slug);
  const meta = industries.find((s) => s.slug === slug);
  if (!b || !meta) notFound();

  const title = txt(b, "h1");
  const lead = b[b.findIndex((x) => x.t === "h1") + 1]?.text ?? "";
  const intro = section(b, "h3", /^Industry Introduction$/);
  const challenge = section(b, "h3", /^The Challenge$/);
  const solution = section(b, "h3", /^Our Solution$/);
  const flex = b.find((x) => x.t === "h3" && /^Flexible/.test(x.text ?? ""));
  const flexItems = pairs(section(b, "h3", /^Flexible/));
  const caseH = b[find(b, "h3", /^Flexible/) + 1 + flexItems.length * 2]; // heading following the solution cards
  const caseIdx = b.findIndex((x, i) => x.t === "h3" && i > find(b, "h3", /^Flexible/) && !/^Flexible/.test(x.text ?? ""));
  const caseSec = section(b, "h3", new RegExp("^" + (b[caseIdx]?.text ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"));
  const caseItems = pairs(caseSec);
  const builtIdx = find(b, "h3", /^Built for/);
  const built = section(b, "h3", /^Built for/);
  const chips = built.filter((x) => x.t === "p").slice(1).map((x) => x.text!);
  const related = industries.filter((i) => i.slug !== slug).slice(0, 3);
  const imgs = b.filter((x) => x.t === "img").map((x) => x.id!);
  const quote = txt(b, "h5");
  void caseH;

  return (
    <>
      <PageHero cta title={title} text={lead} image={imgs[0] ?? meta.img} />

      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-2 gap-10 max-[1000px]:grid-cols-1">
          <div>
            <Reveal><p className="label text-brand">Industry Introduction</p></Reveal>
            <Reveal><p className="p20 mt-6 max-w-[620px]">{intro.find((x) => x.t === "p")?.text}</p></Reveal>
            {quote && <SplitWords as="h3" className="h3 mt-12 !text-[40px] !leading-[48px]" text={quote} stagger={0.03} />}
          </div>
          {imgs[1] && <ParallaxImage src={imgs[1]} alt={title} ratio="4/3" />}
        </div>
      </section>

      <section className="bg-sand px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <div className="grid grid-cols-2 gap-16 max-[1000px]:grid-cols-1">
          <div>
            <Reveal><p className="label text-brand">The Challenge</p></Reveal>
            <SplitWords as="h3" className="h3 mt-4 !text-[40px] !leading-[48px]" text={challenge.find((x) => x.t === "h6")?.text ?? ""} stagger={0.03} />
            {challenge.filter((x) => x.t === "p").map((p) => <Reveal key={p.text}><p className="mt-6 max-w-[560px]">{p.text}</p></Reveal>)}
          </div>
          <div>
            <Reveal><p className="label text-brand">Our Solution</p></Reveal>
            <SplitWords as="h3" className="h3 mt-4 !text-[40px] !leading-[48px]" text={solution.find((x) => x.t === "h6")?.text ?? ""} stagger={0.03} />
            <Reveal><p className="mt-6 max-w-[560px]">{solution.find((x) => x.t === "p")?.text}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <SplitWords as="h3" className="h3 mb-16 max-w-[1000px] !text-[40px] !leading-[48px]" text={flex?.text ?? ""} stagger={0.02} />
        <CardGrid items={flexItems.map((p) => ({ t: p.t, d: p.d }))} />
      </section>

      <section className="bg-night px-[var(--pad)] py-[150px] text-white max-[809px]:py-20">
        <div className="grid grid-cols-[1fr_1.2fr] gap-16 max-[1000px]:grid-cols-1">
          <div>
            <Reveal><p className="label text-sun">Case Study</p></Reveal>
            <SplitWords as="h2" className="h2 mt-4" text={b[caseIdx]?.text ?? ""} />
            {imgs[2] && <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-lg"><Image src={img(imgs[2])} alt="" fill sizes="50vw" className="object-cover" /></div>}
          </div>
          <div>
            {caseItems.map((c) => (
              <Reveal key={c.t} className="border-t border-white/20 py-8">
                <h6 className="h6 text-sun">{c.t}</h6>
                <p className="mt-3 text-white/85">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <Reveal><p className="label text-brand">{b[builtIdx]?.text}</p></Reveal>
        <SplitWords as="h2" className="h2 mt-4 max-w-[900px]" text={built.find((x) => x.t === "h6")?.text ?? ""} />
        <Reveal><p className="p20 mt-8 max-w-[760px]">{built.filter((x) => x.t === "p")[0]?.text}</p></Reveal>
        <div className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-6">
          {chips.map((c, i) => (
            <Reveal key={c} delay={i * 0.08} className="flex items-center gap-4">
              <span className="h6 rounded-full border border-ink/25 px-6 py-3">{c}</span>
              {i < chips.length - 1 && <svg width="24" height="10" viewBox="0 0 24 10" fill="none"><path d="M0 5h22M18 1l4 4-4 4" stroke="#dd6537" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <SplitWords as="h3" className="h3 mb-16" text="Related Industries" />
        <div className="grid grid-cols-3 gap-6 max-[1000px]:grid-cols-1">
          {related.map((r) => (
            <Link key={r.slug} href={`/industries/${r.slug}`} className="group">
              <div className="relative aspect-[432/326] overflow-hidden rounded-lg">
                <Image src={img(r.img)} alt={r.title} fill sizes="432px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h6 className="h6 mt-5 transition-colors group-hover:text-brand">{r.title}</h6>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
export { FeatureGrid };
