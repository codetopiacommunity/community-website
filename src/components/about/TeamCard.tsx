"use client";

import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Github,
  Globe,
  Link2,
  Linkedin,
  MapPin,
  Twitter,
  X,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import React from "react";
import logo from "@/assets/images/logos/codetopia-community.png";

export interface TeamMemberSocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface TeamMemberCareerProgression {
  id: number | string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface TeamMember {
  id?: number | string;
  slug?: string;
  name: string;
  role: string;
  imageUrl?: string | StaticImageData | null;
  image?: string | StaticImageData | null;
  statement?: string;
  expertise?: string[];
  tier?: string;
  position?: string | null;
  location?: string | null;
  joinedAt?: string | null;
  communityProfileUrl?: string | null;
  socialLinks?: TeamMemberSocialLink[];
  careerProgressions?: TeamMemberCareerProgression[];
  socials?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    website?: string | null;
  };
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;
}

interface TeamCardProps {
  member: TeamMember;
  onSelect?: (member: TeamMember) => void;
}

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "CT";
}

function resolveSocialHref(
  kind: "github" | "linkedin" | "twitter",
  value: string,
) {
  if (value.startsWith("http")) return value;
  if (kind === "github") return `https://github.com/${value}`;
  if (kind === "linkedin") return `https://linkedin.com/in/${value}`;
  return `https://twitter.com/${value}`;
}

function formatJoinedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatShortDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatCareerRange(startDate: string, endDate: string | null): string {
  const start = formatShortDate(startDate);
  const end = endDate ? formatShortDate(endDate) : "Present";
  const range = start ? `${start} — ${end}` : end;
  const duration = formatCareerDuration(startDate, endDate);
  return duration ? `${range} · ${duration}` : range;
}

function formatCareerDuration(
  startDate: string,
  endDate: string | null,
): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  months = Math.max(months, 1);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remainingMonths > 0 || years === 0) {
    parts.push(`${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`);
  }
  return parts.join(" ");
}

const BULLET_PATTERN = /^[-*•–]\s+/;

function getBulletItems(description: string): string[] | null {
  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2 || !lines.every((line) => BULLET_PATTERN.test(line))) {
    return null;
  }

  return lines.map((line) => line.replace(BULLET_PATTERN, ""));
}

