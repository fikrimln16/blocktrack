"use client";

import { useState } from "react";

import Image from "next/image";

import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";

import { VisitPhoto } from "@/services/block-detail.service";

interface Props {
  photos: VisitPhoto[];
}

export function BlockPhotoGallery({ photos }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const currentPhoto = selected !== null ? photos[selected] : null;

  return (
    <>
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Camera size={16} className="text-slate-500" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Documentation ({photos.length})
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 lg:grid-cols-6 xl:grid-cols-8">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelected(index)}
              className="group overflow-hidden rounded-xl border border-slate-200"
            >
              <Image
                src={photo.photo_url}
                alt={`Photo ${index + 1}`}
                width={120}
                height={120}
                className="aspect-square h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && currentPhoto && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {/* Header */}
          <div className="absolute inset-x-0 top-0 z-10 border-b border-white/10 bg-gradient-to-b from-black/90 to-black/40 backdrop-blur">
            <div className="flex items-start justify-between px-8 py-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Camera size={18} className="text-blue-400" />

                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                    Documentation Gallery
                  </span>
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  {currentPhoto.block_code}

                  {currentPhoto.block_name && (
                    <span className="ml-2 text-slate-300">
                      • {currentPhoto.block_name}
                    </span>
                  )}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                  <span>
                    <strong>Estate:</strong> {currentPhoto.estate}
                  </span>

                  <span>
                    <strong>Visit:</strong> {currentPhoto.visit_code}
                  </span>

                  <span>
                    <strong>Photo:</strong> {selected + 1} / {photos.length}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                  <span>👤 {currentPhoto.inspector}</span>

                  <span>📅 {currentPhoto.visit_date}</span>

                  <span>🕒 {currentPhoto.visit_time}</span>

                  <span>☁️ {currentPhoto.weather}</span>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/20"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Previous */}
          {selected > 0 && (
            <button
              onClick={() => setSelected(selected - 1)}
              className="absolute left-6 rounded-full bg-white/10 p-4 text-white backdrop-blur transition hover:bg-white/20"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div className="flex max-h-[90vh] max-w-7xl items-center justify-center px-24 pt-24 pb-20">
            <Image
              src={currentPhoto.photo_url}
              alt={`Photo ${selected + 1}`}
              width={1800}
              height={1200}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
          </div>

          {/* Next */}
          {selected < photos.length - 1 && (
            <button
              onClick={() => setSelected(selected + 1)}
              className="absolute right-6 rounded-full bg-white/10 p-4 text-white backdrop-blur transition hover:bg-white/20"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Footer */}
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/70 backdrop-blur">
            <div className="flex items-center justify-between px-8 py-5">
              <div>
                <p className="font-medium text-white">
                  Inspection Documentation
                </p>

                <p className="text-sm text-slate-300">
                  Visit {currentPhoto.visit_code} • {currentPhoto.visit_date}{" "}
                  {currentPhoto.visit_time}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      selected === index
                        ? "w-8 bg-blue-500"
                        : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
