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

  // Nothing to show yet: leave the section out rather than show an empty box.
  if (impactStories.length === 0) return null;

  return (
    <>
      <section className="w-full py-32 bg-black">
        <Container className="w-full px-4 font-sans relative z-10">
          <div className="w-full mb-16 md:mb-20 text-left flex flex-col gap-6">
            <h2 className="uppercase tracking-tighter text-5xl md:text-8xl font-bold text-white leading-none font-sans">
              The impact
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-mono max-w-2xl">
              The events, sessions and programmes members have run, and the
              schools, hubs and organisations they ran them with.
            </p>
          </div>

          <ImpactStoryList
            stories={impactStories}
            onSelect={setSelectedStory}
          />
        </Container>
      </section>

      <ImpactStoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </>
  );
}
