import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

export function LocationItem({ icon: Icon, label, value }: Props) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4">
      <div className="rounded-xl bg-blue-50 p-3">
        <Icon size={18} className="text-blue-600" />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>

        <p className="mt-1 break-all font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
