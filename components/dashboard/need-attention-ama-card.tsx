"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  MapPinned,
  Building2,
  CircleAlert,
  ShieldAlert,
} from "lucide-react";

import type { AmaNeedAttention } from "@/types/dashboard";

interface Props {
  items: AmaNeedAttention[];
}

export default function NeedAttentionAmaCard({ items }: Props) {
  return (
    <section className="flex h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Need Attention by AMA
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Operational priority across all regions.
            </p>
          </div>
        </div>

        <Link
          href="/attention"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={item.amaId}
            className="border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50 last:border-none"
          >
            {/* Top */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 font-bold text-red-600">
                  #{index + 1}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.ama}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.totalEstates} Estates • {item.totalVisits} Visits
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-red-50 px-4 py-2 text-right">
                <p className="text-xs text-slate-500">Priority</p>

                <p className="text-xl font-bold text-red-600">
                  {item.priorityScore}
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-4 gap-3">
              <div className="rounded-2xl bg-red-50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldAlert size={15} className="text-red-600" />

                  <span className="text-xs text-slate-500">Poor</span>
                </div>

                <p className="text-lg font-bold text-red-600">{item.poor}</p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <CircleAlert size={15} className="text-amber-600" />

                  <span className="text-xs text-slate-500">Warning</span>
                </div>

                <p className="text-lg font-bold text-amber-600">
                  {item.warning}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Building2 size={15} className="text-blue-600" />

                  <span className="text-xs text-slate-500">Estate</span>
                </div>

                <p className="text-lg font-bold text-blue-600">
                  {item.totalEstates}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <MapPinned size={15} className="text-emerald-600" />

                  <span className="text-xs text-slate-500">Visit</span>
                </div>

                <p className="text-lg font-bold text-emerald-600">
                  {item.totalVisits}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
