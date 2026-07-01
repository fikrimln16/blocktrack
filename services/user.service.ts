import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { RowDataPacket } from "mysql2/promise";

import db from "@/lib/db";
import { insertUser } from "@/repositories/user.repository";

export interface UserOption {
  id: number;
  name: string;
  email: string;
  role: string;
  photo: string | null;
}

interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
  phone: string;
  employee_id: string;
  joined_at: string;
}

/**
 * Get Users
 */
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
      ? `/api/storage/uploads/photos/${user.photo}`
      : "/images/default-avatar.jpg",
  }));
}

/**
 * Create User
 */
export async function createUser(payload: CreateUserPayload, photo?: File) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    if (!payload.name.trim()) {
      throw new Error("Visitor name is required.");
    }

    let photoName: string | null = null;

    if (photo) {
      const uploadDir = path.join(
        process.cwd(),
        "storage",
        "uploads",
        "photos",
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      const ext = path.extname(photo.name).toLowerCase();

      const now = new Date();

      const timestamp =
        `${now.getFullYear()}` +
        `${String(now.getMonth() + 1).padStart(2, "0")}` +
        `${String(now.getDate()).padStart(2, "0")}_` +
        `${String(now.getHours()).padStart(2, "0")}` +
        `${String(now.getMinutes()).padStart(2, "0")}` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

      const random = crypto.randomBytes(4).toString("hex");

      photoName = `user_${timestamp}_${random}${ext}`;

      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      await fs.writeFile(path.join(uploadDir, photoName), buffer);
    }

    const id = await insertUser(connection, {
      name: payload.name.trim(),
      email: payload.email.trim() || null,
      role: payload.role.trim() || null,
      phone: payload.phone.trim() || null,
      employee_id: payload.employee_id.trim() || null,
      joined_at: payload.joined_at || null,
      photo: photoName,
    });

    await connection.commit();

    return {
      id,
      name: payload.name.trim(),
      email: payload.email.trim(),
      role: payload.role.trim(),
      phone: payload.phone.trim(),
      employee_id: payload.employee_id.trim(),
      joined_at: payload.joined_at,
      photo: photoName
        ? `/api/storage/uploads/photos/${photoName}`
        : "/images/default-avatar.jpg",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
