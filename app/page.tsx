import Hero from "@/components/home/Hero";
import { Business, Numbers, Experience } from "@/components/home/Business";
import { Why, ServicesGrid } from "@/components/home/Why";
import { IndustriesSlider } from "@/components/home/Industries";
import { Process } from "@/components/home/Process";
import { Testimonials, Articles, CtaBanner } from "@/components/home/Bottom";

export default function Home() {
  return (
    <>
      <Hero />
      <Business />
      <Numbers />
      <Experience />
      <Why />
      <ServicesGrid />
      <IndustriesSlider />
      <Process />
      <Testimonials />
      <Articles />
      <CtaBanner />
    </>
  );
}
