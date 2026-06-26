"use client";

import {
  Calendar,
  Clock3,
  CloudSun,
  TimerReset,
  MapPin,
  Camera,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface Props {
  values: any;
  photos: File[];
}

export function VisitSummary({ values, photos }: Props) {
  return (
    <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-green-600" size={22} />

          <h2 className="text-lg font-semibold">Live Summary</h2>
        </div>

        <p className="mt-2 text-sm text-slate-500">Review before submit.</p>
      </div>

      <div className="space-y-5 p-6">
        <SummaryItem
          icon={<Calendar size={17} />}
          label="Visit Date"
          value={values.visit_date || "-"}
        />

        <SummaryItem
          icon={<Clock3 size={17} />}
          label="Visit Time"
          value={values.visit_time || "-"}
        />

        <SummaryItem
          icon={<CloudSun size={17} />}
          label="Weather"
          value={values.weather || "-"}
        />

        <SummaryItem
          icon={<TimerReset size={17} />}
          label="Duration"
          value={`${values.duration || 0} Minutes`}
        />

        <SummaryItem
          icon={<MapPin size={17} />}
          label="Latitude"
          value={values.latitude || "-"}
        />

        <SummaryItem
          icon={<MapPin size={17} />}
          label="Longitude"
          value={values.longitude || "-"}
        />

        <SummaryItem
          icon={<Camera size={17} />}
          label="Photos"
          value={`${photos.length} Uploaded`}
        />

        <SummaryItem
          icon={<FileText size={17} />}
          label="Notes"
          value={`${(values.notes || "").length} Characters`}
        />
      </div>
    </div>
  );
}

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SummaryItem({ icon, label, value }: SummaryItemProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-none">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span>{label}</span>
      </div>

      <span className="text-right font-medium text-slate-900">{value}</span>
    </div>
  );
}
