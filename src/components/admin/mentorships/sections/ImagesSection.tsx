"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

interface ImagesSectionProps {
  coverImage?: string;
  flyerImage?: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "coverImage" | "flyerImage") => void;
  onRemove: (field: "coverImage" | "flyerImage") => void;
}

function ImageUploadSlot({
  label,
  field,
  preview,
  onUpload,
  onRemove,
}: {
  label: string;
  field: "coverImage" | "flyerImage";
  preview?: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "coverImage" | "flyerImage") => void;
  onRemove: (field: "coverImage" | "flyerImage") => void;
}) {
  return (
    <div>
      <Label className="text-sm font-semibold text-black mb-3 block">
        {label}
      </Label>
      {preview ? (
        <div className="relative w-full h-48 overflow-hidden border border-grey-200">
          <Image src={preview} alt={`${label} preview`} fill className="object-cover" />
          <button
            type="button"
            onClick={() => onRemove(field)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-grey-300 cursor-pointer hover:border-grey-400 transition-colors bg-grey-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-grey-400 mb-2" />
            <p className="text-sm text-grey-600">Click to upload {label.toLowerCase()}</p>
          </div>
          <input
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

export function ImagesSection({ coverImage, flyerImage, onUpload, onRemove }: ImagesSectionProps) {
  return (
    <div className="bg-white border border-grey-200 p-8 space-y-6">
      <h2 className="text-xl font-bold text-black uppercase tracking-tight">
        Images
      </h2>
      <ImageUploadSlot
        label="Cover Image"
        field="coverImage"
        preview={coverImage}
        onUpload={onUpload}
        onRemove={onRemove}
      />
      <ImageUploadSlot
        label="Flyer Image"
        field="flyerImage"
        preview={flyerImage}
        onUpload={onUpload}
        onRemove={onRemove}
      />
    </div>
  );
}
