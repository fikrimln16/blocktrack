import { ClipboardCheck, Camera, Clock3, Users } from "lucide-react";

import { VisitListItem } from "@/types/visit-list";

interface Props {
  total: number;

  visits: VisitListItem[];
}

export function VisitSummary({ total, visits }: Props) {
  const totalPhotos = visits.reduce(
    (sum, item) => sum + Number(item.total_photos),
    0,
  );

  const totalDuration = visits.reduce(
    (sum, item) => sum + Number(item.duration),
    0,
  );

  const inspectors = new Set(visits.map((v) => v.inspector)).size;

  const avg = visits.length > 0 ? Math.round(totalDuration / visits.length) : 0;

  const cards = [
    {
      title: "Total Visits",
      value: total,
      icon: ClipboardCheck,
      color: "bg-blue-600",
    },
    {
      title: "Inspectors",
      value: inspectors,
      icon: Users,
      color: "bg-green-600",
    },
    {
      title: "Photos",
      value: totalPhotos,
      icon: Camera,
      color: "bg-pink-600",
    },
    {
      title: "Avg Duration",
      value: `${avg} min`,
      icon: Clock3,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