function CareerDescription({ description }: { description: string }) {
  const bullets = getBulletItems(description);

  if (bullets) {
    return (
      <ul className="mt-2 space-y-1 list-disc list-inside text-zinc-400 font-mono text-sm leading-relaxed">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-zinc-400 font-mono text-sm leading-relaxed mt-2">
      {description}
    </p>
  );
}

export function TeamCard({ member, onSelect }: TeamCardProps) {
  const imageSource = member.imageUrl || member.image;
  const initials = getInitials(member.name);

  return (
    // biome-ignore lint/a11y/useSemanticElements: contains nested <button> social links, which a real <button> can't hold
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(member)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(member);
        }
      }}
      className="group relative bg-black flex flex-col hover:bg-zinc-950 transition-all overflow-hidden border border-zinc-900 aspect-[4/5] w-full cursor-pointer"
    >
      {/* Visual Asset: Grayscale Image */}
      <div className="relative h-full w-full overflow-hidden">
        {imageSource ? (
          <Image
            src={imageSource}
            alt={member.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white transition-all duration-700 group-hover:bg-zinc-900 group-hover:scale-105">
            <span className="font-mono text-4xl font-bold tracking-widest text-zinc-300 md:text-5xl">
              {initials}
            </span>
          </div>
        )}

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:from-black group-hover:via-black/80 transition-all duration-700 z-10" />

        {/* Main Content: Persistent Bottom State */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end">
          <div className="transform group-hover:-translate-y-1 transition-transform duration-500">
            <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white leading-none font-sans line-clamp-1">
              {member.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Full profile modal, opened on card click ------------------------ */
export function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const imageSource = member.imageUrl || member.image;
  const initials = getInitials(member.name);
  const github = member.socials?.github || member.github;
  const linkedin = member.socials?.linkedin || member.linkedin;
  const twitter = member.socials?.twitter || member.twitter;
  const website = member.socials?.website || member.website;
  const joined = member.joinedAt ? formatJoinedDate(member.joinedAt) : "";
  const [bioExpanded, setBioExpanded] = React.useState(false);
  const BIO_CLAMP_THRESHOLD = 240;
  const isBioLong = (member.statement?.length ?? 0) > BIO_CLAMP_THRESHOLD;
  const [experienceExpanded, setExperienceExpanded] = React.useState(false);
  const EXPERIENCE_CLAMP_COUNT = 4;
  const careerProgressions = member.careerProgressions ?? [];
  const hasMoreExperience = careerProgressions.length > EXPERIENCE_CLAMP_COUNT;
  const visibleExperience =
    hasMoreExperience && !experienceExpanded
      ? careerProgressions.slice(0, EXPERIENCE_CLAMP_COUNT)
      : careerProgressions;
  const detailsRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  React.useEffect(() => {
    const el = detailsRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    function updateScrollHint() {
      if (!el) return;
      setShowScrollHint(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
    }

    updateScrollHint();
    el.addEventListener("scroll", updateScrollHint);
    // Observes the content div (not `el`) since `el` is the fixed-size
    // scroll container -- its own box never resizes when inner content does.
    const resizeObserver = new ResizeObserver(updateScrollHint);
    resizeObserver.observe(content);

    return () => {
      el.removeEventListener("scroll", updateScrollHint);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-default w-full h-full animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-label="Close profile"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-member-modal-title"
        className="relative w-full max-w-5xl lg:h-[560px] bg-black border border-white/20 shadow-2xl flex flex-col lg:flex-row max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-white hover:rotate-90 transition-transform p-2 bg-black border border-zinc-800"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        <Image
          src={logo}
          alt="Codetopia Community"
          width={84}
          height={84}
          unoptimized
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-30 w-12 h-12 md:w-[84px] md:h-[84px] object-contain opacity-70"
        />

        {/* Photo column */}
        <div className="w-full aspect-[4/5] max-h-[38vh] lg:aspect-auto lg:max-h-none lg:h-auto lg:w-2/5 relative bg-zinc-900 shrink-0">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={member.name}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <span className="font-mono text-6xl font-black tracking-widest text-zinc-700">
                {initials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          {imageSource && (
            <div className="absolute inset-0 shadow-[inset_0_0_80px_20px_rgba(0,0,0,0.3)]" />
          )}

          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
              {member.role}
            </p>
            <h3
              id="team-member-modal-title"
              className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none font-sans"
            >
              {member.name}
            </h3>
            {member.position && (
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-2">
                {member.position}
              </p>
            )}
          </div>
        </div>

        {/* Details column */}
        <div className="relative w-full lg:w-3/5 min-h-0 flex flex-col">
          <div
            ref={detailsRef}
            className="flex-1 min-h-0 p-5 pb-16 sm:p-8 sm:pb-20 md:p-12 md:pb-20 overflow-y-auto bg-black no-scrollbar text-left font-sans"
          >
            <div ref={contentRef} className="space-y-7 sm:space-y-10">
              <div className="flex flex-wrap items-center gap-5">
                {member.location && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {member.location}
                  </span>
                )}
                {joined && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
                    <CalendarDays className="w-3.5 h-3.5" />
                    Since {joined}
                  </span>
                )}
              </div>

              {member.statement && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest font-medium text-zinc-500 mb-3">
                    Bio
                  </h4>
                  <p
                    className={`text-zinc-300 font-mono text-sm leading-relaxed ${
                      isBioLong && !bioExpanded ? "line-clamp-4" : ""
                    }`}
                  >
                    {member.statement}
                  </p>
                  {isBioLong && (
                    <button
                      type="button"
                      onClick={() => setBioExpanded((prev) => !prev)}
                      className="mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                      {bioExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              )}

              {member.expertise && member.expertise.length > 0 && (
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-widest font-medium text-zinc-500 mb-3">
                    Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-2.5 py-1 border border-zinc-800 bg-zinc-950 text-zinc-300 font-mono text-[10px] uppercase tracking-widest"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {careerProgressions.length > 0 && (
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-widest font-medium text-zinc-500 mb-3">
                    Experience
                  </h5>
                  <div>
                    {visibleExperience.map((entry, index, all) => (
                      <div
                        key={entry.id}
                        className="relative pl-5 pb-6 last:pb-0"
                      >
                        <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-500" />
                        {index < all.length - 1 && (
                          <span className="absolute left-[3px] top-4 bottom-0 w-px bg-zinc-800" />
                        )}
                        <p className="text-white font-mono text-sm font-semibold">
                          {entry.title}
                        </p>
                        {entry.organization && (
                          <p className="text-zinc-300 font-mono text-sm">
                            {entry.organization}
                          </p>
                        )}
                        <p className="text-zinc-500 font-mono text-[10px] tracking-widest mt-1">
                          {formatCareerRange(entry.startDate, entry.endDate)}
                        </p>
                        {entry.description && (
                          <CareerDescription description={entry.description} />
                        )}
                      </div>
                    ))}
                  </div>
                  {hasMoreExperience && (
                    <button
                      type="button"
                      onClick={() => setExperienceExpanded((prev) => !prev)}
                      className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                      {experienceExpanded
                        ? "Show less"
                        : `Show all ${careerProgressions.length}`}
                    </button>
                  )}
                </div>
              )}

              {member.communityProfileUrl && member.slug && (
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-widest font-medium text-zinc-500 mb-3">
                    Community Profile
                  </h5>
                  <a
                    href={member.communityProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    @{member.slug}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {(github ||
                linkedin ||
                twitter ||
                website ||
                (member.socialLinks && member.socialLinks.length > 0)) && (
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-widest font-medium text-zinc-500 mb-3">
                    Find {member.name.split(" ")[0]} online
                  </h5>
                  <div className="flex flex-wrap items-center gap-5">
                    {github && github !== "#" && (
                      <a
                        href={resolveSocialHref("github", github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-zinc-400 hover:text-white hover:scale-110 transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {linkedin && linkedin !== "#" && (
                      <a
                        href={resolveSocialHref("linkedin", linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-zinc-400 hover:text-white hover:scale-110 transition-all"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {twitter && twitter !== "#" && (
                      <a
                        href={resolveSocialHref("twitter", twitter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter / X"
                        className="text-zinc-400 hover:text-white hover:scale-110 transition-all"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                        className="text-zinc-400 hover:text-white hover:scale-110 transition-all"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {member.socialLinks
                      ?.filter((link) => link.url.trim())
                      .map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label || link.platform}
                          className="text-zinc-400 hover:text-white hover:scale-110 transition-all"
                        >
                          <Link2 className="w-5 h-5" />
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
            {showScrollHint && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-center pb-2">
                <ChevronDown className="w-4 h-4 text-zinc-400 animate-bounce" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
