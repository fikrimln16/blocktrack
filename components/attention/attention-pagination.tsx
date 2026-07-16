"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;

  onPageChange: (page: number) => void;
}

export function AttentionPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: Props) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Information */}
      <div className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{start}</span> -{" "}
        <span className="font-semibold text-slate-700">{end}</span> of{" "}
        <span className="font-semibold text-slate-700">{total}</span> findings
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700">
          {page} / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
