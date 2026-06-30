import { Paperclip } from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

import { AttachmentEmpty } from "./attachment-empty";
import { AttachmentHeader } from "./attachment-header";
import { AttachmentList } from "./attachment-list";

interface Props {
  visit: VisitDetail;
}

export function VisitAttachments({ visit }: Props) {
  const attachments = visit.attachments ?? [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="space-y-6 p-6">
        <AttachmentHeader visitId={visit.id} attachments={attachments} />

        {attachments.length === 0 ? (
          <AttachmentEmpty />
        ) : (
          <AttachmentList attachments={attachments} />
        )}
      </div>
    </section>
  );
}
