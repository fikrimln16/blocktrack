import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

interface AmaRow extends RowDataPacket {
  id: number;
  name: string;
}

interface EstateRow extends RowDataPacket {
  id: number;
  ama_id: number;
  name: string;
}

interface BlockRow extends RowDataPacket {
  id: number;
  estate_id: number;
  block_code: string;
  block_name: string;
}

interface InspectorRow extends RowDataPacket {
  id: number;
  name: string;
}

interface WeatherRow extends RowDataPacket {
  weather: string;
}

interface StatusRow extends RowDataPacket {
  status: string;
}

export async function getVisitFilterRepository() {
  const [amas] = await db.query<AmaRow[]>(`
    SELECT id, name
    FROM amas
    ORDER BY name
  `);

  const [estates] = await db.query<EstateRow[]>(`
    SELECT id, ama_id, name
    FROM estates
    ORDER BY name
  `);

  const [blocks] = await db.query<BlockRow[]>(`
    SELECT
      id,
      estate_id,
      block_code,
      block_name
    FROM blocks
    ORDER BY block_code
  `);

  const [inspectors] = await db.query<InspectorRow[]>(`
    SELECT
      id,
      name
    FROM users
    ORDER BY name
  `);

  const [weathers] = await db.query<WeatherRow[]>(`
    SELECT DISTINCT weather
    FROM visits
    WHERE weather IS NOT NULL
    ORDER BY weather
  `);

  const [statuses] = await db.query<StatusRow[]>(`
    SELECT DISTINCT status
    FROM visits
    WHERE status IS NOT NULL
    ORDER BY status
  `);

  return {
    amas,
    estates,
    blocks,
    inspectors,
    weathers: weathers.map((item) => item.weather),
    statuses: statuses.map((item) => item.status),
  };
}
