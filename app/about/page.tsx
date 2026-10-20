import type { Metadata } from "next";
import Button from "@/components/Button";
import { PageHero } from "@/components/ui";
import { ZigTimeline, ValuesSection, TeamSection, InfraSection, VideoSection, IntroRow, AboutStats } from "@/components/AboutParts";
import { Reveal, SplitWords, SplitLetters } from "@/components/motion";

export const metadata: Metadata = { title: "About Us - Road Runners Logistics SIA" };

const team = [
  { n: "Daniel Wong", r: "Global Logistics Director", img: "ofowgJPkISel7TKkD8dSax9u4.png" },
  { n: "Sarah Mitchell", r: "Chief Operations Officer", img: "55CDiNQs7AJlpNdO0Y3i4e6pWg.png" },
  { n: "Michael Carter", r: "Chief Executive Officer", img: "nWi859ShPZ5SnvpvtBLVJvLG0.png" },
  { n: "Emily Anderson", r: "Head of Customer Solutions", img: "LREK8Q7gX4aRHjbzjPW3OBepc.png" },
];

const timeline = [
  { y: "2004", img: "umfnAcoprzyW09DGzmlN0dWx8.jpg", t: "Road Runners Begins", d: "We started with a simple ambition — provide dependable transportation and build lasting relationships with customers." },
  { y: "2009", img: "Mu8rXXpGhxQuYpGlLETOEjmJ8Kg.jpg", t: "Expanding Our Network", d: "New regional depots and a growing fleet brought faster, more reliable deliveries to more customers." },
  { y: "2013", img: "PNtw8v25xkIWinnv4TXw7zP0hA.jpg", t: "Going International", d: "As our customers expanded, so did we. International freight services connected Road Runners Logistics SIA to new markets." },
  { y: "2018", img: "Vo0E8SWRovL09Bo0JwRKsGtMrlw.jpg", t: "500K Shipments Delivered", d: "A major milestone that reflects years of customer trust, operational experience, and thousands of successful journeys." },
  { y: "2023", img: "58CBPzN2HetQp0LGHAkohI8vEzs.jpg", t: "Smarter Logistics", d: "Real-time tracking and digital tools gave customers full visibility of every shipment, from pickup to doorstep." },
  { y: "2026", img: "bPjzxcx3yn6IHpi65OcRfm1BKbc.jpg", t: "Moving What Matters", d: "Road Runners Logistics SIA continues to grow as a complete logistics partner, helping businesses move goods across industries and borders." },
];

const values = [
  { t: "Reliability", d: "We do what we say and work to keep every shipment moving according to plan.", icon: "UPBhwewB99epDCSuhbNcxR73vo.svg" },
  { t: "Integrity", d: "We communicate honestly, build trust, and take responsibility when challenges arise.", icon: "PL8RHTJvlaKeVuLZfzpqqIqq4wI.svg" },
  { t: "Efficiency", d: "We find smarter ways to move goods while reducing delays and complexity.", icon: "LcfzSUChrWZsF6J62idVCIvqpA.svg" },
  { t: "Partnership", d: "We work alongside customers, understand their needs, and build solutions for growth.", icon: "1xL3Yj7Z1vmpFvITtj1YB8uAU4A.svg" },
];

const Col = ({ t, d, right = false }: { t: string; d: string; right?: boolean }) => (
  <Reveal className={right ? "max-w-[320px]" : "max-w-[320px]"}>
    <h6 className="h6">{t}</h6>
    <p className="mt-4">{d}</p>
  </Reveal>
);

