"use client";

import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";

type Photo = { id: number; src: string; alt: string };
type Album = {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  photos: Photo[];
};

export default function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/gallery/${slug}`)
      .then((r) => r.json())
      .then((data) => setAlbum(data.error ? null : data))
      .finally(() => setLoading(false));
  }, [slug]);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null && album && i < album.photos.length - 1 ? i + 1 : i,
      ),
    [album],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, close, prev, next]);

  if (loading)
    return (
      <div className="flex-1 bg-black text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );

  if (!album)
    return (
      <div className="flex-1 bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 font-mono">Album not found.</p>
      </div>
    );

  const columns = [0, 1, 2].map((col) =>
    album.photos.filter((_, i) => i % 3 === col),
  );

  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="w-full pt-32 pb-16 bg-black border-b border-zinc-900">
        <Container className="px-4">
          <div className="px-2">
            <Link
              href="/gallery"
              className="text-zinc-600 font-mono text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-block"
            >
              ← Gallery
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest block mb-3">
                  {album.category} · {album.date}
                </span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none font-sans">
                  {album.title}
                </h1>
              </div>
              <p className="text-zinc-600 font-mono text-sm">
                {album.photos.length} photos
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 pb-32">
        <Container className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {columns.map((col, colIdx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: column index is stable
              <div key={colIdx} className="flex flex-col gap-3">
                {col.map((photo) => {
                  const globalIdx = album.photos.findIndex(
                    (p) => p.id === photo.id,
                  );
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setLightboxIndex(globalIdx)}
                      className="relative overflow-hidden group bg-zinc-900 cursor-zoom-in w-full text-left"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-black font-sans text-xs uppercase tracking-widest border border-white/50 px-4 py-2">
                          View
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        // biome-ignore lint/a11y/noStaticElementInteractions: lightbox backdrop close
        // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled via useEffect
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="absolute top-6 left-6 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            {lightboxIndex + 1} / {album.photos.length}
          </div>
          {lightboxIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-8 text-zinc-400 hover:text-white transition-colors z-10 p-2"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: stop propagation only */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled via useEffect */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16 md:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={album.photos[lightboxIndex].src}
              alt={album.photos[lightboxIndex].alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-4 text-center">
              {album.photos[lightboxIndex].alt}
            </p>
          </div>
          {lightboxIndex < album.photos.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-8 text-zinc-400 hover:text-white transition-colors z-10 p-2"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
