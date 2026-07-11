import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/../prisma/prisma";
import { FlyerDownload } from "@/components/mentorships/FlyerDownload";
import { ShareButton } from "@/components/mentorships/ShareButton";

const cx = "mx-auto w-full max-w-screen-2xl px-6 lg:px-12";

const STATUS_STYLES: Record<string, string> = {
  open: "border-green-500/40 text-green-400",
  full: "border-yellow-500/40 text-yellow-400",
  closed: "border-zinc-700 text-zinc-500",
};

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codetopia.community";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const mentorship = await prisma.mentorship.findUnique({
      where: { slug },
      select: {
        title: true,
        description: true,
        coverImage: true,
        status: true,
      },
    });
    if (!mentorship) return { title: "Mentorship — Codetopia" };

    const url = `${BASE_URL}/mentorships/${slug}`;
    const image = mentorship.coverImage ?? `${BASE_URL}/og-default.png`;
    const description =
      mentorship.description?.slice(0, 160) ??
      "A mentorship program by the Codetopia community.";

    return {
      title: `${mentorship.title} — Codetopia Mentorships`,
      description,
      openGraph: {
        title: mentorship.title,
        description,
        url,
        siteName: "Codetopia Community",
        images: [
          { url: image, width: 1200, height: 630, alt: mentorship.title },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: mentorship.title,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: "Mentorship — Codetopia" };
  }
}

export default async function MentorshipDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let mentorship:
    | (Awaited<ReturnType<typeof prisma.mentorship.findUnique>> & {
        mentors: {
          id: number;
          name: string;
          slug: string;
          imageUrl: string | null;
          role: string;
        }[];
      })
    | null = null;

  try {
    mentorship = await prisma.mentorship.findUnique({
      where: { slug },
      include: {
        mentors: {
          select: {
            id: true,
            name: true,
            slug: true,
            imageUrl: true,
            role: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to load mentorship detail", error);
  }

  if (!mentorship)
    return (
      <div className="flex-1 bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white font-black uppercase tracking-tighter text-2xl font-space-grotesk">
            Mentorship not found
          </p>
          <Link
            href="/mentorships"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mentorships
          </Link>
        </div>
      </div>
    );

  const statusStyle = STATUS_STYLES[mentorship.status] ?? STATUS_STYLES.closed;

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* ── Full-bleed hero ── */}
      <div className="relative w-full min-h-[70vh] flex flex-col justify-end overflow-hidden">
        {/* Cover image */}
        {mentorship.coverImage ? (
          <Image
            src={mentorship.coverImage}
            alt={mentorship.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-950" />
        )}
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        {/* Back nav */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-8">
          <div className={cx}>
            <Link
              href="/mentorships"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Mentorships
            </Link>
          </div>
        </div>

        {/* Hero content */}
        <div className={`${cx} relative z-10 pb-16 pt-32`}>
          <div className="flex flex-col gap-5 max-w-4xl">
            <span
              className={`inline-flex w-fit items-center px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold border ${statusStyle}`}
            >
              {mentorship.status}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] font-space-grotesk text-white">
              {mentorship.title}
            </h1>
            {/* Meta row */}
            <div className="flex flex-wrap gap-6 font-mono text-xs text-zinc-400 uppercase tracking-widest">
              {mentorship.startDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(mentorship.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {mentorship.endDate && (
                    <>
                      {" → "}
                      {new Date(mentorship.endDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
                    </>
                  )}
                </span>
              )}
              {(mentorship.location || mentorship.isOnline) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {mentorship.location || "Online"}
                </span>
              )}
              {mentorship.capacity && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {mentorship.capacity} spots
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full border-t border-zinc-800">
        <div className={`${cx} py-16`}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            {/* ── Left: main content ── */}
            <div className="flex flex-col gap-16">
              {/* About */}
              {mentorship.description && (
                <div className="flex flex-col gap-6 pb-16 border-b border-zinc-800">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="text-zinc-600">01 /</span> About This
                    Program
                  </span>
                  <p className="text-zinc-300 text-lg font-mono leading-relaxed whitespace-pre-wrap max-w-2xl">
                    {mentorship.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {Array.isArray(mentorship.tags) && mentorship.tags.length > 0 && (
                <div className="flex flex-col gap-6 pb-16 border-b border-zinc-800">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="text-zinc-600">02 /</span> Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(mentorship.tags as string[]).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs uppercase tracking-widest text-zinc-300 border border-zinc-800 px-4 py-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors */}
              {mentorship.mentors && mentorship.mentors.length > 0 && (
                <div className="flex flex-col gap-8">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="text-zinc-600">03 /</span> Your Mentors
                  </span>
                  <div className="flex flex-col gap-6">
                    {/* Stacked overlapping avatars */}
                    <div className="flex items-center">
                      {mentorship.mentors.map((mentor, i) => (
                        <Link
                          key={mentor.id}
                          href={`/team#${mentor.slug}`}
                          style={{ zIndex: mentorship.mentors.length - i }}
                          className={`relative group w-16 h-16 rounded-full overflow-hidden border-2 border-black ring-1 ring-zinc-800 shrink-0 ${i > 0 ? "-ml-4" : ""}`}
                        >
                          {mentor.imageUrl ? (
                            <Image
                              src={mentor.imageUrl}
                              alt={mentor.name}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                              <span className="text-white font-black text-lg uppercase">
                                {mentor.name[0]}
                              </span>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                    {/* Names list below */}
                    <div className="flex flex-col gap-3">
                      {mentorship.mentors.map((mentor) => (
                        <Link
                          key={mentor.id}
                          href={`/team#${mentor.slug}`}
                          className="group flex items-center gap-4 border-b border-zinc-900 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-zinc-800">
                            {mentor.imageUrl ? (
                              <Image
                                src={mentor.imageUrl}
                                alt={mentor.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                <span className="text-white font-black text-sm uppercase">
                                  {mentor.name[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-black font-space-grotesk text-sm uppercase tracking-tight group-hover:text-zinc-300 transition-colors">
                              {mentor.name}
                            </p>
                            {mentor.role && (
                              <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest truncate">
                                {mentor.role}
                              </p>
                            )}
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-white transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: sidebar ── */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
              {/* Flyer */}
              {mentorship.flyerImage && (
                <FlyerDownload
                  flyerImage={mentorship.flyerImage}
                  title={mentorship.title}
                />
              )}

              {/* Apply */}
              {mentorship.applicationLink ? (
                <a
                  href={mentorship.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between w-full px-6 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black hover:bg-zinc-100 transition-colors"
                >
                  Apply Now
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <div className="px-6 py-4 border border-zinc-800 text-center">
                  <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                    Application link coming soon
                  </p>
                </div>
              )}

              {/* Register as mentor */}
              {mentorship.registrationLink && (
                <a
                  href={mentorship.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between w-full px-6 py-4 border border-zinc-700 text-zinc-300 font-mono text-[10px] uppercase tracking-[0.2em] font-black hover:border-white hover:text-white transition-colors"
                >
                  Register as a Mentor
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              <ShareButton
                title={mentorship.title}
                description={mentorship.description}
              />

              <Link
                href="/mentorships"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
