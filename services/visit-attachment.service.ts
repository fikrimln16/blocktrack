import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { insertVisitAttachment } from "@/repositories/visit-attachment.repository";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

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

  "application/octet-stream",
];

export async function uploadVisitAttachment(
  visitId: number,
  files: File[],
  category: string,
  displayNames: string[],
) {
  const uploadDir = path.join(
    process.cwd(),
    "storage",
    "uploads",
    "attachments",
  );

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const uploadedFiles: string[] = [];
  const results = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!(file instanceof File)) {
        continue;
      }

      if (file.size === 0) {
        throw new Error(`${file.name} is empty.`);
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`${file.name} exceeds 25 MB.`);
      }

      const ext = path.extname(file.name).toLowerCase();

      const allowed =
        ALLOWED_TYPES.includes(file.type) ||
        [
          ".pdf",
          ".doc",
          ".docx",
          ".xls",
          ".xlsx",
          ".ppt",
          ".pptx",
          ".zip",
          ".rar",
        ].includes(ext);

      if (!allowed) {
        throw new Error(`${file.name} is not supported.`);
      }

      const now = new Date();

      const timestamp =
        `${now.getFullYear()}` +
        `${String(now.getMonth() + 1).padStart(2, "0")}` +
        `${String(now.getDate()).padStart(2, "0")}_` +
        `${String(now.getHours()).padStart(2, "0")}` +
        `${String(now.getMinutes()).padStart(2, "0")}` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

      const random = crypto.randomBytes(4).toString("hex");

      const fileName = `attachment_${timestamp}_${random}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      uploadedFiles.push(fileName);

      const displayName =
        (displayNames[i] || file.name)
          .trim()
          .replace(/[<>:"/\\|?*\x00-\x1F]/g, "") || file.name;

      const attachment = await insertVisitAttachment({
        visit_id: visitId,

        original_name: displayName,

        file_name: fileName,

        // Simpan NAMA FILE SAJA
        file_url: fileName,

        file_type: file.type || "application/octet-stream",

        file_extension: ext.replace(".", ""),

        file_size: file.size,

        category,
      });

      results.push(attachment);
    }

    return results;
  } catch (error) {
    await Promise.all(
      uploadedFiles.map(async (file) => {
        try {
          await fs.unlink(path.join(uploadDir, file));
        } catch {
          // ignore
        }
      }),
    );

    throw error;
  }
}
