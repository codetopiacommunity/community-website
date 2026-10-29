import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGridIsland } from "./GalleryGridIsland";

export default function GalleryPage() {
  return (
    <div className="flex-1 bg-black text-white min-h-screen">
      <PageHeader title="Gallery">Photos from our events.</PageHeader>

      {/* Albums Grid */}
      <GalleryGridIsland />
    </div>
  );
}
