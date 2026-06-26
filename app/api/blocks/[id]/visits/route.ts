import { NextResponse } from "next/server";

import { getBlockVisits } from "@/services/visit.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const visits = await getBlockVisits(Number(id));

    return NextResponse.json({
      success: true,
      visits,
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
