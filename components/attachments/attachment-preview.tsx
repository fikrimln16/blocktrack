"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Download, ExternalLink, X } from "lucide-react";

interface Props {
  open: boolean;

  attachment: {
    id: number;
    file_name: string;
  } | null;

  onClose: () => void;
}

export function AttachmentPreview({ open, attachment, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);

      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !attachment) {
    return null;
  }

  const previewUrl = `/api/attachments/${attachment.id}/preview`;

  const downloadUrl = `/api/attachments/${attachment.id}/download`;

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
            <h2 className="font-semibold">{attachment.file_name}</h2>

            <p className="mt-1 text-sm text-slate-300">PDF Preview</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={previewUrl}
              target="_blank"
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <ExternalLink size={18} />
            </Link>

            <Link
              href={downloadUrl}
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <Download size={18} />
            </Link>

            <button
              onClick={onClose}
              className="rounded-xl bg-red-500 p-3 transition hover:bg-red-600"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 bg-slate-900">
          <iframe
            src={previewUrl}
            title={attachment.file_name}
            className="h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
