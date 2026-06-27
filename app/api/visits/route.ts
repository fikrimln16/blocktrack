import { NextResponse } from "next/server";

import { saveVisit } from "@/services/visit.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const visitData = formData.get("visit");

    if (!visitData || typeof visitData !== "string") {
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

    const visit = JSON.parse(visitData);

    const photos = formData
      .getAll("photos")
      .filter((file): file is File => file instanceof File);

    console.log("========== VISIT ==========");
    console.log(visit);

    console.log("========== PHOTOS ==========");
    console.log(photos);

    const visitId = await saveVisit(visit, photos);

    return NextResponse.json({
      success: true,
      visitId,
    });
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
