import { getInitials } from "@/lib/avatar";
import { cn } from "@/lib/utils";

/**
 * Typographic stand-in for an honoree with no uploaded profile picture.
 *
 * Most members haven't uploaded one, so on the Wall of Impact this is the
 * common case rather than the edge case — it has to look deliberate, not
 * like a missing image.
 *
 * A generated DiceBear avatar is deliberately NOT used here. The wall shows
 * imagery at 3:4 and 4:5; a 128px square avatar scaled to fill that and then
 * desaturated reads as broken. Generated avatars stay where they make sense —
 * avatar-sized identity chips, via `getMemberAvatarUrl` in lib/avatar.
 *
 * The initials are sized in container units, not viewport units, so they fill
 * their frame identically whether that frame is a grid card or a masthead
 * portrait — and don't overflow on small screens.
 *
 * Presentational and hook-free, so it renders in both server and client
 * components.
 */
export function InitialsBackdrop({
  name,
  accent,
}: {
  name: string;
  /** A CATEGORY_META accent string; the leading text-* class is used. */
  accent: string;
}) {
  const textAccent = accent.trim().split(/\s+/)[0];

  return (
    <div className="@container absolute inset-0 overflow-hidden bg-zinc-950">
      {/* Category-tinted wash, so a wall of these still reads as varied */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 bg-current opacity-[0.06]", textAccent)}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "select-none font-sans font-black leading-none tracking-tighter",
            "text-[48cqw] opacity-70",
            textAccent,
          )}
        >
          {getInitials(name)}
        </span>
      </div>
    </div>
  );
}
