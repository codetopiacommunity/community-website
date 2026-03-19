"use client";

import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group relative bg-black flex flex-col hover:bg-zinc-950 transition-all overflow-hidden border border-zinc-900 aspect-[4/5] w-full">
      {/* Visual Asset: Grayscale Image */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />

        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-black/80 group-hover:via-black/50 transition-all duration-500" />

        {/* Main Content: Persistent Bottom State */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="transform group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
            <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white leading-none font-sans mb-1">
              {member.name}
            </h3>
            <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] font-bold">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
