import fs from "fs/promises";
import path from "path";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ path: string[] }>;
  },
) {
  try {
    const { path: segments } = await params;

    const filePath = path.join(
      process.cwd(),
      "storage",
      "uploads",
      ...segments,
    );

    const file = await fs.readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": mime.getType(filePath) || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("File not found", {
      status: 404,
    });
  }
}
