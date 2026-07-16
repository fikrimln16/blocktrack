"use client";

import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  CircleAlert,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";

import type { AttentionRankingItem } from "@/types/attention";

interface Props {
  loading: boolean;

  items: AttentionRankingItem[];

  selected: AttentionRankingItem | null;

  onSelect: (item: AttentionRankingItem) => void;
}

function getItemKey(item: AttentionRankingItem): string {
  switch (item.level) {
    case "ama":
      return `ama-${item.amaId}`;

    case "estate":
      return `estate-${item.estateId}`;

    case "block":
      return `block-${item.blockId}`;

    default:
      return item.name;
  }
}

function isSelected(
  selected: AttentionRankingItem | null,
  item: AttentionRankingItem,
): boolean {
  if (!selected) return false;

  return getItemKey(selected) === getItemKey(item);
}

export function AttentionRanking({
  loading,
  items,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="flex h-[650px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Need Attention Ranking
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Operational areas requiring follow-up.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center text-slate-500">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <AlertTriangle className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No Operational Issue
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Everything looks good.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const active = isSelected(selected, item);

            return (
              <button
                key={getItemKey(item)}
                onClick={() => onSelect(item)}
                className={`
                  w-full
                  p-6
                  text-left
                  transition
                  ${
                    active
                      ? "border-l-4 border-red-500 bg-red-50"
                      : "hover:bg-slate-50"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {/* Title */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-xl bg-red-100 p-2">
                        <Building2 size={20} className="text-red-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.name}
                        </h3>

                        <p className="text-xs capitalize text-slate-500">
                          {item.level}
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                        Priority {item.priorityScore}
                      </span>

                      <span className="rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                        <ShieldAlert size={13} className="mr-1 inline" />
                        {item.poor} Poor
                      </span>

                      <span className="rounded-lg bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        <CircleAlert size={13} className="mr-1 inline" />
                        {item.warning} Warning
                      </span>

                      <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        <ClipboardList size={13} className="mr-1 inline" />
                        {item.totalVisits} Visits
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={15} />

                      <span>Last Inspection</span>

                      <span className="font-medium">
                        {new Date(item.lastVisit).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                      ${
                        active
                          ? "border-red-200 bg-red-100 text-red-700"
                          : "border-slate-200 text-slate-700"
                      }
                    `}
                  >
                    Detail
                    <ArrowRight size={16} />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
