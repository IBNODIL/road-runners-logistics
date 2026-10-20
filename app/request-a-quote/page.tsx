import type { Metadata } from "next";
import Image from "next/image";
import { ParallaxImage } from "@/components/ui";
import { QuoteForm } from "@/components/Forms";
import { Counter, Reveal, SplitWords } from "@/components/motion";
import { CtaBanner } from "@/components/home/Bottom";
import { contact, img } from "@/lib/site";

export const metadata: Metadata = { title: "Request a Quote - Road Runners Logistics SIA" };

const features = [
  ["Fast response", "We review your request and respond with the next steps as quickly as possible.", "gnihJhgkl3zit7PWs45W1dweE6M.svg"],
  ["Experienced team", "Our logistics team understands every shipment requirement.", "vFLm5IlKjqY6dheJ8Yp9VR8aoRo.svg"],
  ["Global network", "Access transportation and logistics capabilities across major international markets.", "efQyE0daPXN8v987IJUzoN3nuY.svg"],
  ["Flexible Solutions", "We build solutions around your cargo, route, timeline, and operational requirements.", "XmH67gCdTGgKTvQglrCjXF2nz78.svg"],
];

const steps = [
  { n: "01", t: "Review & Plan", d: "We review your shipment details, route, timeline, and requirements to plan the right logistics solution.", pos: "left-[96px] top-0" },
  { n: "02", t: "We Respond", d: "Our team contacts you to discuss the details, answer your questions, and confirm the next steps.", pos: "right-[60px] top-0" },
  { n: "03", t: "We Move", d: "Once everything is confirmed, we coordinate your shipment from pickup to delivery.", pos: "left-[50%] -translate-x-[40%] top-[440px]" },
];

export default function RequestAQuote() {
  return (
    <>
      <section data-hero-light className="px-[var(--pad)] pb-[100px] pt-[250px] max-[809px]:pt-[130px]">
        <div className="grid grid-cols-[1fr_611px] gap-16 max-[1100px]:grid-cols-1">
          <div>
            <SplitWords as="h1" className="h-hero" text="Request a Quote" stagger={0.08} />
            <Reveal delay={0.4}><p className="p20 mt-8 max-w-[371px]">Tell us what you’re moving, where it’s going, and when it needs to arrive. We’ll help you find the right solution.</p></Reveal>
          </div>
          <Reveal delay={0.3} className="rounded-lg bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <p className="label text-brand">Request a Quote</p>
            <h6 className="h6 mb-8 mt-2">Tell us about your shipment.</h6>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      <section className="px-[var(--pad)] pb-[100px] max-[809px]:pb-16">
        <ParallaxImage src="yhTxkrrayQSQfkQj0p0UaVzWV00.jpg" alt="Request a Quote" ratio="1345/653" />
      </section>

      <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <div className="grid grid-cols-[713px_1fr] gap-16 max-[1200px]:grid-cols-1">
          <ParallaxImage src="AxIoPeaIOdjkGyaISl0Zhc8LI.jpg" alt="A Better Starting Point for Every Shipment" ratio="713/658" />
          <div>
            <SplitWords as="h2" className="h3 max-w-[586px]" text="A Better Starting Point for Every Shipment." />
            <div className="mt-16">
              {features.map(([t, d, ic]) => (
                <Reveal key={t} className="grid grid-cols-[56px_1fr] gap-4 py-5">
                  <Image src={img(ic)} alt="" width={32} height={32} />
                  <div className="max-w-[408px]"><h6 className="h6">{t}</h6><p className="mt-2">{d}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <SplitWords as="h2" className="h3 mx-auto max-w-[692px] text-center" text="From Your Request to the Right Solution." />
        <div className="relative mt-[100px] h-[880px] max-[1000px]:h-auto max-[1000px]:space-y-12">
          {steps.map((s) => (
            <Reveal key={s.n} className={`absolute flex max-w-[480px] items-start gap-6 max-[1000px]:static ${s.pos} max-[1000px]:!translate-x-0`}>
              <Counter value={s.n} className="h-mega !text-[120px] leading-none" />
              <div className="pt-4">
                <h5 className="h5">{s.t}</h5>
                <p className="mt-4 max-w-[300px]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-[var(--pad)] py-[100px] max-[809px]:py-16">
        <SplitWords as="h2" className="h3 max-w-[1017px]" text="Have a question about a shipment or need to discuss your requirements before requesting a quote? Get in touch with our team directly." stagger={0.02} />
        <div className="mt-24 grid grid-cols-[1fr_1fr_1fr] gap-10 max-[809px]:grid-cols-1">
          <Reveal><p className="label mb-3">Email</p><a href={`mailto:${contact.email}`} className="p20">{contact.email}</a></Reveal>
          <Reveal><p className="label mb-3">Head Office</p><a href={contact.map} target="_blank" rel="noreferrer" className="p20">{contact.address}</a></Reveal>
          <Reveal><p className="label mb-3">Business Hours</p><p className="p20">Monday–Friday 8:00 AM–4:00 PM</p></Reveal>
        </div>
      </section>
      <CtaBanner title="Ready to Move What Matters?" image="f4u2bm6E9EKL7OwWlcBMiXKZCUs.jpg" />
    </>
  );
}
