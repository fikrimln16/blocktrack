import { ClipboardX } from "lucide-react";

export function VisitEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <ClipboardX size={28} className="text-slate-400" />
      </div>

      <h3 className="mt-5 text-lg font-semibold">No Visits Found</h3>

      <p className="mt-2 text-slate-500">
        Try changing your search or filters.
      </p>
    </div>
  );
}
