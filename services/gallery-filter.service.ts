import { getGalleryFiltersRepository } from "@/repositories/gallery-filter.repository";

export async function getGalleryFilters() {
  return getGalleryFiltersRepository();
}
