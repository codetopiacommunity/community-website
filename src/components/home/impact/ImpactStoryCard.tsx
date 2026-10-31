import { ArrowUpRight, Image as ImageIcon, PlayCircle } from "lucide-react";
import Image from "next/image";
import { formatDateRange } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import type { ImpactStory } from "@/types";

interface ImpactStoryCardProps {
  story: ImpactStory;
  onSelect: (story: ImpactStory) => void;
}

/**
 * The partner's logo over the photo. Logos come in every colour, so a soft
 * shadow rather than a box keeps a dark one readable on a dark photo.
 */
function StoryLogo({ story, large }: { story: ImpactStory; large?: boolean }) {
  return (
    <Image
      src={story.logoUrl}
      alt=""
      width={80}
      height={80}
      unoptimized
      className={cn(
        "absolute top-4 right-4 z-20 object-contain drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]",
        large ? "w-16 h-16 lg:w-20 lg:h-20" : "w-12 h-12 sm:w-14 sm:h-14",
      )}
    />
  );
}

/** When and where: the same line on every card. */
function StoryMeta({ story }: { story: ImpactStory }) {
  return (
    <span className="block uppercase tracking-widest font-sans text-xs text-zinc-400 leading-relaxed">
      {formatDateRange(story.startDate, story.endDate)}
      <span aria-hidden> · </span>
      {story.location}
    </span>
  );
}

/** What there is to open inside: plain labels, like the rest of the site. */
function StoryExtras({ story }: { story: ImpactStory }) {
  if (!story.link && !story.galleryLink) return null;
  return (
    <span className="uppercase tracking-widest flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs text-zinc-300">
      {story.link && (
        <span className="inline-flex items-center gap-2">
          <PlayCircle className="w-3.5 h-3.5" aria-hidden /> Video
        </span>
      )}
      {story.galleryLink && (
        <span className="inline-flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5" aria-hidden /> Gallery
        </span>
      )}
    </span>
  );
}

function StoryPhoto({
  story,
  large,
  className,
}: {
  story: ImpactStory;
  large?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative block w-full overflow-hidden bg-zinc-950",
        className,
      )}
    >
      <Image
        src={story.imageUrl}
        alt=""
        fill
        unoptimized
        className="object-cover grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0 transition-[filter] duration-500 ease-out motion-reduce:transition-none"
      />
      {/* Darkens only the corner the logo sits in. */}
      <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      <StoryLogo story={story} large={large} />
    </span>
  );
}

const cardClass =
  "group relative flex w-full flex-col bg-black text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white";

/**
 * The latest story, given the room to say what happened: the photo beside
 * the words on wide screens, on top of them on narrow ones. The whole card
 * opens the story.
 */
export function ImpactStoryFeature({ story, onSelect }: ImpactStoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(story)}
      className={cn(cardClass, "lg:grid lg:grid-cols-12")}
    >
      <StoryPhoto
        story={story}
        large
        className="aspect-[16/10] lg:aspect-auto lg:min-h-[480px] lg:col-span-7"
      />
      <span className="flex flex-col gap-5 p-6 sm:p-8 lg:col-span-5 lg:p-12 lg:justify-center">
        <span className="uppercase tracking-widest font-sans text-xs text-white">
          Latest
        </span>
        <StoryMeta story={story} />
        <span className="uppercase tracking-tighter font-bold text-white font-sans text-3xl sm:text-4xl xl:text-5xl leading-[0.95] break-words">
          {story.title}
        </span>
        <span className="font-mono text-zinc-300 text-base leading-relaxed line-clamp-4">
          {story.impact}
        </span>
        <StoryExtras story={story} />
        <span className="uppercase tracking-widest inline-flex items-center gap-2 font-sans font-bold text-xs text-white mt-2">
          Read the story
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </span>
      </span>
    </button>
  );
}

/**
 * Every other story: the photo, when and where, the title and the first
 * lines of what happened, so the grid reads without opening each one.
 */
export function ImpactStoryCard({ story, onSelect }: ImpactStoryCardProps) {
  return (
    <button type="button" onClick={() => onSelect(story)} className={cardClass}>
      <StoryPhoto story={story} className="aspect-[16/10]" />
      {/* Shown on hover: the card opens the story. */}
      <span className="absolute top-4 left-4 z-20 inline-flex h-8 w-8 items-center justify-center bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </span>
      <span className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <StoryMeta story={story} />
        <span className="uppercase tracking-tighter font-bold text-white font-sans text-2xl sm:text-3xl leading-[0.95] break-words">
          {story.title}
        </span>
        <span className="font-mono text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-2">
          {story.impact}
        </span>
        <span className="mt-auto pt-2">
          <StoryExtras story={story} />
        </span>
      </span>
    </button>
  );
}
