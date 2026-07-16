import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export interface RecentPhotoRow extends RowDataPacket {
  id: number;
  photo_url: string;
  visit_code: string;
  inspector: string;
  estate: string;
  block: string;
  created_at: string;
}

export interface RecentPhoto {
  id: number;
  photo_url: string;
  visit_code: string;
  inspector: string;
  estate: string;
  block: string;
  created_at: string;
}

export async function getRecentPhotos(): Promise<RecentPhoto[]> {
  const [rows] = await db.query<RecentPhotoRow[]>(
    `
  SELECT
    vp.id,
    vp.photo_url,
    vp.created_at,

    v.visit_code,

    u.name AS inspector,

    b.block_name AS block,

    e.name AS estate

  FROM visit_photos vp

  INNER JOIN visits v
    ON v.id = vp.visit_id

  INNER JOIN users u
    ON u.id = v.user_id

  INNER JOIN blocks b
    ON b.id = v.block_id

  INNER JOIN estates e
    ON e.id = b.estate_id

  ORDER BY vp.created_at DESC

  LIMIT 8
  `,
  );

  return rows.map(
    (row): RecentPhoto => ({
      id: row.id,
      photo_url: `/api/storage/uploads/photos/${row.photo_url}`,
      visit_code: row.visit_code,
      inspector: row.inspector,
      estate: row.estate,
      block: row.block,
      created_at: row.created_at,
    }),
  );
}
