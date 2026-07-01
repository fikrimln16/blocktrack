import fs from "fs/promises";
import path from "path";
import { lookup } from "mime-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      type: string;
      file: string;
    }>;
  },
) {
  try {
    const { type, file } = await params;

    const filePath = path.join(process.cwd(), "storage", "uploads", type, file);

    const buffer = await fs.readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": lookup(filePath) || "application/octet-stream",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch {
    return new NextResponse("Not Found", {
      status: 404,
    });
  }
}
