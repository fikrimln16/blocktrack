import { CheckCircle2, Clock3, CircleDashed, XCircle } from "lucide-react";

interface Props {
  status?: string | null;
}

export function VisitStatusBadge({ status }: Props) {
  const value = status?.toLowerCase() ?? "draft";

  const config = {
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    },

    pending: {
      label: "Pending",
      icon: Clock3,
      className: "bg-amber-100 text-amber-700 border border-amber-200",
    },

    draft: {
      label: "Draft",
      icon: CircleDashed,
      className: "bg-slate-100 text-slate-700 border border-slate-200",
    },

    cancelled: {
      label: "Cancelled",
      icon: XCircle,
      className: "bg-red-100 text-red-700 border border-red-200",
    },
  } as const;

  const current = config[value as keyof typeof config] ?? config.draft;

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${current.className}`}
    >
      <Icon size={16} />
      {current.label}
    </span>
  );
}
