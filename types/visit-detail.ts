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
