import { NextResponse } from "next/server";

import { saveVisit } from "@/services/visit.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    /**
     * Visit Data
     */
    const visitRaw = formData.get("visit");

    if (typeof visitRaw !== "string" || visitRaw.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Visit data is required.",
        },
        {
          status: 400,
        },
      );
    }

    let visit;

    try {
      visit = JSON.parse(visitRaw);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid visit data.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * Photos
     */
    const photos: File[] = [];

    for (const item of formData.getAll("photos")) {
      if (!(item instanceof File)) continue;

      // Safari kadang mengirim file kosong jika user membatalkan kamera
      if (item.size === 0) continue;

      // Pastikan memang image
      if (!item.type.startsWith("image/")) continue;

      photos.push(item);
    }

    console.log("========== VISIT ==========");
    console.log(visit);

    console.log("========== PHOTOS ==========");
    console.log(
      photos.map((photo) => ({
        name: photo.name,
        type: photo.type,
        size: photo.size,
      })),
    );

    const visitId = await saveVisit(visit, photos);

    return NextResponse.json(
      {
        success: true,
        visitId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("POST /api/visits", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to save visit.",
      },
      {
        status: 500,
      },
    );
  }
}
