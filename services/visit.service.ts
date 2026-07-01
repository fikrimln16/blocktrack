import { RowDataPacket } from "mysql2";
import fs from "fs/promises";
import path from "path";

import db from "@/lib/db";

import { Visit } from "@/types/visit";

import { createVisit, createVisitPhoto } from "@/repositories/visit.repository";

import crypto from "crypto";

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

  const visits = rows as Visit[];

  for (const visit of visits) {
    visit.photos = await getVisitPhotos(visit.id);

    if (visit.inspector_photo) {
      if (!visit.inspector_photo.startsWith("/")) {
        visit.inspector_photo = `/uploads/photos/${visit.inspector_photo}`;
      }
    } else {
      visit.inspector_photo = "/images/default-avatar.jpg";
    }
  }

  return visits;
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

  notes: string;
}

export async function saveVisit(visit: VisitPayload, photos: File[]) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const visitId = await createVisit(connection, visit);

    const uploadDir = path.join(process.cwd(), "storage", "uploads", "photos");

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    for (const photo of photos) {
      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const ext = path.extname(photo.name).toLowerCase();

      const now = new Date();

      const timestamp =
        `${now.getFullYear()}` +
        `${String(now.getMonth() + 1).padStart(2, "0")}` +
        `${String(now.getDate()).padStart(2, "0")}_` +
        `${String(now.getHours()).padStart(2, "0")}` +
        `${String(now.getMinutes()).padStart(2, "0")}` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

      const random = crypto.randomBytes(4).toString("hex");

      const fileName = `visit_${timestamp}_${random}${ext}`;

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      // Simpan nama file saja
      await createVisitPhoto(connection, visitId, fileName);
    }

    await connection.commit();

    return visitId;
  } catch (error) {
    await connection.rollback();
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
      photo_url
    FROM visit_photos
    WHERE visit_id = ?
    ORDER BY id ASC
    LIMIT 4
    `,
    [visitId],
  );

  return rows as VisitPhoto[];
}
