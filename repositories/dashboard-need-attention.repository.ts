import { RowDataPacket } from "mysql2";
import db from "@/lib/db";

export interface NeedAttention extends RowDataPacket {
  category: string;
  section: string;

  poor: number;
  warning: number;
  good: number;

  priority_score: number;
}

const INSPECTION_CATEGORIES = [
  // ================= Plant =================
  { column: "produksi", label: "Produksi", section: "Plant" },
  { column: "populasi_pokok", label: "Populasi Pokok", section: "Plant" },
  { column: "kuantitas_sisipan", label: "Kuantitas Sisipan", section: "Plant" },
  {
    column: "kuantitas_sisipan_3_5_tahun",
    label: "Kuantitas Sisipan 3-5 Tahun",
    section: "Plant",
  },
  { column: "ganoderma", label: "Ganoderma", section: "Plant" },
  { column: "rayap", label: "Rayap", section: "Plant" },
  { column: "hama_oryctes", label: "Hama Oryctes", section: "Plant" },
  {
    column: "tikus_babi_other_pest",
    label: "Tikus / Babi / Hama Lain",
    section: "Plant",
  },
  {
    column: "ulat_pemakan_daun",
    label: "Ulat Pemakan Daun",
    section: "Plant",
  },
  {
    column: "beneficial_weed",
    label: "Beneficial Weed",
    section: "Plant",
  },

  // ================= Field =================
  { column: "piringan", label: "Piringan", section: "Field" },
  { column: "pasar_panen", label: "Pasar Panen", section: "Field" },
  { column: "pasar_rintis", label: "Pasar Rintis", section: "Field" },
  { column: "tunas_pokok", label: "Tunas Pokok", section: "Field" },
  {
    column: "gawangan_mineral_gambut",
    label: "Gawangan Mineral / Gambut",
    section: "Field",
  },
  {
    column: "nomor_dan_kebersihan_tph",
    label: "Nomor & Kebersihan TPH",
    section: "Field",
  },
  { column: "tph", label: "TPH", section: "Field" },
  {
    column: "sanitasi_kastrasi",
    label: "Sanitasi / Kastrasi",
    section: "Field",
  },
  {
    column: "perawatan_kacangan",
    label: "Perawatan Kacangan",
    section: "Field",
  },

  // ================= Infrastructure =================
  { column: "jalan", label: "Jalan", section: "Infrastructure" },
  { column: "jembatan", label: "Jembatan", section: "Infrastructure" },
  { column: "titi_panen", label: "Titi Panen", section: "Infrastructure" },
  { column: "titi_rintis", label: "Titi Rintis", section: "Infrastructure" },

  // ================= Drainage =================
  {
    column: "kondisi_drainase_blok",
    label: "Drainase Blok",
    section: "Drainage",
  },
  { column: "parit", label: "Parit", section: "Drainage" },
  { column: "sumur_pantau", label: "Sumur Pantau", section: "Drainage" },

  // ================= Social =================
  { column: "pencurian", label: "Pencurian", section: "Social" },
  { column: "klaim_lahan", label: "Klaim_lahan", section: "Social" },

  // ================= Management =================
  { column: "pemupukan", label: "Pemupukan", section: "Management" },
];

export async function getNeedAttentionRepository(): Promise<NeedAttention[]> {
  const sql = INSPECTION_CATEGORIES.map(
    ({ column, label, section }) => `
      SELECT
        '${label}' AS category,
        '${section}' AS section,

        SUM(CASE WHEN ${column}=1 THEN 1 ELSE 0 END) AS poor,
        SUM(CASE WHEN ${column}=2 THEN 1 ELSE 0 END) AS warning,
        SUM(CASE WHEN ${column}=3 THEN 1 ELSE 0 END) AS good,

        (
          SUM(CASE WHEN ${column}=1 THEN 2 ELSE 0 END)
          +
          SUM(CASE WHEN ${column}=2 THEN 1 ELSE 0 END)
        ) AS priority_score

      FROM visits
    `,
  ).join("\nUNION ALL\n");

  const [rows] = await db.query<RowDataPacket[]>(`
    ${sql}
    ORDER BY priority_score DESC
    LIMIT 10
  `);

  return rows.map((item) => ({
    category: item.category,
    section: item.section,

    poor: Number(item.poor),
    warning: Number(item.warning),
    good: Number(item.good),

    priority_score: Number(item.priority_score),
  })) as NeedAttention[];
}
