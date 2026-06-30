"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { FileText, Loader2, Trash2, Upload, X } from "lucide-react";

interface Props {
  visitId: number;
}

interface AttachmentItem {
  file: File;
  displayName: string;
}

export function AttachmentUpload({ visitId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("General");

  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const newFiles: AttachmentItem[] = Array.from(files).map((file) => ({
      file,
      displayName: file.name,
    }));

    setAttachments((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const updateName = (index: number, value: string) => {
    setAttachments((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              displayName: value,
            }
          : item,
      ),
    );
  };

  const handleUpload = async () => {
    if (attachments.length === 0) {
      alert("Please select attachment.");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("category", category);

      attachments.forEach((item) => {
        formData.append("attachments", item.file);
        formData.append("display_names", item.displayName);
      });

      const response = await fetch(`/api/visits/${visitId}/attachments`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setAttachments([]);
      setOpen(false);

      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Upload size={18} />
        Upload Attachment
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl">
              <div className="flex items-center justify-between border-b p-6">
                <div>
                  <h2 className="text-xl font-semibold">Upload Attachment</h2>

                  <p className="text-sm text-slate-500">
                    Upload document for this visit.
                  </p>
                </div>

                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option>General</option>
                    <option>Report</option>
                    <option>Evidence</option>
                    <option>Presentation</option>
                  </select>
                </div>

                <label
                  htmlFor="attachment-upload"
                  className="
                    block
                    cursor-pointer
                    rounded-2xl
                    border-2
                    border-dashed
                    border-slate-300
                    p-10
                    text-center
                    transition
                    hover:border-blue-500
                    hover:bg-blue-50
                  "
                >
                  <Upload className="mx-auto text-blue-600" size={40} />

                  <p className="mt-4 font-semibold">Select Files</p>

                  <p className="mt-2 text-sm text-slate-500">
                    Click here to browse files
                  </p>
                </label>

                <input
                  id="attachment-upload"
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                  onChange={handleChange}
                />

                {attachments.length > 0 && (
                  <div className="space-y-3">
                    {attachments.map((item, index) => (
                      <div
                        key={`${item.file.name}-${index}`}
                        className="rounded-2xl border p-4"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <FileText className="text-blue-600" size={22} />

                          <div className="flex-1">
                            <input
                              value={item.displayName}
                              onChange={(e) =>
                                updateName(index, e.target.value)
                              }
                              className="
                                w-full
                                rounded-lg
                                border
                                px-3
                                py-2
                                font-medium
                              "
                            />

                            <p className="mt-1 text-xs text-slate-500">
                              Original : {item.file.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {(item.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>

                          <button
                            onClick={() => removeFile(index)}
                            className="rounded-lg p-2 hover:bg-red-50"
                          >
                            <Trash2 className="text-red-500" size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t p-6">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border px-5 py-2.5"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={handleUpload}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white disabled:opacity-50"
                >
                  {loading && <Loader2 className="animate-spin" size={16} />}
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
