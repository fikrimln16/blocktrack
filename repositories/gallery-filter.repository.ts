import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import {
  GalleryAma,
  GalleryBlock,
  GalleryEstate,
  GalleryFilterData,
} from "@/types/gallery";

interface AmaRow extends RowDataPacket, GalleryAma {}

interface EstateRow extends RowDataPacket, GalleryEstate {}

interface BlockRow extends RowDataPacket, GalleryBlock {}

interface InspectorRow extends RowDataPacket {
  inspector: string;
}

export async function getGalleryFiltersRepository(): Promise<GalleryFilterData> {
  const [amas] = await db.query<AmaRow[]>(
    `
    SELECT
      id,
      name
    FROM amas
    ORDER BY name
    `,
  );

  const [estates] = await db.query<EstateRow[]>(
    `
    SELECT
      id,
      ama_id,
      name
    FROM estates
    ORDER BY name
    `,
  );

  const [blocks] = await db.query<BlockRow[]>(
    `
    SELECT
      id,
      estate_id,
      block_code,
      block_name
    FROM blocks
    ORDER BY block_code
    `,
  );

  const [inspectors] = await db.query<InspectorRow[]>(
    `
    SELECT DISTINCT
      u.name AS inspector
    FROM users u
    INNER JOIN visits v
      ON v.user_id = u.id
    ORDER BY u.name
    `,
  );

  return {
    amas,

    estates,

    blocks,

    inspectors: inspectors.map((i) => i.inspector),
  };
}
