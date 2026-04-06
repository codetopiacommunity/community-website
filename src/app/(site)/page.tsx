import { Hero } from "@/components/home/Hero";
import { LatestArticles } from "@/components/home/LatestArticles";
import { Organisations } from "@/components/home/Organisations";
import { OurImpact } from "@/components/home/OurImpact";
import { Stats } from "@/components/home/Stats";
import { TechnicalSpotlight } from "@/components/home/TechnicalSpotlight";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Organisations />
      <Stats />
      <TechnicalSpotlight />
      <WhatWeOffer />
      <OurImpact />
      <LatestArticles />
    </div>
  );
}
