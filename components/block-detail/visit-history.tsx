"use client";

import { ClipboardCheck } from "lucide-react";

import { Visit } from "@/types/visit";

import { VisitHistoryItem } from "./visit-history-item";
import { VisitEmpty } from "./visit-empty";

interface Props {
  visits: Visit[];
}

export function VisitHistory({ visits }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={20} className="text-blue-600" />

          <h2 className="text-lg font-semibold">Visit History</h2>
        </div>

        <span className="rounded-xl bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {visits.length} Visits
        </span>
      </div>

      {visits.length === 0 ? (
        <VisitEmpty />
      ) : (
        visits.map((visit) => <VisitHistoryItem key={visit.id} visit={visit} />)
      )}
    </div>
  );
}
