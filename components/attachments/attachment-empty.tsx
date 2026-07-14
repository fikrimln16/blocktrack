"use client";

import Link from "next/link";

import { Files, Plus } from "lucide-react";

export function AttachmentEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <Files size={36} className="text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">No Attachments</h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        There are no attachment documents available yet. Upload your first
        document and link it to one or multiple inspection visits.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/attachments/create"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Plus size={18} />
          Create Attachment
        </Link>

        <Link
          href="/gallery"
          className="
            inline-flex
            items-center
            rounded-xl
            border
            border-slate-200
            px-5
            py-3
            text-sm
            font-medium
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          View Gallery
        </Link>
      </div>
    </div>
  );
}
