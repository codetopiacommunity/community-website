"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type TeamMember, TeamMemberModal } from "@/components/about/TeamCard";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { getInitials } from "@/lib/avatar";
import { getCountryFlag } from "@/lib/country";

/** How long a member holds a position before the next one fades in. */
const HOLD_MS = 5000;
/** Offset between neighbouring positions, so a row never flips as one. */
const STAGGER_MS = 1100;
const FADE_MS = 900;
/** Seconds per card, so a longer row drifts at the same speed, not faster. */
const SECONDS_PER_CARD = 9;
const MIN_DRIFT_SECONDS = 34;

/**
 * Every card in a row is the same size and sits on the same line.
 *
 * Varying the width would imply a hierarchy that doesn't exist -- a wider
 * card reads as a more important member. Staggering them vertically or
 * tilting them off-axis broke the row's line for no gain: the cards are
 * already in motion, so they don't need help looking lively.
 *
 * The mobile width doesn't scale down proportionally: a row only ever shows
 * two or three cards at a time whatever the width, so a narrower card buys no
 * extra cards on screen and costs the name and role their legibility.
 */
const CARD_WIDTH = "w-[190px] lg:w-[270px]";
const CARD_ASPECT = "aspect-[4/5]";

const EDGE_FADE =
  "linear-gradient(to right, transparent, black 9%, black 91%, transparent)";

function CardFace({ member }: { member: TeamMember }) {
  const imageSource = member.imageUrl || member.image;
  const countryFlag = getCountryFlag(member.location);

  return (
    <>
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
    </>
  );
}

/**
 * One position in a row, rotating through the members dealt to it.
 *
 * Every member is mounted and stacked; only opacity changes. Swapping the
 * image `src` instead would show a blank frame on the first pass through,
 * before the browser has the next portrait.
 */
function RowCard({
  members,
  delayMs,
  onSelect,
}: {
  members: TeamMember[];
  delayMs: number;
  onSelect: (member: TeamMember) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const shouldRotate = members.length > 1 && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldRotate) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    // The stagger is an offset on the first tick rather than a different
    // period, so positions stay evenly spaced instead of drifting together.
    const timeout = setTimeout(() => {
      setActive((current) => (current + 1) % members.length);
      interval = setInterval(() => {
        setActive((current) => (current + 1) % members.length);
      }, HOLD_MS);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [shouldRotate, members.length, delayMs]);

  const current = members[active];

  return (
    <button
      type="button"
      onClick={() => onSelect(current)}
      aria-label={`View ${current.name}'s profile`}
      // A hairline gap, matching the team scroller. `mr-px` rather than a flex
      // `gap` because the track duplicates itself and animates by exactly
      // -50%: a gap would add one extra at the seam and the loop would hitch.
      className={`group shrink-0 text-left mr-px focus:outline-none ${CARD_WIDTH}`}
    >
      <div className="relative border border-zinc-800 bg-black transition-colors duration-200 group-hover:border-zinc-500 group-focus-visible:border-white">
        {members.map((member, index) => (
          <div
            key={member.slug || member.id}
            aria-hidden={index !== active}
            className={`flex flex-col transition-opacity ease-in-out motion-reduce:transition-none ${
              index === active
                ? "opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            <CardFace member={member} />
          </div>
        ))}
      </div>
    </button>
  );
}

function DriftingRow({
  slots,
  reverse,
  onSelect,
}: {
  slots: TeamMember[][];
  reverse: boolean;
  onSelect: (member: TeamMember) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldDrift = !prefersReducedMotion;

  const driftSeconds = Math.max(
    MIN_DRIFT_SECONDS,
    slots.length * SECONDS_PER_CARD,
  );

  // Two copies make translateX(-50%) seamless. Without drift one is enough
  // and the row becomes an ordinary horizontal scroller.
  const track = shouldDrift ? [...slots, ...slots] : slots;

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
        {track.map((slot, index) => (
          <RowCard
            key={`${slot[0].slug || slot[0].id}-${index}`}
            members={slot}
            delayMs={(index % slots.length) * STAGGER_MS}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export function MemberRows({ slots }: { slots: TeamMember[][] }) {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  useBodyScrollLock(selected !== null);

  if (slots.length === 0) return null;

  // Interleaved rather than split down the middle, so both rows get an even
  // share of the photo-carrying members that were dealt first.
  const topRow = slots.filter((_, index) => index % 2 === 0);
  const bottomRow = slots.filter((_, index) => index % 2 === 1);

  return (
    <>
      <section aria-label="Community members" className="flex flex-col gap-px">
        <DriftingRow slots={topRow} reverse={false} onSelect={setSelected} />
        {bottomRow.length > 0 && (
          <DriftingRow slots={bottomRow} reverse onSelect={setSelected} />
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
