"use client";

interface Props {
  total: number;
  page: number;
  limit: number;
}

export function AttachmentResultInfo({ total, page, limit }: Props) {
  if (total === 0) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
        <p className="text-sm text-slate-500">No attachments found.</p>
      </div>
    );
  }

  const start = (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-900">{start}</span> -{" "}
        <span className="font-semibold text-slate-900">{end}</span> of{" "}
        <span className="font-semibold text-slate-900">{total}</span>{" "}
        attachments
      </p>

      <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        {total} Total Files
      </div>
    </div>
  );
}
