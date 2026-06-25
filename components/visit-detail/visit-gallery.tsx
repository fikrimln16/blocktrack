"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Camera,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  ImageIcon,
  X,
} from "lucide-react";

interface VisitPhoto {
  url: string;
  category: string;
  date: string;
}

interface VisitGalleryProps {
  photos: VisitPhoto[];
}

export function VisitGallery({ photos }: VisitGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowRight") {
        handleNext();
      }

      if (e.key === "ArrowLeft") {
        handlePrev();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  function handleNext() {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex + 1) % photos.length);
  }

  function handlePrev() {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  }

  return (
    <>
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* Header */}

        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Camera size={20} className="text-blue-600" />

                <h3 className="text-lg font-semibold">Visit Gallery</h3>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Documentation captured during the visit
              </p>
            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-50
                px-4
                py-2
                text-sm
                font-medium
                text-blue-700
              "
            >
              <ImageIcon size={16} />
              {photos.length} Photos
            </div>
          </div>
        </div>

        {/* Gallery */}

        <div
          className="
            grid
            gap-5
            p-6
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div className="relative h-[220px]">
                <Image
                  src={photo.url}
                  alt={photo.category}
                  fill
                  unoptimized
                  className="
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <span
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-xl
                    bg-white/95
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    backdrop-blur
                  "
                >
                  {photo.category}
                </span>

                <span
                  className="
                    absolute
                    right-4
                    top-4
                    rounded-full
                    bg-black/50
                    px-3
                    py-1
                    text-xs
                    text-white
                  "
                >
                  {index + 1}/{photos.length}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-semibold">{photo.category}</h4>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={15} />

                  {photo.date}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}

      {selectedPhoto && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/85
            p-4
            backdrop-blur-md
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              flex
              max-h-[95vh]
              w-full
              max-w-6xl
              flex-col
              overflow-hidden
              rounded-[32px]
              bg-white
            "
          >
            {/* Close */}

            <button
              onClick={() => setSelectedIndex(null)}
              className="
                absolute
                right-5
                top-5
                z-20
                rounded-full
                bg-white
                p-3
                shadow-xl
              "
            >
              <X size={18} />
            </button>

            {/* Image */}

            <div className="relative h-[65vh] bg-black">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.category}
                fill
                unoptimized
                className="object-contain"
              />

              <button
                onClick={handlePrev}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-white
                  p-3
                  shadow-lg
                "
              >
                <ChevronLeft />
              </button>

              <button
                onClick={handleNext}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-white
                  p-3
                  shadow-lg
                "
              >
                <ChevronRight />
              </button>
            </div>

            {/* Footer */}

            <div className="space-y-5 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedPhoto.category}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedPhoto.date}
                  </p>
                </div>

                <a
                  href={selectedPhoto.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  <Download size={18} />
                  Download
                </a>
              </div>

              {/* Thumbnail */}

              <div className="flex gap-3 overflow-x-auto pb-2">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`
                      relative
                      h-20
                      w-28
                      flex-shrink-0
                      overflow-hidden
                      rounded-xl
                      border-2
                      ${
                        index === selectedIndex
                          ? "border-blue-600"
                          : "border-transparent"
                      }
                    `}
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
