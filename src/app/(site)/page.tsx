import { prisma } from "@/../prisma/prisma";
import { Hero } from "@/components/home/Hero";
import { LatestArticles } from "@/components/home/LatestArticles";
import { MemberShowcase } from "@/components/home/MemberShowcase";
import { Organisations } from "@/components/home/Organisations";
import { OurImpact } from "@/components/home/OurImpact";
import { TechnicalSpotlight } from "@/components/home/TechnicalSpotlight";
import { WhyJoinUs } from "@/components/home/WhyJoinUs";
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
      {/* Argument order: make the case, then show the receipts. Members and
          spotlights used to run before anyone had been told what this place
          is for, which is proof offered to someone who has no claim to
          weigh it against. */}
      <WhyJoinUs />
      {/* Members come straight after the claim: the section shows every
          discipline and every stage, which is the claim demonstrated rather
          than restated, and it carries the join CTA while interest is
          highest. Faces also read faster than a written impact story. */}
      <MemberShowcase />
      <OurImpact />
      {/* The spotlight is editorial, not proof -- it features outside names
          as often as our own -- so it sits with the articles rather than
          among the sections making the case. */}
      <TechnicalSpotlight spotlight={spotlight} />
      <LatestArticles />
      {/* Sponsors and partners are credibility to cash in after the case is
          made, not an opening act -- so they sit at the end, next to the
          footer CTA, rather than second on the page. */}
      <Organisations />
    </div>
  );
}
