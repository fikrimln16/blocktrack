import {
  ClipboardCheck,
  Building2,
  MapPinned,
  Map,
  CheckCircle2,
  Camera,
  Paperclip,
  Users,
} from "lucide-react";

import { DashboardSummary as DashboardSummaryType } from "@/types/dashboard";

import { SummaryCard } from "./summary-card";

interface Props {
  summary: DashboardSummaryType;
}

export function DashboardSummary({ summary }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
      {/* <SummaryCard
        title="Total Visits"
        value={summary.totalVisits}
        subtitle="Inspection records"
        icon={ClipboardCheck}
        color="bg-blue-600"
      /> */}

      <SummaryCard
        title="Visited Blocks"
        value={summary.visitedBlocks}
        subtitle="Visited Block"
        icon={CheckCircle2}
        color="bg-emerald-600"
      />

      <SummaryCard
        title="AMA"
        value={summary.totalAma}
        subtitle="Area Management"
        icon={MapPinned}
        color="bg-violet-600"
      />

      <SummaryCard
        title="Estates"
        value={summary.totalEstates}
        subtitle="Registered estates"
        icon={Building2}
        color="bg-indigo-600"
      />

      <SummaryCard
        title="Blocks"
        value={summary.totalBlocks}
        subtitle="Monitoring blocks"
        icon={Map}
        color="bg-orange-500"
      />

      <SummaryCard
        title="Photos"
        value={summary.totalPhotos}
        subtitle="Uploaded photos"
        icon={Camera}
        color="bg-pink-500"
      />

      <SummaryCard
        title="Attachments"
        value={summary.totalAttachments}
        subtitle="Uploaded files"
        icon={Paperclip}
        color="bg-slate-600"
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
