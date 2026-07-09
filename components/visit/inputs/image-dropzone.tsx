"use client";

import { useRef } from "react";
import { UploadCloud, Camera, ImageIcon } from "lucide-react";

interface Props {
  onFiles: (files: File[]) => void;
}

export function ImageDropzone({ onFiles }: Props) {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;

    if (!list) return;

    const files = Array.from(list)
      .filter((file) => {
        if (!(file instanceof File)) return false;

        if (!file.type.startsWith("image/")) return false;

        if (file.size > 10 * 1024 * 1024) return false;

        return true;
      })
      .map((file) => {
        // Safari kadang nama file kosong
        if (!file.name || file.name.trim() === "") {
          const ext =
            file.type === "image/png"
              ? ".png"
              : file.type === "image/webp"
                ? ".webp"
                : file.type === "image/heic"
                  ? ".heic"
                  : file.type === "image/heif"
                    ? ".heif"
                    : ".jpg";

          return new File([file], `photo_${Date.now()}${ext}`, {
            type: file.type || "image/jpeg",
            lastModified: Date.now(),
          });
        }

        return file;
      });

    onFiles(files);

    // supaya bisa memilih file yang sama lagi
    event.target.value = "";
  }

  return (
    <>
      {/* Hidden Gallery */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        hidden
        onChange={handleChange}
      />

      {/* Hidden Camera */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleChange}
      />

      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <UploadCloud size={52} className="mx-auto text-blue-600" />

        <h3 className="mt-4 text-lg font-semibold">Upload Documentation</h3>

        <p className="mt-2 text-sm text-slate-500">
          Choose a photo from your gallery or take one directly.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <ImageIcon size={18} />
            Upload Gallery
          </button>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-3
              transition
              hover:bg-slate-100
            "
          >
            <Camera size={18} />
            Take Photo
          </button>
        </div>

        <p className="mt-5 text-xs text-slate-400">
          JPEG, PNG, WEBP, HEIC, HEIF • Maximum 10 MB per image
        </p>
      </div>
    </>
  );
}
