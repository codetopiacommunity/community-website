"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Container } from "@/components/layout/Container";
import { EmptyState } from "@/components/layout/EmptyState";
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
    <section className="py-16 pb-32">
      <Container className="px-4">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
          </div>
        ) : albums.length === 0 ? (
          <EmptyState
            title="No photos yet"
            links={[{ label: "See what is coming up", href: "/events" }]}
          >
            Photos from our events go here after each one.
          </EmptyState>
        ) : (
          <>
            <p className="uppercase tracking-widest text-zinc-400 font-mono text-xs mb-10 px-2">
              {albums.length} {albums.length === 1 ? "album" : "albums"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Link
                  key={album.slug}
                  href={`/gallery/${album.slug}`}
                  className="group relative overflow-hidden bg-black block border border-zinc-900"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="uppercase tracking-widest bg-black/80 text-zinc-400 font-mono text-xs px-3 py-1">
                        {album.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="uppercase tracking-widest bg-black/80 text-zinc-400 font-mono text-xs px-3 py-1">
                        {album._count.photos} photos
                      </span>
                    </div>
                  </div>
                  <div className="p-6 border-t border-zinc-900 flex items-end justify-between">
                    <div>
                      <p className="uppercase tracking-tight text-white font-bold text-xl font-sans leading-tight group-hover:text-zinc-300 transition-colors">
                        {album.title}
                      </p>
                      <p className="uppercase tracking-widest text-zinc-400 font-mono text-xs mt-1">
                        {album.date}
                      </p>
                    </div>
                    <FaArrowRight className="text-zinc-400 group-hover:text-white transition-colors w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
