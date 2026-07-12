import { NextResponse } from "next/server";

import { getVisitFilters } from "@/services/visit-filter.service";

export async function GET() {
  const data = await getVisitFilters();

  return NextResponse.json(data);
}
