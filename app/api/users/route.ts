import { NextResponse } from "next/server";

import { createUser } from "@/services/user.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const photo = formData.get("photo");

    const user = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      role: String(formData.get("role") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      employee_id: String(formData.get("employee_id") ?? ""),
      joined_at: String(formData.get("joined_at") ?? ""),
    };

    const id = await createUser(
      user,
      photo instanceof File ? photo : undefined,
    );

    return NextResponse.json({
      success: true,
      id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create inspector.",
      },
      {
        status: 500,
      },
    );
  }
}
