import { ClipboardCheck } from "lucide-react";

export function VisitEmpty() {
  return (
    <div className="py-16 text-center">
      <ClipboardCheck size={48} className="mx-auto text-slate-300" />

      <h3 className="mt-4 text-lg font-semibold">No Visit History</h3>

      <p className="mt-2 text-slate-500">
        This block has never been inspected.
      </p>
    </div>
  );
}
