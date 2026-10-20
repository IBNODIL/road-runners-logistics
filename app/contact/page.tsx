import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { ContactForm } from "@/components/Forms";
import { Reveal, SplitWords, ease } from "@/components/motion";
import { contact, img } from "@/lib/site";

export const metadata: Metadata = { title: "Contact - Road Runners Logistics SIA" };

const MAP_SRC = "https://www.google.com/maps?q=Tinuzu+iela+1A,+Riga,+LV-1021,+Latvia&output=embed";

export default function Contact() {
  return (
    <>
      <section data-hero-light className="px-[var(--pad)] pb-[130px] pt-[250px] max-[809px]:pt-[130px]">
        <div className="grid grid-cols-[550px_662px] justify-between gap-16 max-[1300px]:grid-cols-1">
          <div>
            <SplitWords as="h1" className="h-hero" text="Let's Talk Logistics." stagger={0.08} />
            <Reveal delay={0.3}><p className="p20 mt-8 max-w-[480px]">Have a shipment to plan, a logistics question, or a specific requirement? Our team is ready to help.</p></Reveal>
            <Reveal delay={0.4} className="mt-[130px] max-[809px]:mt-16">
              <p className="label text-brand">Contact Form</p>
              <h6 className="h6 mb-9 mt-3">Tell Us How We Can Help.</h6>
              <ContactForm />
            </Reveal>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="relative h-[813px] overflow-hidden rounded-lg max-[1300px]:h-[460px]"
          >
            <Image src={img("KaCeGwP6bbxROCfdZaJdgZcPoDc.png")} alt="Let's Talk Logistics" fill priority sizes="662px" className="object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="pb-[120px] max-[809px]:pb-16">
        <div className="grid grid-cols-[550px_1fr] items-end justify-between gap-10 px-[var(--pad)] max-[1100px]:grid-cols-1">
          <SplitWords as="h2" className="h3 !text-[40px] !leading-[44px] max-[809px]:!text-[30px] max-[809px]:!leading-[36px]" text="Find Our Office and Connect With the Road Runners Logistics SIA Team in Person." stagger={0.03} />
          <Reveal className="justify-self-end max-[1100px]:justify-self-start"><p className="max-w-[322px] pb-2">Visit our head office or connect with our team to discuss your logistics needs and find the right way forward.</p></Reveal>
        </div>

        {/* full-bleed map with two overlaid cards */}
        <div className="relative mt-16 h-[607px] w-full overflow-hidden bg-mist max-[809px]:h-[520px]">
          <iframe title="Head office map" src={MAP_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease }}
            className="absolute left-[var(--pad)] top-[94px] w-[344px] max-w-[calc(100%-var(--pad)*2)] rounded-lg bg-white p-[45px] max-[809px]:top-6 max-[809px]:p-6"
          >
            <p className="label text-brand">Email</p>
            <a href={`mailto:${contact.email}`} className="h5 mt-2 block break-all !text-[28px] !leading-[36px]">{contact.email}</a>
            <p className="label mt-8 text-brand">Business Hours</p>
            <p className="h5 mt-2 !text-[28px] !leading-[36px]">Monday–Friday<br />8:00 AM–4:00 PM</p>
          </motion.div>
          <motion.a
            href={contact.map}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="group absolute bottom-[45px] right-[var(--pad)] flex w-[322px] max-w-[calc(100%-var(--pad)*2)] items-center justify-between gap-4 rounded-lg bg-white px-6 py-8 max-[809px]:bottom-6"
          >
            <span className="label !text-[16px] !leading-[24px] !tracking-[0.01em]">{contact.address.toUpperCase()}</span>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M10 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-4M14 4h8v8M22 4 11 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </section>
    </>
  );
}
