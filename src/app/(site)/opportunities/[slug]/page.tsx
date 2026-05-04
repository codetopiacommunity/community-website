import { differenceInDays, format } from "date-fns";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Star,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/../prisma/prisma";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let career = null;
  try {
    career = await prisma.career.findUnique({ where: { slug } });
  } catch (error) {
    console.error("CareerDetailPage: failed to fetch career", error);
  }
  if (!career) notFound();

  // Treat expired or closed as not found on the public side
  const now = new Date();
  const expiry = new Date(career.expiryDate);
  const isExpired = career.status === "closed" || expiry < now;
  if (isExpired) notFound();

  const daysLeft = differenceInDays(expiry, now);
  const isUrgent = daysLeft <= 7;

  const desc = career;

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Top bar */}
      <div className="w-full border-b border-zinc-900 pt-28 pb-0">
        <Container className="px-4">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors group mb-10"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            All Opportunities
          </Link>
        </Container>
      </div>

      {/* Hero */}
      <section className="w-full border-b border-zinc-900 py-16 md:py-24">
        <Container className="px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="flex flex-col gap-6 max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {career.isFeatured && (
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] bg-white text-black px-2 py-1 font-black">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Featured
                  </span>
                )}
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] border border-zinc-800 text-zinc-400 px-2 py-1">
                  {career.type}
                </span>
                {desc.duration && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] border border-zinc-800 text-zinc-400 px-2 py-1 flex items-center gap-1">
                    <Timer className="h-2.5 w-2.5" />
                    {desc.duration}
                  </span>
                )}
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-black ${
                    isUrgent
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                  }`}
                >
                  {daysLeft === 0
                    ? "Expires today"
                    : daysLeft === 1
                      ? "1 day left"
                      : `${daysLeft} days left`}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-sans">
                {career.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-zinc-600" />
                  {career.company}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-zinc-600" />
                  {career.location}
                </span>
                {career.duration && (
                  <span className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-zinc-600" />
                    {career.duration}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-zinc-600" />
                  Posted {format(new Date(career.createdAt), "MMM d, yyyy")}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-zinc-600" />
                  Closes {format(expiry, "MMM d, yyyy")}
                </span>
              </div>
            </div>

            {/* CTA — desktop */}
            <div className="hidden md:flex flex-col gap-3 shrink-0">
              {career.link ? (
                <Link
                  href={career.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 px-8 py-5 bg-white text-black font-mono text-[10px] uppercase tracking-[0.25em] font-black hover:bg-zinc-200 transition-all"
                >
                  Apply Now
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              ) : (
                <div className="flex items-center gap-4 px-8 py-5 bg-zinc-900 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.25em] font-black border border-zinc-800 cursor-not-allowed">
                  <Briefcase className="w-4 h-4" />
                  No Application Link
                </div>
              )}
              <span className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest text-center">
                via {career.company}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="w-full py-16 md:py-24">
        <Container className="px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
            {/* Left: description + requirements */}
            <div className="flex flex-col gap-16">
              {/* About the role */}
              <div className="flex flex-col gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                  <span className="text-white/10">01 /</span> About the Role
                </span>
                <p className="text-zinc-300 font-mono text-sm leading-relaxed">
                  {desc.aboutRole}
                </p>
              </div>

              {/* Responsibilities */}
              {desc.responsibilities.length > 0 && (
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                    <span className="text-white/10">02 /</span> Responsibilities
                  </span>
                  <ul className="flex flex-col divide-y divide-zinc-900">
                    {desc.responsibilities.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-start gap-4 py-4 group"
                      >
                        <span className="font-mono text-[9px] text-zinc-700 w-6 shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-zinc-300 font-mono text-sm group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {career.requirements.length > 0 && (
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                    <span className="text-white/10">03 /</span> Requirements
                    &amp; Skills
                  </span>
                  <ul className="flex flex-col divide-y divide-zinc-900">
                    {career.requirements.map((req, i) => (
                      <li
                        key={req}
                        className="flex items-center gap-4 py-4 group"
                      >
                        <span className="font-mono text-[9px] text-zinc-700 w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-zinc-300 font-mono text-sm group-hover:text-white transition-colors">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nice to Have */}
              {desc.niceToHave.length > 0 && (
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                    <span className="text-white/10">04 /</span> Nice to Have
                  </span>
                  <ul className="flex flex-col gap-3">
                    {desc.niceToHave.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-zinc-700 mt-0.5 shrink-0" />
                        <span className="text-zinc-400 font-mono text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We Offer */}
              {desc.whatWeOffer.length > 0 && (
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                    <span className="text-white/10">05 /</span> What We Offer
                  </span>
                  <ul className="flex flex-col gap-3">
                    {desc.whatWeOffer.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Sparkles className="h-4 w-4 text-zinc-700 mt-0.5 shrink-0" />
                        <span className="text-zinc-400 font-mono text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How to Apply */}
              {desc.howToApply && (
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                    <span className="text-white/10">06 /</span> How to Apply
                  </span>
                  <p className="text-zinc-300 font-mono text-sm leading-relaxed">
                    {desc.howToApply}
                  </p>
                </div>
              )}
            </div>

            {/* Right: sticky sidebar */}
            <aside className="flex flex-col gap-6">
              <div className="sticky top-36 flex flex-col gap-4">
                {/* Summary card */}
                <div className="border border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                    Position Summary
                  </span>

                  <div className="flex flex-col gap-4">
                    {[
                      {
                        label: "Company",
                        value: career.company,
                        icon: Building2,
                      },
                      {
                        label: "Location",
                        value: career.location,
                        icon: MapPin,
                      },
                      { label: "Type", value: career.type, icon: Briefcase },
                      ...(desc.duration
                        ? [
                            {
                              label: "Duration",
                              value: desc.duration,
                              icon: Timer,
                            },
                          ]
                        : []),
                      {
                        label: "Closes",
                        value: format(expiry, "MMM d, yyyy"),
                        icon: Calendar,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon className="h-4 w-4 text-zinc-700 mt-0.5 shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                            {label}
                          </span>
                          <span className="font-mono text-xs text-zinc-300">
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Countdown */}
                  <div
                    className={`flex items-center justify-between p-3 border ${
                      isUrgent
                        ? "border-red-500/20 bg-red-500/5"
                        : "border-zinc-800 bg-zinc-900"
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                      Time Remaining
                    </span>
                    <span
                      className={`font-mono text-sm font-black ${
                        isUrgent ? "text-red-400" : "text-white"
                      }`}
                    >
                      {daysLeft === 0
                        ? "Today"
                        : daysLeft === 1
                          ? "1 day"
                          : `${daysLeft} days`}
                    </span>
                  </div>
                </div>

                {/* CTA — mobile + sidebar */}
                {career.link ? (
                  <Link
                    href={career.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-6 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.25em] font-black hover:bg-zinc-200 transition-all"
                  >
                    Apply Now
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.25em] font-black border border-zinc-800 cursor-not-allowed">
                    No Application Link
                    <ArrowUpRight className="w-4 h-4 opacity-20" />
                  </div>
                )}

                <Link
                  href="/opportunities"
                  className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 hover:text-zinc-400 transition-colors text-center"
                >
                  ← View all opportunities
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
