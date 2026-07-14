import fs from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

import { getAttachmentByIdService } from "@/app/api/attachments/service";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const attachment = await getAttachmentByIdService(Number(id));

    if (!attachment) {
      return NextResponse.json(
        {
          message: "Attachment not found.",
        },
        {
          status: 404,
        },
      );
    }

    const filePath = path.join(process.cwd(), "storage", attachment.file_url);

    const buffer = await fs.readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": attachment.mime_type,
        "Content-Disposition": `inline; filename="${attachment.file_name}"`,
        "Content-Length": String(buffer.length),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to preview attachment.",
      },
      {
        status: 500,
      },
    );
  }
}
