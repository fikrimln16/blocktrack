import db from "@/lib/db";

import {
  VisitAttachment,
  VisitAttachmentRow,
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

  const [attachmentRows] = await db.query<VisitAttachmentRow[]>(
    `
    SELECT
      id,
      visit_id,
      original_name,
      file_name,
      file_url,
      file_type,
      file_extension,
      file_size,
      category,
      uploaded_by,
      created_at
    FROM visit_attachments
    WHERE visit_id = ?
    ORDER BY created_at DESC
    `,
    [id],
  );

  const photos: VisitPhoto[] = photoRows.map((photo) => ({
    id: photo.id,
    visit_id: photo.visit_id,

    // photo_url di database hanya nama file
    photo_url: `/api/storage/uploads/photos/${photo.photo_url}`,

    category: photo.category,
    created_at: photo.created_at,
  }));

  const attachments: VisitAttachment[] = attachmentRows.map((attachment) => ({
    id: attachment.id,
    visit_id: attachment.visit_id,

    original_name: attachment.original_name,
    file_name: attachment.file_name,

    // file_url di database hanya nama file
    file_url: `/api/storage/uploads/attachments/${attachment.file_url}`,

    file_type: attachment.file_type,
    file_extension: attachment.file_extension,
    file_size: attachment.file_size,
    category: attachment.category,
    uploaded_by: attachment.uploaded_by,
    created_at: attachment.created_at,
  }));

  return {
    ...visit,

    // Foto inspector
    photo: visit.photo
      ? `/api/storage/uploads/photos/${visit.photo}`
      : "/images/default-avatar.jpg",

    polygon:
      typeof visit.polygon === "string"
        ? JSON.parse(visit.polygon)
        : visit.polygon,

    photos,

    attachments,
  };
}
