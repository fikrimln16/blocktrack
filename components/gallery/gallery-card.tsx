"use client";

import Image from "next/image";

import { Calendar, Cloud, MapPinned, User } from "lucide-react";

import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photo: GalleryPhoto;
  onPreview: () => void;
}

export function GalleryCard({ photo, onPreview }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail */}
      <Image
        src={photo.photo_url}
        alt={photo.block_code}
        width={600}
        height={450}
        className="aspect-square w-full object-cover"
      />

      {/* Content */}
      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-semibold text-slate-900">{photo.block_code}</h3>

          {photo.block_name && (
            <p className="text-sm text-slate-500">{photo.block_name}</p>
          )}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPinned size={15} />
            <span>{photo.estate}</span>
          </div>

          <div className="flex items-center gap-2">
            <User size={15} />
            <span>{photo.inspector}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={15} />
            <span>
              {photo.visit_date} • {photo.visit_time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Cloud size={15} />
            <span>{photo.weather}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onPreview}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
