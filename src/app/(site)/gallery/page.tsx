import heroBg from "@/assets/images/django-girls.jpg";
import { Container } from "@/components/layout/Container";
import { GalleryGridIsland } from "./GalleryGridIsland";

export default function GalleryPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      {/* Hero */}
      <div className="relative w-full min-h-[60vh] flex flex-col pt-32 pb-20 overflow-hidden bg-black">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 grayscale"
          style={{ backgroundImage: `url('${heroBg.src}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-0" />
        <Container className="relative z-10 px-4 font-sans flex flex-col justify-end h-full">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] max-w-4xl">
            THE <br />
            <span className="text-zinc-700">GALLERY</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-mono leading-relaxed max-w-2xl mt-8">
            A visual record of community activities, events, and moments that
            shaped the community.
          </p>
        </Container>
      </div>

      {/* Albums Grid — Client Island */}
      <GalleryGridIsland />
    </div>
  );
}
