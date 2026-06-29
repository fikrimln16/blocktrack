import Link from "next/link";

import { ArrowLeft, Pencil, Download } from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { VisitStatusBadge } from "./visit-status-badge";

interface Props {
  visit: VisitDetail;
}

export function VisitHeader({ visit }: Props) {
  return (
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
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50">
          <Download size={18} />
          Export
        </button>

        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
          <Pencil size={18} />
          Edit
        </button>
      </div>
    </div>
  );
}
