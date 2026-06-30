import fs from "fs/promises";
import path from "path";

import { insertVisitAttachment } from "@/repositories/visit-attachment.repository";

const ALLOWED_TYPES = [
  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "application/vnd.ms-powerpoint",

  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  "application/zip",

  "application/x-zip-compressed",
];

export async function uploadVisitAttachment(
  visitId: number,
  files: File[],
  category: string,
) {
  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "attachments",
  );

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const results = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`${file.name} is not a supported file.`);
    }

    const ext = path.extname(file.name);

    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(path.join(uploadDir, filename), buffer);

    const attachment = await insertVisitAttachment({
      visit_id: visitId,

      original_name: file.name,

      file_name: filename,

      file_url: `/uploads/attachments/${filename}`,

      file_type: file.type,

      file_extension: ext.replace(".", ""),

      file_size: file.size,

      category,
    });

    results.push(attachment);
  }

  return results;
}
