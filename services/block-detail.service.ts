import db from "@/lib/db";

export async function getBlockDetail(id: number) {
  const [rows] = await db.query(
    `
    SELECT
      b.id,
      b.block_code,
      b.block_name,
      b.status,
      b.division,
      b.area_ha,
      b.planting_year,
      b.ba_code,
      b.ba_initial,
      b.unit,
      b.remarks,
      b.geometry,

      e.id AS estate_id,
      e.name AS estate,

      a.id AS ama_id,
      a.name AS ama,

      (
        SELECT COUNT(*)
        FROM visits v
        WHERE v.block_id = b.id
      ) AS total_visit

    FROM blocks b

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    WHERE b.id = ?
    LIMIT 1
    `,
    [id],
  );

  const block = (rows as any[])[0];

  if (!block) return null;

  block.geometry =
    typeof block.geometry === "string"
      ? JSON.parse(block.geometry)
      : block.geometry;

  return block;
}
