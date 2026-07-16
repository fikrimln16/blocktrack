"use client";

import Link from "next/link";
import { ArrowRight, FileText, MapPin, User, CalendarDays } from "lucide-react";

interface RecentNote {
  id: number;
  visit_code: string;
  notes: string;
  visit_date: string;
  visit_time: string;
  inspector: string;
  ama: string;
  estate: string;
  block: string;
  block_code: string;
}

interface Props {
  notes: RecentNote[];
}

export function RecentNotesCard({ notes }: Props) {
  return (
    <section className="flex h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-amber-100 p-3">
            <FileText className="h-6 w-6 text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Notes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest field notes submitted by inspectors.
            </p>
          </div>
        </div>

        <Link
          href="/visits"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <FileText className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No Notes Available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              No inspection notes have been submitted yet.
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group flex min-h-[150px] flex-col justify-between p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Left */}
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {note.visit_code}
                    </span>

                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <CalendarDays size={14} />
                      {note.visit_date} • {note.visit_time}
                    </div>
                  </div>

                  <div className="mb-2 flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <User size={15} />

                      {note.inspector}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <MapPin size={15} />

                      <span>{note.ama}</span>

                      <span>•</span>

                      <span>{note.estate}</span>

                      <span>•</span>

                      <span>{note.block_code}</span>

                      <span>({note.block})</span>
                    </div>
                  </div>

                  <p className="line-clamp-3 leading-7 text-slate-600">
                    {note.notes}
                  </p>
                </div>

                {/* Right */}
                <Link
                  href={`/visits/${note.id}`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    self-start
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
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
