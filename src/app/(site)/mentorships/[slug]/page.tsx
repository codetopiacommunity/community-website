import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/../prisma/prisma";
import { Container } from "@/components/layout/Container";
import { FlyerDownload } from "@/components/mentorships/FlyerDownload";
import { ShareButton } from "@/components/mentorships/ShareButton";

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
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-inter text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mentorships
          </Link>
        </div>
      </div>
    );

  const statusColor =
    mentorship.status === "open"
      ? "border-green-500/40 text-green-400 bg-green-500/10"
      : mentorship.status === "full"
        ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10"
        : "border-zinc-700 text-zinc-400 bg-zinc-900";

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[420px] overflow-hidden border-b border-zinc-800">
        {mentorship.coverImage ? (
          <Image
            src={mentorship.coverImage}
            alt={mentorship.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back link */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <Container className="px-4">
            <Link
              href="/mentorships"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-inter text-xs uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              All Mentorships
            </Link>
          </Container>
        </div>

        <Container className="relative z-10 h-full flex flex-col justify-end pb-12 px-4">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`text-[10px] font-bold font-space-grotesk uppercase tracking-widest px-2.5 py-1 border ${statusColor}`}
              >
                {mentorship.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95] font-space-grotesk">
              {mentorship.title}
            </h1>
            {mentorship.mentors && mentorship.mentors.length > 0 && (
              <p className="text-zinc-300 text-sm font-inter">
                with{" "}
                <span className="text-white font-semibold font-space-grotesk">
                  {mentorship.mentors.map((m) => m.name).join(", ")}
                </span>
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Body */}
      <section className="py-14">
        <Container className="px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {/* Details row */}
              <div className="flex flex-col md:flex-row gap-px border border-zinc-800">
                {mentorship.startDate && (
                  <div className="flex-1 p-5 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800">
                    <p className="flex items-center gap-2 text-zinc-500 font-inter text-[10px] uppercase tracking-widest mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Start Date
                    </p>
                    <p className="text-white font-black font-space-grotesk text-lg">
                      {new Date(mentorship.startDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                )}
                {mentorship.endDate && (
                  <div className="flex-1 p-5 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800">
                    <p className="flex items-center gap-2 text-zinc-500 font-inter text-[10px] uppercase tracking-widest mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      End Date
                    </p>
                    <p className="text-white font-black font-space-grotesk text-lg">
                      {new Date(mentorship.endDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                )}
                {(mentorship.location || mentorship.isOnline) && (
                  <div className="flex-1 p-5 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-800">
                    <p className="flex items-center gap-2 text-zinc-500 font-inter text-[10px] uppercase tracking-widest mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Location
                    </p>
                    <p className="text-white font-black font-space-grotesk text-lg">
                      {mentorship.location || "Online"}
                    </p>
                  </div>
                )}
                {mentorship.capacity && (
                  <div className="flex-1 p-5 bg-zinc-950">
                    <p className="flex items-center gap-2 text-zinc-500 font-inter text-[10px] uppercase tracking-widest mb-2">
                      <Users className="w-3.5 h-3.5" />
                      Capacity
                    </p>
                    <p className="text-white font-black font-space-grotesk text-lg">
                      {mentorship.capacity} Spots
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              {mentorship.description && (
                <div className="space-y-4 pb-12 border-b border-zinc-800">
                  <h2 className="text-xs font-black font-space-grotesk uppercase tracking-widest text-zinc-400">
                    About This Program
                  </h2>
                  <p className="text-zinc-300 text-base leading-relaxed font-inter whitespace-pre-wrap">
                    {mentorship.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {Array.isArray(mentorship.tags) && mentorship.tags.length > 0 && (
                <div className="space-y-4 pb-12 border-b border-zinc-800">
                  <h3 className="text-xs font-black font-space-grotesk uppercase tracking-widest text-zinc-400">
                    Topics Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mentorship.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-xs font-inter text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors */}
              {mentorship.mentors && mentorship.mentors.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xs font-black font-space-grotesk uppercase tracking-widest text-zinc-400">
                    Your Mentors
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {mentorship.mentors.map((mentor) => (
                      <Link
                        key={mentor.id}
                        href={`/team#${mentor.slug}`}
                        className="relative group w-44 h-44 overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors"
                      >
                        {mentor.imageUrl ? (
                          <Image
                            src={mentor.imageUrl}
                            alt={mentor.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-black font-space-grotesk text-sm leading-tight">
                            {mentor.name}
                          </p>
                          {mentor.role && (
                            <p className="text-zinc-400 font-inter text-[10px] mt-0.5 truncate">
                              {mentor.role}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Flyer with download on hover */}
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
                    className="block w-full bg-white text-black px-4 py-3.5 font-black font-space-grotesk uppercase tracking-tight hover:bg-zinc-100 transition-colors text-center text-sm border border-white"
                  >
                    Apply Now
                  </a>
                ) : (
                  <div className="p-4 bg-zinc-950 border border-zinc-800 text-center">
                    <p className="text-xs text-zinc-500 font-inter">
                      Application link coming soon
                    </p>
                  </div>
                )}

                <ShareButton
                  title={mentorship.title}
                  description={mentorship.description}
                />

                <Link
                  href="/mentorships"
                  className="inline-flex items-center justify-center gap-2 w-full text-zinc-400 hover:text-white transition-colors font-inter text-xs uppercase tracking-widest py-3.5 border border-zinc-800 hover:border-zinc-600 bg-black"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