export default function About() {
  return (
    <>
      <PageHero
        centered
        dim
        letterReveal
        textRight
        title="Reliability in Every Mile."
        text={"25 years of experience built\ninto every step of the journey."}
        image="GOragXkjwjQQkJFAqjsxyfCLBX4.jpg"
        belowTitle={
          <a href="#our-journey" className="group label relative mt-12 inline-block pb-1 text-[18px]">
            About Our Journey
            {/* underline slides away to the left on hover, and returns from the right on leave */}
            <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-white transition-transform duration-[600ms] ease-[cubic-bezier(.65,0,.35,1)] group-hover:origin-left group-hover:scale-x-0" />
          </a>
        }
      />

      {/* intro */}
      <section className="px-[var(--pad)] pb-[260px] pt-[213px] max-[809px]:py-20">
        <div id="our-journey" className="scroll-mt-[120px]" />
        <Reveal><p className="label text-brand">More Than Moving Freight</p></Reveal>
        <SplitWords as="h3" className="h3 mt-4" text="Logistics is about more than getting something from one place to another. It is about keeping production running, shelves stocked, projects on schedule, and promises to customers." stagger={0.02} />
        <div className="mt-8"><Button href="#team" variant="dark" className="!px-[22px] !py-[15px]">Meet the team</Button></div>
        <div className="mt-[90px]">
          <IntroRow
            subtitle="That is why we built Road Runners Logistics SIA around reliability."
            paragraphs={[
              "For more than two decades, we have supported businesses with practical transportation and logistics solutions across local and international markets. From a single shipment to complex supply chains, our teams bring together transportation expertise, global connections, and a hands-on approach.",
              "We believe the best logistics relationships are built on trust, clear communication, and consistently doing what you said you would do.",
            ]}
            photo="VyCxqTFZzzdmsodFFklKvL8ldk.jpg"
          />
        </div>
      </section>

      {/* stats */}
      <section className="px-[var(--pad)] pb-[160px] pt-[75px] max-[809px]:pb-20">
        <SplitWords as="h2" className="h2 mx-auto max-w-[915px] text-center !text-ink/55" text="Built on Trust. Proven Through Every Shipment." />
        <AboutStats items={[["25+", "Years Industry Experience"], ["80+", "Countries Global Network"], ["1M+", "Shipments Delivered"], ["98%", "On-Time Delivery"]]} />
      </section>

      {/* video */}
      <VideoSection poster="rMKhxL0aXu9hC19I3XsqH2bxDL4.jpg">
        <h2 className="h-mega max-w-[780px]"><SplitLetters text="Seamless Vehicle Shipping" stagger={0.02} /></h2>
      </VideoSection>

      {/* timeline */}
      <section className="px-[var(--pad)] pb-[100px] pt-[125px] max-[809px]:py-20">
        <SplitWords as="h2" className="h2 mb-[40px] max-w-[942px]" text="Growing With Our Customers, One Journey at a Time." />
        <ZigTimeline items={timeline} />
      </section>

      {/* infrastructure: text | image | text */}
      <section className="px-[var(--pad)] pb-[150px] pt-[25px] max-[809px]:pb-20">
        <div className="grid grid-cols-2 items-end gap-10 max-[1000px]:grid-cols-1">
          <SplitWords as="h2" className="h2 max-w-[682px]" text="The People, Network, and Infrastructure Behind Every Shipment" />
          <Reveal><p className="p20 max-w-[480px] justify-self-end">Road Runners Logistics SIA brings together the resources and expertise needed to manage shipments from planning through delivery.</p></Reveal>
        </div>
        <InfraSection
          left={[
            { t: "Transportation Fleet", d: "A flexible transportation network designed to support regional, national, and cross-border freight requirements." },
            { t: "Warehousing", d: "Secure storage and distribution facilities that help businesses manage inventory closer to where it is needed." },
          ]}
          right={[
            { t: "Global Network", d: "Trusted logistics partners and operational connections spanning more than 80 countries." },
            { t: "Logistics Professionals", d: "Experienced teams who coordinate transportation, documentation, warehousing, customs, and delivery." },
          ]}
        />
      </section>

      {/* values: panel pinned while the cards travel */}
      <ValuesSection items={values} image="UzdCSK7IE3rwGMRdPP6NuwnSI.jpg">
        <div className="grid grid-cols-2 gap-10 pt-6 max-[1000px]:grid-cols-1">
          <SplitWords as="h2" className="h2 max-w-[520px]" text="Logistics Built on Trust." />
          <div>
            <Reveal><p className="max-w-[389px]">Our technology, infrastructure, and global network matter. But the foundation of Road Runners Logistics SIA has always been our people and the way we work.</p></Reveal>
            <div className="mt-8"><Button href="/request-a-quote" variant="white" className="!px-5 !py-3">Start Your Shipment</Button></div>
          </div>
        </div>
      </ValuesSection>

      {/* partners (centered) */}
      <section className="px-[var(--pad)] py-[150px] text-center max-[809px]:py-20">
        <Reveal><p className="label text-brand">Global Network. Trusted Partners.</p></Reveal>
        <SplitWords as="h2" className="h5 mx-auto mt-6 max-w-[952px]" text="Our partnerships are built on reliability, transparent communication, and the shared commitment to delivering extraordinary results—even under the most demanding conditions." stagger={0.02} />
        <div className="mt-10"><Button href="/partners" variant="dark" hover="scale" className="!px-5 !py-3">View more partners</Button></div>
      </section>

      {/* team */}
      <section id="team" className="px-[var(--pad)] pb-[150px] max-[809px]:pb-20">
        <TeamSection items={team} />
      </section>
    </>
  );
}
