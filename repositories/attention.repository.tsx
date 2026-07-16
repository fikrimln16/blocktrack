import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

export interface FilterOption {
  id: number;
  name: string;
}

export async function getAttentionFilterRepository(): Promise<{
  amas: FilterOption[];
  estates: FilterOption[];
  blocks: FilterOption[];
}> {
  const [amas] = await db.query<RowDataPacket[]>(`
    SELECT
      id,
      name
    FROM amas
    ORDER BY name
  `);

  const [estates] = await db.query<RowDataPacket[]>(`
    SELECT
      id,
      name
    FROM estates
    ORDER BY name
  `);

  const [blocks] = await db.query<RowDataPacket[]>(`
    SELECT
      id,
      block_code AS name
    FROM blocks
    ORDER BY block_code
  `);

  return {
    amas: amas as FilterOption[],
    estates: estates as FilterOption[],
    blocks: blocks as FilterOption[],
  };
}
