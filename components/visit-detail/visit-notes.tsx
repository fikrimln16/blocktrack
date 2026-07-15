import { FileText } from "lucide-react";

import { VisitDetail } from "@/types/visit-detail";

interface Props {
  visit: VisitDetail;
}

export function VisitNotes({ visit }: Props) {
  const hasNotes = visit.notes && visit.notes.trim().length > 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-amber-50 p-3">
            <FileText size={22} className="text-amber-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Visit Notes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Additional notes recorded by the inspector during the plantation
              visit.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {hasNotes ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="whitespace-pre-wrap break-words leading-8 text-slate-700">
              {visit.notes}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-12">
            <FileText size={42} className="mb-4 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">No Notes</h3>

            <p className="mt-2 text-sm text-slate-500">
              No additional notes were provided for this visit.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
