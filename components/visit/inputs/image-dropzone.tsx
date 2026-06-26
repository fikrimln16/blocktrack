"use client";

import { useCallback } from "react";

import { useDropzone } from "react-dropzone";

import { UploadCloud, ImageIcon } from "lucide-react";

interface Props {
  onFiles: (files: File[]) => void;
}

export function ImageDropzone({ onFiles }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFiles(acceptedFiles);
    },
    [onFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    multiple: true,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer
        rounded-3xl
        border-2
        border-dashed
        p-10
        text-center
        transition

        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud size={48} className="mx-auto text-blue-500" />

      <h3 className="mt-4 font-semibold">Drag & Drop Photos</h3>

      <p className="mt-2 text-sm text-slate-500">or click to browse files</p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
        <ImageIcon size={18} />
        Image Only
      </div>
    </div>
  );
}
