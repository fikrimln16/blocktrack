"use client";

import { useState } from "react";

import { ChevronDown, ChevronRight, Images } from "lucide-react";

import { GalleryPhoto } from "@/types/gallery";

import { GalleryGrid } from "./gallery-grid";

interface Props {
  title: string;
  photos: GalleryPhoto[];
}

export function GalleryAccordion({ title, photos }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 transition hover:bg-slate-50"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
            <Images size={22} className="text-blue-600" />
          </div>

          <div className="text-left">
            <h2 className="font-semibold text-slate-900">{title}</h2>

            <p className="mt-1 text-sm text-slate-500">
              {photos.length.toLocaleString()} Documentation
            </p>
          </div>
        </div>

        {open ? (
          <ChevronDown size={20} className="text-slate-400" />
        ) : (
          <ChevronRight size={20} className="text-slate-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-200 p-6">
          <GalleryGrid photos={photos} />
        </div>
      )}
    </div>
  );
}
