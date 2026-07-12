"use client";

import { useState } from "react";

import { GalleryPhoto } from "@/types/gallery";

import { GalleryCard } from "./gallery-card";
import { GalleryEmpty } from "./gallery-empty";
import { GalleryPreviewModal } from "./gallery-preview-modal";

interface Props {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return <GalleryEmpty />;
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {photos.map((photo, index) => (
          <GalleryCard
            key={photo.id}
            photo={photo}
            onPreview={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <GalleryPreviewModal
        photos={photos}
        selected={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onChange={setSelectedIndex}
      />
    </>
  );
}
