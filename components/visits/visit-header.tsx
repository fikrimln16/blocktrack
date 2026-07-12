import { ClipboardCheck } from "lucide-react";

export function VisitHeader() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <ClipboardCheck size={28} className="text-blue-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Inspection Visits</h1>

          <p className="mt-2 text-slate-500">
            Browse all inspection history across all plantation blocks.
          </p>
        </div>
      </div>
    </div>
  );
}
