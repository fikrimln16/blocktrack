import { PoolConnection, ResultSetHeader } from "mysql2/promise";

export interface CreateVisitPayload {
  user_id: number;
  block_id: number;

  visit_date: string;
  visit_time: string;

  weather: string;
  duration: number;

  latitude: number;
  longitude: number;
  accuracy?: number | null;

  // Plant Condition
  plant_population?: number | null;
  plant_infill?: number | null;
  termite?: number | null;
  orcytes?: number | null;
  pest?: number | null;
  leaf_caterpillar?: number | null;
  beneficial_weed?: number | null;

  // Field Condition
  circle_condition?: number | null;
  harvesting_path?: number | null;
  interrow?: number | null;
  tph_condition?: number | null;
  sanitation?: number | null;
  cover_crop?: number | null;

  // Infrastructure
  road_condition?: number | null;
  bridge_condition?: number | null;
  footbridge_condition?: number | null;

  // Environment
  drainage_condition?: number | null;
  ditch_condition?: number | null;
  monitoring_well?: number | null;

  // Management
  fertilizing?: number | null;

  notes: string;
}

export async function createVisit(
  connection: PoolConnection,
  visit: CreateVisitPayload,
): Promise<number> {
  const [result] = await connection.execute<ResultSetHeader>(
    `
    INSERT INTO visits
    (
      user_id,
      block_id,

      visit_date,
      visit_time,

      weather,
      duration,

      latitude,
      longitude,
      accuracy,

      plant_population,
      plant_infill,
      termite,
      orcytes,
      pest,
      leaf_caterpillar,
      beneficial_weed,

      circle_condition,
      harvesting_path,
      interrow,
      tph_condition,
      sanitation,
      cover_crop,

      road_condition,
      bridge_condition,
      footbridge_condition,

      drainage_condition,
      ditch_condition,
      monitoring_well,

      fertilizing,

      notes
    )
    VALUES
    (
      ?, ?, ?, ?, ?, ?, ?, ?, ?,

      ?, ?, ?, ?, ?, ?, ?,

      ?, ?, ?, ?, ?, ?,

      ?, ?, ?,

      ?, ?, ?,

      ?,

      ?
    )
    `,
    [
      visit.user_id,
      visit.block_id,

      visit.visit_date,
      visit.visit_time,

      visit.weather,
      visit.duration,

      visit.latitude,
      visit.longitude,
      visit.accuracy ?? null,

      // Plant Condition
      visit.plant_population ?? null,
      visit.plant_infill ?? null,
      visit.termite ?? null,
      visit.orcytes ?? null,
      visit.pest ?? null,
      visit.leaf_caterpillar ?? null,
      visit.beneficial_weed ?? null,

      // Field Condition
      visit.circle_condition ?? null,
      visit.harvesting_path ?? null,
      visit.interrow ?? null,
      visit.tph_condition ?? null,
      visit.sanitation ?? null,
      visit.cover_crop ?? null,

      // Infrastructure
      visit.road_condition ?? null,
      visit.bridge_condition ?? null,
      visit.footbridge_condition ?? null,

      // Environment
      visit.drainage_condition ?? null,
      visit.ditch_condition ?? null,
      visit.monitoring_well ?? null,

      // Management
      visit.fertilizing ?? null,

      visit.notes,
    ],
  );

  return result.insertId;
}

export async function createVisitPhoto(
  connection: PoolConnection,
  visitId: number,
  photoUrl: string,
): Promise<void> {
  await connection.execute(
    `
    INSERT INTO visit_photos
    (
      visit_id,
      photo_url
    )
    VALUES
    (?, ?)
    `,
    [visitId, photoUrl],
  );
}

import fs from "fs/promises";
import path from "path";

import { RowDataPacket } from "mysql2/promise";

interface VisitPhotoRow extends RowDataPacket {
  photo_url: string;
}

interface VisitAttachmentRow extends RowDataPacket {
  file_url: string;
}

export async function deleteVisit(
  connection: PoolConnection,
  visitId: number,
): Promise<void> {
  const [photos] = await connection.execute<VisitPhotoRow[]>(
    `
    SELECT
      photo_url
    FROM visit_photos
    WHERE visit_id = ?
    `,
    [visitId],
  );

  const [attachments] = await connection.execute<VisitAttachmentRow[]>(
    `
    SELECT
      file_url
    FROM visit_attachments
    WHERE visit_id = ?
    `,
    [visitId],
  );

  await connection.execute(
    `
    DELETE FROM visit_photos
    WHERE visit_id = ?
    `,
    [visitId],
  );

  await connection.execute(
    `
    DELETE FROM visit_attachments
    WHERE visit_id = ?
    `,
    [visitId],
  );

  await connection.execute(
    `
    DELETE FROM visits
    WHERE id = ?
    `,
    [visitId],
  );

  // Hapus file fisik (dipanggil setelah data database dihapus)
  await Promise.allSettled(
    photos.map((photo) =>
      fs.unlink(
        path.join(process.cwd(), "storage/uploads/photos", photo.photo_url),
      ),
    ),
  );

  await Promise.allSettled(
    attachments.map((attachment) =>
      fs.unlink(
        path.join(
          process.cwd(),
          "storage/uploads/attachments",
          attachment.file_url,
        ),
      ),
    ),
  );
}
