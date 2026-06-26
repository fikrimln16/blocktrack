"use client";

import {
  Building2,
  Calendar,
  ClipboardList,
  Image,
  Landmark,
  Leaf,
  Map,
  User,
} from "lucide-react";

interface Props {
  block: any;
}

export function BlockInformation({ block }: Props) {
  const treeAge = block.planting_year
    ? new Date().getFullYear() - Number(block.planting_year)
    : "-";

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* General Information */}

      <section className="rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold">General Information</h2>
        </div>

        <div className="divide-y divide-slate-100">
          <Info
            icon={<Map size={18} />}
            label="Block Code"
            value={block.block_code}
          />
          <Info icon={<Landmark size={18} />} label="AMA" value={block.ama} />
          <Info
            icon={<Building2 size={18} />}
            label="Estate"
            value={block.estate}
          />
          <Info
            icon={<Map size={18} />}
            label="Division"
            value={`Division ${block.division}`}
          />
          <Info
            icon={<Leaf size={18} />}
            label="Area"
            value={`${Number(block.area_ha).toFixed(2)} Ha`}
          />
          <Info
            icon={<Calendar size={18} />}
            label="Planting Year"
            value={block.planting_year ?? "-"}
          />
          <Info
            icon={<ClipboardList size={18} />}
            label="BA Code"
            value={block.ba_code ?? "-"}
          />
        </div>
      </section>

      {/* Operational Summary */}

      <section className="rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold">Operational Summary</h2>
        </div>

        <div className="divide-y divide-slate-100">
          <Info
            icon={<ClipboardList size={18} />}
            label="Total Visit"
            value={block.total_visit ?? 0}
          />
          <Info icon={<Calendar size={18} />} label="Last Visit" value="-" />
          <Info icon={<Image size={18} />} label="Total Photos" value="-" />
          <Info icon={<ClipboardList size={18} />} label="Findings" value="-" />
          <Info icon={<User size={18} />} label="Last Inspector" value="-" />
          <Info
            icon={<Leaf size={18} />}
            label="Tree Age"
            value={treeAge === "-" ? "-" : `${treeAge} Years`}
          />
        </div>
      </section>
    </div>
  );
}

interface InfoProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function Info({ icon, label, value }: InfoProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3 text-slate-600">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
