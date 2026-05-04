import { prisma } from "@/../prisma/prisma";
import { Hero } from "@/components/home/Hero";
import { LatestArticles } from "@/components/home/LatestArticles";
import { Organisations } from "@/components/home/Organisations";
import { OurImpact } from "@/components/home/OurImpact";
import { Stats } from "@/components/home/Stats";
import { TechnicalSpotlight } from "@/components/home/TechnicalSpotlight";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import type { Spotlight } from "@/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  let spotlight: Spotlight | null = null;
  try {
    const raw = await prisma.spotlight.findFirst({ where: { featured: true } });
    if (raw) {
      spotlight = {
        ...raw,
        links: raw.links as unknown as Spotlight["links"],
        createdAt: raw.createdAt.toISOString(),
        updatedAt: raw.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error("Home: failed to fetch spotlight", error);
  }

  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Organisations />
      <Stats />
      <TechnicalSpotlight spotlight={spotlight} />
      <WhatWeOffer />
      <OurImpact />
      <LatestArticles />
    </div>
  );
}
