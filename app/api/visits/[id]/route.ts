import { NextResponse } from "next/server";

import { deleteVisitService } from "@/services/visit.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_request: Request, { params }: Props) {
  try {
    const { id } = await params;

    await deleteVisitService(Number(id));

    return NextResponse.json({
      success: true,
      message: "Visit deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete visit.",
      },
      {
        status: 500,
      },
    );
  }
}
