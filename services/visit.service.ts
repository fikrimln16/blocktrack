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
  accuracy?: number | null;

  planting_type: "TM" | "TBM";

  // ==========================
  // TM
  // ==========================
  produksi?: number | null;
  kuantitas_sisipan_3_5_tahun?: number | null;
  ganoderma?: number | null;
  pasar_panen?: number | null;
  tunas_pokok?: number | null;
  nomor_dan_kebersihan_tph?: number | null;
  titi_panen?: number | null;
  pencurian?: number | null;

  // ==========================
  // TBM
  // ==========================
  kuantitas_sisipan?: number | null;
  pasar_rintis?: number | null;
  tph?: number | null;
  sanitasi_kastrasi?: number | null;
  perawatan_kacangan?: number | null;
  titi_rintis?: number | null;

  // ==========================
  // TM & TBM
  // ==========================
  populasi_pokok?: number | null;
  rayap?: number | null;
  hama_oryctes?: number | null;
  tikus_babi_other_pest?: number | null;
  ulat_pemakan_daun?: number | null;
  beneficial_weed?: number | null;

  piringan?: number | null;
  gawangan_mineral_gambut?: number | null;

  jalan?: number | null;
  jembatan?: number | null;

  kondisi_drainase_blok?: number | null;
  parit?: number | null;
  sumur_pantau?: number | null;

  pemupukan?: number | null;

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

import {
  updateVisitInspection,
  UpdateVisitInspectionPayload,
} from "@/repositories/visit.repository";

export async function updateInspection(
  visitId: number,
  payload: UpdateVisitInspectionPayload,
): Promise<void> {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await updateVisitInspection(connection, visitId, payload);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function uploadVisitPhotos(
  visitId: number,
  photos: File[],
): Promise<void> {
  const connection = await db.getConnection();

  const uploadDir = path.join(process.cwd(), "storage", "uploads", "photos");

  const uploadedFiles: string[] = [];

  try {
    await connection.beginTransaction();

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

      if (!ext) {
        switch (photo.type) {
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

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      uploadedFiles.push(fileName);

      await createVisitPhoto(connection, visitId, fileName);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();

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
