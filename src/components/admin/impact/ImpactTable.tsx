"use client";

import { ExternalLink, Pencil, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImpactStory {
  id: number;
  title: string;
  impact: string;
  imageUrl: string;
  logoUrl: string;
  date: string;
  location: string;
  link?: string | null;
  galleryLink?: string | null;
}

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
  if (loading) {
    return (
      <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
        <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
              Impact Log
            </h2>
          </div>
          <div className="h-6 w-20 bg-grey-100 rounded-lg animate-pulse" />
        </div>
        {(["sk-0", "sk-1", "sk-2"] as const).map((key) => (
          <div
            key={key}
            className="flex items-center gap-4 p-5 border-b border-grey-50 last:border-b-0 animate-pulse"
          >
            <div className="h-12 w-12 rounded-xl bg-grey-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-grey-100 rounded w-1/3" />
              <div className="h-2 bg-grey-50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
        <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
              Impact Log
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
            0 Stories
          </span>
        </div>
        <div className="px-6 py-20 text-center flex flex-col items-center gap-5">
          <div className="p-5 bg-grey-50 border border-grey-100 rounded-2xl">
            <Sparkles className="h-10 w-10 text-grey-300" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-black font-black uppercase tracking-tight text-lg font-sans">
              No impact stories yet
            </h3>
            <p className="text-grey-400 text-sm max-w-[320px] mx-auto font-medium font-mono">
              Start documenting the community's reach. Add your first impact
              story to showcase what Codetopia has built.
            </p>
          </div>
          <Button
            onClick={onAddFirst}
            className="mt-2 text-xs font-black uppercase tracking-widest bg-black text-white px-8 h-12 rounded-xl hover:bg-grey-800 transition-all active:scale-[0.98]"
          >
            Add First Story
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden">
      <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Impact Log
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {stories.length} {stories.length === 1 ? "Story" : "Stories"}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-grey-100 bg-grey-50/50">
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Title
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500 hidden md:table-cell">
                Date
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500 hidden lg:table-cell">
                Location
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-grey-500 hidden lg:table-cell">
                Links
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-grey-500">
                Controls
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-50">
            {stories.map((story) => (
              <tr
                key={story.id}
                className="hover:bg-grey-50/40 transition-colors group"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-black text-sm font-sans truncate max-w-[200px]">
                    {story.title}
                  </p>
                  <p className="text-grey-400 font-mono text-[10px] mt-0.5 truncate max-w-[200px]">
                    {story.impact.slice(0, 60)}…
                  </p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="font-mono text-xs text-grey-600">
                    {story.date}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="font-mono text-xs text-grey-600">
                    {story.location}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="flex gap-3">
                    {story.link && (
                      <a
                        href={story.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono uppercase tracking-widest text-grey-500 hover:text-black flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> Video
                      </a>
                    )}
                    {story.galleryLink && (
                      <a
                        href={story.galleryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono uppercase tracking-widest text-grey-500 hover:text-black flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> Gallery
                      </a>
                    )}
                    {!story.link && !story.galleryLink && (
                      <span className="text-[10px] font-mono text-grey-300">
                        —
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(story)}
                      className="h-9 w-9 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-xl"
                      title="Edit story"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(story.id)}
                      className="h-9 w-9 text-grey-400 hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-black transition-all rounded-xl"
                      title="Remove story"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
