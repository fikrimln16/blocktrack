import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

import { v4 as uuid } from "uuid";

import { saveVisit } from "@/services/visit.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const visit = JSON.parse(formData.get("visit") as string);

    const files = formData.getAll("photos") as File[];

    const photoUrls: string[] = [];

    if (files.length > 0) {
      const now = new Date();

      const year = now.getFullYear().toString();

      const month = String(now.getMonth() + 1).padStart(2, "0");

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "visits",
        year,
        month,
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      for (const file of files) {
        if (!(file instanceof File)) continue;

        // ===== VALIDASI EXTENSION =====

        const ext = file.name.split(".").pop()?.toLowerCase();

        const allowed = ["jpg", "jpeg", "png", "webp"];

        if (!ext || !allowed.includes(ext)) {
          return NextResponse.json(
            {
              success: false,
              message: "Only JPG, PNG and WEBP files are allowed.",
            },
            {
              status: 400,
            },
          );
        }

        // ===== VALIDASI SIZE =====

        const maxSize = 10 * 1024 * 1024;

        if (file.size > maxSize) {
          return NextResponse.json(
            {
              success: false,
              message: "Maximum image size is 10 MB.",
            },
            {
              status: 400,
            },
          );
        }

        // ===== CREATE FILE NAME =====

        const filename = `${Date.now()}-${uuid()}.${ext}`;

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const filePath = path.join(uploadDir, filename);

        await fs.writeFile(filePath, buffer);

        photoUrls.push(`/uploads/visits/${year}/${month}/${filename}`);
      }
    }

    // ===== SAVE TO DATABASE =====

    const visitId = await saveVisit(visit, photoUrls);

    return NextResponse.json({
      success: true,
      visitId,
      photos: photoUrls,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
