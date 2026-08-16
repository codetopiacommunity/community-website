import { prisma } from "@/../prisma/prisma";
import { Hero } from "@/components/home/Hero";
import { LatestArticles } from "@/components/home/LatestArticles";
import { MemberShowcase } from "@/components/home/MemberShowcase";
import { Organisations } from "@/components/home/Organisations";
import { OurImpact } from "@/components/home/OurImpact";
import { TeamsPreview } from "@/components/home/TeamsPreview";
import { TechnicalSpotlight } from "@/components/home/TechnicalSpotlight";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import type { Spotlight } from "@/types";

// ISR, matching the rest of the site. `force-dynamic` meant every single
// visit hit both Postgres and the portal API for content that changes a few
// times a month.
export const revalidate = 60;

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
      <MemberShowcase />
      <TechnicalSpotlight spotlight={spotlight} />
      <WhatWeOffer />
      <OurImpact />
      <TeamsPreview />
      <LatestArticles />
      {/* Sponsors and partners are credibility to cash in after the case is
          made, not an opening act -- so they sit at the end, next to the
          footer CTA, rather than second on the page. */}
      <Organisations />
    </div>
  );
}
