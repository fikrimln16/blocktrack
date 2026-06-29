import { Activity } from "lucide-react";

import { RecentActivity } from "@/types/dashboard";

import { ActivityItem } from "./activity-item";

interface Props {
  activities: RecentActivity[];
}

export function RecentActivityFeed({ activities }: Props) {
  return (
    <div className="flex h-[420px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <Activity className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Recent Activity</h2>

          <p className="text-sm text-slate-500">
            Latest inspection activities.
          </p>
        </div>
      </div>

      <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
