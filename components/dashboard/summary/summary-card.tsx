import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value?: number | null;
  subtitle?: string;
  color: string;
  icon: LucideIcon;
}

export function SummaryCard({
  title,
  value = 0,
  subtitle,
  color,
  icon: Icon,
}: Props) {
  const displayValue = Number(value ?? 0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            {displayValue.toLocaleString("id-ID")}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm text-green-600">{subtitle}</p>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}
