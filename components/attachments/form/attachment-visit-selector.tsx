"use client";

import { useMemo, useState } from "react";

import { CalendarDays, CheckSquare, Search, Square, User } from "lucide-react";

interface Visit {
  id: number;
  visit_code: string;
  visit_date: string;
  visit_time: string;
  inspector: string;
}

interface Props {
  visits: Visit[];

  disabled?: boolean;

  selectedVisits: number[];

  onToggle: (id: number) => void;

  onSelectAll: () => void;

  onClearSelection: () => void;
}

export function AttachmentVisitSelector({
  visits,
  disabled,
  selectedVisits,
  onToggle,
  onSelectAll,
  onClearSelection,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredVisits = useMemo(() => {
    if (!search) return visits;

    return visits.filter((visit) => {
      const keyword = search.toLowerCase();

      return (
        visit.visit_code?.toLowerCase().includes(keyword) ||
        visit.inspector?.toLowerCase().includes(keyword)
      );
    });
  }, [search, visits]);

  if (disabled) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-500">Please select an estate first.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Related Visits
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select one or more inspection visits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSelectAll}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
            >
              Select All
            </button>

            <button
              type="button"
              onClick={onClearSelection}
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search visit code or inspector..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">{selectedVisits.length}</span> of{" "}
          <span className="font-semibold">{visits.length}</span> visits selected
        </p>
      </div>

      {/* Visit List */}
      <div className="max-h-[500px] overflow-y-auto">
        {filteredVisits.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            No visit found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredVisits.map((visit) => {
              const checked = selectedVisits.includes(visit.id);

              return (
                <button
                  key={visit.id}
                  type="button"
                  onClick={() => onToggle(visit.id)}
                  className={`flex w-full items-center justify-between px-6 py-4 text-left transition ${
                    checked ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {checked ? (
                        <CheckSquare size={20} className="text-blue-600" />
                      ) : (
                        <Square size={20} className="text-slate-400" />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {visit.visit_code}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />

                          {visit.visit_date}

                          {visit.visit_time && ` • ${visit.visit_time}`}
                        </span>

                        <span className="flex items-center gap-1">
                          <User size={14} />

                          {visit.inspector}
                        </span>
                      </div>
                    </div>
                  </div>

                  {checked && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
