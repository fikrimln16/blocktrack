import { NextResponse } from "next/server";

import {
  getAmaOptions,
  getBlockSummary,
  getBlocks,
  getEstateOptions,
} from "@/services/block.service";

export async function GET() {
  try {
    const blocks = await getBlocks();

    const summary = await getBlockSummary();

    const amas = await getAmaOptions();

    const estates = await getEstateOptions();

    return NextResponse.json({
      success: true,

      summary,

      amas,

      estates,

      blocks,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to load block data",
      },
      {
        status: 500,
      },
    );
  }
}
