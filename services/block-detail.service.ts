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
      SELECT ROUND(AVG(vv.duration), 0)
      FROM visits vv
      WHERE vv.block_id = b.id
    ) AS average_duration,

    (
      SELECT ROUND(
        AVG(
          (
            COALESCE(vv.plant_population,0) +
            COALESCE(vv.plant_infill,0) +
            COALESCE(vv.termite,0) +
            COALESCE(vv.orcytes,0) +
            COALESCE(vv.pest,0) +
            COALESCE(vv.leaf_caterpillar,0) +
            COALESCE(vv.beneficial_weed,0) +
            COALESCE(vv.circle_condition,0) +
            COALESCE(vv.harvesting_path,0) +
            COALESCE(vv.interrow,0) +
            COALESCE(vv.tph_condition,0) +
            COALESCE(vv.sanitation,0) +
            COALESCE(vv.cover_crop,0) +
            COALESCE(vv.road_condition,0) +
            COALESCE(vv.bridge_condition,0) +
            COALESCE(vv.footbridge_condition,0) +
            COALESCE(vv.drainage_condition,0) +
            COALESCE(vv.ditch_condition,0) +
            COALESCE(vv.monitoring_well,0) +
            COALESCE(vv.fertilizing,0)
          ) / 20
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

  // ===========================
  // Ambil seluruh titik visit
  // ===========================
  const [visitRows] = await db.query(
    `
    SELECT
    v.id,
    v.visit_date,
    v.visit_time,
    v.duration,
    v.weather,
    v.latitude,
    v.longitude,
    v.notes,

    u.name AS inspector,

    (
        COALESCE(v.plant_population,0) +
        COALESCE(v.plant_infill,0) +
        COALESCE(v.termite,0) +
        COALESCE(v.orcytes,0) +
        COALESCE(v.pest,0) +
        COALESCE(v.leaf_caterpillar,0) +
        COALESCE(v.beneficial_weed,0)
    ) / 7 AS plant_score,

    (
        COALESCE(v.circle_condition,0) +
        COALESCE(v.harvesting_path,0) +
        COALESCE(v.interrow,0) +
        COALESCE(v.tph_condition,0) +
        COALESCE(v.sanitation,0) +
        COALESCE(v.cover_crop,0)
    ) / 6 AS field_score,

    (
        COALESCE(v.road_condition,0) +
        COALESCE(v.bridge_condition,0) +
        COALESCE(v.footbridge_condition,0)
    ) / 3 AS infrastructure_score,

    (
        COALESCE(v.drainage_condition,0) +
        COALESCE(v.ditch_condition,0) +
        COALESCE(v.monitoring_well,0)
    ) / 3 AS environment_score,

    COALESCE(v.fertilizing,0) AS management_score,

    (
        (
            COALESCE(v.plant_population,0) +
            COALESCE(v.plant_infill,0) +
            COALESCE(v.termite,0) +
            COALESCE(v.orcytes,0) +
            COALESCE(v.pest,0) +
            COALESCE(v.leaf_caterpillar,0) +
            COALESCE(v.beneficial_weed,0) +

            COALESCE(v.circle_condition,0) +
            COALESCE(v.harvesting_path,0) +
            COALESCE(v.interrow,0) +
            COALESCE(v.tph_condition,0) +
            COALESCE(v.sanitation,0) +
            COALESCE(v.cover_crop,0) +

            COALESCE(v.road_condition,0) +
            COALESCE(v.bridge_condition,0) +
            COALESCE(v.footbridge_condition,0) +

            COALESCE(v.drainage_condition,0) +
            COALESCE(v.ditch_condition,0) +
            COALESCE(v.monitoring_well,0) +

            COALESCE(v.fertilizing,0)
        ) / 20
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
    v.visit_time ASC;
    `,
    [id],
  );

  const visits = (visitRows as any[]).map((visit) => ({
    ...visit,
    latitude: Number(visit.latitude),
    longitude: Number(visit.longitude),
  }));

  return {
    ...block,
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
