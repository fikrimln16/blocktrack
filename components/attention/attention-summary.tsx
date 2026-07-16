"use client";

import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  ShieldAlert,
  Trees,
} from "lucide-react";

import type { AttentionSummary as AttentionSummaryType } from "@/types/attention";

interface Props {
  summary: AttentionSummaryType;
}

const colorClasses = {
  red: {
    bg: "bg-red-100",
    icon: "text-red-600",
    badge: "bg-red-50 text-red-600",
  },
  amber: {
    bg: "bg-amber-100",
    icon: "text-amber-600",
    badge: "bg-amber-50 text-amber-600",
  },
  green: {
    bg: "bg-green-100",
    icon: "text-green-600",
    badge: "bg-green-50 text-green-600",
  },
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-600",
    badge: "bg-blue-50 text-blue-600",
  },
  purple: {
    bg: "bg-violet-100",
    icon: "text-violet-600",
    badge: "bg-violet-50 text-violet-600",
  },
  emerald: {
    bg: "bg-emerald-100",
    icon: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-600",
  },
} as const;

type CardColor = keyof typeof colorClasses;

interface SummaryCard {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  color: CardColor;
}

export function AttentionSummary({ summary }: Props) {
  const cards: SummaryCard[] = [
    {
      title: "Priority Score",
      value: Number(summary.priorityScore),
      description: "Overall operational priority",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Poor",
      value: Number(summary.poor),
      description: "Require immediate action",
      icon: ShieldAlert,
      color: "red",
    },
    {
      title: "Warning",
      value: Number(summary.warning),
      description: "Need monitoring",
      icon: CircleAlert,
      color: "amber",
    },
    {
      title: "Good",
      value: Number(summary.good),
      description: "Healthy condition",
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "Visits",
      value: Number(summary.totalVisits),
      description: "Inspection records",
      icon: ClipboardList,
      color: "blue",
    },
    {
      title: "AMA",
      value: Number(summary.totalAma),
      description: "Operational areas",
      icon: Building2,
      color: "purple",
    },
    {
      title: "Estate",
      value: Number(summary.totalEstate),
      description: "Plantation estates",
      icon: Trees,
      color: "emerald",
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
      {cards.map((card) => {
        const style = colorClasses[card.color];
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className={`rounded-2xl p-3 ${style.bg}`}>
                <Icon className={`h-6 w-6 ${style.icon}`} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
              >
                KPI
              </span>
            </div>

            {/* Value */}
            <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
              {card.value.toLocaleString()}
            </h3>

            {/* Title */}
            <p className="mt-2 text-base font-semibold text-slate-800">
              {card.title}
            </p>

            {/* Description */}
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {card.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
