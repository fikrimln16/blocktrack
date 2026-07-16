import { NextRequest, NextResponse } from "next/server";

import {
  getAttentionSummary,
  getAttentionAma,
  getAttentionEstate,
  getAttentionBlock,
} from "@/services/attention.service";

import { getAttentionFilter } from "@/services/attention.service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const amaId = searchParams.get("amaId");
    const estateId = searchParams.get("estateId");
    const blockId = searchParams.get("blockId");

    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "20");

    const [summary, filters] = await Promise.all([
      getAttentionSummary(),
      getAttentionFilter(),
    ]);

    /**
     * LEVEL 1
     * AMA
     */
    if (!amaId) {
      const ranking = await getAttentionAma();

      return NextResponse.json({
        level: "ama",

        summary,

        filters,

        ranking,

        page,

        limit,
      });
    }

    /**
     * LEVEL 2
     * ESTATE
     */
    if (!estateId) {
      const ranking = await getAttentionEstate(Number(amaId));

      return NextResponse.json({
        level: "estate",

        summary,

        selectedAma: Number(amaId),

        ranking,

        page,

        limit,
      });
    }

    /**
     * LEVEL 3
     * BLOCK
     */
    if (!blockId) {
      const ranking = await getAttentionBlock(Number(estateId));

      return NextResponse.json({
        level: "block",

        summary,

        selectedAma: Number(amaId),

        selectedEstate: Number(estateId),

        ranking,

        page,

        limit,
      });
    }

    /**
     * LEVEL 4
     * VISIT
     */

    return NextResponse.json({
      level: "visit",

      summary,

      selectedAma: Number(amaId),

      selectedEstate: Number(estateId),

      selectedBlock: Number(blockId),

      page,

      limit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load attention data.",
      },
      {
        status: 500,
      },
    );
  }
}
