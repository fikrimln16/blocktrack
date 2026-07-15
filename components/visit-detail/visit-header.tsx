"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  Loader2,
  TriangleAlert,
} from "lucide-react";

import { toast } from "sonner";

import { VisitDetail } from "@/types/visit-detail";

import { VisitStatusBadge } from "./visit-status-badge";

interface Props {
  visit: VisitDetail;
}

export function VisitHeader({ visit }: Props) {
  const router = useRouter();

  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const promise = async () => {
      setLoading(true);

      const response = await fetch(`/api/visits/${visit.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete visit.");
      }

      return result;
    };

    toast.promise(promise(), {
      loading: "Deleting visit...",
      success: () => {
        setOpenDelete(false);

        setTimeout(() => {
          router.push(`/blocks/${visit.block_id}`);
          router.refresh();
        }, 300);

        return "Visit deleted successfully.";
      },
      error: (error) => {
        setLoading(false);
        return error.message || "Failed to delete visit.";
      },
      finally: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <Link
            href={`/blocks/${visit.block_id}`}
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Block
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{visit.visit_code}</h1>

            <VisitStatusBadge status={visit.status} />
          </div>

          <p className="mt-2 text-slate-500">
            Inspection details and documentation.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenDelete(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
            Delete
          </button>

          {/* <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
            <Pencil size={18} />
            Edit
          </button> */}
        </div>
      </div>

      {/* Delete Modal */}
      {openDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <TriangleAlert size={28} className="text-red-600" />
            </div>

            <h2 className="mt-5 text-center text-xl font-bold">
              Delete Visit?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-slate-500">
              This action will permanently delete the visit, including all
              uploaded photos and attachments. This action cannot be undone.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                disabled={loading}
                onClick={() => setOpenDelete(false)}
                className="flex-1 rounded-xl border border-slate-200 py-3 font-medium hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Visit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
