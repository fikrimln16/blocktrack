"use client";

import Image from "next/image";

import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Cloud,
  MapPin,
  User,
  Calendar,
  X,
} from "lucide-react";

import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photos: GalleryPhoto[];

  selected: number | null;

  onClose: () => void;

  onChange: (index: number | null) => void;
}

export function GalleryPreviewModal({
  photos,
  selected,
  onClose,
  onChange,
}: Props) {
  if (selected === null) return null;

  const photo = photos[selected];

  return (
    <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm">
      {/* Header */}

      <div className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="flex items-center justify-between px-8 py-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Camera size={16} className="text-blue-400" />

              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                Documentation Gallery
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white">
              {photo.block_code}

              {photo.block_name && (
                <span className="ml-2 text-slate-300">
                  • {photo.block_name}
                </span>
              )}
            </h2>

            <p className="mt-2 text-sm text-slate-400">{photo.estate}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Previous */}

      {selected > 0 && (
        <button
          onClick={() => onChange(selected - 1)}
          className="absolute left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}

      {selected < photos.length - 1 && (
        <button
          onClick={() => onChange(selected + 1)}
          className="absolute right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Image */}

      <div className="flex h-full items-center justify-center px-32 py-28">
        <Image
          src={photo.photo_url}
          alt={photo.block_code}
          width={1800}
          height={1200}
          className="max-h-full w-auto rounded-2xl object-contain shadow-2xl"
        />
      </div>

      {/* Footer */}

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/70 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-6 px-8 py-5">
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <User size={16} />
              {photo.inspector}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {photo.visit_date} • {photo.visit_time}
            </div>

            <div className="flex items-center gap-2">
              <Cloud size={16} />
              {photo.weather}
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {photo.visit_code}
            </div>
          </div>

          <div className="text-sm text-white">
            {selected + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
