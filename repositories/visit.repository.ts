import { PoolConnection, ResultSetHeader } from "mysql2/promise";

interface CreateVisitPayload {
  block_id: number;
  visit_date: string;
  visit_time: string;
  weather: string;
  duration: number;
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  notes: string;
}

export async function createVisit(
  connection: PoolConnection,
  data: CreateVisitPayload,
): Promise<number> {
  const [result] = await connection.execute<ResultSetHeader>(
    `
      INSERT INTO visits
      (
        block_id,
        visit_date,
        visit_time,
        weather,
        duration,
        latitude,
        longitude,
        accuracy,
        notes
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.block_id,
      data.visit_date,
      data.visit_time,
      data.weather,
      data.duration,
      data.latitude,
      data.longitude,
      data.accuracy ?? null,
      data.notes,
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
