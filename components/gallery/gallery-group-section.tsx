import { GalleryPhoto } from "@/types/gallery";

import { GalleryGrid } from "./gallery-grid";

interface Props {
  title: string;
  photos: GalleryPhoto[];
}

export function GalleryGroupSection({ title, photos }: Props) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="text-sm text-slate-500">{photos.length} Photos</p>
        </div>
      </div>

      <GalleryGrid photos={photos} />
    </section>
  );
}
