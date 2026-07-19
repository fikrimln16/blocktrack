import db from "@/lib/db";

export async function getBlockDetail(id: number) {
  const [rows] = await db.query(
    `
    SELECT
      b.id,
      b.block_code,
      b.block_name,
      b.status,
      b.division,
      b.area_ha,
      b.planting_year,

      b.topography,
      b.soil_type,
      b.sph,
      b.ytd_yield,

      b.ba_code,
      b.ba_initial,
      b.unit,
      b.remarks,
      b.geometry,

      e.id AS estate_id,
      e.name AS estate,

      a.id AS ama_id,
      a.name AS ama,

      COUNT(DISTINCT v.id) AS total_visit,
      COUNT(DISTINCT vp.id) AS total_photos,
      COUNT(DISTINCT va.id) AS total_attachments,

      (
        SELECT vv.visit_date
        FROM visits vv
        WHERE vv.block_id = b.id
        ORDER BY vv.visit_date DESC, vv.visit_time DESC
        LIMIT 1
      ) AS last_visit_date,

      (
        SELECT vv.visit_time
        FROM visits vv
        WHERE vv.block_id = b.id
        ORDER BY vv.visit_date DESC, vv.visit_time DESC
        LIMIT 1
      ) AS last_visit_time,

      (
        SELECT vv.updated_at
        FROM visits vv
        WHERE vv.block_id = b.id
        ORDER BY vv.visit_date DESC, vv.visit_time DESC
        LIMIT 1
      ) AS last_updated_at,

      (
        SELECT u.name
        FROM visits vv
        INNER JOIN users u
          ON u.id = vv.user_id
        WHERE vv.block_id = b.id
        ORDER BY vv.visit_date DESC, vv.visit_time DESC
        LIMIT 1
      ) AS last_inspector,

      (
        SELECT vv.weather
        FROM visits vv
        WHERE vv.block_id = b.id
        ORDER BY vv.visit_date DESC, vv.visit_time DESC
        LIMIT 1
      ) AS last_weather,

      (
        SELECT ROUND(AVG(vv.duration),0)
        FROM visits vv
        WHERE vv.block_id = b.id
      ) AS average_duration,

      (
        SELECT ROUND(
          AVG(

            (

              COALESCE(vv.produksi,0) +
              COALESCE(vv.populasi_pokok,0) +
              COALESCE(vv.kuantitas_sisipan,0) +
              COALESCE(vv.kuantitas_sisipan_3_5_tahun,0) +
              COALESCE(vv.ganoderma,0) +
              COALESCE(vv.rayap,0) +
              COALESCE(vv.hama_oryctes,0) +
              COALESCE(vv.tikus_babi_other_pest,0) +
              COALESCE(vv.ulat_pemakan_daun,0) +
              COALESCE(vv.beneficial_weed,0) +

              COALESCE(vv.piringan,0) +
              COALESCE(vv.pasar_panen,0) +
              COALESCE(vv.pasar_rintis,0) +
              COALESCE(vv.tunas_pokok,0) +
              COALESCE(vv.gawangan_mineral_gambut,0) +
              COALESCE(vv.tph,0) +
              COALESCE(vv.sanitasi_kastrasi,0) +
              COALESCE(vv.perawatan_kacangan,0) +
              COALESCE(vv.nomor_dan_kebersihan_tph,0) +

              COALESCE(vv.jalan,0) +
              COALESCE(vv.jembatan,0) +
              COALESCE(vv.titi_panen,0) +
              COALESCE(vv.titi_rintis,0) +

              COALESCE(vv.kondisi_drainase_blok,0) +
              COALESCE(vv.parit,0) +
              COALESCE(vv.sumur_pantau,0) +

              COALESCE(vv.pencurian,0) +
              COALESCE(vv.pemupukan,0)

            )

            /

            NULLIF(

              (vv.produksi IS NOT NULL) +
              (vv.populasi_pokok IS NOT NULL) +
              (vv.kuantitas_sisipan IS NOT NULL) +
              (vv.kuantitas_sisipan_3_5_tahun IS NOT NULL) +
              (vv.ganoderma IS NOT NULL) +
              (vv.rayap IS NOT NULL) +
              (vv.hama_oryctes IS NOT NULL) +
              (vv.tikus_babi_other_pest IS NOT NULL) +
              (vv.ulat_pemakan_daun IS NOT NULL) +
              (vv.beneficial_weed IS NOT NULL) +

              (vv.piringan IS NOT NULL) +
              (vv.pasar_panen IS NOT NULL) +
              (vv.pasar_rintis IS NOT NULL) +
              (vv.tunas_pokok IS NOT NULL) +
              (vv.gawangan_mineral_gambut IS NOT NULL) +
              (vv.tph IS NOT NULL) +
              (vv.sanitasi_kastrasi IS NOT NULL) +
              (vv.perawatan_kacangan IS NOT NULL) +
              (vv.nomor_dan_kebersihan_tph IS NOT NULL) +

              (vv.jalan IS NOT NULL) +
              (vv.jembatan IS NOT NULL) +
              (vv.titi_panen IS NOT NULL) +
              (vv.titi_rintis IS NOT NULL) +

              (vv.kondisi_drainase_blok IS NOT NULL) +
              (vv.parit IS NOT NULL) +
              (vv.sumur_pantau IS NOT NULL) +

              (vv.pencurian IS NOT NULL) +
              (vv.pemupukan IS NOT NULL),

              0

            )

          ),
          1
        )
        FROM visits vv
        WHERE vv.block_id = b.id
      ) AS average_score

    FROM blocks b

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    LEFT JOIN visits v
      ON v.block_id = b.id

    LEFT JOIN visit_photos vp
      ON vp.visit_id = v.id

    LEFT JOIN visit_attachments va
      ON va.visit_id = v.id

    WHERE b.id = ?

    GROUP BY
      b.id,
      b.block_code,
      b.block_name,
      b.status,
      b.division,
      b.area_ha,
      b.planting_year,

      b.topography,
      b.soil_type,
      b.sph,
      b.ytd_yield,

      b.ba_code,
      b.ba_initial,
      b.unit,
      b.remarks,
      b.geometry,
      e.id,
      e.name,
      a.id,
      a.name

    LIMIT 1
    `,
    [id],
  );

  const block = (rows as any[])[0];

  if (!block) {
    return null;
  }

  block.geometry =
    typeof block.geometry === "string"
      ? JSON.parse(block.geometry)
      : block.geometry;

  const [visitRows] = await db.query(
    `
  SELECT
    v.id,
    v.visit_date,
    v.visit_time,
    v.updated_at,
    v.duration,
    v.weather,
    v.latitude,
    v.longitude,
    v.notes,

    u.name AS inspector,

    -- =====================================
    -- Plant Score
    -- =====================================
    (
      (
        COALESCE(v.produksi,0) +
        COALESCE(v.populasi_pokok,0) +
        COALESCE(v.kuantitas_sisipan,0) +
        COALESCE(v.kuantitas_sisipan_3_5_tahun,0) +
        COALESCE(v.ganoderma,0) +
        COALESCE(v.rayap,0) +
        COALESCE(v.hama_oryctes,0) +
        COALESCE(v.tikus_babi_other_pest,0) +
        COALESCE(v.ulat_pemakan_daun,0) +
        COALESCE(v.beneficial_weed,0)
      )
      /
      NULLIF(
        (v.produksi IS NOT NULL) +
        (v.populasi_pokok IS NOT NULL) +
        (v.kuantitas_sisipan IS NOT NULL) +
        (v.kuantitas_sisipan_3_5_tahun IS NOT NULL) +
        (v.ganoderma IS NOT NULL) +
        (v.rayap IS NOT NULL) +
        (v.hama_oryctes IS NOT NULL) +
        (v.tikus_babi_other_pest IS NOT NULL) +
        (v.ulat_pemakan_daun IS NOT NULL) +
        (v.beneficial_weed IS NOT NULL),
        0
      )
    ) AS plant_score,

    -- =====================================
    -- Field Score
    -- =====================================
    (
      (
        COALESCE(v.piringan,0) +
        COALESCE(v.pasar_panen,0) +
        COALESCE(v.pasar_rintis,0) +
        COALESCE(v.tunas_pokok,0) +
        COALESCE(v.gawangan_mineral_gambut,0) +
        COALESCE(v.tph,0) +
        COALESCE(v.sanitasi_kastrasi,0) +
        COALESCE(v.perawatan_kacangan,0) +
        COALESCE(v.nomor_dan_kebersihan_tph,0)
      )
      /
      NULLIF(
        (v.piringan IS NOT NULL) +
        (v.pasar_panen IS NOT NULL) +
        (v.pasar_rintis IS NOT NULL) +
        (v.tunas_pokok IS NOT NULL) +
        (v.gawangan_mineral_gambut IS NOT NULL) +
        (v.tph IS NOT NULL) +
        (v.sanitasi_kastrasi IS NOT NULL) +
        (v.perawatan_kacangan IS NOT NULL) +
        (v.nomor_dan_kebersihan_tph IS NOT NULL),
        0
      )
    ) AS field_score,

    -- =====================================
    -- Infrastructure Score
    -- =====================================
    (
      (
        COALESCE(v.jalan,0) +
        COALESCE(v.jembatan,0) +
        COALESCE(v.titi_panen,0) +
        COALESCE(v.titi_rintis,0)
      )
      /
      NULLIF(
        (v.jalan IS NOT NULL) +
        (v.jembatan IS NOT NULL) +
        (v.titi_panen IS NOT NULL) +
        (v.titi_rintis IS NOT NULL),
        0
      )
    ) AS infrastructure_score,

    -- =====================================
    -- Environment Score
    -- =====================================
    (
      (
        COALESCE(v.kondisi_drainase_blok,0) +
        COALESCE(v.parit,0) +
        COALESCE(v.sumur_pantau,0)
      )
      /
      NULLIF(
        (v.kondisi_drainase_blok IS NOT NULL) +
        (v.parit IS NOT NULL) +
        (v.sumur_pantau IS NOT NULL),
        0
      )
    ) AS environment_score,

    -- =====================================
    -- Management Score
    -- =====================================
    (
      (
        COALESCE(v.pencurian,0) +
        COALESCE(v.pemupukan,0)
      )
      /
      NULLIF(
        (v.pencurian IS NOT NULL) +
        (v.pemupukan IS NOT NULL),
        0
      )
    ) AS management_score,

    -- =====================================
    -- Overall Score
    -- =====================================
    (
      (
        COALESCE(v.produksi,0) +
        COALESCE(v.populasi_pokok,0) +
        COALESCE(v.kuantitas_sisipan,0) +
        COALESCE(v.kuantitas_sisipan_3_5_tahun,0) +
        COALESCE(v.ganoderma,0) +
        COALESCE(v.rayap,0) +
        COALESCE(v.hama_oryctes,0) +
        COALESCE(v.tikus_babi_other_pest,0) +
        COALESCE(v.ulat_pemakan_daun,0) +
        COALESCE(v.beneficial_weed,0) +

        COALESCE(v.piringan,0) +
        COALESCE(v.pasar_panen,0) +
        COALESCE(v.pasar_rintis,0) +
        COALESCE(v.tunas_pokok,0) +
        COALESCE(v.gawangan_mineral_gambut,0) +
        COALESCE(v.tph,0) +
        COALESCE(v.sanitasi_kastrasi,0) +
        COALESCE(v.perawatan_kacangan,0) +
        COALESCE(v.nomor_dan_kebersihan_tph,0) +

        COALESCE(v.jalan,0) +
        COALESCE(v.jembatan,0) +
        COALESCE(v.titi_panen,0) +
        COALESCE(v.titi_rintis,0) +

        COALESCE(v.kondisi_drainase_blok,0) +
        COALESCE(v.parit,0) +
        COALESCE(v.sumur_pantau,0) +

        COALESCE(v.pencurian,0) +
        COALESCE(v.pemupukan,0)
      )
      /
      NULLIF(
        (v.produksi IS NOT NULL) +
        (v.populasi_pokok IS NOT NULL) +
        (v.kuantitas_sisipan IS NOT NULL) +
        (v.kuantitas_sisipan_3_5_tahun IS NOT NULL) +
        (v.ganoderma IS NOT NULL) +
        (v.rayap IS NOT NULL) +
        (v.hama_oryctes IS NOT NULL) +
        (v.tikus_babi_other_pest IS NOT NULL) +
        (v.ulat_pemakan_daun IS NOT NULL) +
        (v.beneficial_weed IS NOT NULL) +
        (v.piringan IS NOT NULL) +
        (v.pasar_panen IS NOT NULL) +
        (v.pasar_rintis IS NOT NULL) +
        (v.tunas_pokok IS NOT NULL) +
        (v.gawangan_mineral_gambut IS NOT NULL) +
        (v.tph IS NOT NULL) +
        (v.sanitasi_kastrasi IS NOT NULL) +
        (v.perawatan_kacangan IS NOT NULL) +
        (v.nomor_dan_kebersihan_tph IS NOT NULL) +
        (v.jalan IS NOT NULL) +
        (v.jembatan IS NOT NULL) +
        (v.titi_panen IS NOT NULL) +
        (v.titi_rintis IS NOT NULL) +
        (v.kondisi_drainase_blok IS NOT NULL) +
        (v.parit IS NOT NULL) +
        (v.sumur_pantau IS NOT NULL) +
        (v.pencurian IS NOT NULL) +
        (v.pemupukan IS NOT NULL),
        0
      )
    ) AS overall_score,

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

  WHERE v.block_id = ?
    AND v.latitude IS NOT NULL
    AND v.longitude IS NOT NULL

  ORDER BY
    v.visit_date ASC,
    v.visit_time ASC
  `,
    [id],
  );

  const visits = (visitRows as any[]).map((visit) => ({
    ...visit,

    latitude: visit.latitude !== null ? Number(visit.latitude) : null,

    longitude: visit.longitude !== null ? Number(visit.longitude) : null,

    accuracy: visit.accuracy !== null ? Number(visit.accuracy) : null,

    plant_score: visit.plant_score !== null ? Number(visit.plant_score) : null,

    field_score: visit.field_score !== null ? Number(visit.field_score) : null,

    infrastructure_score:
      visit.infrastructure_score !== null
        ? Number(visit.infrastructure_score)
        : null,

    environment_score:
      visit.environment_score !== null ? Number(visit.environment_score) : null,

    management_score:
      visit.management_score !== null ? Number(visit.management_score) : null,

    overall_score:
      visit.overall_score !== null ? Number(visit.overall_score) : null,
  }));

  return {
    ...block,

    average_duration:
      block.average_duration !== null ? Number(block.average_duration) : 0,

    average_score:
      block.average_score !== null ? Number(block.average_score) : 0,

    total_visit: Number(block.total_visit),
    total_photos: Number(block.total_photos),
    total_attachments: Number(block.total_attachments),

    visits,
  };
}

