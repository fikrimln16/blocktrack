"use client";

import {
  CalendarClock,
  Camera,
  ClipboardList,
  ClipboardCheck,
  User,
  Clock3,
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

function formatDateTime(date: Date | string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatDuration(minutes?: number | null) {
  if (minutes == null) {
    return "-";
  }

  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  if (hour === 0) {
    return `${minute} menit`;
  }

  if (minute === 0) {
    return `${hour} jam`;
  }

  return `${hour} jam ${minute} menit`;
}

/**
 * Skor menggunakan skala 1 - 3
 * 1 = Perlu Perbaikan
 * 2 = Cukup
 * 3 = Baik
 */
function getHealth(score?: number | null) {
  if (score == null) {
    return {
      text: "Belum Dinilai",
      color: "text-slate-500",
      bg: "bg-slate-100",
      progress: 0,
    };
  }

  if (score >= 2.5) {
    return {
      text: "Baik",
      color: "text-green-600",
      bg: "bg-green-500",
      progress: (score / 3) * 100,
    };
  }

  if (score >= 1.5) {
    return {
      text: "Cukup",
      color: "text-yellow-600",
      bg: "bg-yellow-500",
      progress: (score / 3) * 100,
    };
  }

  return {
    text: "Perlu Perbaikan",
    color: "text-red-600",
    bg: "bg-red-500",
    progress: (score / 3) * 100,
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
      title: "Average Duration",
      value: formatDuration(block.average_duration),
    },
    {
      icon: Clock3,
      title: "Last Updated",
      value: formatDateTime(block.last_updated_at),
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold">Operational Summary</h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest operational information for this block.
        </p>
      </div>

      {/* Summary */}
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

        {/* Tree Information */}
        {/* <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Planting Year</p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {block.planting_year ?? "-"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">Tree Age</p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {treeAge === "-" ? "-" : `${treeAge} Tahun`}
              </p>
            </div>
          </div>
        </div> */}

        {/* Average Inspection Score */}
        <div className="mt-4 rounded-2xl bg-blue-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardCheck size={20} className="text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Average Inspection Score
                </p>

                <p className={`text-xs font-medium ${health.color}`}>
                  {health.text}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-blue-700">
                {block.average_score != null
                  ? Number(block.average_score).toFixed(2)
                  : "-"}
              </p>

              <p className="text-xs text-slate-500">Max Score 3.00</p>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-white">
              <div
                className={`h-full rounded-full transition-all duration-500 ${health.bg}`}
                style={{
                  width: `${health.progress}%`,
                }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[11px] text-slate-500">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
