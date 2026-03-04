import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/home/Newsletter";
import { OurImpact } from "@/components/home/OurImpact";
import { Stats } from "@/components/home/Stats";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Stats />
      <WhatWeOffer />
      <OurImpact />
      <Newsletter />
      <CTA />
    </div>
  );
}
