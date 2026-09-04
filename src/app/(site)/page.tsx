import { Hero } from "@/components/home/Hero";
import { LatestArticles } from "@/components/home/LatestArticles";
import { MemberShowcase } from "@/components/home/MemberShowcase";
import { Organisations } from "@/components/home/Organisations";
import { OurImpact } from "@/components/home/OurImpact";
import { TechnicalSpotlight } from "@/components/home/TechnicalSpotlight";
import { WhyJoinUs } from "@/components/home/WhyJoinUs";
import { getFeaturedSpotlight } from "@/lib/spotlight";

// ISR, matching the rest of the site. `force-dynamic` meant every single
// visit hit both Postgres and the portal API for content that changes a few
// times a month.
export const revalidate = 60;

export default async function Home() {
  // Via the shared helper, not a query of its own: the teaser and the entry
  // leading /spotlight have to agree on who is featured, and two
  // implementations of that rule will eventually disagree.
  const spotlight = await getFeaturedSpotlight();

  return (
    <div className="w-full flex flex-col">
      <Hero />
      {/* Argument order: make the case, then show the receipts. Members used
          to run before anyone had been told what this place is for, which is
          proof offered to someone who has no claim to weigh it against. */}
      <WhyJoinUs />
      {/* Members come straight after the claim: the section shows every
          discipline and every stage, which is the claim demonstrated rather
          than restated, and it carries the join CTA while interest is
          highest. Faces also read faster than a written impact story. */}
      <MemberShowcase />
      <OurImpact />
      {/* The spotlight is editorial rather than proof, so it sits with the
          articles instead of among the sections making the case. It stays on
          the page because noticing overlooked work is character, and because
          nobody would find the archive from a nav entry alone. */}
      <TechnicalSpotlight spotlight={spotlight} />
      <LatestArticles />
      {/* Sponsors and partners are credibility to cash in after the case is
          made, not an opening act -- so they sit at the end, next to the
          footer CTA, rather than second on the page. */}
      <Organisations />
    </div>
  );
}
