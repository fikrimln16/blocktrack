"use client";

import {
  CalendarClock,
  Camera,
  ClipboardList,
  User,
  AlertTriangle,
  Trees,
  Clock3,
  Activity,
} from "lucide-react";

interface Props {
  block: any;
}

export function OperationalSummary({ block }: Props) {
  const treeAge =
    block.planting_year && Number(block.planting_year) > 0
      ? new Date().getFullYear() - Number(block.planting_year)
      : "-";

  const data = [
    {
      icon: ClipboardList,
      title: "Total Visit",
      value: block.total_visit ?? 0,
    },
    {
      icon: CalendarClock,
      title: "Last Visit",
      value: "-",
    },
    {
      icon: User,
      title: "Last Inspector",
      value: "-",
    },
    {
      icon: Camera,
      title: "Total Photos",
      value: "-",
    },
    {
      icon: AlertTriangle,
      title: "Findings",
      value: "-",
    },
    {
      icon: Trees,
      title: "Tree Age",
      value: treeAge === "-" ? "-" : `${treeAge} Years`,
    },
    {
      icon: Clock3,
      title: "Updated",
      value: "-",
    },
    {
      icon: Activity,
      title: "Health Score",
      value: "Good",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold">Operational Summary</h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest operational information for this block.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between px-6 py-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <item.icon size={18} />
              </div>

              <span className="text-slate-600">{item.title}</span>
            </div>

            <span className="font-semibold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
