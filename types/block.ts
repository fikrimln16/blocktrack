import { RowDataPacket } from "mysql2";
import { MultiPolygon } from "geojson";

export interface BlockVisit {
  id: number;

  inspector: string;

  visit_date: string;
  visit_time: string;

  duration: number;

  weather: string;

  latitude: number;
  longitude: number;

  notes: string;

  plant_score: number;
  field_score: number;
  infrastructure_score: number;
  environment_score: number;
  management_score: number;

  overall_score: number;

  total_photos: number;
  total_attachments: number;
}

export interface Block extends RowDataPacket {
  id: number;

  estate_id: number;

  block_code: string;

  block_name: string | null;

  status: string | null;

  division: number | null;

  planting_year: number | null;

  area_ha: number | null;

  ba_code: string | null;

  ba_initial: string | null;

  unit: string | null;

  remarks: string | null;

  geometry: MultiPolygon;

  estate: string;

  ama: string;

  total_visit: number;

  total_photos: number;

  total_attachments: number;

  // Riwayat seluruh kunjungan pada block
  visits: BlockVisit[];
}
