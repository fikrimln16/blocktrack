import { RowDataPacket } from "mysql2";

export interface GeoJsonPolygon {
  type: "Polygon" | "MultiPolygon";
  coordinates: any;
}

export interface VisitPhoto {
  id: number;
  visit_id: number;
  photo_url: string;
  category: string | null;
  created_at: string;
}

export interface VisitDetail {
  id: number;

  visit_code: string;
  visit_date: string;
  visit_time: string;

  status: string;
  duration: number;
  weather: string;
  notes: string;

  latitude: number;
  longitude: number;
  accuracy: number;

  plant_population: number | null;
  plant_infill: number | null;
  termite: number | null;
  orcytes: number | null;
  pest: number | null;
  leaf_caterpillar: number | null;
  beneficial_weed: number | null;

  circle_condition: number | null;
  harvesting_path: number | null;
  interrow: number | null;
  tph_condition: number | null;
  sanitation: number | null;
  cover_crop: number | null;

  road_condition: number | null;
  bridge_condition: number | null;
  footbridge_condition: number | null;

  drainage_condition: number | null;
  ditch_condition: number | null;
  monitoring_well: number | null;

  fertilizing: number | null;

  created_at: string;
  updated_at: string;

  user_id: number;

  inspector: string;
  role: string;

  photo: string;
  email: string | null;
  phone: string | null;

  total_visits: number;

  block_id: number;
  block: string;
  estate: string;
  ama: string;

  polygon: GeoJsonPolygon | null;

  photos: VisitPhoto[];

  attachments: VisitAttachment[];
}

/**
 * Raw data dari query visit
 */
export interface VisitRow extends RowDataPacket {
  id: number;

  visit_code: string;
  visit_date: string;
  visit_time: string;

  status: string;
  duration: number;
  weather: string;
  notes: string;

  latitude: number;
  longitude: number;
  accuracy: number;

  plant_population: number | null;
  plant_infill: number | null;
  termite: number | null;
  orcytes: number | null;
  pest: number | null;
  leaf_caterpillar: number | null;
  beneficial_weed: number | null;

  circle_condition: number | null;
  harvesting_path: number | null;
  interrow: number | null;
  tph_condition: number | null;
  sanitation: number | null;
  cover_crop: number | null;

  road_condition: number | null;
  bridge_condition: number | null;
  footbridge_condition: number | null;

  drainage_condition: number | null;
  ditch_condition: number | null;
  monitoring_well: number | null;

  fertilizing: number | null;

  created_at: string;
  updated_at: string;

  user_id: number;

  inspector: string;
  role: string;

  photo: string | null;
  email: string | null;
  phone: string | null;

  total_visits: number;

  block_id: number;
  block: string;
  estate: string;
  ama: string;

  polygon: string | GeoJsonPolygon | null;
}

/**
 * Raw data dari query visit_photos
 */
export interface VisitPhotoRow extends RowDataPacket {
  id: number;
  visit_id: number;
  photo_url: string;
  category: string | null;
  created_at: string;
}

export interface VisitAttachment {
  id: number;

  visit_id: number;

  original_name: string;

  file_name: string;

  file_url: string;

  file_type: string;

  file_extension: string;

  file_size: number;

  category: string | null;

  uploaded_by: number | null;

  created_at: string;
}

export interface VisitAttachmentRow extends RowDataPacket {
  id: number;

  visit_id: number;

  original_name: string;

  file_name: string;

  file_url: string;

  file_type: string;

  file_extension: string;

  file_size: number;

  category: string | null;

  uploaded_by: number | null;

  created_at: string;
}
