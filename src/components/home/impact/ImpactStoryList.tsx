import type { ImpactStory } from "@/types";
import { ImpactStoryCard } from "./ImpactStoryCard";

interface ImpactStoryListProps {
  stories: ImpactStory[];
  onSelect: (story: ImpactStory) => void;
}

export function ImpactStoryList({ stories, onSelect }: ImpactStoryListProps) {
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
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-700">
              — LOG EMPTY —
            </p>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-800 leading-none font-sans">
              NO IMPACT <br /> RECORDED YET
            </h3>
            <p className="text-zinc-600 font-mono text-xs leading-relaxed max-w-sm">
              The community impact log is currently empty. Stories will appear
              here as Codetopia continues to grow and make its mark.
            </p>
          </div>
          <div className="flex items-center gap-4 text-zinc-800 font-mono text-[9px] uppercase tracking-[0.4em]">
            <span className="h-px w-12 bg-zinc-800" />A CODETOPIA INITIATIVE
            <span className="h-px w-12 bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[1200px] lg:max-h-[1650px] overflow-y-auto overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white hover:[&::-webkit-scrollbar-thumb]:bg-zinc-200 active:[&::-webkit-scrollbar-thumb]:bg-zinc-400 [&::-webkit-scrollbar-thumb]:rounded-none">
      <div className="flex flex-col border-2 border-zinc-800 bg-black">
        {stories.map((story) => (
          <ImpactStoryCard key={story.id} story={story} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
