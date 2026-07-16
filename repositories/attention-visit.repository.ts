import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import { AttentionVisit } from "@/types/attention";

interface Filter {
  amaId?: number;
  estateId?: number;
  blockId?: number;

  page?: number;
  limit?: number;
}

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

export async function getAttentionVisitsRepository({
  amaId,
  estateId,
  blockId,
  page = 1,
  limit = 20,
}: Filter): Promise<{
  visits: AttentionVisit[];
  total: number;
}> {
  const where: string[] = [];

  const params: any[] = [];

  const buildCount = (field: string, value: 1 | 2 | 3) =>
    `CASE WHEN v.${field} = ${value} THEN 1 ELSE 0 END`;

  const poorSql = VISIT_CATEGORIES.map((field) => buildCount(field, 1)).join(
    " + ",
  );

  const warningSql = VISIT_CATEGORIES.map((field) => buildCount(field, 2)).join(
    " + ",
  );

  const goodSql = VISIT_CATEGORIES.map((field) => buildCount(field, 3)).join(
    " + ",
  );

  const prioritySql = `(${poorSql}) * 2 + (${warningSql})`;

  if (amaId) {
    where.push("a.id = ?");
    params.push(amaId);
  }

  if (estateId) {
    where.push("e.id = ?");
    params.push(estateId);
  }

  if (blockId) {
    where.push("b.id = ?");
    params.push(blockId);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  /**
   * Count
   */
  const [[count]] = await db.query<RowDataPacket[]>(
    `
    SELECT
      COUNT(*) AS total

    FROM visits v

    INNER JOIN users u
      ON u.id=v.user_id

    INNER JOIN blocks b
      ON b.id=v.block_id

    INNER JOIN estates e
      ON e.id=b.estate_id

    INNER JOIN amas a
      ON a.id=e.ama_id

    ${whereSql}
    `,
    params,
  );

  /**
   * Data
   */
  const offset = (page - 1) * limit;

  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT

    v.id,

    v.visit_code,

    v.visit_date,

    v.visit_time,

    v.status,

    u.name AS inspector,

    u.role,

    u.photo,

    a.name AS ama,

    e.name AS estate,

    b.block_code,

    b.block_name,

    b.id AS blockId,

    ${poorSql} AS poor,

    ${warningSql} AS warning,

    ${goodSql} AS good,

    ${prioritySql} AS priorityScore

FROM visits v

INNER JOIN users u
    ON u.id=v.user_id

INNER JOIN blocks b
    ON b.id=v.block_id

INNER JOIN estates e
    ON e.id=b.estate_id

INNER JOIN amas a
    ON a.id=e.ama_id

${whereSql}

ORDER BY
    priorityScore DESC,
    v.visit_date DESC,
    v.visit_time DESC

LIMIT ?

OFFSET ?
    `,
    [...params, limit, offset],
  );

  const visits: AttentionVisit[] = rows.map((row) => {
    const poor = Number(row.poor);

    const warning = Number(row.warning);

    const good = Number(row.good);

    const priorityScore = Number(row.priorityScore);

    let priority: "Poor" | "Warning" | "Good";

    if (poor > 0) {
      priority = "Poor";
    } else if (warning > 0) {
      priority = "Warning";
    } else {
      priority = "Good";
    }

    return {
      visitId: Number(row.id),

      visitCode: row.visit_code,

      inspector: row.inspector,

      role: row.role,

      photo: row.photo ? `/api/storage/uploads/photos/${row.photo}` : null,

      ama: row.ama,

      estate: row.estate,

      block: row.block_code,

      value: {
        poor,
        warning,
        good,
      },

      priority,

      priorityScore,

      visitDate: row.visit_date,

      visitTime: row.visit_time,

      status: row.status,
    };
  });

  return {
    visits,
    total: Number(count.total),
  };
}
