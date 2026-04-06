import { Calendar, Image as ImageIcon, MapPin, PlayCircle } from "lucide-react";
import Image from "next/image";
import { formatDateRange } from "@/lib/format-date";
import type { ImpactStory } from "@/types";

interface ImpactStoryCardProps {
  story: ImpactStory;
  onSelect: (story: ImpactStory) => void;
}

function StoryLogoWatermark({ logo, alt }: { logo: string; alt: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Image
        src={logo}
        alt={alt}
        width={80}
        height={80}
        unoptimized
        className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.95)]"
      />
    </div>
  );
}

export function ImpactStoryCard({ story, onSelect }: ImpactStoryCardProps) {
  return (
    <button
      type="button"
      key={story.id}
      onClick={() => onSelect(story)}
      className="group relative flex flex-col w-full shrink-0 h-auto min-h-[400px] lg:min-h-[550px] border-b-2 border-zinc-800 last:border-b-0 bg-black overflow-hidden cursor-pointer [direction:ltr] text-left"
    >
      {/* Background Panoramic Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          unoptimized
          className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out z-0 opacity-40 group-hover:opacity-100"
        />
        {/* Dark scrim to guarantee text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/90 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-transparent transition-colors duration-500 z-10" />
      </div>

      {/* Logo watermark top-right */}
      <div className="absolute top-5 right-5 z-30 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
        <div className="relative z-10 scale-[100%] origin-top-right">
          <StoryLogoWatermark logo={story.logoUrl} alt={story.title} />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full lg:w-[60%] flex flex-col justify-center px-6 py-8 md:p-8 lg:p-12 h-full flex-grow">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4 md:mb-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {story.link && (
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black border-2 border-black px-2 py-1 bg-white flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <PlayCircle className="w-3 h-3" /> VIDEO
            </span>
          )}
          {story.galleryLink && (
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black border-2 border-black px-2 py-1 bg-white flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <ImageIcon className="w-3 h-3" /> GALLERY
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-black text-white uppercase tracking-tighter text-4xl md:text-5xl lg:text-6xl leading-[1.1] translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75 mb-6 lg:mb-8 max-w-4xl drop-shadow-lg font-sans">
          {story.title}
        </h4>

        {/* Meta Info */}
        <div className="flex flex-col gap-3 font-mono text-zinc-300 group-hover:text-zinc-200 text-sm md:text-base tracking-[0.15em] uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150 drop-shadow-md font-mono">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            {formatDateRange(story.startDate, story.endDate)}
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
            <span>{story.location}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
