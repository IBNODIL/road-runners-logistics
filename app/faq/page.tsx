import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { Faq } from "@/components/ui";
import { Reveal, SplitWords } from "@/components/motion";
import { contact, img } from "@/lib/site";
import faq from "@/data/faq.json";

export const metadata: Metadata = { title: "FAQ - Road Runners Logistics SIA" };

export default function FaqPage() {
  return (
    <>
      <section data-hero-light className="px-[var(--pad)] pb-[100px] pt-[325px] max-[809px]:pt-[140px]">
        <div className="grid grid-cols-[1fr_380px] gap-16 max-[1000px]:grid-cols-1">
          <div>
            <SplitWords as="h1" className="h-hero max-w-[860px]" text="Questions? We've Got Answers." stagger={0.08} />
            <Reveal delay={0.4}><p className="p20 mt-8 max-w-[520px]">Find clear answers about our logistics services, shipping process, international freight, warehousing, and quotes.</p></Reveal>
          </div>
          <Reveal delay={0.3} className="self-end rounded-lg bg-sand p-8">
            <div className="mb-6 flex -space-x-3">
              {["iEfS0iGHWcUWpvFxbNJefMPPA.png", "QWs3cXdPnIMVbyN9MvDiz6nyj4.png", "PE5OIGjCJgRoWaPVURhrUbswiA.png"].map((a) => (
                <span key={a} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-sand"><Image src={img(a)} alt="" fill sizes="48px" className="object-cover" /></span>
              ))}
            </div>
            <h6 className="h6">Can&apos;t Find Your Answer?</h6>
            <p className="mt-3">Contact us and let our team help you find the right logistics solution.</p>
            <div className="mt-6"><Button href="/contact" variant="dark" size="md">Contact Us</Button></div>
            <p className="mt-6 text-[15px]">Or email us <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </Reveal>
        </div>
      </section>
      <section className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
        <Reveal><h4 className="label mb-12 text-brand">Read the FAQs</h4></Reveal>
        <div className="flex flex-col gap-20">
          {faq.map((c) => (
            <div key={c.cat} className="grid grid-cols-[300px_1fr] gap-10 max-[1000px]:grid-cols-1">
              <Reveal><h5 className="h5">{c.cat}</h5></Reveal>
              <Faq items={c.items} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
