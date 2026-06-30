import { ResultSetHeader, RowDataPacket } from "mysql2";

import db from "@/lib/db";

export interface CreateVisitAttachment {
  visit_id: number;

  original_name: string;

  file_name: string;

  file_url: string;

  file_type: string;

  file_extension: string;

  file_size: number;

  category: string;
}

export async function insertVisitAttachment(attachment: CreateVisitAttachment) {
  const [result] = await db.query<ResultSetHeader>(
    `
    INSERT INTO visit_attachments
    (
      visit_id,
      original_name,
      file_name,
      file_url,
      file_type,
      file_extension,
      file_size,
      category
    )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      attachment.visit_id,
      attachment.original_name,
      attachment.file_name,
      attachment.file_url,
      attachment.file_type,
      attachment.file_extension,
      attachment.file_size,
      attachment.category,
    ],
  );

  return {
    id: result.insertId,
    ...attachment,
  };
}

export async function getVisitAttachments(visitId: number) {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      *
    FROM visit_attachments
    WHERE visit_id = ?
    ORDER BY created_at DESC
    `,
    [visitId],
  );

  return rows;
}

export async function deleteVisitAttachment(id: number) {
  await db.query(
    `
    DELETE
    FROM visit_attachments
    WHERE id = ?
    `,
    [id],
  );
}
