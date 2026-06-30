import { NextResponse } from "next/server";

import { uploadVisitAttachment } from "@/services/visit-attachment.service";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const visitId = Number(id);

    if (Number.isNaN(visitId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid visit id.",
        },
        { status: 400 },
      );
    }

    const formData = await req.formData();

    const category = String(formData.get("category") ?? "General");

    const files = formData
      .getAll("attachments")
      .filter((file): file is File => file instanceof File);

    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Attachment is required.",
        },
        { status: 400 },
      );
    }

    await uploadVisitAttachment(visitId, files, category);

    return NextResponse.json({
      success: true,
      message: "Attachment uploaded successfully.",
    });
  } catch (error) {
    console.error(error);

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
