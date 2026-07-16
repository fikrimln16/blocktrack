import { NextRequest, NextResponse } from "next/server";

import { getAttentionVisits } from "@/services/attention-visit.service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const amaId = searchParams.get("amaId");
    const estateId = searchParams.get("estateId");
    const blockId = searchParams.get("blockId");

    const page = Number(searchParams.get("page") ?? "1");

    const limit = Number(searchParams.get("limit") ?? "20");

    const result = await getAttentionVisits({
      amaId: amaId ? Number(amaId) : undefined,
      estateId: estateId ? Number(estateId) : undefined,
      blockId: blockId ? Number(blockId) : undefined,
      page,
      limit,
    });

    return NextResponse.json({
      visits: result.visits,

      total: result.total,

      page,

      limit,

      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load attention visits.",
      },
      {
        status: 500,
      },
    );
  }
}
