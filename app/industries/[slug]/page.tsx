import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { PageHero, ParallaxImage } from "@/components/ui";
import { Reveal, SplitWords, ease } from "@/components/motion";
import { getDetail, section, pairs, txt, find } from "@/lib/details";
import { industries, img } from "@/lib/site";

export const generateStaticParams = () => industries.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = industries.find((x) => x.slug === slug);
  return { title: s ? `${s.title} - Road Runners Logistics SIA` : "Industry" };
}

const PAD = "px-[clamp(20px,10.5vw,162px)]";

/** Split a paragraph into two halves at a sentence boundary. */
function halves(t: string): string[] {
  const parts = t.split(/(?<=\.)\s+/).filter(Boolean);
  if (parts.length < 4) return t ? [t] : [];
  const half = Math.ceil(parts.length / 2);
  return [parts.slice(0, half).join(" "), parts.slice(half).join(" ")];
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getDetail("industries", slug);
  const meta = industries.find((s) => s.slug === slug);
  if (!b || !meta) notFound();

  const title = txt(b, "h1");
  const lead = b[b.findIndex((x) => x.t === "h1") + 1]?.text ?? "";
  const introText = section(b, "h3", /^Industry Introduction$/).find((x) => x.t === "p")?.text ?? "";
  const quote = txt(b, "h5");
  const challenge = section(b, "h3", /^The Challenge$/);
  const solution = section(b, "h3", /^Our Solution$/);
  const challengeParas = challenge.filter((x) => x.t === "p").map((x) => x.text!);
  const solutionParas = solution.filter((x) => x.t === "p").flatMap((x) => (solution.filter((y) => y.t === "p").length === 1 ? halves(x.text!) : [x.text!]));
  const challengeShown = challengeParas.length ? challengeParas : halves(introText);
  const flexIdx = find(b, "h3", /^Flexible/);
  const flexTitle = b[flexIdx]?.text ?? "";
  const flexItems = pairs(section(b, "h3", /^Flexible/));
  const caseIdx = b.findIndex((x, i) => x.t === "h3" && i > flexIdx && !/^Flexible/.test(x.text ?? ""));
  const caseTitle = b[caseIdx]?.text ?? "";
  const caseItems = pairs(b.slice(caseIdx + 1, b.findIndex((x, i) => i > caseIdx && x.t === "h3" && !/^Keeping/.test(x.text ?? "") ) < 0 ? undefined : b.findIndex((x, i) => i > caseIdx && x.t === "h3")));
  const builtIdx = find(b, "h3", /^Built for/);
  const built = section(b, "h3", /^Built for/);
  const chips = built.filter((x) => x.t === "p").slice(1).map((x) => x.text!);
  const related = industries.filter((i) => i.slug !== slug).slice(0, 3);
  const imgs = b.filter((x) => x.t === "img").map((x) => x.id!);
  const [heroImg, quoteImg, caseImg] = imgs;
  // zig-zag order: top row = first half, bottom row = second half, interleaved left to right
  const topRow = chips.slice(0, Math.ceil(chips.length / 2));
  const bottomRow = chips.slice(Math.ceil(chips.length / 2));
  const chain = chips.map((_, k) => (k % 2 === 0 ? topRow[k / 2] : bottomRow[(k - 1) / 2])).filter(Boolean);

  return (
    <>
      <PageHero textBelow title={title} text={lead} image={heroImg ?? meta.img} />

      {/* Industry introduction */}
      <section className="px-[var(--pad)] pb-[100px] pt-[190px] max-[809px]:py-16">
        <div className="mx-auto max-w-[830px]">
          <SplitWords as="h2" className="h2" text="Industry Introduction" />
          <Reveal delay={0.1}><p className="mt-8">{introText}</p></Reveal>
        </div>
      </section>

      {/* photo with quote */}
      {quoteImg && (
        <section className={`${PAD} pb-[110px] max-[809px]:pb-12`}>
          <div className="relative overflow-hidden rounded-lg">
            <ParallaxImage src={quoteImg} alt={title} ratio="1196/590" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <Reveal className="absolute bottom-[50px] left-[41%] flex items-start gap-5 text-white max-[809px]:bottom-5 max-[809px]:left-5 max-[809px]:right-5">
              <svg width="34" height="28" viewBox="0 0 34 28" fill="currentColor" className="mt-3 shrink-0" aria-hidden>
                <path d="M0 28V17C0 7 5 1.5 14 0v5.5C9.5 6.5 7.5 9 7.5 13H14v15H0zm20 0V17C20 7 25 1.5 34 0v5.5C29.5 6.5 27.5 9 27.5 13H34v15H20z" />
              </svg>
              <p className="max-w-[520px] text-[40px] leading-[44px] tracking-[-0.04em] max-[809px]:text-[22px] max-[809px]:leading-[28px]" style={{ fontFamily: "var(--font-jakarta)" }}>{quote}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* challenge + solution */}
      {[
        ["The Challenge", challenge.find((x) => x.t === "h6")?.text, challengeShown],
        ["Our Solution", solution.find((x) => x.t === "h6")?.text, solutionParas],
      ].map(([h, sub, paras]) => (
        <section key={h as string} className={`${PAD} pb-[110px] max-[809px]:pb-12`}>
          <div className="grid grid-cols-[500px_1fr] gap-10 max-[1000px]:grid-cols-1">
            <SplitWords as="h2" className="h2" text={h as string} />
            <div className="max-w-[710px]">
              <Reveal><h6 className="h6 !text-[28px] !leading-[34px]">{sub as string}</h6></Reveal>
              <div className="mt-8 space-y-6">
                {(paras as string[]).map((p) => <Reveal key={p.slice(0, 24)}><p>{p}</p></Reveal>)}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* flexible solutions */}
      <section className={`${PAD} bg-mist py-[130px] max-[809px]:py-14`}>
        <SplitWords as="h3" className="h3 max-w-[1250px]" text={flexTitle} stagger={0.02} />
        <div className="mt-[90px]">
          {flexItems.map((p, i) => (
            <Reveal key={p.t} className={`grid grid-cols-[1fr_400px] items-start gap-10 py-8 max-[809px]:grid-cols-1 max-[809px]:gap-3 ${i < flexItems.length - 1 ? "border-b border-ink/15" : ""}`}>
              <h6 className="h6">{p.t}</h6>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* case study */}
      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-14">
        <div className="grid grid-cols-[490px_778px] justify-between gap-12 max-[1300px]:grid-cols-1">
          <div>
            <SplitWords as="h3" className="h3 max-w-[490px]" text={caseTitle} />
            <div className="mt-[70px]">
              {caseItems.map((c, i) => (
                <Reveal key={c.t} className={`py-6 ${i > 0 ? "border-t border-ink/20" : ""}`}>
                  <h6 className="h6">{c.t}</h6>
                  <p className="mt-4 max-w-[490px]">{c.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
          {caseImg && (
            <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1, ease }} className="relative aspect-[778/537] overflow-hidden rounded-lg max-[1300px]:aspect-[4/3]">
              <Image src={img(caseImg)} alt={caseTitle} fill sizes="778px" className="object-cover" />
            </motion.div>
          )}
        </div>
      </section>

      {/* built for the way … : zig-zag chain */}
      <section className={`${PAD} pb-[170px] max-[809px]:pb-14`}>
        <div className="grid grid-cols-[1fr_600px] gap-10 max-[1000px]:grid-cols-1">
          <SplitWords as="h2" className="h2 max-w-[520px]" text={b[builtIdx]?.text ?? ""} />
          <div className="pt-6">
            <Reveal><h6 className="h6 !text-[28px] !leading-[34px]">{built.find((x) => x.t === "h6")?.text}</h6></Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-[460px]">{built.find((x) => x.t === "p")?.text}</p></Reveal>
          </div>
        </div>
        <div className="relative mt-[110px] hidden h-[140px] min-[1000px]:block">
          {chain.map((c, k) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: k * 0.2, ease }}
              className="absolute flex h-[62px] w-[200px] items-center justify-center border border-brand bg-white text-[20px]"
              style={{ left: k * 200, top: k % 2 === 0 ? 0 : 62 }}
            >
              {c}
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 min-[1000px]:hidden max-[500px]:grid-cols-1">
          {chain.map((c) => <div key={c} className="flex h-[62px] items-center justify-center border border-brand bg-white text-[18px]">{c}</div>)}
        </div>
      </section>

      {/* related industries */}
      <section className="bg-sand px-[var(--pad)] py-[150px] max-[809px]:py-14">
        <SplitWords as="h2" className="h2 text-center" text="Related Industries" />
        <div className="mt-[100px] grid grid-cols-3 gap-5 max-[1000px]:grid-cols-1 max-[809px]:mt-10">
          {related.map((r, i) => (
            <motion.div key={r.slug} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.9, delay: i * 0.1, ease }}>
              <Link href={`/industries/${r.slug}`} className="group relative block aspect-[583/655] overflow-hidden rounded-lg bg-ink text-white">
                <Image src={img(r.img)} alt={r.title} fill sizes="583px" className="scale-100 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.44,0,.56,1)] group-hover:scale-[1.2]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 40%)" }} />
                <h6 className="h6 absolute left-8 top-8">{r.title}</h6>
                <span className="absolute bottom-6 right-6 flex h-[50px] w-[50px] scale-75 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(.44,0,.56,1)] group-hover:scale-100 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 14 14 4M5.5 4H14v8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
