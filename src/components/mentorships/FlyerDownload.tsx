"use client";

import { Download } from "lucide-react";

interface FlyerDownloadProps {
  flyerImage: string;
  title: string;
}

export function FlyerDownload({ flyerImage, title }: FlyerDownloadProps) {
  const handleDownload = async () => {
    try {
      const res = await fetch(flyerImage);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}-flyer`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(flyerImage, "_blank");
    }
  };

  return (
    <div className="relative group w-full border border-zinc-800 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* biome-ignore lint/performance/noImgElement: natural image dimensions needed */}
      <img
        src={flyerImage}
        alt={`${title} Flyer`}
        className="w-full h-auto block"
      />
      <button
        type="button"
        onClick={handleDownload}
        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 cursor-pointer"
      >
        <div className="border border-white p-3">
          <Download className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-black font-space-grotesk text-xs uppercase tracking-widest">
          Download Flyer
        </span>
      </button>
    </div>
  );
}
