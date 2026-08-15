import Link from "next/link";

export type AboutFace = {
  slug: string;
  name: string;
  role: string;
  imageUrl: string | null;
};

/**
 * The people named in "who runs it". A claim about volunteers is worth more
 * with faces attached, and these come from the same team data the homepage
 * scroller uses.
 */
export function TeamFaces({ faces }: { faces: AboutFace[] }) {
  if (faces.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 max-w-4xl">
      {faces.map((face) => (
        <Link
          key={face.slug}
          href="/team"
          className="group flex flex-col gap-3"
        >
          <div className="aspect-[4/5] overflow-hidden bg-zinc-950">
            {face.imageUrl ? (
              // biome-ignore lint/performance/noImgElement: remote cloudinary/portal avatar
              <img
                src={face.imageUrl}
                alt={face.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-sans font-black text-4xl tracking-tighter text-zinc-800 select-none">
                  {face.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans font-black text-xs uppercase tracking-tight text-white leading-tight">
              {face.name}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 group-hover:text-white transition-colors">
              {face.role}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
