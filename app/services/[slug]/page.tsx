import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import * as motion from "motion/react-client";
import { PageHero, ParallaxImage } from "@/components/ui";
import { CompactQuoteForm } from "@/components/Forms";
import { Counter, Reveal, SplitWords, ease } from "@/components/motion";
import { getDetail, section, pairs, txt, find } from "@/lib/details";
import { services, img } from "@/lib/site";

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return { title: s ? `${s.title} - Road Runners Logistics SIA` : "Service" };
}

const PAD = "px-[clamp(20px,10.5vw,162px)]";

/** Split one long paragraph in two at the sentence that starts the second thought. */
function twoParagraphs(t: string): string[] {
  const i = t.search(/\s(Whether|Our role|For some|Without)\s/);
  if (i > 40) return [t.slice(0, i).trim(), t.slice(i).trim()];
  const parts = t.split(/(?<=\.)\s+/);
  if (parts.length < 4) return [t];
  const half = Math.ceil(parts.length / 2);
  return [parts.slice(0, half).join(" "), parts.slice(half).join(" ")];
}

const Quote = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-start gap-4 text-brand ${className}`}>
    <svg width="34" height="28" viewBox="0 0 34 28" fill="currentColor" className="mt-2 shrink-0" aria-hidden>
      <path d="M0 28V17C0 7 5 1.5 14 0v5.5C9.5 6.5 7.5 9 7.5 13H14v15H0zm20 0V17C20 7 25 1.5 34 0v5.5C29.5 6.5 27.5 9 27.5 13H34v15H20z" />
    </svg>
    <div>{children}</div>
  </div>
);

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getDetail("services", slug);
  const meta = services.find((s) => s.slug === slug);
  if (!b || !meta) notFound();

  const title = txt(b, "h1");
  const lead = b[b.findIndex((x) => x.t === "h1") + 1]?.text ?? "";
  const overview = section(b, "h2", /^Overview$/);
  const overviewParas = twoParagraphs(overview.find((x) => x.t === "p")?.text ?? "");
  const challenge = section(b, "h2", /^The Challenge$/);
  const why = b.find((x) => x.t === "h3" && /^Why /.test(x.text ?? ""));
  const whyItems = pairs(section(b, "h3", /^Why /));
  const what = section(b, "h3", /^What we do$/);
  const whatP = what.filter((x) => x.t === "p");
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
      <section className={`${PAD} pb-[90px] pt-[190px] max-[809px]:py-16`}>
        <SplitWords as="h2" className="h2" text="Overview" />
        <Reveal><h6 className="h6 mt-6">{overview.find((x) => x.t === "h6")?.text}</h6></Reveal>
        <div className="mt-8 max-w-[1200px] space-y-6">
          {overviewParas.map((p) => <Reveal key={p.slice(0, 20)}><p>{p}</p></Reveal>)}
        </div>
      </section>

      {overviewImg && (
        <section className="px-[var(--pad)] pb-[90px] max-[809px]:pb-12">
          <ParallaxImage src={overviewImg} alt={title} ratio="1345/880" />
        </section>
      )}

      {/* The challenge */}
      <section className={`${PAD} pb-[110px] pt-[40px] max-[809px]:pb-12`}>
        <div className="grid grid-cols-[600px_340px] justify-between gap-10 max-[1000px]:grid-cols-1">
          <div>
            <SplitWords as="h2" className="h2" text="The Challenge" />
            <Reveal><p className="mt-8 max-w-[600px]">{challenge.find((x) => x.t === "p")?.text}</p></Reveal>
          </div>
          <Reveal className="max-[1000px]:order-first">
            <Quote><p className="text-[24px] leading-[30px] tracking-[-0.02em]" style={{ fontFamily: "var(--font-jakarta)" }}>{challenge.find((x) => x.t === "h6")?.text}</p></Quote>
          </Reveal>
        </div>
      </section>

      {/* Why + feature rows */}
      <section className={`${PAD} pb-[130px] max-[809px]:pb-14`}>
        <SplitWords as="h3" className="h3 max-w-[1200px]" text={why?.text ?? ""} stagger={0.02} />
        <div className="mt-[90px]">
          {whyItems.map((p, i) => (
            <Reveal key={p.t} className={`grid grid-cols-[1fr_400px] items-center gap-10 py-8 max-[809px]:grid-cols-1 max-[809px]:gap-3 ${i < whyItems.length - 1 ? "border-b border-ink/15" : ""}`}>
              <h6 className="h6">{p.t}</h6>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className={`${PAD} bg-mist py-[130px] max-[809px]:py-14`}>
        <div className="grid grid-cols-[1fr_545px] gap-10 max-[1100px]:grid-cols-1">
          <div>
            <SplitWords as="h3" className="h3" text="What we do" />
            <Reveal><p className="p20 mt-6">{whatP[0]?.text}</p></Reveal>
          </div>
          <div className="space-y-6">
            {twoParagraphs(whatP[1]?.text ?? "").map((p) => <Reveal key={p.slice(0, 20)}><p>{p}</p></Reveal>)}
          </div>
        </div>
        <div className="mt-[90px] grid grid-cols-3 gap-2 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {whatItems.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease }}
              className="flex min-h-[240px] flex-col items-center rounded-lg bg-white px-6 py-10 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h6 className="h6 mt-8">{p.t}</h6>
              <p className="mt-4 max-w-[330px]">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scale */}
      <section className={`${PAD} py-[130px] max-[809px]:py-14`}>
        <SplitWords as="h3" className="h3" text="The Scale Behind Every Mile" />
        <div className="mt-[60px] grid grid-cols-3 max-[809px]:grid-cols-1 max-[809px]:gap-10">
          {stats.map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.1} className={`relative ${i > 0 ? "min-[810px]:pl-[60px]" : ""}`}>
              {i > 0 && <span className="absolute left-0 top-6 hidden h-[100px] w-px bg-ink/25 min-[810px]:block" />}
              <Counter value={n} className="h-mega !block" />
              <p className="p20 mt-3">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-[clamp(20px,8vw,102px)] pb-[130px] max-[809px]:pb-14">
        <div className="grid grid-cols-[748px_1fr] gap-[70px] max-[1200px]:grid-cols-1 max-[1200px]:gap-12">
          {processImg && (
            <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1, ease }} className="relative aspect-[748/860] overflow-hidden rounded-lg">
              <Image src={img(processImg)} alt="From first request to final delivery" fill sizes="748px" className="object-cover" />
            </motion.div>
          )}
          <div>
            <SplitWords as="h3" className="h3 max-w-[520px]" text={stepTitle} stagger={0.03} />
            {stepLead && <Reveal><p className="mt-8">{stepLead}</p></Reveal>}
            <div className="mt-[60px] flex flex-col gap-6">
              {steps.slice(0, 4).map((s, i) => (
                <Reveal key={s.t} className="grid grid-cols-[45px_1fr]">
                  <p className="pt-2">0{i + 1}</p>
                  <div><h6 className="h5 !text-[28px] !leading-[36px]">{s.t}</h6><p className="mt-4 max-w-[330px]">{s.d}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing quote */}
      {quote && (
        <section className={`${PAD} pb-[150px] max-[809px]:pb-14`}>
          <Reveal>
            <Quote className="mx-auto max-w-[900px]">
              <p className="text-[40px] leading-[44px] tracking-[-0.04em] max-[809px]:text-[26px] max-[809px]:leading-[32px]" style={{ fontFamily: "var(--font-jakarta)" }}>{quote}</p>
            </Quote>
          </Reveal>
        </section>
      )}

      {/* Your cargo, our commitment */}
      <section className="relative min-h-[820px] overflow-hidden bg-ink text-white max-[1000px]:min-h-0">
        {endImg && <Image src={img(endImg)} alt="Your cargo" fill sizes="100vw" className="object-cover" />}
        <div className="relative grid min-h-[820px] grid-cols-[1fr_625px] gap-10 px-[var(--pad)] pt-[225px] max-[1000px]:min-h-0 max-[1000px]:grid-cols-1 max-[1000px]:py-16 max-[1000px]:pt-16">
          <div>
            <SplitWords as="h2" className="h2 max-w-[520px] !font-normal" text="Your cargo. Our commitment." />
            <Reveal delay={0.2}><p className="mt-8 max-w-[400px]">{ctaT}</p></Reveal>
          </div>
          <Reveal className="self-end rounded-t-lg bg-white p-8 text-ink max-[1000px]:rounded-lg">
            <p className="label text-brand">Request a Quote</p>
            <h6 className="h6 mb-8 mt-2">Tell us about your shipment.</h6>
            <CompactQuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
