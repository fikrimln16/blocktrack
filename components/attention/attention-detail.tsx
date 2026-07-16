"use client";

import {
  AlertTriangle,
  Building2,
  CalendarDays,
  ClipboardList,
  Map,
  ShieldAlert,
  CircleAlert,
} from "lucide-react";

import { AttentionRankingItem } from "@/types/attention";

interface Props {
  selected: AttentionRankingItem | null;
}

export function AttentionDetail({ selected }: Props) {
  if (!selected) {
    return (
      <section className="flex h-[650px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-slate-300" />

          <h3 className="text-lg font-semibold text-slate-700">
            No Area Selected
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Select an item from the ranking to view details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 px-6 py-5">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Area Detail</h2>

          <p className="mt-1 text-sm text-slate-500">
            Inspection summary of selected area.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* Name */}
        <div>
          <p className="text-sm text-slate-500">Selected Area</p>

          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {selected.name}
          </h3>

          <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
            {selected.level}
          </span>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-600" />

              <div>
                <p className="text-sm text-slate-500">Poor</p>

                <p className="text-2xl font-bold text-red-600">
                  {selected.poor}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <div className="flex items-center gap-3">
              <CircleAlert className="text-amber-600" />

              <div>
                <p className="text-sm text-slate-500">Warning</p>

                <p className="text-2xl font-bold text-amber-600">
                  {selected.warning}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-blue-600" />

              <div>
                <p className="text-sm text-slate-500">Visits</p>

                <p className="text-2xl font-bold text-blue-600">
                  {selected.totalVisits}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
            <div className="flex items-center gap-3">
              <Map className="text-violet-600" />

              <div>
                <p className="text-sm text-slate-500">Priority Score</p>

                <p className="text-2xl font-bold text-violet-600">
                  {selected.priorityScore}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Extra */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />
            Last Inspection
          </div>

          <p className="mt-2 font-semibold text-slate-800">
            {new Date(selected.lastVisit).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
