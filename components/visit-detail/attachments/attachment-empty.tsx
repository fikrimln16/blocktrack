import { Paperclip } from "lucide-react";

export function AttachmentEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <Paperclip size={40} className="text-slate-400" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-700">
        No Attachments
      </h3>

      <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
        There are no supporting documents uploaded for this visit.
      </p>
    </div>
  );
}
