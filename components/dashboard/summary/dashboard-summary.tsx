import {
  ClipboardCheck,
  Building2,
  MapPinned,
  Map,
  Camera,
  Users,
} from "lucide-react";

import { DashboardSummary as DashboardSummaryType } from "@/types/dashboard";

import { SummaryCard } from "./summary-card";

interface Props {
  summary: DashboardSummaryType;
}

export function DashboardSummary({ summary }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      <SummaryCard
        title="Total Visits"
        value={summary.totalVisits}
        subtitle="Inspection records"
        icon={ClipboardCheck}
        color="bg-blue-600"
      />

      <SummaryCard
        title="Total AMA"
        value={summary.totalAma}
        subtitle="Area Management"
        icon={MapPinned}
        color="bg-purple-600"
      />

      <SummaryCard
        title="Total Estates"
        value={summary.totalEstates}
        subtitle="Registered estates"
        icon={Building2}
        color="bg-emerald-600"
      />

      <SummaryCard
        title="Total Blocks"
        value={summary.totalBlocks}
        subtitle="Monitoring blocks"
        icon={Map}
        color="bg-orange-500"
      />

      <SummaryCard
        title="Photos"
        value={summary.totalPhotos}
        subtitle="Uploaded images"
        icon={Camera}
        color="bg-pink-500"
      />

      <SummaryCard
        title="Users"
        value={summary.totalUsers}
        subtitle="Registered users"
        icon={Users}
        color="bg-cyan-600"
      />
    </div>
  );
}
