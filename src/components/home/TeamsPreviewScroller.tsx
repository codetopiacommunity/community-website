"use client";

import { useEffect, useState } from "react";
import {
  TeamCard,
  type TeamMember,
  TeamMemberModal,
} from "@/components/about/TeamCard";

export function TeamsPreviewScroller({ members }: { members: TeamMember[] }) {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  // Duration scales with how many cards there are to keep the per-card pace
  // roughly constant instead of a fixed-length loop feeling rushed once
  // there are more team members.
  const duration = Math.max(20, members.length * 5);

  return (
    <>
      <div className="w-full overflow-hidden">
        <div
          role="marquee"
          className="flex w-max gap-px"
          style={{
            animation: `team-marquee ${duration}s linear infinite`,
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running";
          }}
        >
          {/* 2 copies is enough for a seamless loop with translateX(-50%) */}
          {[...members, ...members].map((member, i) => (
            <div
              key={`${member.id || member.slug}-${i}`}
              className="w-[65vw] sm:w-[320px] lg:w-[360px] shrink-0"
            >
              <TeamCard member={member} onSelect={setSelected} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes team-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {selected && (
        <TeamMemberModal member={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
