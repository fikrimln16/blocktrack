import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import { AttentionSummary } from "@/types/attention";

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

export async function getAttentionSummaryRepository(): Promise<AttentionSummary> {
  const buildCount = (field: string, value: 1 | 2 | 3) =>
    `COALESCE(SUM(CASE WHEN v.${field} = ${value} THEN 1 ELSE 0 END), 0)`;

  const poorSql = VISIT_CATEGORIES.map((field) => buildCount(field, 1)).join(
    " + ",
  );

  const warningSql = VISIT_CATEGORIES.map((field) => buildCount(field, 2)).join(
    " + ",
  );

  const goodSql = VISIT_CATEGORIES.map((field) => buildCount(field, 3)).join(
    " + ",
  );

  const prioritySql = VISIT_CATEGORIES.map(
    (field) => `(${buildCount(field, 1)} * 2 + ${buildCount(field, 2)})`,
  ).join(" + ");

  const [[row]] = await db.query<RowDataPacket[]>(`
    SELECT

      ${prioritySql} AS priorityScore,

      ${poorSql} AS poor,

      ${warningSql} AS warning,

      ${goodSql} AS good,

      COUNT(DISTINCT v.id) AS totalVisits,

      COUNT(DISTINCT a.id) AS totalAma,

      COUNT(DISTINCT e.id) AS totalEstate,

      COUNT(DISTINCT b.id) AS totalBlock

    FROM visits v

    INNER JOIN blocks b
      ON b.id = v.block_id

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id
  `);

  return row as AttentionSummary;
}
