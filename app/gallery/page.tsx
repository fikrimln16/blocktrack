export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { GalleryPageClient } from "@/components/gallery/gallery-page-client";

import { getGalleryService } from "@/services/gallery.service";
import { getGalleryFilters } from "@/services/gallery-filter.service";

export default async function GalleryPage() {
  const [photos, filters] = await Promise.all([
    getGalleryService(),
    getGalleryFilters(),
  ]);

  return (
    <DashboardLayout>
      <GalleryPageClient photos={photos} filters={filters} />
    </DashboardLayout>
  );
}
