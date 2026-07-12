import { Info } from "lucide-react";

interface Props {
  total: number;

  page: number;

  limit: number;
}

export function VisitResultInfo({ total, page, limit }: Props) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Info size={16} />
        Showing
        <strong>
          {start}-{end}
        </strong>
        of
        <strong>{total.toLocaleString()}</strong>
        visits
      </div>
    </div>
  );
}
