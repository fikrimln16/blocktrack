"use client";

interface Props {
  open: boolean;
  loading: boolean;

  title: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function AttachmentDeleteModal({
  open,
  loading,
  title,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold">Delete Attachment</h2>

          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to delete
            <span className="font-semibold text-slate-800"> "{title}"</span>?
          </p>

          <p className="mt-1 text-sm text-red-500">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2.5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700 disabled:bg-red-400"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
