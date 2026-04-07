"use client";

import { FaArrowRight } from "react-icons/fa6";
import { Images, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import type { GalleryAlbumWithPhotos } from "@/types";

export function GalleryGridIsland() {
  const [albums, setAlbums] = useState<GalleryAlbumWithPhotos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setAlbums(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 border-t border-zinc-900 pb-32">
      <Container className="px-4">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
          </div>
        ) : albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 select-none">
            <div className="w-24 h-24 rounded-2xl border border-zinc-800 flex items-center justify-center">
              <Images className="w-10 h-10 text-zinc-700" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-white font-black uppercase tracking-tighter text-2xl font-sans">
                No albums yet
              </p>
              <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest max-w-xs">
                The gallery is empty for now — come back soon for photos from
                our events.
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-10 px-2">
              {albums.length} Albums
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
              {albums.map((album) => (
                <Link
                  key={album.slug}
                  href={`/gallery/${album.slug}`}
                  className="group relative overflow-hidden bg-black block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/80 text-zinc-400 font-mono text-[10px] uppercase tracking-widest px-3 py-1">
                        {album.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/80 text-zinc-400 font-mono text-[10px] uppercase tracking-widest px-3 py-1">
                        {album.photos.length} photos
                      </span>
                    </div>
                  </div>
                  <div className="p-6 border-t border-zinc-900 flex items-end justify-between">
                    <div>
                      <p className="text-white font-black uppercase tracking-tight text-xl font-sans leading-tight group-hover:text-zinc-300 transition-colors">
                        {album.title}
                      </p>
                      <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mt-1">
                        {album.date}
                      </p>
                    </div>
                    <FaArrowRight className="text-zinc-700 group-hover:text-white transition-colors w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
