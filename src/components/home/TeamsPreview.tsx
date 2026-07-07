import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { TeamsPreviewScroller } from "@/components/home/TeamsPreviewScroller";
import { Container } from "@/components/layout/Container";
import { getTeamData } from "@/lib/team";

export const revalidate = 60;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function TeamsPreview() {
  let members: Awaited<ReturnType<typeof getTeamData>>["members"] = [];
  try {
    const data = await getTeamData();
    members = data.members;
  } catch (error) {
    console.error("TeamsPreview: failed to fetch team data", error);
    return null;
  }

  if (members.length === 0) return null;

  return (
    <section className="w-full py-32 bg-black flex flex-col border-t border-zinc-900 overflow-hidden">
      <Container className="w-full px-4 font-sans">
        <div className="w-full mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none font-sans">
              The <span className="text-zinc-600">Team</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-mono max-w-2xl">
              Meet the humans behind Codetopia Community.
            </p>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-6 py-3 transition-colors duration-200 group shrink-0"
          >
            View all team{" "}
            <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      <TeamsPreviewScroller members={shuffle(members)} />
    </section>
  );
}
