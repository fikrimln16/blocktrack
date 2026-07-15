import { NextRequest, NextResponse } from "next/server";

import { uploadVisitPhotos } from "@/services/visit.service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const visitId = Number(id);

    if (Number.isNaN(visitId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid visit id.",
        },
        {
          status: 400,
        },
      );
    }

    const formData = await request.formData();

    const photos = formData.getAll("photos") as File[];

    if (photos.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select at least one photo.",
        },
        {
          status: 400,
        },
      );
    }

    await uploadVisitPhotos(visitId, photos);

    return NextResponse.json({
      success: true,
      message: "Photos uploaded successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to upload photos.",
      },
      {
        status: 500,
      },
    );
  }
}
