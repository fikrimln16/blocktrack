import { RowDataPacket } from "mysql2";

import db from "@/lib/db";

import {
  Attachment,
  AttachmentListQuery,
  AttachmentListResponse,
} from "@/types/attachment";

interface AttachmentRow extends RowDataPacket, Attachment {}

export async function getAttachmentListRepository(
  query: AttachmentListQuery,
): Promise<AttachmentListResponse> {
  const {
    page = 1,
    limit = 20,

    search = "",

    ama,
    estate,

    extension,

    uploadedBy,
  } = query;

  const offset = (page - 1) * limit;

  const where: string[] = [];
  const params: any[] = [];

  // Search
  if (search) {
    where.push(`
      (
        att.title LIKE ?
        OR att.file_name LIKE ?
      )
    `);

    params.push(`%${search}%`, `%${search}%`);
  }

  // AMA
  if (ama) {
    where.push("att.ama_id = ?");
    params.push(ama);
  }

  // Estate
  if (estate) {
    where.push("att.estate_id = ?");
    params.push(estate);
  }

  // Extension
  if (extension) {
    where.push("att.extension = ?");
    params.push(extension);
  }

  // Uploader
  if (uploadedBy) {
    where.push("att.uploaded_by = ?");
    params.push(uploadedBy);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  // ===============================
  // Count
  // ===============================

  const [[count]] = await db.query<RowDataPacket[]>(
    `
    SELECT
      COUNT(*) AS total

    FROM attachments att

    ${whereClause}
    `,
    params,
  );

  // ===============================
  // Data
  // ===============================

  const [rows] = await db.query<AttachmentRow[]>(
    `
    SELECT

      att.id,

      att.ama_id,
      att.estate_id,

      a.name AS ama,
      e.name AS estate,

      att.title,
      att.description,

      att.file_name,
      att.file_url,

      att.mime_type,
      att.extension,
      att.file_size,

      att.uploaded_by,

      u.name AS uploader,

      att.created_at,
      att.updated_at,

      COUNT(DISTINCT av.visit_id) AS total_visits

    FROM attachments att

    INNER JOIN amas a
      ON a.id = att.ama_id

    INNER JOIN estates e
      ON e.id = att.estate_id

    INNER JOIN users u
      ON u.id = att.uploaded_by

    LEFT JOIN attachment_visits av
      ON av.attachment_id = att.id

    ${whereClause}

    GROUP BY
      att.id,
      att.ama_id,
      att.estate_id,
      a.name,
      e.name,
      att.title,
      att.description,
      att.file_name,
      att.file_url,
      att.mime_type,
      att.extension,
      att.file_size,
      att.uploaded_by,
      u.name,
      att.created_at,
      att.updated_at

    ORDER BY
      att.created_at DESC

    LIMIT ?

    OFFSET ?
    `,
    [...params, limit, offset],
  );

  return {
    data: rows,

    total: Number(count.total),

    page,

    limit,

    totalPages: Math.ceil(Number(count.total) / limit),
  };
}

export async function getVisitsByEstateRepository(estateId: number) {
  const [rows] = await db.query(
    `
    SELECT
        v.id,
        v.visit_code,
        v.visit_date,
        v.visit_time,

        b.block_code,

        u.name AS inspector,

        (
            SELECT COUNT(*)
            FROM visit_photos vp
            WHERE vp.visit_id=v.id
        ) total_photos

    FROM visits v

    INNER JOIN blocks b
        ON b.id=v.block_id

    INNER JOIN users u
        ON u.id=v.user_id

    WHERE b.estate_id=?

    ORDER BY
        v.visit_date DESC,
        v.visit_time DESC
    `,
    [estateId],
  );

  return rows;
}

export async function createAttachmentRepository(payload: any) {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result]: any = await conn.query(
      `
      INSERT INTO attachments
      (
        ama_id,
        estate_id,
        title,
        description,
        file_name,
        file_url,
        mime_type,
        extension,
        file_size,
        uploaded_by
      )
      VALUES
      (
        ?,?,?,?,?,?,?,?,?,?
      )
      `,
      [
        payload.ama_id,
        payload.estate_id,
        payload.title,
        payload.description,
        payload.file_name,
        payload.file_url,
        payload.mime_type,
        payload.extension,
        payload.file_size,
        payload.uploaded_by,
      ],
    );

    const attachmentId = result.insertId;

    for (const visitId of payload.visit_ids) {
      await conn.query(
        `
        INSERT INTO attachment_visits
        (
            attachment_id,
            visit_id
        )
        VALUES
        (?,?)
        `,
        [attachmentId, visitId],
      );
    }

    await conn.commit();

    return attachmentId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function getAttachmentFormRepository() {
  const [amas] = await db.query(
    `
    SELECT
      id,
      code,
      name
    FROM amas
    ORDER BY name
    `,
  );

  const [estates] = await db.query(
    `
    SELECT
      id,
      ama_id,
      name
    FROM estates
    ORDER BY name
    `,
  );

  const [visits] = await db.query(
    `
    SELECT
      v.id,
      v.visit_code,
      v.visit_date,
      v.visit_time,

      u.name AS inspector,

      b.estate_id,
      b.block_code,
      b.block_name

    FROM visits v

    INNER JOIN users u
      ON u.id = v.user_id

    INNER JOIN blocks b
      ON b.id = v.block_id

    ORDER BY
      v.visit_date DESC,
      v.visit_time DESC
    `,
  );

  return {
    amas,
    estates,
    visits,
  };
}

export interface AttachmentStatistics extends RowDataPacket {
  totalAttachments: number;
  totalVisits: number;
  totalSize: number;
  totalUploaders: number;
}

export async function getAttachmentStatisticsRepository() {
  const [[row]] = await db.query<AttachmentStatistics[]>(
    `
    SELECT
      COUNT(DISTINCT att.id) AS totalAttachments,

      COUNT(DISTINCT av.visit_id) AS totalVisits,

      COALESCE(SUM(att.file_size),0) AS totalSize,

      COUNT(DISTINCT att.uploaded_by) AS totalUploaders

    FROM attachments att

    LEFT JOIN attachment_visits av
      ON av.attachment_id = att.id
    `,
  );

  return row;
}

interface AttachmentFilterData {
  amas: RowDataPacket[];
  estates: RowDataPacket[];
  uploaders: RowDataPacket[];
}

export async function getAttachmentFilterRepository(): Promise<AttachmentFilterData> {
  const [amas] = await db.query<RowDataPacket[]>(
    `
    SELECT
      id,
      code,
      name
    FROM amas
    ORDER BY name
    `,
  );

  const [estates] = await db.query<RowDataPacket[]>(
    `
    SELECT
      id,
      ama_id,
      name
    FROM estates
    ORDER BY name
    `,
  );

  const [uploaders] = await db.query<RowDataPacket[]>(
    `
    SELECT DISTINCT
      u.id,
      u.name
    FROM attachments a
    INNER JOIN users u
      ON u.id = a.uploaded_by
    ORDER BY u.name
    `,
  );

  return {
    amas,
    estates,
    uploaders,
  };
}
