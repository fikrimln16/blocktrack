"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  User,
} from "lucide-react";

import type { RecentActivity } from "@/types/dashboard";

interface Props {
  activities: RecentActivity[];
}

export function RecentActivityFeed({ activities }: Props) {
  return (
    <section className="flex h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-100 p-3">
            <Activity className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest field inspection activities submitted by inspectors.
            </p>
          </div>
        </div>

        <Link
          href="/visits"
          className="
            inline-flex
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
            hover:bg-slate-50
          "
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Body */}
      <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <Activity className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No Recent Activity
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              No inspection activity available.
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="group p-6 transition hover:bg-slate-50"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {/* Visit */}
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
                      {activity.status}
                    </span>
                  </div>

                  {/* Inspector */}
                  {/* Inspector */}
                  <div className="mb-3 flex items-center gap-3">
                    <img
                      src={activity.photo}
                      alt={activity.inspector}
                      className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                    />

                    <div>
                      <p className="font-semibold text-slate-800">
                        {activity.inspector}
                      </p>

                      <p className="text-xs text-slate-500">{activity.role}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />

                    <span>{activity.ama}</span>

                    <span>•</span>

                    <span>{activity.estate}</span>

                    <span>•</span>

                    <span>{activity.block_code}</span>
                  </div>
                </div>

                <Link
                  href={`/visits/${activity.id}`}
                  className="
                  inline-flex
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
