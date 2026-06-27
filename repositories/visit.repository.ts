import { PoolConnection, ResultSetHeader } from "mysql2/promise";

interface CreateVisitPayload {
  user_id: number;
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
  visit: CreateVisitPayload,
) {
  const [result]: any = await connection.query(
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
      notes
    )
    VALUES
    (
      ?,?,?,?,?,?,?,?,?,?
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
      visit.accuracy,
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
