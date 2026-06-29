"use client";

import { useState } from "react";

import { VisitPhoto } from "@/types/visit-detail";

import { PhotoCard } from "./photo-card";
import { PhotoModal } from "./photo-modal";

interface Props {
  photos: VisitPhoto[];
}

export function PhotoGallery({ photos }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
  };

  const closePhoto = () => {
    setSelectedIndex(null);
  };

  const previousPhoto = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1,
    );
  };

  const nextPhoto = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1,
    );
  };

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => openPhoto(index)}
          />
        ))}
      </div>

      <PhotoModal
        photos={photos}
        currentIndex={selectedIndex}
        onClose={closePhoto}
        onPrevious={previousPhoto}
        onNext={nextPhoto}
      />
    </>
  );
}
