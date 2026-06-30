"use client";

import Link from "next/link";

import {
  Download,
  Eye,
  File,
  FileArchive,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";

import { VisitAttachment } from "@/types/visit-detail";

interface Props {
  attachment: VisitAttachment;
  onPreview: () => void;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

function getFileIcon(type: string) {
  if (type.includes("pdf"))
    return <FileText className="text-red-500" size={34} />;

  if (type.includes("presentation") || type.includes("powerpoint"))
    return <Presentation className="text-orange-500" size={34} />;

  if (type.includes("excel") || type.includes("spreadsheet"))
    return <FileSpreadsheet className="text-green-600" size={34} />;

  if (type.includes("zip") || type.includes("rar"))
    return <FileArchive className="text-yellow-600" size={34} />;

  return <File className="text-slate-500" size={34} />;
}

export function AttachmentCard({ attachment, onPreview }: Props) {
  const isPdf = attachment.file_type === "application/pdf";

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-lg
      "
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-slate-100 p-4">
          {getFileIcon(attachment.file_type)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">
            {attachment.original_name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {formatSize(attachment.file_size)}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {attachment.file_extension.toUpperCase()}
            </span>

            {attachment.category && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {attachment.category}
              </span>
            )}
          </div>

          <p className="mt-4 text-xs text-slate-400">
            {new Date(attachment.created_at).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={onPreview}
          className="
            flex-1
            rounded-xl
            bg-indigo-600
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          <div className="flex items-center justify-center gap-2">
            <Eye size={16} />
            {isPdf ? "Preview" : "Open"}
          </div>
        </button>

        <Link
          href={attachment.file_url}
          target="_blank"
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-2.5
            transition
            hover:bg-slate-100
          "
        >
          <Download size={18} />
        </Link>
      </div>
    </div>
  );
}
