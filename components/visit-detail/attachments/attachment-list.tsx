"use client";

import { useState } from "react";

import { VisitAttachment } from "@/types/visit-detail";

import { AttachmentCard } from "./attachment-card";
import { AttachmentPreview } from "./attachment-preview";

interface Props {
  attachments: VisitAttachment[];
}

export function AttachmentList({ attachments }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentAttachment =
    selectedIndex !== null ? attachments[selectedIndex] : null;

  const isPreviewable = (fileType: string) => fileType === "application/pdf";

  const openPreview = (index: number) => {
    if (isPreviewable(attachments[index].file_type)) {
      setSelectedIndex(index);
    } else {
      window.open(attachments[index].file_url, "_blank", "noopener,noreferrer");
    }
  };

  const closePreview = () => {
    setSelectedIndex(null);
  };

  const previous = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0 ? attachments.length - 1 : selectedIndex - 1,
    );
  };

  const next = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === attachments.length - 1 ? 0 : selectedIndex + 1,
    );
  };

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {attachments.map((attachment, index) => (
          <AttachmentCard
            key={attachment.id}
            attachment={attachment}
            onPreview={() => openPreview(index)}
          />
        ))}
      </div>

      {currentAttachment && (
        <AttachmentPreview
          attachments={attachments}
          currentIndex={selectedIndex}
          onClose={closePreview}
          onPrevious={previous}
          onNext={next}
        />
      )}
    </>
  );
}
