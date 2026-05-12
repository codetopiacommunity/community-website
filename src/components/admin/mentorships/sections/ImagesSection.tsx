"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImagesSectionProps {
  coverImage?: string;
  flyerImage?: string;
  onUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "flyerImage",
  ) => void;
  onRemove: (field: "coverImage" | "flyerImage") => void;
}

function ImageUploadSlot({
  label,
  field,
  preview,
  isCover,
  onUpload,
  onRemove,
}: {
  label: string;
  field: "coverImage" | "flyerImage";
  preview?: string;
  isCover: boolean;
  onUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "flyerImage",
  ) => void;
  onRemove: (field: "coverImage" | "flyerImage") => void;
}) {
  const inputId = `upload-${field}`;

  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
        {label}
      </p>
      {preview ? (
        <div className="relative border border-zinc-200 overflow-hidden bg-zinc-100">
          {isCover ? (
            <div className="relative w-full h-48">
              <Image
                src={preview}
                alt={`${label} preview`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            // biome-ignore lint/performance/noImgElement: flyer uses natural aspect ratio
            <img
              src={preview}
              alt={`${label} preview`}
              className="w-full h-auto"
            />
          )}
          <button
            type="button"
            onClick={() => onRemove(field)}
            className="absolute top-2 right-2 p-1.5 bg-black text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-zinc-300 cursor-pointer hover:border-zinc-500 hover:bg-zinc-100 transition-colors bg-white"
        >
          <Upload className="w-6 h-6 text-zinc-400 mb-2" />
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            Click to upload
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={(e) => onUpload(e, field)}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

export function ImagesSection({
  coverImage,
  flyerImage,
  onUpload,
  onRemove,
}: ImagesSectionProps) {
  return (
    <div className="bg-zinc-50 border border-zinc-100 p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-l-2 border-black pl-3">
          03 — Images
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageUploadSlot
          label="Cover Image"
          field="coverImage"
          preview={coverImage}
          isCover={true}
          onUpload={onUpload}
          onRemove={onRemove}
        />
        <ImageUploadSlot
          label="Flyer Image"
          field="flyerImage"
          preview={flyerImage}
          isCover={false}
          onUpload={onUpload}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
}
