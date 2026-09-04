import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
import { cloudinaryFill, spotlightHandle } from "@/lib/spotlight";
import type { Spotlight } from "@/types";

/**
 * The spotlight card: portrait, name and role over the image, socials, and the
 * whole card linking through to the feature.
 *
 * The hover behaviour is deliberately the same as the team card on the about
 * page (grayscale lifting to colour, a slow zoom, the gradient deepening, the
 * name rising), so a member card and a spotlight card read as the same family
 * of object rather than two designs that happen to share a site.
 */
export function SpotlightCard({
  spotlight,
  size = "sm",
  priority = false,
}: {
  spotlight: Spotlight;
  /** "lg" is the current feature, wide and full width. "sm" is a grid card. */
  size?: "sm" | "lg";
  priority?: boolean;
}) {
  const href = `/spotlight/${spotlightHandle(spotlight)}`;
  const isLarge = size === "lg";

  // A wide box would centre-crop a portrait and take the head off, so the
  // large card asks Cloudinary to fill that shape around the face instead.
  // The grid cards are already portrait-shaped and need no transform.
  const imageUrl = isLarge
    ? cloudinaryFill(spotlight.imageUrl, 2000, 1100)
    : spotlight.imageUrl;

  return (
    <div
      className={`group relative bg-black flex flex-col hover:bg-zinc-950 transition-all overflow-hidden border border-zinc-900 w-full ${
        isLarge ? "h-[70vh] min-h-[460px] max-h-[760px]" : "aspect-[4/5]"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes={
            isLarge
              ? "100vw"
              : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          priority={priority}
        />

        {/* Grayscale until hover, matching the team cards: the colour arriving
            is the reward for engaging with the card. The scrim stays light so
            the photo still reads clearly at rest. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-700 z-10" />

        {/*
          A stretched link rather than a wrapper: the socials below are anchors
          of their own, and an anchor inside an anchor is invalid markup that
          breaks hydration. This sits above the image and under the text.
        */}
        <Link
          href={href}
          aria-label={`Read the feature on ${spotlight.name}`}
          className="absolute inset-0 z-20"
        />

        {/* pointer-events-none so a click on the name still reaches the link
            beneath; the socials switch them back on for themselves. */}
        <div
          className={`absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end pointer-events-none ${
            isLarge ? "p-8 md:p-12 lg:p-16" : "p-6"
          }`}
        >
          <div className="transform group-hover:-translate-y-1 transition-transform duration-500 motion-reduce:transition-none flex flex-row items-end justify-between gap-6">
            <div className="flex flex-col gap-4 min-w-0">
              {/* Status as an eyebrow in the text block, the way the detail
                  page does it. As an icon on the photo it read as a favourite
                  marker, and the context already says which one is current. */}
              {spotlight.featured && (
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  Currently featured
                </p>
              )}
              <div className="flex flex-col gap-2">
                <h3
                  className={`${
                    isLarge
                      ? "text-5xl md:text-7xl lg:text-8xl"
                      : "text-2xl lg:text-3xl line-clamp-1"
                  } font-black uppercase tracking-tighter text-white leading-[0.85] font-sans`}
                >
                  {spotlight.name}
                </h3>
                <p
                  className={`font-mono uppercase tracking-[0.3em] text-zinc-400 line-clamp-1 ${
                    isLarge ? "text-xs md:text-sm" : "text-[10px]"
                  }`}
                >
                  {spotlight.role}
                </p>
              </div>

              <div className="pointer-events-auto">
                <SpotlightLinks
                  links={spotlight.links}
                  name={spotlight.name}
                  size={isLarge ? "md" : "sm"}
                />
              </div>
            </div>

            {/* The community mark on the same baseline as the name, so the
                card composes as subject-left, publisher-right rather than
                having a sticker in a corner. */}
            <Image
              src={logo}
              alt=""
              width={200}
              height={200}
              unoptimized
              aria-hidden
              className={`shrink-0 object-contain opacity-80 ${
                isLarge ? "w-20 h-20 md:w-28 md:h-28" : "w-12 h-12"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
