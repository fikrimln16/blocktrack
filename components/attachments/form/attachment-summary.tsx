"use client";

import {
  Building2,
  MapPinned,
  FileText,
  Files,
  HardDrive,
  CheckCircle2,
} from "lucide-react";

interface Props {
  ama: string;
  estate: string;
  visits: number;
  file: File | null;
  title: string;
}

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function AttachmentSummary({ ama, estate, visits, file, title }: Props) {
  const completed =
    ama !== "-" &&
    estate !== "-" &&
    visits > 0 &&
    !!file &&
    title.trim() !== "";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Summary</h2>

        <p className="mt-1 text-sm text-slate-500">
          Review your attachment before creating it.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <SummaryItem icon={<Building2 size={18} />} label="AMA" value={ama} />

        <SummaryItem
          icon={<MapPinned size={18} />}
          label="Estate"
          value={estate}
        />

        <SummaryItem
          icon={<Files size={18} />}
          label="Selected Visits"
          value={`${visits} Visit${visits !== 1 ? "s" : ""}`}
        />

        <SummaryItem
          icon={<FileText size={18} />}
          label="Attachment Title"
          value={title || "-"}
        />

        <SummaryItem
          icon={<FileText size={18} />}
          label="File Name"
          value={file?.name ?? "-"}
        />

        <SummaryItem
          icon={<HardDrive size={18} />}
          label="File Size"
          value={file ? formatSize(file.size) : "-"}
        />

        {/* Status */}
        <div
          className={`rounded-2xl border p-4 ${
            completed
              ? "border-green-200 bg-green-50"
              : "border-yellow-200 bg-yellow-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={20}
              className={completed ? "text-green-600" : "text-yellow-600"}
            />

            <div>
              <p
                className={`font-semibold ${
                  completed ? "text-green-700" : "text-yellow-700"
                }`}
              >
                {completed ? "Ready to Create" : "Incomplete"}
              </p>

              <p
                className={`mt-1 text-sm ${
                  completed ? "text-green-600" : "text-yellow-700"
                }`}
              >
                {completed
                  ? "All required information has been filled."
                  : "Please complete all required fields before creating the attachment."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SummaryItem({ icon, label, value }: SummaryItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white p-2 text-slate-600 shadow-sm">
          {icon}
        </div>

        <span className="text-sm font-medium text-slate-600">{label}</span>
      </div>

      <span className="max-w-[180px] truncate text-right text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}
