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
      ? `/uploads/photos/${user.photo}`
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

    // Validation
    if (!payload.name.trim()) {
      throw new Error("Visitor name is required.");
    }

    let photoName: string | null = null;

    if (photo) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "photos");

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      const ext = path.extname(photo.name).toLowerCase();

      const fileName = `user_${Date.now()}_${crypto
        .randomBytes(4)
        .toString("hex")}${ext}`;

      const bytes = await photo.arrayBuffer();

      const buffer = Buffer.from(bytes);

      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      // Simpan HANYA nama file ke database
      photoName = fileName;
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
        ? `/uploads/photos/${photoName}`
        : "/images/default-avatar.jpg",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
