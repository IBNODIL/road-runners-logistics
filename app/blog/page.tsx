import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { PostCard } from "@/components/home/Bottom";
import { SplitWords } from "@/components/motion";
import { posts } from "@/lib/site";

export const metadata: Metadata = { title: "Blog - Road Runners Logistics SIA" };

export default function Blog() {
  return (
    <>
      <PageHero title="Insights and Expertise" text="Practical perspectives, industry updates, and expert insights to help businesses navigate transportation, freight, and global supply chains." image="zDO4XjdfeWm9Nb84lKhn5Re4.jpg" />
      <section className="px-[var(--pad)] py-[150px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mb-[88px]" text="Recent Post" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-16 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">
          {posts.map((p, i) => <PostCard key={p.slug} p={p} delay={(i % 3) * 0.1} />)}
        </div>
      </section>
    </>
  );
}
