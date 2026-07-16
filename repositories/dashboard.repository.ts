import { RowDataPacket } from "mysql2";

import db from "@/lib/db";
import { DashboardSummary } from "@/types/dashboard";

export async function getDashboardSummaryRepository(): Promise<DashboardSummary> {
  const [[row]] = await db.query<RowDataPacket[]>(
    `
    SELECT
      (SELECT COUNT(*) FROM visits) AS totalVisits,

      (SELECT COUNT(*) FROM amas) AS totalAma,

      (SELECT COUNT(*) FROM estates) AS totalEstates,

      (SELECT COUNT(*) FROM blocks) AS totalBlocks,

      (
        SELECT COUNT(DISTINCT block_id)
        FROM visits
      ) AS visitedBlocks,

      (
        SELECT COUNT(*)
        FROM blocks
        WHERE id NOT IN (
          SELECT DISTINCT block_id
          FROM visits
        )
      ) AS unvisitedBlocks,

      (SELECT COUNT(*) FROM visit_photos) AS totalPhotos,

      (SELECT COUNT(*) FROM visit_attachments) AS totalAttachments,

      (SELECT COUNT(*) FROM users) AS totalUsers
    `,
  );

  return row as DashboardSummary;
}

import { DashboardStatistics } from "@/types/dashboard";

export async function getDashboardStatisticsRepository(): Promise<DashboardStatistics> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      (
        SELECT COUNT(*)
        FROM visits
        WHERE DATE(visit_date) = CURDATE()
      ) AS todayVisits,

      (
        SELECT COUNT(*)
        FROM visit_photos vp
        INNER JOIN visits v
          ON v.id = vp.visit_id
        WHERE DATE(v.visit_date) = CURDATE()
      ) AS todayPhotos,

      (
        SELECT COUNT(DISTINCT user_id)
        FROM visits
        WHERE DATE(visit_date) = CURDATE()
      ) AS activeInspectors,

      (
        SELECT COALESCE(ROUND(AVG(duration)), 0)
        FROM visits
        WHERE DATE(visit_date) = CURDATE()
      ) AS averageDuration
    `,
  );

  return rows[0] as DashboardStatistics;
}

import { TopVisitor } from "@/types/dashboard";

export async function getTopVisitorsRepository(): Promise<TopVisitor[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
        u.id,
        u.name,
        u.role,
        u.photo,

        COUNT(v.id) AS totalVisits

    FROM users u

    LEFT JOIN visits v
        ON v.user_id = u.id

    GROUP BY
        u.id,
        u.name,
        u.role,
        u.photo

    ORDER BY totalVisits DESC

    LIMIT 5
    `,
  );

  return (rows as TopVisitor[]).map((user) => ({
    ...user,
    photo: user.photo
      ? `/api/storage/uploads/photos/${user.photo}`
      : "/images/default-avatar.jpg",
  }));
}
import { RecentActivity } from "@/types/dashboard";

export async function getRecentActivitiesRepository(): Promise<
  RecentActivity[]
> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
    v.id,
    v.visit_code,

    DATE_FORMAT(v.visit_date, '%d %b %Y') AS visit_date,
    TIME_FORMAT(v.visit_time, '%H:%i') AS visit_time,

    COALESCE(v.status, 'Completed') AS status,

    u.name AS inspector,
    u.role,
    u.photo,

    b.block_name AS block,
    b.block_code,
    b.id AS block_id,

    e.name AS estate,
    a.name AS ama

FROM visits v

INNER JOIN users u
    ON u.id = v.user_id

INNER JOIN blocks b
    ON b.id = v.block_id

INNER JOIN estates e
    ON e.id = b.estate_id

INNER JOIN amas a
    ON a.id = e.ama_id

ORDER BY v.created_at DESC

LIMIT 6
    `,
  );

  return (rows as RecentActivity[]).map((activity) => ({
    ...activity,
    photo: activity.photo
      ? `/api/storage/uploads/photos/${activity.photo}`
      : "/images/default-avatar.jpg",
  }));
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

import { AmaNeedAttention } from "@/types/dashboard";

export async function getNeedAttentionByAmaRepository(): Promise<
  AmaNeedAttention[]
> {
  const buildCount = (field: string, value: 1 | 2 | 3) =>
    `COALESCE(SUM(CASE WHEN v.${field} = ${value} THEN 1 ELSE 0 END),0)`;

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

  const [rows] = await db.query<RowDataPacket[]>(`
    SELECT

    a.id AS amaId,

    a.name AS ama,

    COUNT(DISTINCT e.id) AS totalEstates,

    COUNT(DISTINCT v.id) AS totalVisits,

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
    warning DESC

LIMIT 5
  `);

  return rows as AmaNeedAttention[];
}
