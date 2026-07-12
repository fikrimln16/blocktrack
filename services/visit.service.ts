import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import { Visit } from "@/types/visit";

import { createVisit, createVisitPhoto } from "@/repositories/visit.repository";

export async function getBlockVisits(blockId: number): Promise<Visit[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      v.id,
      v.visit_code,
      v.visit_date,
      v.visit_time,
      v.duration,
      v.weather,
      v.notes,
      v.status,

      u.id AS user_id,
      u.name AS inspector,
      u.role,
      u.photo AS inspector_photo,

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

    LEFT JOIN users u
      ON u.id = v.user_id

    WHERE v.block_id = ?

    ORDER BY
      v.visit_date DESC,
      v.visit_time DESC
    `,
    [blockId],
  );

  return (rows as Visit[]).map((visit) => ({
    ...visit,

    photos: [],

    inspector_photo: visit.inspector_photo
      ? `/api/storage/uploads/photos/${visit.inspector_photo}`
      : "/images/default-avatar.jpg",
  }));
}

interface VisitPayload {
  user_id: number;

  block_id: number;

  visit_date: string;
  visit_time: string;

  weather: string;
  duration: number;

  latitude: number;
  longitude: number;
  accuracy?: number;

  plant_population?: number | null;
  plant_infill?: number | null;
  termite?: number | null;
  orcytes?: number | null;
  pest?: number | null;
  leaf_caterpillar?: number | null;
  beneficial_weed?: number | null;

  circle_condition?: number | null;
  harvesting_path?: number | null;
  interrow?: number | null;
  tph_condition?: number | null;
  sanitation?: number | null;
  cover_crop?: number | null;

  road_condition?: number | null;
  bridge_condition?: number | null;
  footbridge_condition?: number | null;

  drainage_condition?: number | null;
  ditch_condition?: number | null;
  monitoring_well?: number | null;

  fertilizing?: number | null;

  notes: string;
}

export async function saveVisit(visit: VisitPayload, photos: File[]) {
  const connection = await db.getConnection();

  const uploadDir = path.join(process.cwd(), "storage", "uploads", "photos");

  const uploadedFiles: string[] = [];

  try {
    await connection.beginTransaction();

    const visitId = await createVisit(connection, visit);

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    for (const photo of photos) {
      if (!(photo instanceof File)) continue;

      if (photo.size === 0) continue;

      if (!photo.type.startsWith("image/")) continue;

      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      let ext = path.extname(photo.name).toLowerCase();

      /**
       * iPhone Take Photo kadang tidak mengirim extension.
       */
      if (!ext) {
        switch (photo.type) {
          case "image/jpeg":
            ext = ".jpg";
            break;

          case "image/png":
            ext = ".png";
            break;

          case "image/webp":
            ext = ".webp";
            break;

          case "image/heic":
            ext = ".heic";
            break;

          case "image/heif":
            ext = ".heif";
            break;

          default:
            ext = ".jpg";
        }
      }

      const now = new Date();

      const timestamp =
        `${now.getFullYear()}` +
        `${String(now.getMonth() + 1).padStart(2, "0")}` +
        `${String(now.getDate()).padStart(2, "0")}_` +
        `${String(now.getHours()).padStart(2, "0")}` +
        `${String(now.getMinutes()).padStart(2, "0")}` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

      const random = crypto.randomBytes(6).toString("hex");

      const fileName = `visit_${timestamp}_${random}${ext}`;

      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);

      uploadedFiles.push(fileName);

      await createVisitPhoto(connection, visitId, fileName);
    }

    await connection.commit();

    return visitId;
  } catch (error) {
    await connection.rollback();

    /**
     * Hapus file yang sudah terupload jika transaksi gagal.
     */
    await Promise.all(
      uploadedFiles.map(async (file) => {
        try {
          await fs.unlink(path.join(uploadDir, file));
        } catch {
          // ignore
        }
      }),
    );

    throw error;
  } finally {
    connection.release();
  }
}

export interface VisitPhoto extends RowDataPacket {
  id: number;
  photo_url: string;
}

export async function getVisitPhotos(visitId: number): Promise<VisitPhoto[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      id,
      CONCAT('/api/storage/uploads/photos/', photo_url) AS photo_url
    FROM visit_photos
    WHERE visit_id = ?
    ORDER BY id ASC
    LIMIT 4
    `,
    [visitId],
  );

  return rows as VisitPhoto[];
}

import { deleteVisit } from "@/repositories/visit.repository";

export async function deleteVisitService(visitId: number): Promise<void> {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await deleteVisit(connection, visitId);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
