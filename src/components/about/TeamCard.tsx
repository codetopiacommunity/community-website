"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import profileSample from "@/assets/images/profile/profile-sample.jpg";

interface TeamMember {
  id?: number | string;
  slug?: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  image?: string | null;
  statement?: string;
  expertise?: string[];
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const imageSource = member.imageUrl || member.image || profileSample;
  return (
    <div className="group relative bg-black flex flex-col hover:bg-zinc-950 transition-all overflow-hidden border border-zinc-900 aspect-[4/5] w-full">
      {/* Visual Asset: Grayscale Image */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={imageSource}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:from-black group-hover:via-black/80 transition-all duration-700 z-10" />

        {/* Main Content: Persistent Bottom State */}
        <div className="absolute inset-x-0 bottom-0 p-8 z-20 flex flex-col justify-end">
          <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white leading-none font-sans mb-1 line-clamp-1">
              {member.name}
            </h3>
            <p className="text-zinc-400 font-mono text-[9px] uppercase tracking-[0.4em] font-bold">
              {member.role}
            </p>
          </div>

          {/* Expandable Meta Box via CSS Grid */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <div className="flex flex-col gap-4 mt-4 pb-2">
                {/* Mission Statement */}
                {member.statement && (
                  <p className="text-zinc-300 font-mono text-xs leading-relaxed line-clamp-3">
                    {member.statement}
                  </p>
                )}

                {/* Skills/Expertise Badges */}
                {member.expertise && member.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.slice(0, 3).map((exp: string) => (
                      <span
                        key={exp}
                        className="px-2 py-1 border border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-[9px] uppercase tracking-widest leading-none pointer-events-none"
                      >
                        {exp}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span className="px-2 py-1 border border-zinc-800 bg-black text-zinc-500 font-mono text-[9px] uppercase tracking-widest leading-none pointer-events-none">
                        +{member.expertise.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Social Link Controls */}
                <div className="flex items-center gap-3 pt-2">
                  {member.github && member.github !== "#" && (
                    <a
                      href={
                        member.github.startsWith("http")
                          ? member.github
                          : `https://github.com/${member.github}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-zinc-800 bg-zinc-950 text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all rounded-none"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && member.linkedin !== "#" && (
                    <a
                      href={
                        member.linkedin.startsWith("http")
                          ? member.linkedin
                          : `https://linkedin.com/in/${member.linkedin}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-zinc-800 bg-zinc-950 text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all rounded-none"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && member.twitter !== "#" && (
                    <a
                      href={
                        member.twitter.startsWith("http")
                          ? member.twitter
                          : `https://twitter.com/${member.twitter}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-zinc-800 bg-zinc-950 text-white hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all rounded-none"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
