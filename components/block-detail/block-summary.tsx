"use client";

import {
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  Leaf,
  Trees,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface Props {
  block: any;
}

export function BlockSummary({ block }: Props) {
  const treeAge = block.planting_year
    ? new Date().getFullYear() - Number(block.planting_year)
    : "-";

  const cards = [
    {
      title: "Total Visit",
      value: block.total_visit ?? 0,
      icon: ClipboardList,
      color: "blue",
    },
    {
      title: "Last Visit",
      value: "-",
      icon: CalendarDays,
      color: "purple",
    },
    {
      title: "Findings",
      value: 0,
      icon: AlertTriangle,
      color: "orange",
    },
    {
      title: "Photos",
      value: 0,
      icon: Camera,
      color: "pink",
    },
    {
      title: "Area",
      value: `${Number(block.area_ha).toFixed(2)} Ha`,
      icon: Trees,
      color: "emerald",
    },
    {
      title: "Tree Age",
      value: treeAge === "-" ? "-" : `${treeAge} Years`,
      icon: Leaf,
      color: "green",
    },
    {
      title: "Productivity",
      value: "98%",
      icon: TrendingUp,
      color: "indigo",
    },
    {
      title: "Completion",
      value: "92%",
      icon: CheckCircle2,
      color: "cyan",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: any;
  color: string;
}

function SummaryCard({ title, value, icon: Icon, color }: SummaryCardProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    pink: "bg-pink-50 text-pink-600",
    emerald: "bg-emerald-50 text-emerald-600",
    green: "bg-green-50 text-green-600",
    indigo: "bg-indigo-50 text-indigo-600",
    cyan: "bg-cyan-50 text-cyan-600",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[color]}`}
        >
          <Icon size={22} />
        </div>

        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
          Live
        </span>
      </div>

      <h4 className="mt-5 text-sm font-medium text-slate-500">{title}</h4>

      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
