"use client";

import { ExternalLink, Loader2, Pencil, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImpactStory } from "@/types";

interface ImpactTableProps {
  stories: ImpactStory[];
  loading: boolean;
  onEdit: (story: ImpactStory) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
}

export function ImpactTable({
  stories,
  loading,
  onEdit,
  onDelete,
  onAddFirst,
}: ImpactTableProps) {
  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Impact Log
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {stories.length} {stories.length === 1 ? "Story" : "Stories"}
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}

      {!loading && stories.length === 0 && (
        <div className="py-16 text-center">
          <Sparkles className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
          <p className="font-mono text-sm font-semibold text-zinc-900">
            No impact stories yet
          </p>
          <p className="font-mono text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
            Start documenting the community's reach.
          </p>
          <button
            type="button"
            onClick={onAddFirst}
            className="mt-4 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            Add First Story
          </button>
        </div>
      )}

      {!loading && stories.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="bg-black text-[10px] font-bold uppercase tracking-widest text-white">
                <th className="text-left px-6 py-3">Title</th>
                <th className="text-left px-6 py-3 hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-6 py-3 hidden lg:table-cell">
                  Location
                </th>
                <th className="text-left px-6 py-3 hidden lg:table-cell">
                  Links
                </th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {stories.map((story) => (
                <tr
                  key={story.id}
                  className="hover:bg-zinc-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <p className="font-mono font-semibold text-sm text-zinc-900 truncate max-w-[200px]">
                      {story.title}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-400 mt-0.5 truncate max-w-[200px]">
                      {story.impact.slice(0, 60)}…
                    </p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell font-mono text-xs text-zinc-500">
                    {story.startDate}
                    {story.endDate && ` → ${story.endDate}`}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell font-mono text-xs text-zinc-500">
                    {story.location}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex gap-3">
                      {story.link && (
                        <a
                          href={story.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" /> Video
                        </a>
                      )}
                      {story.galleryLink && (
                        <a
                          href={story.galleryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" /> Gallery
                        </a>
                      )}
                      {!story.link && !story.galleryLink && (
                        <span className="font-mono text-[10px] text-zinc-300">
                          —
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(story)}
                        className="h-8 w-8 hover:bg-zinc-100 transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(story.id)}
                        className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
