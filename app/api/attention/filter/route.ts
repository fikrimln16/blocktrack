import { NextRequest, NextResponse } from "next/server";

import {
  getAttentionAmaOptions,
  getAttentionEstateOptions,
  getAttentionBlockOptions,
} from "@/services/attention-filter.service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const amaId = searchParams.get("amaId");
    const estateId = searchParams.get("estateId");

    /**
     * Level 1
     * Load AMA
     */
    if (!amaId && !estateId) {
      const amas = await getAttentionAmaOptions();

      return NextResponse.json({
        amas,
      });
    }

    /**
     * Level 2
     * Load Estate by AMA
     */
    if (amaId && !estateId) {
      const estates = await getAttentionEstateOptions(Number(amaId));

      return NextResponse.json({
        estates,
      });
    }

    /**
     * Level 3
     * Load Block by Estate
     */
    if (estateId) {
      const blocks = await getAttentionBlockOptions(Number(estateId));

      return NextResponse.json({
        blocks,
      });
    }

    return NextResponse.json({
      amas: [],
      estates: [],
      blocks: [],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load attention filters.",
      },
      {
        status: 500,
      },
    );
  }
}
