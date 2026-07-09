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
      const files = acceptedFiles.filter((file) => {
        return (
          file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024 // Max 10 MB
        );
      });

      onFiles(files);
    },
    [onFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    multiple: true,

    noKeyboard: true,

    preventDropOnDocument: true,

    useFsAccessApi: false,

    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer
        rounded-3xl
        border-2
        border-dashed
        p-8
        text-center
        transition

        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        }
      `}
    >
      <input
        {...getInputProps({
          accept: "image/*",
          capture: "environment",
        })}
      />

      <UploadCloud size={48} className="mx-auto text-blue-500" />

      <h3 className="mt-4 text-lg font-semibold">Upload Documentation</h3>

      <p className="mt-2 text-sm text-slate-500">
        Tap here to choose photos or directly use the camera.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
        <ImageIcon size={18} />
        JPG · PNG · WEBP · HEIC
      </div>

      <p className="mt-3 text-xs text-slate-400">Maximum 10 MB per image</p>
    </div>
  );
}
