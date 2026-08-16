"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { type TeamMember, TeamMemberModal } from "@/components/about/TeamCard";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { getInitials } from "@/lib/avatar";
import { getCountryFlag } from "@/lib/country";

/**
 * Drift pace. Seconds per card rather than a fixed loop length, so a bigger
 * community moves at the same speed instead of racing to finish in time.
 */
const SECONDS_PER_CARD = 14;
const MIN_DRIFT_SECONDS = 60;

/**
 * Every card in a row is the same size and sits on the same line.
 *
 * Varying the width would imply a hierarchy that doesn't exist -- a wider
 * card reads as a more important member.
 *
 * The mobile width doesn't scale down proportionally: a row only ever shows
 * two or three cards at a time whatever the width, so a narrower card buys no
 * extra cards on screen and costs the name and role their legibility.
 */
const CARD_WIDTH = "w-[190px] lg:w-[270px]";
const CARD_ASPECT = "aspect-[4/5]";

const EDGE_FADE =
  "linear-gradient(to right, transparent, black 9%, black 91%, transparent)";

function MemberCard({
  member,
  onSelect,
}: {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}) {
  const imageSource = member.imageUrl || member.image;
  const countryFlag = getCountryFlag(member.location);

  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      aria-label={`View ${member.name}'s profile`}
      // A hairline gap, matching the team scroller. `mr-px` rather than a flex
      // `gap` because the track duplicates itself and animates by exactly
      // -50%: a gap would add one extra at the seam and the loop would hitch.
      className={`group shrink-0 text-left mr-px focus:outline-none ${CARD_WIDTH}`}
    >
      <div className="border border-zinc-800 bg-black transition-colors duration-200 group-hover:border-zinc-500 group-focus-visible:border-white">
        <div className={`relative ${CARD_ASPECT} w-full overflow-hidden`}>
          {imageSource ? (
            <Image
              src={imageSource}
              alt=""
              fill
              sizes="(min-width: 1024px) 270px, 190px"
              className="object-cover grayscale transition duration-500 group-hover:grayscale-0 motion-reduce:transition-none"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-zinc-950">
              <span className="font-mono text-xl tracking-widest text-zinc-700">
                {getInitials(member.name)}
              </span>
            </span>
          )}

          {countryFlag && (
            <span className="absolute right-1.5 top-1.5 z-10 inline-flex items-center border border-zinc-800 bg-black/70 px-1 py-0.5 backdrop-blur-sm">
              <span
                className={`fi fi-${countryFlag.code} text-[9px] leading-none`}
                aria-hidden="true"
              />
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 border-t border-zinc-800 px-3 py-2.5 lg:px-4 lg:py-3.5">
          <h3 className="truncate font-sans text-sm lg:text-base font-black uppercase leading-tight tracking-tighter text-white">
            {member.name}
          </h3>
          <p className="truncate font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {member.position || member.role}
          </p>
        </div>
      </div>
    </button>
  );
}

function DriftingRow({
  members,
  reverse,
  onSelect,
}: {
  members: TeamMember[];
  reverse: boolean;
  onSelect: (member: TeamMember) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldDrift = !prefersReducedMotion;

  const driftSeconds = Math.max(
    MIN_DRIFT_SECONDS,
    members.length * SECONDS_PER_CARD,
  );

  // Two copies make translateX(-50%) seamless. Without drift one is enough
  // and the row becomes an ordinary horizontal scroller.
  const track = shouldDrift ? [...members, ...members] : members;

  return (
    <div
      className={`w-full ${shouldDrift ? "overflow-hidden" : "overflow-x-auto"}`}
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div
        role="marquee"
        // No leading padding: the track duplicates itself and animates by
        // exactly -50%, so anything outside the repeating unit would knock
        // the seam out of alignment.
        className="flex w-max items-start"
        style={
          shouldDrift
            ? {
                animation: `member-row-drift ${driftSeconds}s linear infinite`,
                // The second row runs the same keyframe backwards, so the
                // two rows counter-scroll at an identical pace.
                animationDirection: reverse ? "reverse" : "normal",
                willChange: "transform",
              }
            : undefined
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {track.map((member, index) => (
          <MemberCard
            key={`${member.slug || member.id}-${index}`}
            member={member}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function MemberRows({ members }: { members: TeamMember[] }) {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  useBodyScrollLock(selected !== null);

  if (members.length === 0) return null;

  // Interleaved rather than split down the middle, so both rows get an even
  // share of the photo-carrying members that were sorted to the front.
  const topRow = members.filter((_, index) => index % 2 === 0);
  const bottomRow = members.filter((_, index) => index % 2 === 1);

  return (
    <>
      <section aria-label="Community members" className="flex flex-col gap-px">
        <DriftingRow members={topRow} reverse={false} onSelect={setSelected} />
        {bottomRow.length > 0 && (
          <DriftingRow members={bottomRow} reverse onSelect={setSelected} />
        )}
      </section>

      <style>{`
        @keyframes member-row-drift {
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
