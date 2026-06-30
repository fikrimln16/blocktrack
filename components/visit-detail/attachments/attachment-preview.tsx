"use client";

import { useEffect } from "react";

import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  X,
} from "lucide-react";

import { VisitAttachment } from "@/types/visit-detail";

interface Props {
  attachments: VisitAttachment[];
  currentIndex: number | null;

  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function AttachmentPreview({
  attachments,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  if (currentIndex === null) return null;

  const attachment = attachments[currentIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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

    window.addEventListener("keydown", handler);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);

      document.body.style.overflow = "";
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex h-screen flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-5 text-white">
          <div>
            <h2 className="font-semibold">{attachment.original_name}</h2>

            <p className="mt-1 text-sm text-slate-300">
              {currentIndex + 1} / {attachments.length}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href={attachment.file_url}
              target="_blank"
              className="rounded-xl bg-white/10 p-3 hover:bg-white/20"
            >
              <ExternalLink size={18} />
            </Link>

            <Link
              href={attachment.file_url}
              download
              className="rounded-xl bg-white/10 p-3 hover:bg-white/20"
            >
              <Download size={18} />
            </Link>

            <button onClick={onClose} className="rounded-xl bg-red-500 p-3">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex-1 bg-slate-900">
          {attachments.length > 1 && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-5 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={onNext}
                className="absolute right-5 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <iframe
            src={attachment.file_url}
            className="h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
