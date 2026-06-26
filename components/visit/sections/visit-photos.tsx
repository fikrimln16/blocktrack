"use client";

import { Camera, Trash2, Eye, ImagePlus } from "lucide-react";

import { ImageDropzone } from "../inputs/image-dropzone";

interface Props {
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}

export function VisitPhotos({ photos, setPhotos }: Props) {
  function handleFiles(files: File[]) {
    setPhotos((prev) => [...prev, ...files]);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <section className="mt-10 border-t border-slate-200 pt-10">
      <div className="mb-6 flex items-center gap-2">
        <Camera size={22} className="text-blue-600" />

        <div>
          <h2 className="text-xl font-semibold">Documentation</h2>

          <p className="text-sm text-slate-500">
            Upload inspection photos before submitting.
          </p>
        </div>
      </div>

      <ImageDropzone onFiles={handleFiles} />

      {photos.length > 0 && (
        <>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-blue-600" />

              <h3 className="font-semibold">Photo Preview</h3>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {photos.length} Photos
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((photo, index) => (
              <PhotoCard
                key={`${photo.name}-${index}`}
                file={photo}
                onDelete={() => removePhoto(index)}
              />
            ))}
          </div>
        </>
      )}

      {photos.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
          <ImagePlus size={42} className="mx-auto text-slate-300" />

          <p className="mt-3 text-slate-500">No photo selected.</p>
        </div>
      )}
    </section>
  );
}

interface PhotoCardProps {
  file: File;
  onDelete: () => void;
}

function PhotoCard({ file, onDelete }: PhotoCardProps) {
  const preview = URL.createObjectURL(file);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <img src={preview} alt={file.name} className="h-52 w-full object-cover" />

      <div className="space-y-2 p-4">
        <p className="truncate text-sm font-medium">{file.name}</p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>

          <span>{file.type}</span>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-2 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}
