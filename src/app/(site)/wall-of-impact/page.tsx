import { InstitutionalNote } from "@/components/about/InstitutionalNote";
import { WallOfImpact } from "@/components/about/WallOfImpact";
import { Container } from "@/components/layout/Container";
import { toRecognitionCategory } from "@/lib/data/recognition";
import { fetchPortalRecognitions, getPortalProfileUrl } from "@/lib/portal";

export const revalidate = 60;

/**
 * Entries are loaded here rather than in the client grid so the wall arrives
 * in the HTML — this page exists to name people publicly, which is worth
 * nothing if crawlers and link previews see an empty shell.
 */
async function loadEntries() {
  try {
    const recognitions = await fetchPortalRecognitions(undefined, 60);
    return recognitions.map((r) => ({
      id: r.id,
      slug: r.slug || r.id,
      name: r.fullName || r.username,
      role: r.roleLabel,
      // Empty when the member has no uploaded picture — the wall renders a
      // typographic poster in that case. Don't substitute a generated avatar
      // here: it gets stretched into a 3:4 portrait and looks broken.
      image: r.profilePictureUrl,
      coverImage: r.coverImageUrl,
      category: toRecognitionCategory(r.category),
      awardName: r.awardName,
      period: r.period,
      impactSummary: r.impactSummary,
      domain: r.domain,
      achievements: r.achievements,
      username: r.username,
      profileUrl: getPortalProfileUrl(r.username),
    }));
  } catch (error) {
    // Portal unreachable — render the page with an empty wall rather than
    // failing the whole route.
    console.error("Wall of Impact load failed:", error);
    return [];
  }
}

export default async function ImpactPage() {
  const entries = await loadEntries();

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Impact Hero: Mission Alignment */}
      <section className="w-full pt-32 pb-16 bg-black">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
            <div className="flex-1">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none font-sans">
                THE WALL OF <br />
                <span className="text-zinc-400">IMPACT</span>
              </h1>
              <div className="max-w-2xl">
                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed">
                  A shoutout board for the people showing up in Codetopia
                  Community: the wins, the milestones, and the moments worth
                  celebrating.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main recognition grid */}
      <WallOfImpact items={entries} />

      <section className="pb-32 bg-black border-t border-zinc-900">
        <Container className="px-4 mt-16">
          <InstitutionalNote />
        </Container>
      </section>
    </div>
  );
}
