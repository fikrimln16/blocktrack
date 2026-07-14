"use client";

import Link from "next/link";

import {
  Plus,
  Files,
  FileText,
  FileSpreadsheet,
  FileArchive,
} from "lucide-react";

interface Props {
  totalAttachments: number;
  totalVisits: number;
  totalSize: number;
  totalUploaders: number;
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
}

export function AttachmentHeader({
  totalAttachments,
  totalVisits,
  totalSize,
  totalUploaders,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Attachments
          </h1>

          <p className="mt-2 text-slate-500">
            Manage documents linked to inspection visits across all estates.
          </p>
        </div>

        <Link
          href="/attachments/create"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Attachment
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<Files size={22} className="text-blue-600" />}
          title="Total Attachments"
          value={String(totalAttachments)}
          color="bg-blue-50"
        />

        <SummaryCard
          icon={<FileText size={22} className="text-green-600" />}
          title="Related Visits"
          value={String(totalVisits)}
          color="bg-green-50"
        />

        <SummaryCard
          icon={<FileArchive size={22} className="text-amber-600" />}
          title="Storage Used"
          value={formatBytes(totalSize)}
          color="bg-amber-50"
        />

        <SummaryCard
          icon={<FileSpreadsheet size={22} className="text-purple-600" />}
          title="Uploaders"
          value={String(totalUploaders)}
          color="bg-purple-50"
        />
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

function SummaryCard({ icon, title, value, color }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
