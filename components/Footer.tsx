import Link from "next/link";
import Button from "./Button";
import { contact, services } from "@/lib/site";
import { Reveal } from "./motion";

const company = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Industries", "/industries"],
  ["Global Network", "/global-network"],
  ["Sustainability", "/sustainability"],
  ["Partners", "/partners"],
];
const resources = [
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
];

function Roll({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="h6 link-roll block w-fit text-white">
      <span>{children}</span>
      <span aria-hidden className="text-sun">{children}</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-night text-white">
      <div className="wrap pb-16 pt-[216px] max-[809px]:pt-24">
        <div className="grid grid-cols-3 gap-10 max-[809px]:grid-cols-1">
          <Reveal>
            <p className="label mb-4 text-sun">Email</p>
            <a href={`mailto:${contact.email}`} className="h6 break-all">{contact.email}</a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label mb-4 text-sun">Business Hours</p>
            <p className="h6">{contact.hours}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="label mb-4 text-sun">Head Office</p>
            <a href={contact.map} target="_blank" rel="noreferrer" className="h6">{contact.address}</a>
          </Reveal>
        </div>

        <div className="mt-[140px] grid grid-cols-[340px_1fr] gap-10 max-[1000px]:grid-cols-1 max-[809px]:mt-16">
          <div>
            <p className="mb-8 max-w-[308px]">We deliver your cargo across borders with reliable planning, experienced teams and a trusted partner network.</p>
            <Button href="/request-a-quote" variant="white" size="md">Request a Quote</Button>
          </div>
          <div className="grid grid-cols-3 gap-10 min-[1000px]:pl-[205px] max-[809px]:grid-cols-1">
            <div>
              <p className="label mb-6 text-sun">Company</p>
              <div className="flex flex-col gap-3">{company.map(([t, h]) => <Roll key={t} href={h}>{t}</Roll>)}</div>
            </div>
            <div>
              <p className="label mb-6 text-sun">Services</p>
              <div className="flex flex-col gap-3">{services.map((s) => <Roll key={s.slug} href={`/services/${s.slug}`}>{s.title}</Roll>)}</div>
            </div>
            <div>
              <p className="label mb-6 text-sun">Resources</p>
              <div className="flex flex-col gap-3">{resources.map(([t, h]) => <Roll key={t} href={h}>{t}</Roll>)}</div>
            </div>
          </div>
        </div>

        <div className="mt-[90px] flex items-center gap-5 text-[16px]">
          <span>© 2026 Road Runners Logistics SIA. All rights reserved.</span>
          <span className="h-4 w-px bg-white/15" />
        </div>
      </div>

      <div className="overflow-hidden pb-[90px] pt-[60px] max-[809px]:pb-12 max-[809px]:pt-8">
        <div className="marquee flex w-max items-center whitespace-nowrap text-white/50">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center" aria-hidden={k === 1}>
              {["Trust", "Speed", "Deliver"].map((w) => (
                <span key={w} className="flex items-center">
                  <span className="h-mega">{w}</span>
                  <svg className="mx-[66px] h-[96px] w-[96px] shrink-0 max-[809px]:mx-6 max-[809px]:h-10 max-[809px]:w-10" viewBox="0 0 96 96" fill="currentColor">
                    <path d="M48 0c3 26 22 45 48 48-26 3-45 22-48 48-3-26-22-45-48-48C26 45 45 26 48 0z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
