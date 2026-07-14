"use client";

import { useRef } from "react";

import {
  UploadCloud,
  FileText,
  X,
  FileArchive,
  FileSpreadsheet,
  FileImage,
} from "lucide-react";

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

function formatSize(size: number) {
  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function getIcon(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return <FileText className="text-red-600" size={22} />;

    case "doc":
    case "docx":
      return <FileText className="text-blue-600" size={22} />;

    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="text-green-600" size={22} />;

    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      return <FileImage className="text-purple-600" size={22} />;

    case "zip":
    case "rar":
    case "7z":
      return <FileArchive className="text-yellow-600" size={22} />;

    default:
      return <FileText className="text-slate-600" size={22} />;
  }
}

export function AttachmentUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | null) {
    if (!file) return;

    onChange(file);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold">Upload Attachment</h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload a document to be linked with the selected visits.
        </p>
      </div>

      <div className="p-6">
        {!file ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              px-6
              py-12
              transition
              hover:border-blue-400
              hover:bg-blue-50
            "
          >
            <UploadCloud size={42} className="text-blue-600" />

            <p className="mt-4 text-lg font-semibold">Click to Upload</p>

            <p className="mt-1 text-sm text-slate-500">
              PDF, DOC, DOCX, XLS, XLSX, ZIP, PNG, JPG
            </p>

            <input
              ref={inputRef}
              hidden
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.7z,.png,.jpg,.jpeg,.webp"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </button>
        ) : (
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-slate-100 p-3">
                  {getIcon(file)}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">{file.name}</p>

                  <p className="text-sm text-slate-500">
                    {formatSize(file.size)}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                    {file.type || "Unknown"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onChange(null)}
                className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
              >
                <X size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
            >
              Replace File
            </button>

            <input
              ref={inputRef}
              hidden
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.7z,.png,.jpg,.jpeg,.webp"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
