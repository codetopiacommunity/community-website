import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logos/codetopia-community.png";
import { SpotlightLinks } from "@/components/spotlight/SpotlightLinks";
import { cloudinaryFill, spotlightHandle } from "@/lib/spotlight";
import type { Spotlight } from "@/types";

/**
 * The current feature: one full-width photo with who they are written across
 * the bottom of it, and the way into their story underneath.
 *
 * Text over a photo only works if it can't wash out, so the bottom of the
 * photo sits under a deep black fade and everything on it is white or near
 * white; a light photo still leaves the words on black. The wide box asks
 * Cloudinary to crop around the face, since centring a portrait in a banner
 * takes the head off.
 */
export function SpotlightFeature({
  spotlight,
  priority = false,
}: {
  spotlight: Spotlight;
  priority?: boolean;
}) {
  const href = `/spotlight/${spotlightHandle(spotlight)}`;

  return (
    <div className="flex flex-col gap-8">
      <article className="group relative w-full h-[90vh] min-h-[600px] max-h-[1000px] overflow-hidden border border-zinc-900 bg-zinc-950">
        <Image
          src={cloudinaryFill(spotlight.imageUrl, 2000, 1100)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_25%] grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          priority={priority}
        />
        <span className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/80 via-35% to-transparent" />

        {/* A stretched link, so the whole photo opens the feature without
            wrapping the socials (anchors of their own) in another anchor. */}
        <Link
          href={href}
          aria-label={`Read the feature on ${spotlight.name}`}
          className="absolute inset-0 z-10"
        />

        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 p-6 sm:p-10 lg:p-14 pointer-events-none md:flex-row md:items-end md:justify-between">
          <div className="flex min-w-0 flex-col">
            {spotlight.featured && (
              <p className="uppercase tracking-widest font-sans text-xs text-zinc-200 mb-4">
                Currently featured
              </p>
            )}
            <h3 className="uppercase tracking-tighter font-bold text-white leading-[0.9] font-sans text-4xl sm:text-6xl lg:text-7xl break-words">
              {spotlight.name}
            </h3>
            <p className="uppercase tracking-widest font-sans text-xs md:text-sm text-zinc-200 mt-4">
              {spotlight.role}
            </p>
            <p className="font-mono text-zinc-200 text-sm sm:text-base lg:text-lg leading-relaxed mt-5 max-w-2xl line-clamp-3">
              {spotlight.contribution}
            </p>
            <div className="mt-6 pointer-events-auto">
              <SpotlightLinks
                links={spotlight.links}
                name={spotlight.name}
                size="md"
              />
            </div>
          </div>

          {/* The community's mark on the same baseline as the name: subject on
              the left, publisher on the right. */}
          <Image
            src={logo}
            alt=""
            unoptimized
            className="hidden md:block h-8 lg:h-9 w-auto shrink-0 opacity-90"
          />
        </div>
      </article>

      <Link
        href={href}
        className="uppercase tracking-widest group/read self-start inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold text-xs font-sans transition-colors duration-300 hover:bg-zinc-200"
      >
        Read the feature
        <ArrowRight className="w-4 h-4 transition-transform group-hover/read:translate-x-1 motion-reduce:transition-none" />
      </Link>
    </div>
  );
}

/**
 * A past feature in the archive grid. The same card as the team page: the
 * photo, the full name and role, and the whole card opening the feature.
 * Socials live on the feature page; on a grid of faces they were noise.
 */
export function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  return (
    <Link
      href={`/spotlight/${spotlightHandle(spotlight)}`}
      className="group relative block aspect-[4/5] w-full overflow-hidden border border-zinc-900 bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Image
        src={spotlight.imageUrl}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <span className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-700" />

      {/* Shown on hover: the card opens their feature. */}
      <span className="absolute top-2 right-2 z-20 inline-flex h-8 w-8 items-center justify-center bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5 lg:p-6">
        <span className="block transform group-hover:-translate-y-1 transition-transform duration-500 motion-reduce:transition-none">
          <span className="block uppercase tracking-tighter text-lg sm:text-2xl font-bold text-white leading-none font-sans line-clamp-2 break-words">
            {spotlight.name}
          </span>
          <span className="mt-2 block uppercase tracking-widest font-sans text-xs text-zinc-400 line-clamp-1">
            {spotlight.role}
          </span>
        </span>
      </span>
    </Link>
  );
}
