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

        <InfoItem
          icon={CalendarClock}
          label="Visit Date"
          value={new Date(visit.visit_date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        />

        <InfoItem
          icon={Clock3}
          label="Duration"
          value={`${visit.duration} Minutes`}
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

        <InfoItem icon={CalendarSync} label="Weather" value={visit.weather} />

        <InfoItem
          icon={MapPin}
          label="Planting Type"
          value={
            visit.planting_type === "TM"
              ? "🌴 TM - Tanaman Menghasilkan"
              : "🌱 TBM - Tanaman Belum Menghasilkan"
          }
        />
      </div>
    </div>
  );
}
