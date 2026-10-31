"use client";

import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  MapPin,
  Twitter,
  X,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import React from "react";
import logo from "@/assets/images/logos/codetopia-community.png";
import { getCountryFlag } from "@/lib/country";

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

export function TeamCard({ member, onSelect }: TeamCardProps) {
  const imageSource = member.imageUrl || member.image;
  const initials = getInitials(member.name);
  const countryFlag = getCountryFlag(member.location);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(member)}
      className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden border border-zinc-900 bg-black text-left transition-all hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {/* Visual Asset: Grayscale Image */}
      <span className="relative block h-full w-full overflow-hidden">
        {imageSource ? (
          <Image
            src={imageSource}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-zinc-950 text-white transition-all duration-700 group-hover:bg-zinc-900 group-hover:scale-105">
            <span className="font-mono text-3xl font-bold text-zinc-300 sm:text-4xl md:text-5xl">
              {initials}
            </span>
          </span>
        )}

        {/* Subtle Gradient Overlays */}
        <span className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-700 z-10" />

        {/* Just the flag: the country is said for screen readers only. */}
        {countryFlag && (
          <span className="absolute top-3 left-3 z-20 inline-flex">
            <span
              className={`fi fi-${countryFlag.code} text-base leading-none`}
              aria-hidden="true"
            />
            <span className="sr-only">{countryFlag.country}</span>
          </span>
        )}

        {/* Shown on hover: the card opens more about them. */}
        <span className="absolute top-2 right-2 z-20 inline-flex h-8 w-8 items-center justify-center bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>

        {/* Main Content: Persistent Bottom State */}
        <span className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-3 sm:p-5 lg:p-6">
          <span className="block transform group-hover:-translate-y-1 transition-transform duration-500">
            <span className="block uppercase tracking-tighter text-lg sm:text-2xl font-bold text-white leading-none font-sans line-clamp-2 break-words">
              {member.name}
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

/* --- Member popup, opened on card click ------------------------------ */
// A short introduction, not a second profile: who they are, a few lines of
// bio, and a way through to their full profile on the portal, which has the
// rest. Members without a portal profile have nowhere else to send people,
// so theirs keeps the full bio, skills and links.
export function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const imageSource = member.imageUrl || member.image;
  const initials = getInitials(member.name);
  const profileUrl = member.communityProfileUrl;
  const github = member.socials?.github || member.github;
  const linkedin = member.socials?.linkedin || member.linkedin;
  const twitter = member.socials?.twitter || member.twitter;
  const website = member.socials?.website || member.website;
  const links = [
    github && github !== "#"
      ? {
          label: "GitHub",
          href: resolveSocialHref("github", github),
          icon: Github,
        }
      : null,
    linkedin && linkedin !== "#"
      ? {
          label: "LinkedIn",
          href: resolveSocialHref("linkedin", linkedin),
          icon: Linkedin,
        }
      : null,
    twitter && twitter !== "#"
      ? {
          label: "X",
          href: resolveSocialHref("twitter", twitter),
          icon: Twitter,
        }
      : null,
    website ? { label: "Website", href: website, icon: Globe } : null,
  ].filter((link) => link !== null);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
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
        className="relative w-full max-w-5xl bg-black border border-white/20 shadow-2xl flex flex-col sm:flex-row max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:rotate-90 transition-transform p-2 bg-black border border-zinc-800"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo */}
        <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:w-[45%] sm:min-h-[460px] lg:min-h-[540px] bg-zinc-900 shrink-0">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 45vw, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <span className="font-mono text-6xl lg:text-7xl font-bold text-zinc-400">
                {initials}
              </span>
            </div>
          )}
          {/* The community's mark, on a soft shade so it reads over any photo. */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          <Image
            src={logo}
            alt=""
            aria-hidden
            unoptimized
            className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 h-6 sm:h-7 w-auto opacity-90"
          />
        </div>

        {/* Who they are, and where to read more */}
        <div className="flex min-h-0 flex-1 flex-col justify-between gap-10 overflow-y-auto p-6 sm:p-8 md:p-10 lg:p-12 text-left font-sans">
          <div>
            <p className="uppercase tracking-widest font-sans text-xs text-zinc-400 font-medium mb-4 pr-12">
              {member.role}
            </p>
            <h3
              id="team-member-modal-title"
              className="uppercase tracking-tighter text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none font-sans"
            >
              {member.name}
            </h3>
            {(member.position || member.location) && (
              <div className="mt-5 flex flex-col gap-2">
                {member.position && (
                  <p className="font-mono text-sm text-zinc-300">
                    {member.position}
                  </p>
                )}
                {member.location && (
                  <p className="inline-flex items-center gap-1.5 font-mono text-sm text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {member.location}
                  </p>
                )}
              </div>
            )}

            {member.statement && (
              <p
                className={`mt-8 text-zinc-300 font-mono text-sm lg:text-base leading-relaxed ${
                  profileUrl ? "line-clamp-4" : ""
                }`}
              >
                {member.statement}
              </p>
            )}

            {!profileUrl && member.expertise && member.expertise.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {member.expertise.map((exp) => (
                  <span
                    key={exp}
                    className="uppercase tracking-widest px-2.5 py-1 border border-zinc-800 bg-zinc-950 text-zinc-300 font-sans text-xs"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            )}
          </div>

          {profileUrl ? (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-widest group inline-flex w-fit items-center gap-3 bg-white text-black px-6 py-3.5 font-bold text-xs font-sans transition-colors duration-200 hover:bg-zinc-200"
            >
              View full profile
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            links.length > 0 && (
              <div className="flex flex-wrap items-center gap-5">
                {links.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-zinc-400 hover:text-white hover:scale-110 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
