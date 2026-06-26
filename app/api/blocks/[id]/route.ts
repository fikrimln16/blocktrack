import { NextRequest, NextResponse } from "next/server";

import { getBlockDetail } from "@/services/block-detail.service";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;

    const block = await getBlockDetail(Number(id));

    if (!block) {
      return NextResponse.json(
        {
          success: false,
          message: "Block not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      data: block,
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
