import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { QuoteForm } from "@/components/Forms";
import { CtaBanner } from "@/components/home/Bottom";
import { Reveal, SplitWords, ease } from "@/components/motion";
import { contact, img } from "@/lib/site";

export const metadata: Metadata = { title: "Request a Quote - Road Runners Logistics SIA" };

const features = [
  ["Fast response", "We review your request and respond with the next steps as quickly as possible.", "gnihJhgkl3zit7PWs45W1dweE6M.svg"],
  ["Experienced team", "Our logistics team understands every shipment requirement.", "vFLm5IlKjqY6dheJ8Yp9VR8aoRo.svg"],
  ["Global network", "Access transportation and logistics capabilities across major international markets.", "efQyE0daPXN8v987IJUzoN3nuY.svg"],
  ["Flexible Solutions", "We build solutions around your cargo, route, timeline, and operational requirements.", "XmH67gCdTGgKTvQglrCjXF2nz78.svg"],
];

const Step = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div className="flex items-start gap-6 bg-paper">
    <span className="h-mega !text-[120px] !leading-[100px]">{n}</span>
    <div className="pt-1">
      <h5 className="h5 !text-[30px] !leading-[36px]">{t}</h5>
      <p className="mt-4 max-w-[290px]">{d}</p>
    </div>
  </div>
);

export default function RequestAQuote() {
  return (
    <>
      <div className="relative">
        {/* hero copy */}
        <section data-hero-light className="px-[var(--pad)] pt-[284px] max-[1100px]:pb-10 max-[1100px]:pt-[130px] min-[1101px]:h-[704px]">
          <SplitWords as="h1" className="h-hero max-w-[560px]" text="Request a Quote" stagger={0.08} />
          <Reveal delay={0.4}><p className="p20 mt-8 max-w-[420px]">Tell us what you’re moving, where it’s going, and when it needs to arrive. We’ll help you find the right solution.</p></Reveal>
        </section>

        {/* form card: floats over the photo band on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="z-10 mx-[var(--pad)] rounded-lg border border-brand/70 bg-white p-6 max-[1100px]:mb-12 min-[1101px]:absolute min-[1101px]:right-[var(--pad)] min-[1101px]:top-[270px] min-[1101px]:m-0 min-[1101px]:w-[705px]"
        >
          <p className="label mt-1 text-brand">Request a Quote</p>
          <h6 className="h6 mb-8 mt-2">Tell us about your shipment.</h6>
          <QuoteForm />
        </motion.div>

        {/* photo band */}
        <div className="relative h-[697px] w-full overflow-hidden max-[809px]:h-[420px]">
          <Image src={img("yhTxkrrayQSQfkQj0p0UaVzWV00.jpg")} alt="Request a Quote" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      {/* A better starting point */}
      <section className="px-[var(--pad)] py-[170px] max-[809px]:py-16">
        <div className="grid grid-cols-[763px_1fr] gap-[90px] max-[1200px]:grid-cols-1 max-[1200px]:gap-12">
          <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1, ease }} className="relative aspect-[763/733] overflow-hidden rounded-lg">
            <Image src={img("AxIoPeaIOdjkGyaISl0Zhc8LI.jpg")} alt="A Better Starting Point for Every Shipment" fill sizes="763px" className="object-cover" />
          </motion.div>
          <div>
            <SplitWords as="h2" className="h3 max-w-[560px]" text="A Better Starting Point for Every Shipment." />
            <div className="mt-[70px] flex flex-col gap-[42px]">
              {features.map(([t, d, ic], i) => (
                <motion.div key={t} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease }} className="grid grid-cols-[56px_1fr] items-start">
                  <Image src={img(ic)} alt="" width={30} height={30} />
                  <div>
                    <h6 className="h6 -mt-1">{t}</h6>
                    <p className="mt-3 max-w-[345px]">{d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ring of three steps */}
      <section className="px-[var(--pad)] pb-[160px] max-[809px]:pb-16">
        <SplitWords as="h2" className="h3 mx-auto max-w-[540px] text-center" text="From Your Request to the Right Solution." />
        <div className="relative mx-auto mt-[100px] hidden h-[780px] w-full max-w-[1200px] min-[1101px]:block">
          <div className="absolute left-1/2 top-[30px] h-[610px] w-[610px] -translate-x-1/2 rounded-full border border-ink" />
          {/* 01 sits on the ring's left edge, its text outside to the left */}
          <Reveal className="absolute right-[calc(50%+200px)] top-[149px] py-12 [&>div]:flex-row-reverse [&_p]:ml-auto [&_p]:text-right">
            <Step n="01" t="Review & Plan" d="We review your shipment details, route, timeline, and requirements to plan the right logistics solution." />
          </Reveal>
          {/* 02 on the right edge, text outside to the right */}
          <Reveal delay={0.15} className="absolute left-[calc(50%+206px)] top-[147px] py-12">
            <Step n="02" t="We Respond" d="Our team contacts you to discuss the details, answer your questions, and confirm the next steps." />
          </Reveal>
          {/* 03 on the ring's bottom edge */}
          <Reveal delay={0.3} className="absolute left-[calc(50%-195px)] top-[552px] py-12">
            <Step n="03" t="We Move" d="Once everything is confirmed, we coordinate your shipment from pickup to delivery." />
          </Reveal>
        </div>
        {/* compact list on smaller screens */}
        <div className="mt-12 flex flex-col gap-10 min-[1101px]:hidden">
          <Step n="01" t="Review & Plan" d="We review your shipment details, route, timeline, and requirements to plan the right logistics solution." />
          <Step n="02" t="We Respond" d="Our team contacts you to discuss the details, answer your questions, and confirm the next steps." />
          <Step n="03" t="We Move" d="Once everything is confirmed, we coordinate your shipment from pickup to delivery." />
        </div>
      </section>

      {/* contact row */}
      <section className="px-[162px] pb-[170px] max-[1200px]:px-[var(--pad)] max-[809px]:pb-16">
        <SplitWords as="h2" className="h3 max-w-[940px]" text="Have a question about a shipment or need to discuss your requirements before requesting a quote? Get in touch with our team directly." stagger={0.02} />
        <div className="mt-[80px] grid grid-cols-[1fr_1fr_1fr] gap-10 max-[809px]:grid-cols-1">
          <Reveal><p className="label mb-3 text-brand">Email</p><a href={`mailto:${contact.email}`} className="text-[24px] leading-[30px]">{contact.email}</a></Reveal>
          <Reveal delay={0.1}><p className="label mb-3 text-brand">Head Office</p><a href={contact.map} target="_blank" rel="noreferrer" className="block max-w-[300px] text-[24px] leading-[30px]">{contact.address}</a></Reveal>
          <Reveal delay={0.2}><p className="label mb-3 text-brand">Business Hours</p><p className="text-[24px] leading-[30px]">Monday–Friday<br />8:00 AM–4:00 PM</p></Reveal>
        </div>
      </section>

      <CtaBanner title="Ready to Move What Matters?" text="" image="f4u2bm6E9EKL7OwWlcBMiXKZCUs.jpg" />
    </>
  );
}
