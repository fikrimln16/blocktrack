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

      COUNT(DISTINCT v.id) AS total_visit,
      COUNT(DISTINCT vp.id) AS total_photos,
      COUNT(DISTINCT va.id) AS total_attachments

    FROM blocks b

    INNER JOIN estates e
      ON e.id = b.estate_id

    INNER JOIN amas a
      ON a.id = e.ama_id

    LEFT JOIN visits v
      ON v.block_id = b.id

    LEFT JOIN visit_photos vp
      ON vp.visit_id = v.id

    LEFT JOIN visit_attachments va
      ON va.visit_id = v.id

    WHERE b.id = ?

    GROUP BY
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
      e.id,
      e.name,
      a.id,
      a.name

    LIMIT 1
    `,
    [id],
  );

  const block = (rows as any[])[0];

  if (!block) {
    return null;
  }

  block.geometry =
    typeof block.geometry === "string"
      ? JSON.parse(block.geometry)
      : block.geometry;

  console.log(block);

  return block;
}

export interface VisitPhoto {
  id: number;
  visit_id: number;
  photo_url: string;
}

export async function getBlockPhotos(blockId: number): Promise<VisitPhoto[]> {
  const [rows] = await db.query(
    `
    SELECT
      vp.id,
      vp.visit_id,
      vp.photo_url
    FROM visit_photos vp
    INNER JOIN visits v
      ON v.id = vp.visit_id
    WHERE v.block_id = ?
    ORDER BY vp.id ASC
    `,
    [blockId],
  );

  return (rows as any[]).map((row) => ({
    id: row.id,
    visit_id: row.visit_id,
    photo_url: `/api/storage/uploads/photos/${row.photo_url}`,
  }));
}
