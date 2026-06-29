import db from "@/lib/db";

import {
  VisitDetail,
  VisitPhoto,
  VisitPhotoRow,
  VisitRow,
} from "@/types/visit-detail";

export async function getVisitDetail(id: number): Promise<VisitDetail> {
  const [rows] = await db.query<VisitRow[]>(
    `
    SELECT
      v.*,

      COALESCE(v.status, 'completed') AS status,

      u.name AS inspector,
      u.role,
      u.photo,
      u.email,
      u.phone,

      (
        SELECT COUNT(*)
        FROM visits vv
        WHERE vv.user_id = u.id
      ) AS total_visits,

      b.id AS block_id,
      b.block_name AS block,
      b.geometry AS polygon,

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

    WHERE v.id = ?

    LIMIT 1
    `,
    [id],
  );

  if (!rows.length) {
    throw new Error("Visit not found");
  }

  const visit = rows[0];

  const [photoRows] = await db.query<VisitPhotoRow[]>(
    `
    SELECT
      id,
      visit_id,
      photo_url,
      category,
      created_at
    FROM visit_photos
    WHERE visit_id = ?
    ORDER BY created_at ASC
    `,
    [id],
  );

  const photos: VisitPhoto[] = photoRows.map((photo) => ({
    id: photo.id,
    visit_id: photo.visit_id,
    photo_url: photo.photo_url,
    category: photo.category,
    created_at: photo.created_at,
  }));

  return {
    ...visit,

    photo: visit.photo
      ? `/uploads/photos/${visit.photo}`
      : "/images/default-avatar.jpg",

    polygon:
      typeof visit.polygon === "string"
        ? JSON.parse(visit.polygon)
        : visit.polygon,

    photos,
  };
}
