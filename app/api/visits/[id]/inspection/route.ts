import { NextRequest, NextResponse } from "next/server";

import { updateInspection } from "@/services/visit.service";

export async function PATCH(
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

    const body = await request.json();

    await updateInspection(visitId, body);

    return NextResponse.json({
      success: true,
      message: "Inspection updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update inspection.",
      },
      {
        status: 500,
      },
    );
  }
}
