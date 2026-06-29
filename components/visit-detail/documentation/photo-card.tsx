"use client";

import { useState } from "react";

import Image from "next/image";

import { CalendarDays, Download, ImageIcon, ImageOff } from "lucide-react";

import { VisitPhoto } from "@/types/visit-detail";

interface Props {
  photo: VisitPhoto;
  onClick: () => void;
}

export function PhotoCard({ photo, onClick }: Props) {
  const [imageError, setImageError] = useState(false);

  const hasImage =
    !!photo.photo_url && photo.photo_url.trim() !== "" && !imageError;

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >
      {/* Image */}
      <button
        type="button"
        disabled={!hasImage}
        onClick={() => hasImage && onClick()}
        className={`relative block aspect-square w-full overflow-hidden bg-slate-100 ${
          hasImage ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {hasImage ? (
          <>
            <Image
              src={photo.photo_url}
              alt={photo.category ?? "Documentation"}
              fill
              onError={() => setImageError(true)}
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Click Hint */}
            <div className="absolute bottom-3 right-3 rounded-xl bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 opacity-0 shadow backdrop-blur transition-all duration-300 group-hover:opacity-100">
              View Photo
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <ImageOff size={34} className="text-slate-400" />
            </div>

            <p className="mt-4 font-semibold text-slate-700">No Photo</p>

            <p className="mt-1 px-6 text-center text-xs text-slate-500">
              Documentation has not been uploaded
            </p>
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          {photo.category ?? "Documentation"}
        </span>
      </button>

      {/* Footer */}
      <div className="flex items-center justify-between p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ImageIcon size={16} className="text-blue-600" />

            <p className="truncate font-medium text-slate-900">
              {photo.category ?? "Documentation"}
            </p>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={14} />

            {new Date(photo.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {hasImage ? (
          <a
            href={photo.photo_url}
            download
            onClick={(e) => e.stopPropagation()}
            className="
              rounded-xl
              border
              border-slate-200
              p-2.5
              transition
              hover:border-blue-200
              hover:bg-blue-50
            "
          >
            <Download size={18} className="text-slate-600" />
          </a>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 px-3 py-2 text-xs text-slate-400">
            N/A
          </div>
        )}
      </div>
    </div>
  );
}
