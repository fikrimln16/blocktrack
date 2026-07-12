"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

export function VisitPagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="text-sm text-slate-500">
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 disabled:opacity-50"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
