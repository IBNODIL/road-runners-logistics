import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero, ParallaxImage } from "@/components/ui";
import { PostCard } from "@/components/home/Bottom";
import { Reveal, SplitWords } from "@/components/motion";
import { getDetail, txt } from "@/lib/details";
import { posts, img } from "@/lib/site";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return { title: p ? `${p.title} - Road Runners Logistics SIA` : "Post", description: p?.text };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getDetail("blog", slug);
  const post = posts.find((p) => p.slug === slug);
  if (!b || !post) notFound();

  const h1 = b.findIndex((x) => x.t === "h1");
  const lead = b[h1 + 1]?.text ?? "";
  const relIdx = b.findIndex((x) => x.t === "h3" && /Related Post/.test(x.text ?? ""));
  const body = b.slice(h1 + 2, relIdx < 0 ? undefined : relIdx);
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  // group consecutive <li> into one list
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < body.length; i++) {
    const x = body[i];
    if (x.t === "li") {
      const items: string[] = [];
      while (body[i]?.t === "li") items.push(body[i++].text!);
      i--;
      nodes.push(
        <Reveal key={`l${i}`} as="div">
          <ul className="my-6 space-y-3">
            {items.map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{t}</li>
            ))}
          </ul>
        </Reveal>
      );
    } else if (x.t === "h4") nodes.push(<SplitWords key={i} as="h2" className="h5 mt-16 !text-[32px]" text={x.text!} stagger={0.03} />);
    else if (x.t === "p") nodes.push(<Reveal key={i}><p className="p20 mt-5 text-ink/85">{x.text}</p></Reveal>);
    else if (x.t === "h6") nodes.push(<Reveal key={i}><blockquote className="h5 my-14 border-l-2 border-brand pl-8 !text-[28px] !leading-[38px]">{x.text}</blockquote></Reveal>);
    else if (x.t === "img") nodes.push(<div key={i} className="my-14"><ParallaxImage src={x.id!} alt="" ratio="16/9" /></div>);
  }

  return (
    <>
      <PageHero title={txt(b, "h1")} text={lead} image={post.img}>
        <span className="label absolute left-[var(--pad)] top-[120px] rounded bg-white px-3 py-1 text-ink">{post.cat}</span>
      </PageHero>
      <article className="mx-auto max-w-[860px] px-[var(--pad)] pb-[120px] pt-[100px]">{nodes}</article>
      <section className="bg-sand px-[var(--pad)] py-[120px] max-[809px]:py-20">
        <SplitWords as="h3" className="h3 mb-16" text="Related Post" />
        <div className="grid grid-cols-3 gap-6 max-[1000px]:grid-cols-1">
          {related.map((p, i) => <PostCard key={p.slug} p={p} delay={i * 0.1} />)}
        </div>
      </section>
    </>
  );
}
export { Image, img };
