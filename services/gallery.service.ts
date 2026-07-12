import { getGalleryRepository } from "@/repositories/gallery.repository";

export async function getGalleryService() {
  return getGalleryRepository();
}
