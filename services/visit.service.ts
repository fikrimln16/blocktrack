import { RowDataPacket } from "mysql2";
import fs from "fs/promises";
import path from "path";

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

        COUNT(DISTINCT vp.id) AS total_photos,

        0 AS total_findings

    FROM visits v

    LEFT JOIN users u
      ON u.id = v.user_id

    LEFT JOIN visit_photos vp
      ON vp.visit_id = v.id

    WHERE v.block_id = ?

    GROUP BY
        v.id,
        v.visit_code,
        v.visit_date,
        v.visit_time,
        v.duration,
        v.weather,
        v.notes,
        v.status,
        u.id,
        u.name,
        u.role,
        u.photo

    ORDER BY
        v.visit_date DESC,
        v.visit_time DESC
    `,
    [blockId],
  );

  const visits = rows as Visit[];

  for (const visit of visits) {
    visit.photos = await getVisitPhotos(visit.id);

    // Normalisasi path foto inspector
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

    console.log("===== SAVE VISIT =====");
    console.log(visit);

    const visitId = await createVisit(connection, visit);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "photos");

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    for (const photo of photos) {
      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${photo.name.replace(/\s+/g, "-")}`;

      const filePath = path.join(uploadDir, fileName);

      await fs.writeFile(filePath, buffer);

      const photoUrl = `/uploads/photos/${fileName}`;

      await createVisitPhoto(connection, visitId, photoUrl);
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
