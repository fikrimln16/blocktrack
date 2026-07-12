import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import {
  VisitListItem,
  VisitListQuery,
  VisitListResponse,
} from "@/types/visit-list";

interface VisitRow extends RowDataPacket, VisitListItem {}

const sortableColumns = {
  visit_date: "v.visit_date",
  visit_code: "v.visit_code",
  duration: "v.duration",
  weather: "v.weather",
  status: "v.status",
} as const;

export async function getVisitListRepository(
  query: VisitListQuery,
): Promise<VisitListResponse> {
  const {
    page = 1,
    limit = 20,

    search = "",

    ama,
    estate,
    block,

    inspector,

    weather,
    status,

    startDate,
    endDate,

    sortBy = "visit_date",
    sortOrder = "DESC",
  } = query;

  const offset = (page - 1) * limit;

  const where: string[] = [];

  const params: (string | number)[] = [];

  if (search) {
    where.push(`
      (
        v.visit_code LIKE ?
        OR b.block_code LIKE ?
        OR b.block_name LIKE ?
      )
    `);

    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (ama) {
    where.push("a.id = ?");
    params.push(ama);
  }

  if (estate) {
    where.push("e.id = ?");
    params.push(estate);
  }

  if (block) {
    where.push("b.id = ?");
    params.push(block);
  }

  if (inspector) {
    where.push("u.id = ?");
    params.push(inspector);
  }

  if (weather) {
    where.push("v.weather = ?");
    params.push(weather);
  }

  if (status) {
    where.push("v.status = ?");
    params.push(status);
  }

  if (startDate) {
    where.push("v.visit_date >= ?");
    params.push(startDate);
  }

  if (endDate) {
    where.push("v.visit_date <= ?");
    params.push(endDate);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const orderColumn =
    sortableColumns[sortBy as keyof typeof sortableColumns] ?? "v.visit_date";

  const orderDirection = sortOrder === "ASC" ? "ASC" : "DESC";

  // ==========================
  // Count
  // ==========================

  const [[count]] = await db.query<RowDataPacket[]>(
    `
    SELECT COUNT(*) AS total

    FROM visits v

    INNER JOIN users u
      ON u.id = v.user_id

    INNER JOIN blocks b
      ON b.id = v.block_id

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    ${whereClause}
    `,
    params,
  );

  // ==========================
  // Data
  // ==========================

  const [rows] = await db.query<VisitRow[]>(
    `
    SELECT
      v.id,

      v.visit_code,

      DATE_FORMAT(
        v.visit_date,
        '%d %b %Y'
      ) AS visit_date,

      TIME_FORMAT(
        v.visit_time,
        '%H:%i'
      ) AS visit_time,

      v.weather,
      v.duration,
      v.status,

      u.name AS inspector,
      u.photo AS inspector_photo,

      a.name AS ama,

      e.name AS estate,

      b.block_code,
      b.block_name,

      (
        SELECT COUNT(*)
        FROM visit_photos vp
        WHERE vp.visit_id = v.id
      ) AS total_photos,

      (
        SELECT COUNT(*)
        FROM visit_attachments va
        WHERE va.visit_id = v.id
      ) AS total_attachments

    FROM visits v

    INNER JOIN users u
      ON u.id = v.user_id

    INNER JOIN blocks b
      ON b.id = v.block_id

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    ${whereClause}

    ORDER BY
      ${orderColumn} ${orderDirection},
      v.visit_date DESC,
      v.visit_time DESC

    LIMIT ?

    OFFSET ?
    `,
    [...params, limit, offset],
  );

  const data = rows.map((row) => ({
    ...row,

    inspector_photo: row.inspector_photo
      ? `/api/storage/uploads/photos/${row.inspector_photo}`
      : null,
  }));

  return {
    data,

    total: Number(count.total),

    page,

    limit,

    totalPages: Math.ceil(Number(count.total) / limit),
  };
}
