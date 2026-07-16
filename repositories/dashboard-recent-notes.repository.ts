import { RowDataPacket } from "mysql2";
import db from "@/lib/db";

export interface RecentNoteRow extends RowDataPacket {
  id: number;
  visit_code: string;
  notes: string;

  visit_date: string;
  visit_time: string;

  inspector: string;
  role: string;
  photo: string | null;

  ama: string;
  estate: string;

  block: string;
  block_code: string;
}

export interface RecentNote {
  id: number;
  visit_code: string;
  notes: string;

  visit_date: string;
  visit_time: string;

  inspector: string;
  role: string;
  photo: string;

  ama: string;
  estate: string;

  block: string;
  block_code: string;
}

export async function getRecentNotes(): Promise<RecentNote[]> {
  const [rows] = await db.query<RecentNoteRow[]>(
    `
    SELECT
      v.id,
      v.visit_code,
      v.notes,

      DATE_FORMAT(v.visit_date, '%d %b %Y') AS visit_date,
      TIME_FORMAT(v.visit_time, '%H:%i') AS visit_time,

      u.name AS inspector,
      u.role,
      u.photo,

      a.name AS ama,
      e.name AS estate,

      b.block_name AS block,
      b.block_code

    FROM visits v

    INNER JOIN users u
      ON u.id = v.user_id

    INNER JOIN blocks b
      ON b.id = v.block_id

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    WHERE
      v.notes IS NOT NULL
      AND TRIM(v.notes) <> ''

    ORDER BY
      v.visit_date DESC,
      v.visit_time DESC

    LIMIT 6
    `,
  );

  return rows.map((row) => ({
    id: row.id,
    visit_code: row.visit_code,
    notes: row.notes,

    visit_date: row.visit_date,
    visit_time: row.visit_time,

    inspector: row.inspector,
    role: row.role,

    photo: row.photo
      ? `/api/storage/uploads/photos/${row.photo}`
      : "/images/default-avatar.jpg",

    ama: row.ama,
    estate: row.estate,

    block: row.block,
    block_code: row.block_code,
  }));
}
