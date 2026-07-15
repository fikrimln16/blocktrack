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
      v.id,
      v.visit_code,
      v.visit_date,
      v.visit_time,
      v.duration,
      v.weather,
      v.latitude,
      v.longitude,
      v.accuracy,
      v.notes,
      COALESCE(v.status,'completed') AS status,

      -- ======================
      -- Inspection
      -- ======================

      v.planting_type,

      -- Kondisi Tanaman
      v.produksi,
      v.populasi_pokok,
      v.kuantitas_sisipan,
      v.kuantitas_sisipan_3_5_tahun,
      v.ganoderma,
      v.rayap,
      v.hama_oryctes,
      v.tikus_babi_other_pest,
      v.ulat_pemakan_daun,
      v.beneficial_weed,

      -- Kondisi Kebun
      v.piringan,
      v.pasar_panen,
      v.pasar_rintis,
      v.tunas_pokok,
      v.gawangan_mineral_gambut,
      v.nomor_dan_kebersihan_tph,
      v.tph,
      v.sanitasi_kastrasi,
      v.perawatan_kacangan,

      -- Infrastruktur
      v.jalan,
      v.jembatan,
      v.titi_panen,
      v.titi_rintis,

      -- Drainase
      v.kondisi_drainase_blok,
      v.parit,
      v.sumur_pantau,

      -- Manajemen
      v.pencurian,
      v.pemupukan,

      v.created_at,
      v.updated_at,

      -- Inspector
      u.id AS user_id,
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

      -- Block
      b.id AS block_id,
      b.block_name AS block,
      b.geometry AS polygon,

      -- Estate
      e.name AS estate,

      -- AMA
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

  if (rows.length === 0) {
    throw new Error("Visit not found.");
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
    photo_url: `/api/storage/uploads/photos/${photo.photo_url}`,
    category: photo.category,
    created_at: photo.created_at,
  }));

  const attachments: VisitAttachment[] = attachmentRows.map((attachment) => ({
    id: attachment.id,
    visit_id: attachment.visit_id,

    original_name: attachment.original_name,
    file_name: attachment.file_name,

    file_url: `/api/storage/uploads/attachments/${attachment.file_name}`,

    file_type: attachment.file_type,
    file_extension: attachment.file_extension,
    file_size: attachment.file_size,
    category: attachment.category,
    uploaded_by: attachment.uploaded_by,
    created_at: attachment.created_at,
  }));

  let polygon = null;

  try {
    polygon =
      typeof visit.polygon === "string"
        ? JSON.parse(visit.polygon)
        : visit.polygon;
  } catch {
    polygon = null;
  }

  return {
    ...visit,

    photo: visit.photo
      ? `/api/storage/uploads/photos/${visit.photo}`
      : "/images/default-avatar.jpg",

    polygon,

    photos,

    attachments,
  };
}
