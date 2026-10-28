import { Container } from "@/components/layout/Container";
import { GalleryGridIsland } from "./GalleryGridIsland";

export default function GalleryPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full py-32 md:py-40 bg-black overflow-hidden border-b border-zinc-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Container className="relative z-10 px-4 font-sans flex flex-col gap-8">
          <h1 className="tracking-tighter uppercase text-4xl md:text-6xl font-bold text-white leading-tight max-w-5xl">
            Gallery
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed max-w-2xl">
            A visual record of community activities, events, and moments that
            shaped the community.
          </p>
        </Container>
      </div>

      {/* Albums Grid */}
      <GalleryGridIsland />
    </div>
  );
}
