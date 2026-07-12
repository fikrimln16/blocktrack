"use client";

import {
  CalendarClock,
  Camera,
  ClipboardList,
  User,
  Trees,
  Clock3,
  Activity,
  CloudSun,
  Paperclip,
} from "lucide-react";

interface Props {
  block: any;
}

function formatDate(date: Date | string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDuration(minutes?: number | null) {
  if (!minutes) return "-";

  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  if (hour === 0) return `${minute} min`;
  if (minute === 0) return `${hour} hr`;

  return `${hour} hr ${minute} min`;
}

function getHealth(score?: number) {
  if (!score) {
    return {
      text: "-",
      color: "text-slate-500",
    };
  }

  if (score >= 90)
    return {
      text: "Excellent",
      color: "text-green-600",
    };

  if (score >= 70)
    return {
      text: "Good",
      color: "text-emerald-600",
    };

  if (score >= 50)
    return {
      text: "Fair",
      color: "text-yellow-600",
    };

  if (score >= 30)
    return {
      text: "Poor",
      color: "text-orange-600",
    };

  return {
    text: "Very Poor",
    color: "text-red-600",
  };
}

export function OperationalSummary({ block }: Props) {
  const treeAge =
    block.planting_year && Number(block.planting_year) > 0
      ? new Date().getFullYear() - Number(block.planting_year)
      : "-";

  const health = getHealth(block.average_score);

  const data = [
    {
      icon: ClipboardList,
      title: "Total Visits",
      value: block.total_visit ?? 0,
    },
    {
      icon: CalendarClock,
      title: "Last Visit",
      value: block.last_visit_date
        ? `${formatDate(block.last_visit_date)} • ${block.last_visit_time}`
        : "-",
    },
    {
      icon: User,
      title: "Last Inspector",
      value: block.last_inspector ?? "-",
    },
    {
      icon: CloudSun,
      title: "Latest Weather",
      value: block.last_weather ?? "-",
    },
    {
      icon: Camera,
      title: "Photos",
      value: block.total_photos ?? 0,
    },
    {
      icon: Paperclip,
      title: "Attachments",
      value: block.total_attachments ?? 0,
    },
    {
      icon: Clock3,
      title: "Avg. Duration",
      value: formatDuration(block.average_duration),
    },
    {
      icon: Clock3,
      title: "Last Updated",
      value: block.updated_at ?? "-",
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

      <div className="space-y-1 px-4 py-3">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <item.icon size={18} />
              </div>

              <span className="text-sm text-slate-600">{item.title}</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}

        <div className="mt-2 rounded-2xl bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-blue-600" />

              <div>
                <p className="text-sm font-medium">Average Health Score</p>

                <p className={`text-xs ${health.color}`}>{health.text}</p>
              </div>
            </div>

            <span className="text-3xl font-bold text-blue-600">
              {block.average_score
                ? `${Math.round(block.average_score)}%`
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
