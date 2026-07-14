import { NextRequest, NextResponse } from "next/server";

import {
  createAttachmentService,
  getAttachmentFilterService,
  getAttachmentFormService,
  getAttachmentListService,
  getAttachmentStatisticsService,
} from "./service";

import { createAttachmentSchema } from "./validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const action = searchParams.get("action");

    // ==========================================
    // Create Form Data
    // ==========================================
    if (action === "form") {
      const result = await getAttachmentFormService();

      return NextResponse.json(result);
    }

    if (action === "filter") {
      const result = await getAttachmentFilterService();

      return NextResponse.json(result);
    }

    // ==========================================
    // Attachment List + Statistics
    // ==========================================
    const [list, statistics] = await Promise.all([
      getAttachmentListService({
        page: Number(searchParams.get("page") ?? 1),

        limit: Number(searchParams.get("limit") ?? 20),

        search: searchParams.get("search") ?? "",

        ama: searchParams.get("ama")
          ? Number(searchParams.get("ama"))
          : undefined,

        estate: searchParams.get("estate")
          ? Number(searchParams.get("estate"))
          : undefined,

        extension: searchParams.get("extension") ?? undefined,

        uploadedBy: searchParams.get("uploadedBy")
          ? Number(searchParams.get("uploadedBy"))
          : undefined,
      }),

      getAttachmentStatisticsService(),
    ]);

    return NextResponse.json({
      ...list,
      statistics,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load attachments.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = createAttachmentSchema.parse(body);

    const id = await createAttachmentService(payload);

    return NextResponse.json(
      {
        success: true,
        id,
        message: "Attachment created successfully.",
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message ?? "Failed to create attachment.",
      },
      {
        status: 400,
      },
    );
  }
}
