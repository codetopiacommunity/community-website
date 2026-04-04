"use client";

import { Images, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface GalleryAlbum {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  _count?: { photos: number };
}

interface GalleryAlbumTableProps {
  albums: GalleryAlbum[];
  loading: boolean;
  onEdit: (album: GalleryAlbum) => void;
  onDelete: (id: number) => void;
  onAddFirst: () => void;
  onManagePhotos: (album: GalleryAlbum) => void;
}

export function GalleryAlbumTable({
  albums,
  loading,
  onEdit,
  onDelete,
  onAddFirst,
  onManagePhotos,
}: GalleryAlbumTableProps) {
  return (
    <div className="rounded-2xl bg-white border border-grey-100 overflow-hidden relative shadow-none">
      <div className="p-6 border-b border-grey-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Images className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black uppercase tracking-tight font-sans">
            Gallery Albums
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold bg-grey-50 px-3 py-1.5 rounded-lg text-black uppercase tracking-widest border border-grey-100">
          {albums.length} Albums Total
        </span>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono">
          <thead>
            <tr className="bg-grey-50 text-[10px] font-bold uppercase tracking-[0.2em] text-grey-500 border-b border-grey-100">
              <th className="px-6 py-5">Cover</th>
              <th className="px-6 py-5">Title</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Photos</th>
              <th className="px-6 py-5 text-right">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-grey-50 text-xs">
            {albums.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-black font-black uppercase tracking-tight text-lg">
                        No albums found
                      </h3>
                      <p className="text-grey-400 text-sm max-w-[300px] mx-auto font-medium">
                        Your gallery is currently empty. Start by adding your
                        first album.
                      </p>
                    </div>
                    <Button
                      onClick={onAddFirst}
                      className="mt-4 text-xs font-black uppercase tracking-widest bg-black text-white px-8 h-12 rounded-xl hover:bg-grey-800 transition-all active:scale-[0.98]"
                    >
                      Add Your First Album
                    </Button>
                  </div>
                </td>
              </tr>
            ) : (
              albums.map((album) => (
                <tr
                  key={album.id}
                  className="hover:bg-grey-50/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="h-12 w-16 rounded-lg bg-grey-50 border border-grey-100 overflow-hidden flex items-center justify-center text-grey-400 relative">
                      {album.coverImage ? (
                        <Image
                          src={album.coverImage}
                          alt={album.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Images className="h-5 w-5" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-black">
                      {album.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-black bg-grey-50 px-2 py-1 rounded border border-grey-200 uppercase tracking-wider">
                      {album.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-grey-500">{album.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-black">
                      {album._count?.photos ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onManagePhotos(album)}
                        className="h-9 px-3 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-xl flex items-center gap-1.5"
                        title="Manage photos"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Photos
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(album)}
                        className="h-9 w-9 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all rounded-xl"
                        title="Edit album"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(album.id)}
                        className="h-9 w-9 text-grey-400 hover:text-white hover:bg-red-500 border-2 border-transparent hover:border-black transition-all rounded-xl"
                        title="Delete album"
                      >
                        <Trash2 className="h-4 w-4" />
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
