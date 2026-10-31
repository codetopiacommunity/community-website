import { ArrowDown } from "lucide-react";
import { useState } from "react";
import type { ImpactStory } from "@/types";
import { ImpactStoryCard, ImpactStoryFeature } from "./ImpactStoryCard";

/** Stories shown under the latest one before "Show all": three rows of two. */
const INITIAL_COUNT = 6;

interface ImpactStoryListProps {
  stories: ImpactStory[];
  onSelect: (story: ImpactStory) => void;
}

export function ImpactStoryList({ stories, onSelect }: ImpactStoryListProps) {
  const [showAll, setShowAll] = useState(false);

  if (stories.length === 0) {
    return (
      <div className="border-2 border-zinc-800 bg-black flex flex-col items-center justify-center py-32 px-8 text-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="border border-zinc-800 p-6">
            <div className="grid grid-cols-3 gap-1.5">
              {(
                ["g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"] as const
              ).map((key, i) => (
                <div
                  key={key}
                  className={`h-3 w-3 ${i % 3 === 1 || i === 4 ? "bg-zinc-700" : "bg-zinc-900"}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="uppercase tracking-widest font-sans text-xs text-zinc-400">
              — LOG EMPTY —
            </p>
            <h3 className="uppercase tracking-tighter text-4xl md:text-5xl font-bold text-zinc-400 leading-none font-sans">
              NO IMPACT <br /> RECORDED YET
            </h3>
            <p className="text-zinc-400 font-mono text-xs leading-relaxed max-w-sm">
              The community impact log is currently empty. Stories will appear
              here as the community continues to grow and make its mark.
            </p>
          </div>
          <div className="uppercase tracking-widest flex items-center gap-4 text-zinc-400 font-sans text-xs">
            <span className="h-px w-12 bg-zinc-800" />A CODETOPIA INITIATIVE
            <span className="h-px w-12 bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  const [latest, ...rest] = stories;
  const visible = showAll ? rest : rest.slice(0, INITIAL_COUNT);
  const hidden = rest.length - visible.length;

  // One flat page rather than a scroll box of its own: a box inside the
  // page traps the scroll wheel and a thumb on a phone, and hid stories
  // below its fold. Past the first few, the rest wait behind a button.
  return (
    <div className="flex flex-col gap-px bg-zinc-900 border border-zinc-900">
      <ImpactStoryFeature story={latest} onSelect={onSelect} />
      {visible.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {visible.map((story) => (
            <ImpactStoryCard key={story.id} story={story} onSelect={onSelect} />
          ))}
        </div>
      )}
      {hidden > 0 && (
        <div className="bg-black p-6 sm:p-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="uppercase tracking-widest group inline-flex items-center gap-3 font-sans font-bold text-xs text-white border border-zinc-600 hover:border-white hover:bg-white hover:text-black px-8 py-4 transition-colors duration-200"
          >
            Show all {stories.length} stories
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
          </button>
        </div>
      )}
    </div>
  );
}
