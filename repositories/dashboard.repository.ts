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
      (SELECT COUNT(*) FROM visit_photos) AS totalPhotos,
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
      ? `/uploads/photos/${user.photo}`
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
        v.visit_date,

        u.name AS inspector,
        u.role,
        u.photo,

        b.block_name AS block,
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

    ORDER BY
        v.created_at DESC

    LIMIT 6
    `,
  );

  return (rows as RecentActivity[]).map((activity) => ({
    ...activity,
    photo: activity.photo
      ? `/uploads/photos/${activity.photo}`
      : "/images/default-avatar.jpg",
  }));
}
