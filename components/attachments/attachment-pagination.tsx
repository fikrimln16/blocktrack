"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function AttachmentPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  function getPages() {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm sm:flex-row">
      {/* Previous */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
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
          transition
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPages().map((number) => (
          <button
            key={number}
            onClick={() => onChange(number)}
            className={`
              h-10
              w-10
              rounded-xl
              text-sm
              font-semibold
              transition
              ${
                number === page
                  ? "bg-blue-600 text-white shadow"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
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
          transition
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
