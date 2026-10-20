"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { LOGO, LOGO_LIGHT, navLinks, services, industries } from "@/lib/site";

const Caret = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1 inline-block">
    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lightHero, setLightHero] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      setHidden(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setMobile(false);
    // pages whose first section is a light background mark it with data-hero-light
    setLightHero(!!document.querySelector("[data-hero-light]"));
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const light = !solid && !mobile && !lightHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${solid || mobile ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}
      style={{ transform: hidden ? "translateY(-100%)" : undefined }}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <Link href="/" className="relative z-10 block w-[167px]">
          <Image src={light ? LOGO_LIGHT : LOGO} alt="Site Logo" width={167} height={36} priority className="h-auto w-full" />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 min-[1000px]:flex">
          {navLinks.map((l) => (
            <div key={l.label} className="relative" onMouseEnter={() => setOpen(l.menu ?? null)}>
              <Link href={l.href} className={`label flex items-center whitespace-nowrap py-6 transition-colors duration-500 ${light ? "text-white" : "text-ink"}`}>
                <span className="link-roll">
                  <span>{l.label}</span>
                  <span aria-hidden>{l.label}</span>
                </span>
                {l.menu && (
                  <motion.span animate={{ rotate: open === l.menu ? 180 : 0 }} className="inline-flex">
                    <Caret />
                  </motion.span>
                )}
              </Link>
              <AnimatePresence>
                {l.menu && open === l.menu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-1/2 top-full w-[260px] -translate-x-1/2 rounded-lg bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                  >
                    {(l.menu === "services" ? services : industries).map((s) => (
                      <Link key={s.slug} href={`/${l.menu}/${s.slug}`} className="block rounded-md px-4 py-2.5 text-[15px] text-ink transition-colors hover:bg-paper hover:text-brand">
                        {s.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden min-[1000px]:block">
            <Button href="/request-a-quote" variant={light ? "white" : "dark"} size="md" className="!px-5 !py-3">
              Request a Quote
            </Button>
          </div>
          <button aria-label="Menu" onClick={() => setMobile((m) => !m)} className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[6px] min-[1000px]:hidden">
            <span className={`h-[2px] w-6 transition-all ${light ? "bg-white" : "bg-ink"} ${mobile ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-6 transition-all ${light ? "bg-white" : "bg-ink"} ${mobile ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[76px] overflow-y-auto bg-white px-5 pb-10 pt-6 min-[1000px]:hidden">
            {navLinks.map((l, i) => (
              <motion.div key={l.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Link href={l.href} className="h5 block border-b border-ink/10 py-4">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8">
              <Button href="/request-a-quote" variant="brand">Request a Quote</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
