import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
}

export function StatisticCard({ title, value, icon: Icon, color }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="text-white" size={22} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
