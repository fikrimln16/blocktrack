import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

export function InfoItem({ icon: Icon, label, value }: Props) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4">
      <div className="rounded-xl bg-blue-50 p-3">
        <Icon size={20} className="text-blue-600" />
      </div>

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <p className="mt-1 font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
