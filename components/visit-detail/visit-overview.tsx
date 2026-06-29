import {
  Hash,
  Clock3,
  MapPin,
  Crosshair,
  CalendarClock,
  CalendarSync,
} from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { InfoItem } from "./info-item";

interface Props {
  visit: VisitDetail;
}

export function VisitOverview({ visit }: Props) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Visit Overview</h2>

        <p className="mt-1 text-sm text-slate-500">
          General information and GPS metadata for this inspection.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoItem icon={Hash} label="Visit Code" value={visit.visit_code} />

        <InfoItem icon={Clock3} label="Visit Time" value={visit.visit_time} />

        <InfoItem
          icon={MapPin}
          label="GPS Accuracy"
          value={`${visit.accuracy ?? "-"} m`}
        />

        <InfoItem
          icon={Crosshair}
          label="Coordinates"
          value={
            visit.latitude && visit.longitude
              ? `${visit.latitude}, ${visit.longitude}`
              : "-"
          }
        />

        <InfoItem
          icon={CalendarClock}
          label="Created At"
          value={new Date(visit.created_at).toLocaleString("id-ID")}
        />

        <InfoItem
          icon={CalendarSync}
          label="Updated At"
          value={new Date(visit.updated_at).toLocaleString("id-ID")}
        />
      </div>
    </div>
  );
}
