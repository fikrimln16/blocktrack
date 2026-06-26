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

  return rows as Visit[];
}
