export interface GalleryPhoto {
  id: number;

  visit_id: number;
  visit_code: string;

  photo_url: string;

  visit_date: string;
  visit_time: string;

  weather: string;

  latitude: number;
  longitude: number;

  inspector: string;

  ama_id: number;
  ama: string;

  estate_id: number;
  estate: string;

  block_id: number;
  block_code: string;
  block_name: string;
}

export interface GalleryFilterData {
  amas: GalleryAma[];
  estates: GalleryEstate[];
  blocks: GalleryBlock[];
  inspectors: string[];
}

export interface GalleryAma {
  id: number;
  name: string;
}

export interface GalleryEstate {
  id: number;
  ama_id: number;
  name: string;
}

export interface GalleryBlock {
  id: number;
  estate_id: number;
  block_code: string;
  block_name: string;
}
