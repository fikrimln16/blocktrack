import { ClipboardCheck, Camera, Users, Clock3 } from "lucide-react";

import type { DashboardStatistics as DashboardStatisticsType } from "@/types/dashboard";

interface Props {
  statistics: DashboardStatisticsType;
}

export function DashboardStatistics({ statistics }: Props) {
  const target = 20; // nanti bisa dari database

  const percentage = Math.min(
    Math.round((statistics.todayVisits / target) * 100),
    100,
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Today's Activity</h2>

          <p className="mt-1 text-sm text-slate-500">
            Summary of operational activities today.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          Today
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-5">
          <StatisticRow
            icon={<ClipboardCheck size={18} />}
            label="Today's Visits"
            value={statistics.todayVisits}
          />

          <StatisticRow
            icon={<Camera size={18} />}
            label="Photos Uploaded"
            value={statistics.todayPhotos}
          />

          <StatisticRow
            icon={<Users size={18} />}
            label="Active Inspectors"
            value={statistics.activeInspectors}
          />

          <StatisticRow
            icon={<Clock3 size={18} />}
            label="Average Duration"
            value={`${statistics.averageDuration} min`}
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Daily Target</span>

            <span className="font-semibold">{percentage}%</span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {statistics.todayVisits} / {target} visits completed
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatisticRowProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

function StatisticRow({ icon, label, value }: StatisticRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-slate-100 p-2 text-blue-600">{icon}</div>

        <span className="text-slate-600">{label}</span>
      </div>

      <span className="text-lg font-semibold text-slate-900">{value}</span>
    </div>
  );
}
