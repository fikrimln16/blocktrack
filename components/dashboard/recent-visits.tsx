"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  MapPin,
  User,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface RecentActivity {
  id: number;
  visit_code: string;

  inspector: string;

  ama: string;
  estate: string;

  block: string;
  block_code: string;

  visit_date: string;
  visit_time: string;

  status: string;
}

interface Props {
  activities: RecentActivity[];
}

export function RecentActivityFeed({ activities }: Props) {
  return (
    <section className="flex h-[520px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-100 p-3">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest inspection activities.
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
        {activities.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <Activity className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No Recent Activity
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              No recent inspections.
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="group flex min-h-[150px] flex-col justify-between p-6 transition hover:bg-slate-50"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {activity.visit_code}
                  </span>

                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <CalendarDays size={14} />
                    {activity.visit_date} • {activity.visit_time}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      activity.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {activity.status === "Completed" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Clock3 size={13} />
                    )}

                    {activity.status}
                  </span>
                </div>

                <div className="mb-2 flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <User size={15} />

                    {activity.inspector}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />

                    <span>{activity.ama}</span>

                    <span>•</span>

                    <span>{activity.estate}</span>

                    <span>•</span>

                    <span>{activity.block_code}</span>

                    <span>({activity.block})</span>
                  </div>
                </div>

                <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                  Inspection activity has been completed and recorded for this
                  block.
                </p>
              </div>

              <div className="mt-4">
                <Link
                  href={`/visits/${activity.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
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
