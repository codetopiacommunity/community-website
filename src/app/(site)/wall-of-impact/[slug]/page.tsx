import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InitialsBackdrop } from "@/components/about/InitialsBackdrop";
import { toRecognitionCategory } from "@/lib/data/recognition";
import {
  fetchPortalRecognition,
  fetchPortalRecognitions,
  getPortalProfileUrl,
} from "@/lib/portal";

const cx = "mx-auto w-full max-w-screen-xl px-5 sm:px-6 lg:px-12";

/** Accent per category. Colour is the only category signal on this page —
 *  no icon, no pill, no label; the award line already says what it is. */
const CATEGORY_ACCENT: Record<string, string> = {
  MEMBER: "text-amber-400",
  VOLUNTEER: "text-sky-400",
  AMBASSADOR: "text-violet-400",
  CORE_TEAM: "text-emerald-400",
  DOMAIN_SPECIFIC: "text-rose-400",
};

function accentFor(category: string) {
  return (
    CATEGORY_ACCENT[toRecognitionCategory(category)] ?? CATEGORY_ACCENT.MEMBER
  );
}

async function loadRecognition(slug: string) {
  try {
    return await fetchPortalRecognition(slug, 60);
  } catch {
    return null;
  }
}

/** The closing links only need a handful, so this asks for four and drops the
 *  current entry — cheaper than pulling the whole wall to find three. */
async function loadSiblings(currentId: string) {
  try {
    const recognitions = await fetchPortalRecognitions({ limit: 4 }, 60);
    return recognitions.filter((r) => r.id !== currentId).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await loadRecognition(slug);
  if (!item) return { title: "Wall of Impact — Codetopia" };
  return {
    title: `${item.awardName} · ${item.fullName} — Codetopia Wall of Impact`,
    description: item.impactSummary,
  };
}

export default async function RecognitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await loadRecognition(slug);
  if (!item) notFound();

  const siblings = await loadSiblings(item.id);

  const memberName = item.fullName || item.username;
  const memberRole = item.roleLabel;
  // Profile pictures are portrait or square, so they're shown at portrait
  // ratio rather than cropped into a landscape band.
  const profileImage = item.profilePictureUrl;
  const accent = accentFor(item.category);
  const categoryLabel =
    toRecognitionCategory(item.category) === "DOMAIN_SPECIFIC" && item.domain
      ? item.domain
      : null;
  const achievements = item.achievements;
  const portalProfileUrl = getPortalProfileUrl(item.username);

  return (
    <div className="flex-1 bg-black text-white min-h-screen pb-24 md:pb-40">
      <div className={`${cx} pt-7 sm:pt-8`}>
        <Link
          href="/wall-of-impact"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Wall of Impact
        </Link>
      </div>

      {/* ── Masthead: portrait and billing, nothing between them ── */}
      <div className={`${cx} pt-10 sm:pt-14 md:pt-20`}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr] gap-8 sm:gap-10 md:gap-14 md:items-end">
          <div className="relative w-[62%] min-w-[180px] max-w-[260px] md:w-full md:max-w-none aspect-[4/5] overflow-hidden bg-zinc-950">
            {profileImage ? (
              // biome-ignore lint/performance/noImgElement: remote cloudinary/portal image
              <img
                src={profileImage}
                alt={memberName}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <InitialsBackdrop name={memberName} accent={accent} />
            )}
          </div>

          <div className="flex flex-col gap-5 sm:gap-6 md:pb-2">
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em]">
              <span className={accent}>{item.awardName}</span>
              <span aria-hidden="true" className="text-zinc-700">
                ·
              </span>
              <span className="text-zinc-500">{item.period}</span>
              {categoryLabel && (
                <>
                  <span aria-hidden="true" className="text-zinc-700">
                    ·
                  </span>
                  <span className="text-zinc-500">{categoryLabel}</span>
                </>
              )}
            </p>

            {/* `w-min` sets the box to the widest word, so the name stacks one
                word per line and reads as a mark. `max-w-full` + break-word
                stop a single long token (a username fallback) overflowing. */}
            <h1 className="font-sans font-black uppercase tracking-tighter leading-[0.82] text-white text-[clamp(2.75rem,13vw,7rem)] w-min max-w-full [overflow-wrap:break-word]">
              {memberName}
            </h1>

            {memberRole && (
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-500">
                {memberRole}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── The citation. It needs no heading; it's the reason for the page. ── */}
      <div className={`${cx} pt-16 sm:pt-20 md:pt-32`}>
        <p className="max-w-4xl font-sans font-medium text-white text-[clamp(1.5rem,4.6vw,3.25rem)] leading-[1.22] tracking-tight text-pretty">
          {item.impactSummary}
        </p>
      </div>

      {/* ── What that looked like in practice ── */}
      {achievements.length > 0 && (
        <div className={`${cx} pt-14 sm:pt-20 md:pt-28`}>
          <ul className="max-w-3xl flex flex-col gap-6 sm:gap-7">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex gap-4 sm:gap-5">
                <span
                  aria-hidden="true"
                  className={`mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-current ${accent}`}
                />
                <span className="font-mono text-sm sm:text-base leading-relaxed text-zinc-400 text-pretty">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── The handoff. Depth about the person lives on their portal
             profile, so this is the page's one real destination and is
             weighted to read as such. ── */}
      {portalProfileUrl && (
        <div className={`${cx} pt-14 sm:pt-20 md:pt-28`}>
          <a
            href={portalProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-baseline gap-3 font-sans text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-300 transition-colors hover:text-white"
          >
            <span
              className={`border-b-2 pb-1 transition-colors ${accent} border-current`}
            >
              <span className="text-zinc-300 transition-colors group-hover:text-white">
                {memberName}&rsquo;s full profile
              </span>
            </span>
            <span
              aria-hidden="true"
              className={`shrink-0 transition-transform group-hover:translate-x-1 ${accent}`}
            >
              &rarr;
            </span>
          </a>
        </div>
      )}

      {/* ── Closing links. The page's one rule, because this is genuinely
             a different kind of content, not just the next section. ── */}
      {siblings.length > 0 && (
        <div className={`${cx} mt-20 sm:mt-28 md:mt-40`}>
          <div className="border-t border-zinc-900 pt-10 sm:pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              {siblings.map((sibling) => {
                const siblingName = sibling.fullName || sibling.username;

                return (
                  <Link
                    key={sibling.id}
                    href={`/wall-of-impact/${sibling.slug || sibling.id}`}
                    className="group flex flex-col gap-2"
                  >
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.25em] ${accentFor(
                        sibling.category,
                      )}`}
                    >
                      {sibling.awardName}
                    </p>
                    <p className="font-sans text-xl sm:text-2xl font-black uppercase tracking-tight leading-none text-zinc-500 transition-colors group-hover:text-white [overflow-wrap:anywhere]">
                      {siblingName}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-700">
                      {sibling.period}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
