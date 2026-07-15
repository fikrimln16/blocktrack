"use client";

import { useState } from "react";
import { X, Upload, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface Props {
  visitId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddDocumentationModal({ visitId, onClose, onSuccess }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  const previews = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...selected]);

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    try {
      if (files.length === 0) {
        toast.error("Please select at least one photo.");
        return;
      }

      setSaving(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("photos", file);
      });

      const response = await fetch(`/api/visits/${visitId}/photos`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Upload failed.");
      }

      onClose();

      toast.success("Photos uploaded successfully.", {
        description: `${files.length} photo(s) added.`,
        duration: 2000,
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      toast.error("Upload failed.", {
        description:
          error instanceof Error ? error.message : "Unexpected error.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold">Add Documentation</h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload additional inspection photos.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Upload Area */}
            <label
              className="
      flex
      cursor-pointer
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
      hover:border-blue-500
      hover:bg-blue-50
    "
            >
              <ImagePlus size={44} className="mb-4 text-blue-600" />

              <h3 className="text-lg font-semibold text-slate-900">
                Select Documentation Photos
              </h3>

              <p className="mt-2 text-center text-sm text-slate-500">
                Click to browse or drag and drop your photos here.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                JPG, PNG, WEBP • Multiple files supported
              </p>

              <input
                hidden
                multiple
                accept="image/*"
                type="file"
                onChange={handleChange}
              />
            </label>

            {/* Preview */}
            {files.length > 0 && (
              <div className="mt-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Selected Photos
                    </h3>

                    <p className="text-sm text-slate-500">
                      {files.length} photo(s) ready to upload
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                    {files.length} Files
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {previews.map((item, index) => (
                    <div
                      key={index}
                      className="
              group
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
                    >
                      <div className="relative">
                        <img
                          src={item.url}
                          alt=""
                          className="aspect-square w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="
                  absolute
                  right-2
                  top-2
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-black/70
                  text-white
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="space-y-1 p-3">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {item.file.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {(item.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={saving || files.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <Upload size={18} />

              {saving ? "Uploading..." : "Upload Photos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
