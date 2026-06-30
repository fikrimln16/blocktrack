import { FileText, HardDrive, Layers3 } from "lucide-react";

import { VisitAttachment } from "@/types/visit-detail";

import { AttachmentUpload } from "./attachment-upload";

interface Props {
  visitId: number;
  attachments: VisitAttachment[];
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

export function AttachmentHeader({ attachments, visitId }: Props) {
  const totalSize = attachments.reduce((acc, item) => acc + item.file_size, 0);

  const totalCategory = new Set(
    attachments.map((x) => x.category).filter(Boolean),
  ).size;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">Attachments</h2>

        <p className="mt-1 text-sm text-slate-500">
          Supporting documents uploaded during this visit.
        </p>
      </div>

      <AttachmentUpload visitId={visitId} />
    </div>
  );
}
