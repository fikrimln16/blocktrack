import { NextRequest, NextResponse } from "next/server";

import { uploadVisitAttachment } from "@/services/visit-attachment.service";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    console.log("Visit ID:", id);

    const visitId = Number(id);

    if (!Number.isInteger(visitId) || visitId <= 0) {
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

    const category = String(formData.get("category") ?? "General").trim();

    const displayNames = formData.getAll("display_names").map(String);

    const files: File[] = [];

    for (const item of formData.getAll("attachments")) {
      if (!(item instanceof File)) continue;

      if (item.size === 0) continue;

      files.push(item);
    }

    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No attachment uploaded.",
        },
        {
          status: 400,
        },
      );
    }

    await uploadVisitAttachment(visitId, files, category, displayNames);

    return NextResponse.json(
      {
        success: true,
        message: "Attachment uploaded successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("POST /api/visits/[id]/attachments", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error.",
      },
      {
        status: 500,
      },
    );
  }
}