export interface VisitPhoto {
  id: number;
  visit_id: number;

  photo_url: string;

  visit_code: string;
  visit_date: string;
  visit_time: string;

  inspector: string;
  weather: string;

  block_code: string;
  block_name: string;
  estate: string;
}

import { RowDataPacket } from "mysql2";

interface VisitPhotoRow extends RowDataPacket {
  id: number;
  visit_id: number;

  photo_url: string;

  visit_code: string;
  visit_date: string;
  visit_time: string;

  inspector: string;
  weather: string;

  block_code: string;
  block_name: string;

  estate: string;
}

export async function getBlockPhotos(blockId: number): Promise<VisitPhoto[]> {
  const [rows] = await db.query<VisitPhotoRow[]>(
    `
    SELECT
      vp.id,
      vp.visit_id,
      vp.photo_url,

      v.visit_code,
      DATE_FORMAT(v.visit_date, '%d %b %Y') AS visit_date,
      TIME_FORMAT(v.visit_time, '%H:%i') AS visit_time,
      v.weather,

      u.name AS inspector,

      b.block_code,
      b.block_name,

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

    WHERE v.block_id = ?

    ORDER BY
      v.visit_date DESC,
      v.visit_time DESC,
      vp.id ASC
    `,
    [blockId],
  );

  return rows.map((row) => ({
    id: row.id,
    visit_id: row.visit_id,

    photo_url: `/api/storage/uploads/photos/${row.photo_url}`,

    visit_code: row.visit_code,
    visit_date: row.visit_date,
    visit_time: row.visit_time,

    inspector: row.inspector,
    weather: row.weather,

    block_code: row.block_code,
    block_name: row.block_name,
    estate: row.estate,
  }));
}
