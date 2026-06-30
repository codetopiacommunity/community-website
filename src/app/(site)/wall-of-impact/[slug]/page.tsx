import { Activity, ArrowLeft, Award, Shield, Star, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/../prisma/prisma";
import { fetchPortalMembers } from "@/lib/portal";

const cx = "mx-auto w-full max-w-screen-2xl px-6 lg:px-12";

const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; label: string; accent: string }
> = {
  MEMBER: {
    icon: Star,
    label: "Member",
    accent: "text-amber-400 border-amber-400/40",
  },
  VOLUNTEER: {
    icon: Shield,
    label: "Volunteer",
    accent: "text-sky-400 border-sky-400/40",
  },
  AMBASSADOR: {
    icon: Award,
    label: "Ambassador",
    accent: "text-violet-400 border-violet-400/40",
  },
  CORE_TEAM: {
    icon: Trophy,
    label: "Core Team",
    accent: "text-emerald-400 border-emerald-400/40",
  },
  DOMAIN_SPECIFIC: {
    icon: Activity,
    label: "Domain",
    accent: "text-rose-400 border-rose-400/40",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await prisma.recognition.findUnique({ where: { slug } });
    if (!item) return { title: "Wall of Impact — Codetopia" };
    return {
      title: `${item.awardName} · ${item.portalUsername} — Codetopia Wall of Impact`,
      description: item.impactSummary,
    };
  } catch {
    return { title: "Wall of Impact — Codetopia" };
  }
}

export default async function RecognitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await prisma.recognition.findUnique({ where: { slug } });
  if (!item || !item.isPublished) notFound();

  let memberName = item.portalUsername;
  let memberRole = item.roleLabel ?? "";
  let profileImage = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(item.portalUsername)}`;
  let coverImage = "";

  try {
    const members = await fetchPortalMembers(
      { search: item.portalUsername },
      60,
    );
    const match = members.find(
      (m) => m.username.toLowerCase() === item.portalUsername.toLowerCase(),
    );
    if (match) {
      memberName = match.fullName || item.portalUsername;
      memberRole = item.roleLabel || match.communityRoles?.[0] || "";
      profileImage = match.profilePictureUrl || profileImage;
      coverImage = match.coverImageUrl || "";
    }
  } catch {
    // Portal unreachable — use fallbacks
  }

  const heroImage = coverImage || profileImage;
  const meta = CATEGORY_META[item.category] ?? CATEGORY_META.MEMBER;
  const Icon = meta.icon;
  const categoryLabel =
    item.category === "DOMAIN_SPECIFIC" && item.domain
      ? item.domain
      : meta.label;
  const achievements = item.achievements as string[];

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* ── Full-bleed hero ── */}
      <div className="relative w-full min-h-[75vh] flex flex-col justify-end overflow-hidden">
        {/* biome-ignore lint/performance/noImgElement: remote cloudinary/portal image */}
        <img
          src={heroImage}
          alt={memberName}
          className="absolute inset-0 h-full w-full object-cover object-top grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        {/* Back nav */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-8">
          <div className={cx}>
            <Link
              href="/wall-of-impact"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Wall of Impact
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className={`${cx} relative z-10 pb-16 pt-32`}>
          <div className="flex flex-col gap-5 max-w-4xl">
            {/* Category + period badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold border bg-black/40 backdrop-blur-sm ${meta.accent}`}
              >
                <Icon className="w-3 h-3" />
                {categoryLabel}
              </span>
              <span className="px-4 py-1 border border-zinc-700 bg-black/40 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                {item.period}
              </span>
            </div>

            {/* Award pill */}
            <div className="inline-block bg-white px-5 py-2 self-start">
              <p className="font-mono text-xs uppercase tracking-[0.25em] font-black text-black leading-none">
                {item.awardName}
              </p>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] font-sans text-white">
              {memberName}
            </h1>

            {memberRole && (
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">
                {memberRole}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full border-t border-zinc-800">
        <div className={`${cx} py-16`}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            {/* Left: content */}
            <div className="flex flex-col gap-16">
              {/* Impact summary */}
              <div className="flex flex-col gap-6 pb-16 border-b border-zinc-800">
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="text-white/10">01 /</span> The Impact
                </span>
                <p className="text-zinc-300 text-xl md:text-2xl font-mono leading-relaxed italic max-w-2xl">
                  "{item.impactSummary}"
                </p>
              </div>

              {/* Domain of Excellence */}
              {item.category === "DOMAIN_SPECIFIC" && item.domain && (
                <div className="flex flex-col gap-6 pb-16 border-b border-zinc-800">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="text-white/10">02 /</span> Domain of
                    Excellence
                  </span>
                  <div className="border border-rose-400/20 bg-rose-400/5 px-6 py-4 self-start">
                    <p className="text-rose-400 font-black font-mono text-lg uppercase tracking-widest">
                      {item.domain}
                    </p>
                  </div>
                </div>
              )}

              {/* Key achievements */}
              {achievements.length > 0 && (
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="text-white/10">
                      {item.category === "DOMAIN_SPECIFIC" && item.domain
                        ? "03"
                        : "02"}{" "}
                      /
                    </span>{" "}
                    Key Achievements
                  </span>
                  <ul className="flex flex-col gap-4">
                    {achievements.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-4 border-b border-zinc-900 pb-4 last:border-0 last:pb-0"
                      >
                        <span className="text-zinc-700 font-mono text-sm shrink-0 mt-0.5">
                          —
                        </span>
                        <span className="text-zinc-400 font-mono text-sm leading-relaxed">
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: sticky sidebar */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
              {/* Profile photo (portrait) */}
              <div className="w-full aspect-[4/5] overflow-hidden border border-zinc-800 bg-zinc-900 relative">
                {/* biome-ignore lint/performance/noImgElement: remote cloudinary/portal image */}
                <img
                  src={profileImage}
                  alt={memberName}
                  className="absolute inset-0 h-full w-full object-cover object-top grayscale"
                />
              </div>

              {/* Info card */}
              <div className="border border-zinc-800 bg-zinc-950 p-5 flex flex-col gap-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                  Honoree
                </p>
                <div className="min-w-0">
                  <p className="text-white font-black font-sans text-base uppercase tracking-tight">
                    {memberName}
                  </p>
                  {memberRole && (
                    <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mt-0.5">
                      {memberRole}
                    </p>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-4 space-y-3">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-1">
                      Award
                    </p>
                    <p className="text-white font-black font-mono text-xs uppercase tracking-widest">
                      {item.awardName}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-1">
                      Period
                    </p>
                    <p className="text-white font-mono text-xs uppercase tracking-widest">
                      {item.period}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-1">
                      Category
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest font-bold ${meta.accent.split(" ")[0]}`}
                    >
                      <Icon className="w-3 h-3" />
                      {categoryLabel}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/wall-of-impact"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Wall of Impact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 py-4">
        <p className="text-center font-mono text-[8px] uppercase tracking-[0.5em] text-zinc-700">
          Codetopia · Wall of Impact
        </p>
      </div>
    </div>
  );
}
