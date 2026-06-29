"use client";

import { useEffect } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

import { VisitPhoto } from "@/types/visit-detail";

interface Props {
  photos: VisitPhoto[];
  currentIndex: number | null;

  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function PhotoModal({
  photos,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  const photo = currentIndex !== null ? photos[currentIndex] : null;

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowLeft":
          onPrevious();
          break;

        case "ArrowRight":
          onNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [currentIndex, onClose, onPrevious, onNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex h-screen w-screen flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-5 text-white">
          <div>
            <h2 className="text-xl font-semibold">
              {photo.category ?? "Documentation"}
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              {new Date(photo.created_at).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              {currentIndex! + 1} / {photos.length}
            </span>

            <a
              href={photo.photo_url}
              download
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <Download size={18} />
            </a>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 p-3 transition hover:bg-red-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          {/* Previous */}
          {photos.length > 1 && (
            <button
              onClick={onPrevious}
              className="
                absolute
                left-6
                z-50
                rounded-full
                bg-white/10
                p-4
                text-white
                backdrop-blur
                transition
                hover:bg-white/20
              "
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div className="relative h-full w-full">
            <Image
              src={photo.photo_url}
              alt={photo.category ?? "Documentation"}
              fill
              priority
              sizes="100vw"
              className="object-contain p-10"
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={onNext}
              className="
                absolute
                right-6
                z-50
                rounded-full
                bg-white/10
                p-4
                text-white
                backdrop-blur
                transition
                hover:bg-white/20
              "
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-8 py-5 text-white">
          <div>
            <p className="font-semibold">{photo.category ?? "Documentation"}</p>

            <p className="mt-1 text-sm text-slate-300">
              Use ← → keyboard or click navigation arrows
            </p>
          </div>

          <div className="text-sm text-slate-400">Press ESC to close</div>
        </div>
      </div>
    </div>
  );
}
