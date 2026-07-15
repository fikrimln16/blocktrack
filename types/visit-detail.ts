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

export interface Inspection {
  planting_type: "TM" | "TBM";

  plant: {
    produksi: number | null;
    populasi_pokok: number | null;
    kuantitas_sisipan: number | null;
    kuantitas_sisipan_3_5_tahun: number | null;
    ganoderma: number | null;
    rayap: number | null;
    hama_oryctes: number | null;
    tikus_babi_other_pest: number | null;
    ulat_pemakan_daun: number | null;
    beneficial_weed: number | null;
  };

  field: {
    piringan: number | null;
    pasar_panen: number | null;
    pasar_rintis: number | null;
    tunas_pokok: number | null;
    gawangan_mineral_gambut: number | null;
    nomor_dan_kebersihan_tph: number | null;
    tph: number | null;
    sanitasi_kastrasi: number | null;
    perawatan_kacangan: number | null;
  };

  infrastructure: {
    jalan: number | null;
    jembatan: number | null;
    titi_panen: number | null;
    titi_rintis: number | null;
  };

  drainage: {
    kondisi_drainase_blok: number | null;
    parit: number | null;
    sumur_pantau: number | null;
  };

  management: {
    pencurian: number | null;
    pemupukan: number | null;
  };
}
export interface VisitDetail {
  id: number;

  visit_code: string;

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

  latitude: number;
  longitude: number;
  accuracy: number;

  weather: string;
  notes: string;

  visit_date: string;
  visit_time: string;
  duration: number;

  status: string;

  planting_type: "TM" | "TBM";
  // ===========================
  // Kondisi Tanaman
  // ===========================

  produksi: number | null;
  populasi_pokok: number | null;
  kuantitas_sisipan: number | null;
  kuantitas_sisipan_3_5_tahun: number | null;
  ganoderma: number | null;
  rayap: number | null;
  hama_oryctes: number | null;
  tikus_babi_other_pest: number | null;
  ulat_pemakan_daun: number | null;
  beneficial_weed: number | null;

  // ===========================
  // Kondisi Kebun
  // ===========================

  piringan: number | null;
  pasar_panen: number | null;
  pasar_rintis: number | null;
  tunas_pokok: number | null;
  gawangan_mineral_gambut: number | null;
  tph: number | null;
  sanitasi_kastrasi: number | null;
  perawatan_kacangan: number | null;
  nomor_dan_kebersihan_tph: number | null;

  // ===========================
  // Infrastruktur
  // ===========================

  jalan: number | null;
  jembatan: number | null;
  titi_panen: number | null;
  titi_rintis: number | null;

  // ===========================
  // Drainase
  // ===========================

  kondisi_drainase_blok: number | null;
  parit: number | null;
  sumur_pantau: number | null;

  // ===========================
  // Kondisi Sosial
  // ===========================
  pencurian: number | null;
  klaim_lahan: number | null;

  // ===========================
  // Manajemen
  // ===========================
  pemupukan: number | null;

  created_at: string;
  updated_at: string;

  polygon: any;

  photos: VisitPhoto[];
  attachments: VisitAttachment[];
}

/**
 * Raw data dari query visit
 */
export interface VisitRow extends RowDataPacket {
  id: number;
  visit_code: string;

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

  latitude: number;
  longitude: number;
  accuracy: number;

  weather: string;
  notes: string;

  visit_date: string;
  visit_time: string;
  duration: number;

  status: string;

  planting_type: "TM" | "TBM";

  produksi: number | null;
  populasi_pokok: number | null;
  kuantitas_sisipan: number | null;
  kuantitas_sisipan_3_5_tahun: number | null;
  ganoderma: number | null;
  rayap: number | null;
  hama_oryctes: number | null;
  tikus_babi_other_pest: number | null;
  ulat_pemakan_daun: number | null;
  beneficial_weed: number | null;

  piringan: number | null;
  pasar_panen: number | null;
  pasar_rintis: number | null;
  tunas_pokok: number | null;
  gawangan_mineral_gambut: number | null;
  tph: number | null;
  sanitasi_kastrasi: number | null;
  perawatan_kacangan: number | null;
  nomor_dan_kebersihan_tph: number | null;

  jalan: number | null;
  jembatan: number | null;
  titi_panen: number | null;
  titi_rintis: number | null;

  kondisi_drainase_blok: number | null;
  parit: number | null;
  sumur_pantau: number | null;

  pencurian: number | null;
  klaim_lahan: number | null;

  pemupukan: number | null;

  created_at: string;
  updated_at: string;

  polygon: string | null;
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
