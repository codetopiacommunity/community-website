"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { ImpactStory } from "@/types";
import { ImpactStoryList } from "./impact/ImpactStoryList";
import { ImpactStoryModal } from "./impact/ImpactStoryModal";

export function OurImpact() {
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  useBodyScrollLock(!!selectedStory);

  useEffect(() => {
    fetch("/api/impact")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setImpactStories(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="w-full py-32 bg-black flex flex-col border-t border-zinc-900 overflow-hidden">
        <Container className="w-full px-4 font-sans relative z-10">
          <div className="w-full mb-24 text-left">
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-6 leading-none font-sans">
              THE <span className="text-zinc-600">IMPACT</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
              We don&apos;t just work with industry leaders; we actively empower
              the next generation of developers across schools, bootcamps, and
              local hubs.
            </p>
          </div>
        </Container>

        <div className="w-full relative flex flex-col items-center pb-4 overflow-hidden">
          <Container className="w-full px-6 lg:px-12">
            <ImpactStoryList
              stories={impactStories}
              onSelect={setSelectedStory}
            />
          </Container>
        </div>
      </section>

      <ImpactStoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </>
  );
}
