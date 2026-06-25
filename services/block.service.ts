import db from "@/lib/db";
import { Block } from "@/types/block";

export async function getBlocks() {
  const [rows] = await db.query(`
    SELECT
      b.id,
      b.estate_id,
      e.ama_id,

      b.block_code,
      b.block_name,
      b.status,
      b.division,
      b.planting_year,
      b.area_ha,
      b.ba_code,
      b.ba_initial,
      b.unit,
      b.remarks,
      b.geometry,

      e.name AS estate,
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

    ORDER BY
      a.name,
      e.name,
      b.block_code
  `);

  return (rows as any[]).map((row) => ({
    ...row,
    geometry:
      typeof row.geometry === "string"
        ? JSON.parse(row.geometry)
        : row.geometry,
  })) as Block[];
}

export async function getBlockSummary() {
  const [[summary]]: any = await db.query(`
      SELECT

      (SELECT COUNT(*) FROM amas) AS totalAma,

      (SELECT COUNT(*) FROM estates) AS totalEstate,

      (SELECT COUNT(*) FROM blocks) AS totalBlock,

      (
        SELECT COUNT(DISTINCT block_id)
        FROM visits
      ) AS visitedBlock
  `);

  return summary;
}

export async function getAmaOptions() {
  const [rows] = await db.query(`
        SELECT
            id,
            name
        FROM amas
        ORDER BY name
    `);

  return rows;
}

export async function getEstateOptions(amaId?: number) {
  let sql = `
        SELECT
            id,
            name
        FROM estates
    `;

  const params: any[] = [];

  if (amaId) {
    sql += ` WHERE ama_id=?`;

    params.push(amaId);
  }

  sql += ` ORDER BY name`;

  const [rows] = await db.query(sql, params);

  return rows;
}

export async function getBlockById(id: number) {
  const [rows] = await db.query(
    `
    SELECT
      b.*,

      e.id AS estate_id,
      e.name AS estate,

      a.id AS ama_id,
      a.name AS ama

    FROM blocks b

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    WHERE b.id = ?
    `,
    [id],
  );

  const row = (rows as any[])[0];

  if (!row) return null;

  row.geometry =
    typeof row.geometry === "string" ? JSON.parse(row.geometry) : row.geometry;

  return row;
}
