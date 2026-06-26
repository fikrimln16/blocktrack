"use client";

import Link from "next/link";

import {
  CalendarDays,
  Camera,
  ClipboardCheck,
  TriangleAlert,
  UserRound,
  ChevronRight,
} from "lucide-react";

import { Visit } from "@/types/visit";

import { VisitStatusBadge } from "./visit-status-badge";

interface Props {
  visit: Visit;
}

export function VisitHistoryItem({ visit }: Props) {
  return (
    <Link
      href={`/dashboard/visits/${visit.id}`}
      className="group flex items-start justify-between gap-5 border-b border-slate-100 p-5 transition hover:bg-slate-50"
    >
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />

            {new Date(visit.visit_date).toLocaleDateString()}
          </div>

          <VisitStatusBadge status={visit.status} />
        </div>

        <h3 className="font-semibold text-slate-900">{visit.visit_code}</h3>

        <div className="flex flex-wrap gap-5 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <UserRound size={16} />
            {visit.inspector}
          </span>

          <span className="flex items-center gap-2">
            <Camera size={16} />
            {visit.total_photos} Photos
          </span>

          <span className="flex items-center gap-2">
            <TriangleAlert size={16} />
            {visit.total_findings} Findings
          </span>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-slate-500">
          <span>{visit.weather}</span>

          <span>{visit.duration} menit</span>
        </div>
      </div>

      <ChevronRight
        className="text-slate-400 transition group-hover:translate-x-1"
        size={20}
      />
    </Link>
  );
}
