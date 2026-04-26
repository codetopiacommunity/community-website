"use client";

import { Images, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { GalleryAlbum } from "@/types";

interface GalleryAlbumTableProps {
  albums: GalleryAlbum[];
  loading: boolean;
  onEdit: (album: GalleryAlbum) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
}

export function GalleryAlbumTable({
  albums,
  loading,
  onEdit,
  onDelete,
  onAddFirst,
}: GalleryAlbumTableProps) {
  const router = useRouter();

  return (
    <div className="bg-white border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="font-sans font-black uppercase text-sm tracking-widest text-zinc-900">
          Gallery Albums
        </h2>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
          {albums.length} Albums
        </span>
      </div>

      {loading && (
        <div className="p-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono">
          <thead>
            <tr className="bg-black text-[10px] font-bold uppercase tracking-widest text-white">
              <th className="px-6 py-3">Cover</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Photos</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {albums.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <Images className="h-8 w-8 mx-auto text-zinc-200 mb-3" />
                  <p className="font-mono text-sm font-semibold text-zinc-900">
                    No albums found
                  </p>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Your gallery is empty.
                  </p>
                  <button
                    type="button"
                    onClick={onAddFirst}
                    className="mt-4 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                  >
                    Add First Album
                  </button>
                </td>
              </tr>
            ) : (
              albums.map((album) => (
                <tr
                  key={album.id}
                  className="hover:bg-zinc-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="h-10 w-14 border border-zinc-200 overflow-hidden flex items-center justify-center text-zinc-400 relative">
                      {album.coverImage ? (
                        <Image
                          src={album.coverImage}
                          alt={album.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Images className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-sm text-zinc-900">
                    {album.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-[10px] font-bold text-zinc-600 border border-zinc-200 px-2 py-0.5 uppercase tracking-widest">
                      {album.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                    {album.date}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-zinc-900">
                    {album._count?.photos ?? 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/gallery/${album.id}/photos`)
                        }
                        className="h-7 px-2 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Photos
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(album)}
                        className="h-8 w-8 hover:bg-zinc-100 transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(album.id)}
                        className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
