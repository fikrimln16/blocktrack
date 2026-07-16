import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import { AttentionDetail } from "@/types/attention";

const VISIT_CATEGORIES = [
  "produksi",
  "populasi_pokok",
  "kuantitas_sisipan",
  "kuantitas_sisipan_3_5_tahun",
  "ganoderma",
  "rayap",
  "hama_oryctes",
  "tikus_babi_other_pest",
  "ulat_pemakan_daun",
  "beneficial_weed",
  "piringan",
  "pasar_panen",
  "pasar_rintis",
  "tunas_pokok",
  "gawangan_mineral_gambut",
  "nomor_dan_kebersihan_tph",
  "tph",
  "sanitasi_kastrasi",
  "perawatan_kacangan",
  "jalan",
  "jembatan",
  "titi_panen",
  "titi_rintis",
  "kondisi_drainase_blok",
  "parit",
  "sumur_pantau",
  "pencurian",
  "klaim_lahan",
  "pemupukan",
] as const;

function buildSum(value: 1 | 2 | 3) {
  return VISIT_CATEGORIES.map(
    (field) => `COALESCE(SUM(v.${field} = ${value}), 0)`,
  ).join(" + ");
}

function buildPriority() {
  return VISIT_CATEGORIES.map(
    (field) =>
      `((COALESCE(SUM(v.${field}=1),0) * 2) + COALESCE(SUM(v.${field}=2),0))`,
  ).join(" + ");
}

export async function getAttentionAmaDetailRepository(
  amaId: number,
): Promise<AttentionDetail | null> {
  const [[row]] = await db.query<RowDataPacket[]>(
    `
    SELECT

        a.id,

        a.name,

        ${buildPriority()} AS priorityScore,

        ${buildSum(1)} AS poor,

        ${buildSum(2)} AS warning,

        ${buildSum(3)} AS good,

        COUNT(DISTINCT v.id) AS totalVisits,

        COUNT(DISTINCT e.id) AS totalEstates,

        COUNT(DISTINCT b.id) AS totalBlocks,

        MAX(v.visit_date) AS lastVisit

    FROM visits v

    INNER JOIN blocks b
        ON b.id=v.block_id

    INNER JOIN estates e
        ON e.id=b.estate_id

    INNER JOIN amas a
        ON a.id=e.ama_id

    WHERE a.id=?

    GROUP BY
        a.id,
        a.name
`,
    [amaId],
  );

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    level: "ama",
    priorityScore: row.priorityScore,
    poor: row.poor,
    warning: row.warning,
    good: row.good,
    totalVisits: row.totalVisits,
    totalEstates: row.totalEstates,
    totalBlocks: row.totalBlocks,
    lastVisit: row.lastVisit,
  };
}
