"use client";

import Link from "next/link";

import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  MapPin,
  ShieldAlert,
  CircleAlert,
  CheckCircle2,
} from "lucide-react";

import type { AttentionVisit } from "@/types/attention";

interface Props {
  loading: boolean;
  visits: AttentionVisit[];
}

export function AttentionTable({ loading, visits }: Props) {
  return (
    <section className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Inspection Visits
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Summary of inspection quality for each visit.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-slate-100">
        {loading ? (
          <div className="flex h-72 items-center justify-center text-slate-500">
            Loading...
          </div>
        ) : visits.length === 0 ? (
          <div className="flex h-72 flex-col items-center justify-center">
            <AlertTriangle className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No Visits Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              No inspection data available.
            </p>
          </div>
        ) : (
          visits.map((visit) => (
            <div
              key={visit.visitId}
              className="group p-6 transition hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Header */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {visit.visitCode}
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        visit.priority === "Poor"
                          ? "bg-red-100 text-red-700"
                          : visit.priority === "Warning"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {visit.priority === "Poor" ? (
                        <>
                          <ShieldAlert size={14} />
                          Poor
                        </>
                      ) : visit.priority === "Warning" ? (
                        <>
                          <CircleAlert size={14} />
                          Warning
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={14} />
                          Good
                        </>
                      )}
                    </span>

                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Score {visit.priorityScore}
                    </span>
                  </div>

                  {/* Inspector */}
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src={visit.photo ?? "/images/default-avatar.jpg"}
                      alt={visit.inspector}
                      className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                    />

                    <div>
                      <p className="font-semibold text-slate-800">
                        {visit.inspector}
                      </p>

                      <p className="text-xs text-slate-500">{visit.role}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />

                    <span>{visit.ama}</span>

                    <span>•</span>

                    <span>{visit.estate}</span>

                    <span>•</span>

                    <span>{visit.block}</span>
                  </div>

                  {/* Summary */}
                  <div className="mb-4 flex flex-wrap gap-3">
                    <span className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                      🔴 {visit.value.poor} Poor
                    </span>

                    <span className="rounded-lg bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      🟡 {visit.value.warning} Warning
                    </span>

                    <span className="rounded-lg bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      🟢 {visit.value.good} Good
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={15} />
                    {visit.visitDate} • {visit.visitTime}
                  </div>
                </div>

                <Link
                  href={`/visits/${visit.visitId}`}
                  className="
                    inline-flex
                    h-fit
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
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  Detail
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
