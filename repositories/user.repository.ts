import { PoolConnection, ResultSetHeader } from "mysql2/promise";

interface Payload {
  name: string;
  email: string | null;
  role: string | null;
  phone: string | null;
  employee_id: string | null;
  joined_at: string | null;
  photo: string | null;
}

export async function insertUser(
  connection: PoolConnection,
  payload: Payload,
): Promise<number> {
  const [result] = await connection.execute<ResultSetHeader>(
    `
      INSERT INTO users
      (
        name,
        email,
        role,
        photo,
        phone,
        employee_id,
        joined_at
      )
      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
    [
      payload.name,
      payload.email,
      payload.role,
      payload.photo,
      payload.phone,
      payload.employee_id,
      payload.joined_at,
    ],
  );

  return result.insertId;
}
