import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

export interface UploadResult {
  fileName: string;
  originalName: string;
  filePath: string;
  mimeType: string;
  extension: string;
  fileSize: number;
}

export async function uploadFile(
  file: File,
  folder: string,
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  const fileName = `${randomUUID()}.${extension}`;

  const now = new Date();

  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const uploadDirectory = path.join(
    process.cwd(),
    "storage",
    "uploads",
    folder,
    year,
    month,
    day,
  );

  await fs.mkdir(uploadDirectory, {
    recursive: true,
  });

  const destination = path.join(uploadDirectory, fileName);

  await fs.writeFile(destination, buffer);

  return {
    fileName,
    originalName: file.name,

    filePath: path.join("uploads", folder, year, month, day, fileName),

    mimeType: file.type,
    extension,
    fileSize: file.size,
  };
}
