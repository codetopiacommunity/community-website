"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HashnodeArticle } from "@/lib/hashnode";

export interface FeaturedCarouselProps {
  articles: HashnodeArticle[];
}

export function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  const hasMultiple = articles.length > 1;

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: hasMultiple },
    hasMultiple ? [autoplayPlugin.current] : [],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleMouseEnter = () => hasMultiple && autoplayPlugin.current?.stop();
  const handleMouseLeave = () => hasMultiple && autoplayPlugin.current?.play();

  if (articles.length === 0) return null;

  return (
    <section
      aria-label="Featured articles carousel"
      className="relative w-full h-[500px] overflow-hidden border border-zinc-800 bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {articles.map((article) => {
            const formattedDate = new Date(
              article.publishedAt,
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={article.slug}
                className="relative flex-[0_0_100%] h-full"
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="block w-full h-full"
                >
                  {article.coverImage?.url ? (
                    <Image
                      src={article.coverImage.url}
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
                    <h2 className="font-black text-white uppercase tracking-tighter text-3xl md:text-4xl leading-tight font-sans mb-3 max-w-3xl">
                      {article.title}
                    </h2>
                    <p className="font-mono text-zinc-300 text-sm leading-relaxed line-clamp-2 max-w-2xl mb-4">
                      {article.brief}
                    </p>
                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                      <span>{article.author.name}</span>
                      <span className="text-zinc-600">·</span>
                      <span>{formattedDate}</span>
                      <span className="text-zinc-600">·</span>
                      <span>{article.readTimeInMinutes} min read</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {hasMultiple && (
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-zinc-700 bg-black/70 text-white hover:bg-white hover:text-black transition-colors duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {hasMultiple && (
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-zinc-700 bg-black/70 text-white hover:bg-white hover:text-black transition-colors duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {hasMultiple && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {articles.map((article, index) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 border transition-colors duration-200 ${
                index === selectedIndex
                  ? "bg-white border-white"
                  : "bg-transparent border-zinc-500 hover:border-zinc-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
