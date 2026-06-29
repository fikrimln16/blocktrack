import { CalendarDays, Clock3, CloudSun, Timer } from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { InfoItem } from "./info-item";
import { VisitStatusBadge } from "./visit-status-badge";

interface Props {
  visit: VisitDetail;
}

export function VisitInformation({ visit }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">Visit Information</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoItem
          icon={CalendarDays}
          label="Visit Date"
          value={new Date(visit.visit_date).toLocaleDateString("id-ID")}
        />

        <InfoItem icon={Clock3} label="Visit Time" value={visit.visit_time} />

        <InfoItem icon={CloudSun} label="Weather" value={visit.weather} />

        <InfoItem
          icon={Timer}
          label="Duration"
          value={`${visit.duration} Minutes`}
        />

        <div className="md:col-span-2">
          <div className="rounded-2xl border border-slate-100 p-4">
            <p className="mb-3 text-sm text-slate-500">Visit Status</p>

            <VisitStatusBadge status={visit.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
