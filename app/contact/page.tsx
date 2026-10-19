import type { Metadata } from "next";
import Image from "next/image";
import { PlainHero } from "@/components/ui";
import { ContactForm } from "@/components/Forms";
import { Reveal, SplitWords } from "@/components/motion";
import { contact, img } from "@/lib/site";

export const metadata: Metadata = { title: "Contact - Road Runners Logistics SIA" };

export default function Contact() {
  return (
    <>
      <section className="px-[var(--pad)] pb-[100px] pt-[250px] max-[809px]:pt-[130px]">
        <div className="grid grid-cols-[586px_659px] justify-between gap-16 max-[1300px]:grid-cols-1">
          <div>
            <SplitWords as="h1" className="h-hero" text="Let's Talk Logistics." stagger={0.08} />
            <Reveal delay={0.3}><p className="p20 mt-8 max-w-[480px]">Have a shipment to plan, a logistics question, or a specific requirement? Our team is ready to help.</p></Reveal>
            <Reveal delay={0.4} className="mt-[90px] max-w-[586px]">
              <h6 className="h6 mb-8">Tell Us How We Can Help.</h6>
              <ContactForm />
            </Reveal>
          </div>
          <Reveal className="relative h-[867px] overflow-hidden rounded-lg max-[1300px]:h-[460px]">
            <Image src={img("KaCeGwP6bbxROCfdZaJdgZcPoDc.png")} alt="Let's Talk Logistics" fill priority sizes="50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
        <div className="grid grid-cols-2 gap-10 border-t border-ink/15 pt-16 max-[1000px]:grid-cols-1">
          <SplitWords as="h2" className="h3 max-w-[640px] !text-[40px] !leading-[48px]" text="Find Our Office and Connect With the Road Runners Logistics SIA Team in Person." stagger={0.03} />
          <div>
            <Reveal><p className="mb-12 max-w-[500px]">Visit our head office or connect with our team to discuss your logistics needs and find the right way forward.</p></Reveal>
            <div className="grid grid-cols-1 gap-8">
              <Reveal><p className="label mb-2 text-brand">Email</p><a href={`mailto:${contact.email}`} className="h6">{contact.email}</a></Reveal>
              <Reveal><p className="label mb-2 text-brand">Business Hours</p><p className="h6">Monday–Friday {contact.hours.replace(" – ", "–")}</p></Reveal>
              <Reveal><p className="label mb-2 text-brand">Head Office</p><a href={contact.map} target="_blank" rel="noreferrer" className="h6 uppercase">{contact.address}</a></Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export { PlainHero };
