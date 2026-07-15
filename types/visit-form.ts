export interface VisitFormValues {
  // ===========================
  // General Information
  // ===========================
  block_id: number;
  user_id?: number;

  latitude?: number;
  longitude?: number;
  accuracy?: number;

  weather?: string;
  notes?: string;

  visit_date?: string;
  visit_time?: string;
  duration?: number;

  status?: string;

  /**
   * Jenis tanaman.
   * Nilai ini dapat diisi otomatis dari block yang dipilih.
   */
  planting_type?: "TM" | "TBM";

  // ===========================
  // A. Kondisi Tanaman
  // ===========================

  produksi?: number;

  populasi_pokok?: number;

  kuantitas_sisipan?: number;

  kuantitas_sisipan_3_5_tahun?: number;

  ganoderma?: number;

  rayap?: number;

  hama_oryctes?: number;

  tikus_babi_other_pest?: number;

  ulat_pemakan_daun?: number;

  beneficial_weed?: number;

  // ===========================
  // B. Kondisi Kebun
  // ===========================

  piringan?: number;

  pasar_panen?: number;

  pasar_rintis?: number;

  tunas_pokok?: number;

  gawangan_mineral_gambut?: number;

  tph?: number;

  sanitasi_kastrasi?: number;

  perawatan_kacangan?: number;

  nomor_dan_kebersihan_tph?: number;

  // ===========================
  // C. Infrastruktur
  // ===========================

  jalan?: number;

  jembatan?: number;

  titi_panen?: number;

  titi_rintis?: number;

  // ===========================
  // D. Lingkungan
  // ===========================

  kondisi_drainase_blok?: number;

  parit?: number;

  sumur_pantau?: number;

  // ===========================
  // E. Sosial
  // ===========================

  pencurian?: number;

  // ===========================
  // F. Pemeliharaan
  // ===========================

  pemupukan?: number;
}
