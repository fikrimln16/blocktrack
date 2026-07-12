import { Camera, Building2, FolderKanban, Map } from "lucide-react";

import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photos: GalleryPhoto[];
}

export function GalleryHeader({ photos }: Props) {
  const ama = new Set(photos.map((i) => i.ama_id)).size;
  const estate = new Set(photos.map((i) => i.estate_id)).size;
  const block = new Set(photos.map((i) => i.block_id)).size;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-8 py-7 shadow-sm">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        {/* Left */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            <Camera size={14} />
            Gallery
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Documentation Gallery
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Browse all inspection photos collected from every visit and
            organized by AMA, Estate, and Block.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-6">
          <StatItem icon={Camera} label="Photos" value={photos.length} />

          <StatItem icon={FolderKanban} label="AMA" value={ama} />

          <StatItem icon={Building2} label="Estates" value={estate} />

          <StatItem icon={Map} label="Blocks" value={block} />
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="flex min-w-[90px] items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon size={18} className="text-slate-600" />
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>

        <p className="text-xl font-semibold text-slate-900">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
