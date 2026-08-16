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
 * extra cards on screen and costs the name and role their legibility on
 * hover.
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
      {/*
        `contain:paint` keeps a hover to its own card. Without it the scrim
        and caption fading in count as a repaint of the shared track layer,
        so every sibling card repaints too and the row flickers.
      */}
      <div
        className={`relative ${CARD_ASPECT} w-full overflow-hidden [contain:paint] border border-zinc-800 bg-black transition-colors duration-200 group-hover:border-zinc-500 group-focus-visible:border-white`}
      >
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
            <span className="font-mono text-3xl tracking-widest text-zinc-700">
              {getInitials(member.name)}
            </span>
          </span>
        )}

        {/*
          Sits above the scrim so it stays legible once the caption fades in.
          `role="img"` with the country name because on its own a flag is a
          coloured rectangle to anyone who can't see it.

          Deliberately no `backdrop-blur`: a backdrop-filter has to re-sample
          what sits behind it every time its layer repaints, and these badges
          live inside a masked, transform-animating track. Hovering any one
          card repainted the whole track and set every badge in the row
          flickering. The flat black is doing the legibility work anyway.
        */}
        {countryFlag && (
          <span className="absolute right-1.5 top-1.5 z-10 inline-flex items-center border border-zinc-800 bg-black/70 px-1 py-0.5">
            <span
              className={`fi fi-${countryFlag.code} text-[9px] leading-none`}
              role="img"
              aria-label={countryFlag.country}
            />
          </span>
        )}

        {/*
          Scrim and caption both rest hidden, so a row at rest is nothing but
          faces. They arrive together: the scrim exists only to keep the text
          readable over a light patch of photo, so it has no reason to be
          there while the text isn't.

          Revealed on focus as well as hover, and the name is in the button's
          aria-label regardless, so keyboard and screen-reader users are never
          left with an unlabelled card.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />

        <div className="absolute inset-x-0 bottom-0 px-3 pb-3 lg:px-4 lg:pb-4 translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none">
          <h3 className="truncate font-sans text-sm lg:text-base font-black uppercase leading-tight tracking-tighter text-white">
            {member.name}
          </h3>
          <p className="mt-1 truncate font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.2em] text-zinc-300">
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
