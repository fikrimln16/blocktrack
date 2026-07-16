import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

export interface FilterOption {
  id: number;
  name: string;
}

export async function getAttentionAmaOptionsRepository(): Promise<
  FilterOption[]
> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
      SELECT
        id,
        name
      FROM amas
      ORDER BY name
    `,
  );

  return rows as FilterOption[];
}

export async function getAttentionEstateOptionsRepository(
  amaId: number,
): Promise<FilterOption[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
      SELECT
        id,
        name
      FROM estates
      WHERE ama_id = ?
      ORDER BY name
    `,
    [amaId],
  );

  return rows as FilterOption[];
}

export async function getAttentionBlockOptionsRepository(
  estateId: number,
): Promise<FilterOption[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
      SELECT
        id,
        block_code AS name
      FROM blocks
      WHERE estate_id = ?
      ORDER BY block_code
    `,
    [estateId],
  );

  return rows as FilterOption[];
}
