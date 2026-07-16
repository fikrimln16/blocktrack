"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  CircleAlert,
  CheckCircle2,
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
            <h2 className="text-lg font-semibold text-slate-900">
              Need Attention
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Inspection categories requiring immediate attention.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/attention"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          View All
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => {
          const percentage = (item.priority_score / maxScore) * 100;

          return (
            <div
              key={item.category}
              className="border-b border-slate-100 px-6 py-5 transition-colors last:border-none hover:bg-slate-50"
            >
              {/* Top */}
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-600">
                    #{index + 1}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {item.category}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-500">
                      {item.section}
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-red-50 px-3 py-1">
                  <span className="text-sm font-semibold text-red-600">
                    Score {item.priority_score}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              {/* Statistics */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />

                  <span className="text-slate-500">Poor</span>

                  <span className="font-semibold text-slate-900">
                    {item.poor}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CircleAlert className="h-4 w-4 text-amber-500" />

                  <span className="text-slate-500">Warning</span>

                  <span className="font-semibold text-slate-900">
                    {item.warning}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />

                  <span className="text-slate-500">Good</span>

                  <span className="font-semibold text-slate-900">
                    {item.good}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
