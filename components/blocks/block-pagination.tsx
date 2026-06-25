"use client";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;

  onPageChange: (page: number) => void;
}

export function BlockPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: Props) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-600">
        Showing <span className="font-semibold">{start}</span>
        {" - "}
        <span className="font-semibold">{end}</span>
        {" of "}
        <span className="font-semibold">{total}</span>
        {" blocks"}
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
