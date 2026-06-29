import { CalendarDays, Clock3, CloudSun, MapPinned } from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

interface Props {
  visit: VisitDetail;
}

export function VisitSummary({ visit }: Props) {
  const items = [
    {
      icon: CalendarDays,
      label: "Visit Date",
      value: new Date(visit.visit_date).toLocaleDateString("id-ID"),
    },
    {
      icon: Clock3,
      label: "Duration",
      value: `${visit.duration} Minutes`,
    },
    {
      icon: CloudSun,
      label: "Weather",
      value: visit.weather,
    },
    {
      icon: MapPinned,
      label: "Block",
      value: visit.block,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3">
                <Icon size={20} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">{item.label}</p>

                <p className="font-semibold">{item.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
