import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import { AttentionRankingItem } from "@/types/attention";

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

export async function getAttentionAmaRepository(): Promise<
  AttentionRankingItem[]
> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT

        a.id AS amaId,

        a.name AS ama,

        COUNT(DISTINCT e.id) AS totalEstates,

        COUNT(DISTINCT b.id) AS totalBlocks,

        COUNT(DISTINCT v.id) AS totalVisits,

        MAX(v.visit_date) AS lastVisit,

        ${poorSql} AS poor,

        ${warningSql} AS warning,

        ${goodSql} AS good,

        ${prioritySql} AS priorityScore

    FROM visits v

    INNER JOIN blocks b
        ON b.id = v.block_id

    INNER JOIN estates e
        ON e.id = b.estate_id

    INNER JOIN amas a
        ON a.id = e.ama_id

    GROUP BY
        a.id,
        a.name

    ORDER BY
        priorityScore DESC,
        poor DESC,
        warning DESC,
        a.name ASC
    `,
  );

  return rows.map((row) => ({
    level: "ama",

    name: row.ama,

    amaId: Number(row.amaId),

    totalVisits: Number(row.totalVisits),

    totalEstates: Number(row.totalEstates),

    totalBlocks: Number(row.totalBlocks),

    poor: Number(row.poor),

    warning: Number(row.warning),

    good: Number(row.good),

    priorityScore: Number(row.priorityScore),

    lastVisit: row.lastVisit,
  }));
}
