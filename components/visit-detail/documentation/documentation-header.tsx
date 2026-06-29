import { Camera, CalendarDays, Images } from "lucide-react";

import { VisitPhoto } from "@/types/visit-detail";

interface Props {
  photos: VisitPhoto[];
}

export function DocumentationHeader({ photos }: Props) {
  const latestPhoto = photos.length > 0 ? photos[photos.length - 1] : null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Total Photos</p>

          <Images size={18} className="text-blue-600" />
        </div>

        <h3 className="mt-3 text-3xl font-bold text-slate-900">
          {photos.length}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Categories</p>

          <Camera size={18} className="text-emerald-600" />
        </div>

        <h3 className="mt-3 text-3xl font-bold text-slate-900">
          {new Set(photos.map((p) => p.category).filter(Boolean)).size}
        </h3>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Latest Upload</p>

          <CalendarDays size={18} className="text-orange-600" />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-slate-900">
          {latestPhoto
            ? new Date(latestPhoto.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </h3>
      </div>
    </div>
  );
}
