import { RowDataPacket } from "mysql2/promise";
import db from "@/lib/db";

export interface UserOption {
  id: number;
  name: string;
  email: string;
  role: string;
  photo: string | null;
}

export async function getUsers(): Promise<UserOption[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      id,
      name,
      email,
      role,
      photo
    FROM users
    ORDER BY name ASC
    `,
  );

  return (rows as UserOption[]).map((user) => ({
    ...user,
    photo: user.photo
      ? `/uploads/photos/${user.photo}`
      : "/images/default-avatar.png",
  }));
}
