import { NextRequest, NextResponse } from "next/server";

import { uploadFile } from "@/lib/storage/upload";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file.",
        },
        {
          status: 400,
        },
      );
    }

    const uploaded = await uploadFile(file, "attachments");

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully.",
        data: uploaded,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload file.",
      },
      {
        status: 500,
      },
    );
  }
}
