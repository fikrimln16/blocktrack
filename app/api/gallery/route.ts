import { NextResponse } from "next/server";

import { getGalleryService } from "@/services/gallery.service";

export async function GET() {
  try {
    const data = await getGalleryService();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load gallery",
      },
      {
        status: 500,
      },
    );
  }
}
