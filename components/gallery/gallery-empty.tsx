import { ImageIcon } from "lucide-react";

export function GalleryEmpty() {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white">
      <ImageIcon size={70} className="text-slate-300" />

      <h2 className="mt-5 text-xl font-semibold">No Photos Found</h2>

      <p className="mt-2 text-slate-500">
        There is no inspection documentation available.
      </p>
    </div>
  );
}
