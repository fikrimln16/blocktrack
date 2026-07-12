import { RowDataPacket } from "mysql2";
import db from "@/lib/db";
import { GalleryPhoto } from "@/types/gallery";

interface GalleryPhotoRow extends RowDataPacket, GalleryPhoto {}

export async function getGalleryRepository(): Promise<GalleryPhoto[]> {
  const [rows] = await db.query<GalleryPhotoRow[]>(
    `
    SELECT

      vp.id,

      vp.photo_url,

      v.id AS visit_id,
      v.visit_code,
      DATE_FORMAT(v.visit_date,'%d %b %Y') AS visit_date,
      TIME_FORMAT(v.visit_time,'%H:%i') AS visit_time,

      v.weather,
      v.latitude,
      v.longitude,

      u.name AS inspector,

      a.id AS ama_id,
      a.name AS ama,

      e.id AS estate_id,
      e.name AS estate,

      b.id AS block_id,
      b.block_code,
      b.block_name

    FROM visit_photos vp

    INNER JOIN visits v
      ON v.id = vp.visit_id

    INNER JOIN users u
      ON u.id = v.user_id

    INNER JOIN blocks b
      ON b.id = v.block_id

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    ORDER BY
      a.name,
      e.name,
      b.block_code,
      v.visit_date DESC,
      v.visit_time DESC
    `,
  );

  return rows.map((row) => ({
    ...row,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),

    photo_url: `/api/storage/uploads/photos/${row.photo_url}`,
  }));
}
