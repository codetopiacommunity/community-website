import Link from "next/link";
import { WallOfImpact } from "@/components/about/WallOfImpact";
import { PageHeader } from "@/components/layout/PageHeader";
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
      <PageHeader title="Wall of Impact">
        Members who made a real difference here. Team leads add them.{" "}
        <Link
          href="/howtos/contributing/help-out"
          className="underline underline-offset-4 hover:text-white transition-colors duration-200"
        >
          See how to help
        </Link>
        .
      </PageHeader>

      {/* Main recognition grid */}
      <WallOfImpact items={entries} />
    </div>
  );
}
