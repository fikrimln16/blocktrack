import { ImageOff } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16">
      <ImageOff size={48} className="text-slate-400" />

      <h3 className="mt-4 text-lg font-semibold">No Documentation</h3>

      <p className="mt-2 text-sm text-slate-500">
        This visit does not contain any uploaded photos.
      </p>
    </div>
  );
}
