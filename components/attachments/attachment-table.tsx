"use client";

import Link from "next/link";

import {
  Eye,
  Download,
  Pencil,
  Trash2,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  FileCode,
} from "lucide-react";

import { Attachment } from "@/types/attachment";
import { AttachmentEmpty } from "./attachment-empty";

interface Props {
  attachments: Attachment[];
  loading: boolean;
}

function formatFileSize(bytes: number) {
  if (!bytes) return "-";

  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;

  if (bytes >= gb) {
    return `${(bytes / gb).toFixed(2)} GB`;
  }

  if (bytes >= mb) {
    return `${(bytes / mb).toFixed(2)} MB`;
  }

  if (bytes >= kb) {
    return `${(bytes / kb).toFixed(2)} KB`;
  }

  return `${bytes} B`;
}

function getFileIcon(extension: string) {
  switch (extension.toLowerCase()) {
    case "pdf":
      return <FileText size={18} className="text-red-600" />;

    case "doc":
    case "docx":
      return <FileText size={18} className="text-blue-600" />;

    case "xls":
    case "xlsx":
      return <FileSpreadsheet size={18} className="text-green-600" />;

    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return <FileImage size={18} className="text-purple-600" />;

    case "zip":
    case "rar":
    case "7z":
      return <FileArchive size={18} className="text-yellow-600" />;

    default:
      return <FileCode size={18} className="text-slate-600" />;
  }
}

function getBadgeColor(extension: string) {
  switch (extension.toLowerCase()) {
    case "pdf":
      return "bg-red-50 text-red-700";

    case "doc":
    case "docx":
      return "bg-blue-50 text-blue-700";

    case "xls":
    case "xlsx":
      return "bg-green-50 text-green-700";

    case "zip":
    case "rar":
    case "7z":
      return "bg-yellow-50 text-yellow-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function AttachmentTable({ attachments, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-500">Loading attachments...</p>
      </div>
    );
  }

  if (attachments.length === 0) {
    return <AttachmentEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4">File</th>

            <th className="px-6 py-4">Estate</th>

            <th className="px-6 py-4">Visits</th>

            <th className="px-6 py-4">Size</th>

            <th className="px-6 py-4">Uploaded By</th>

            <th className="px-6 py-4">Created</th>

            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {attachments.map((attachment) => (
            <tr key={attachment.id} className="transition hover:bg-slate-50">
              {/* File */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    {getFileIcon(attachment.extension)}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {attachment.title}
                    </p>

                    <p className="max-w-xs truncate text-sm text-slate-500">
                      {attachment.file_name}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeColor(
                        attachment.extension,
                      )}`}
                    >
                      {attachment.extension.toUpperCase()}
                    </span>
                  </div>
                </div>
              </td>

              {/* Estate */}
              <td className="px-6 py-5">
                <p className="font-medium text-slate-900">
                  {attachment.estate}
                </p>

                <p className="text-sm text-slate-500">{attachment.ama}</p>
              </td>

              {/* Related Visits */}
              <td className="px-6 py-5">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {attachment.total_visits} Visits
                </span>
              </td>

              {/* Size */}
              <td className="px-6 py-5">
                <span className="text-sm font-medium text-slate-700">
                  {formatFileSize(attachment.file_size)}
                </span>
              </td>

              {/* Uploader */}
              <td className="px-6 py-5">
                <span className="text-sm text-slate-700">
                  {attachment.uploader}
                </span>
              </td>

              {/* Created */}
              <td className="px-6 py-5">
                <div className="text-sm">
                  <p className="font-medium text-slate-800">
                    {new Date(attachment.created_at).toLocaleDateString(
                      "id-ID",
                    )}
                  </p>

                  <p className="text-slate-500">
                    {new Date(attachment.created_at).toLocaleTimeString(
                      "id-ID",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/attachments/${attachment.id}`}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                    title="View"
                  >
                    <Eye size={18} />
                  </Link>

                  <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                    title="Download"
                  >
                    <Download size={18} />
                  </a>

                  <Link
                    href={`/attachments/${attachment.id}/edit`}
                    className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
