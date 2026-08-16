import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { MemberRows } from "@/components/home/MemberRows";
import { Container } from "@/components/layout/Container";
import { JOIN_URL } from "@/lib/data/links";
import { type CommunityMember, getShowcaseMembers } from "@/lib/members";

/**
 * How many members ride the rows. One card each, split across two rows, so
 * this is also the number of portraits the section downloads.
 */
const MEMBER_LIMIT = 18;

/**
 * The community itself, directly under the hero.
 *
 * Sits below rather than inside the hero on purpose: the hero makes the
 * claim and this is the evidence for it, and evidence reads better after a
 * claim than beside it. Keeping the drifting rows out of the hero also
 * leaves the join CTA as the only moving thing competing for a first-time
 * visitor's attention.
 */
export async function MemberShowcase() {
  let members: CommunityMember[] = [];
  try {
    members = await getShowcaseMembers(MEMBER_LIMIT);
  } catch (error) {
    console.error("MemberShowcase: failed to fetch members", error);
    return null;
  }

  if (members.length === 0) return null;

  return (
    <section className="w-full py-24 md:py-32 bg-black flex flex-col border-t border-zinc-900 overflow-hidden">
      <Container className="w-full font-sans">
        <div className="w-full mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none font-sans">
              Meet the <span className="text-zinc-400">Community</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
              Tech enthusiasts of every kind, at every stage, all in one place.
            </p>
          </div>
          <Link
            href={JOIN_URL}
            // `self-start` keeps the button hugging its label on mobile. As a
            // flex child in a column it would otherwise stretch to the full
            // width and strand the text against the left edge.
            className="self-start md:self-end inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white border border-zinc-700 hover:border-white hover:bg-white hover:text-black px-6 py-3 transition-colors duration-200 group shrink-0"
          >
            Join them{" "}
            <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </div>
      </Container>

      {/* Full-bleed, so the rows genuinely drift off both edges. */}
      <MemberRows members={members} />
    </section>
  );
}
