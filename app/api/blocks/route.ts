import { NextRequest, NextResponse } from "next/server";

import {
  getBlocks,
  getBlockSummary,
  getAmaOptions,
  getEstateOptions,
} from "@/services/block.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const filters = {
      search: searchParams.get("search") ?? "",
      ama: Number(searchParams.get("ama")) || undefined,
      estate: Number(searchParams.get("estate")) || undefined,
      division: Number(searchParams.get("division")) || undefined,
      status: searchParams.get("status") ?? "",
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 100,
    };

    const [result, summary, amas, estates] = await Promise.all([
      getBlocks(filters),
      getBlockSummary(),
      getAmaOptions(),
      getEstateOptions(filters.ama),
    ]);

    return NextResponse.json({
      success: true,

      summary,

      amas,
      estates,

      blocks: result.blocks,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
