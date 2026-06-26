import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import { Visit } from "@/types/visit";

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

        u.name AS inspector,

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
        u.name

    ORDER BY
        v.visit_date DESC,
        v.visit_time DESC
    `,
    [blockId],
  );

  const visits = rows as Visit[];

  for (const visit of visits) {
    visit.photos = await getVisitPhotos(visit.id);
  }

  return visits;
}

import { createVisit, createVisitPhoto } from "@/repositories/visit.repository";

interface VisitPayload {
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

export async function saveVisit(visit: VisitPayload, photos: string[]) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // =============================
    // Create Visit
    // =============================

    const visitId = await createVisit(connection, visit);

    // =============================
    // Save Photos
    // =============================

    for (const photoUrl of photos) {
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

export interface VisitPhoto {
  id: number;
  photo_url: string;
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
