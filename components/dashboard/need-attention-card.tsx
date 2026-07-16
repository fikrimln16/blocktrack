"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  CircleAlert,
} from "lucide-react";

import type { NeedAttention } from "@/types/dashboard";

interface Props {
  items: NeedAttention[];
}

export function NeedAttentionCard({ items }: Props) {
  const maxScore = Math.max(...items.map((i) => i.priority_score), 1);

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
              Need Attention
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Highest priority inspection findings.
            </p>
          </div>
        </div>

        <Link
          href="/reports"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Body */}
      <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {items.map((item) => {
          const percentage = (item.priority_score / maxScore) * 100;

          return (
            <div
              key={item.category}
              className="p-6 transition hover:bg-slate-50"
            >
              {/* Title */}
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item.category}
                  </h3>

                  <p className="text-sm text-slate-500">{item.section}</p>
                </div>

                <div className="rounded-xl bg-red-50 px-3 py-2 text-right">
                  <p className="text-xs text-slate-500">Priority Score</p>

                  <p className="text-lg font-bold text-red-600">
                    {item.priority_score}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-red-50 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <ShieldAlert size={15} className="text-red-600" />

                    <span className="text-xs text-slate-500">Poor</span>
                  </div>

                  <p className="text-lg font-bold text-red-600">{item.poor}</p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <CircleAlert size={15} className="text-amber-600" />

                    <span className="text-xs text-slate-500">Warning</span>
                  </div>

                  <p className="text-lg font-bold text-amber-600">
                    {item.warning}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />

                    <span className="text-xs text-slate-500">Good</span>
                  </div>

                  <p className="text-lg font-bold text-green-600">
                    {item.good}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
