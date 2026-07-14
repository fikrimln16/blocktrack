import fs from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

import { deleteAttachmentService } from "@/app/api/attachments/service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const fileUrl = await deleteAttachmentService(Number(id));

    if (fileUrl) {
      try {
        const filePath = path.join(process.cwd(), "storage", fileUrl);

        await fs.unlink(filePath);
      } catch (error) {
        console.warn("Failed to delete file:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Attachment deleted successfully.",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Failed to delete attachment.",
      },
      {
        status: 400,
      },
    );
  }
}
