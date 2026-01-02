
import { pool } from "../../config/db";

export interface UserRow {
  id: string
  name: string
  email: string
  password_hash: string
  createdAt: Date
}

export async function findUserByEmail(
  email: string
): Promise<UserRow | null> {
  const result = await pool.query<UserRow>(
    `
    SELECT id, name, email, password_hash, created_at
    FROM users
    WHERE email = $1
    `,
    [email]
  )

  return result.rows[0] || null
}

export async function createUser(params: {
  id: string
  name: string
  email: string
  passwordHash: string
}): Promise<UserRow> {
  const result = await pool.query<UserRow>(
    `
    INSERT INTO users (id, name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, password_hash, created_at
    `,
    [params.id, params.name, params.email, params.passwordHash]
  )

  const user = result.rows[0]

  if (!user) {
    throw new Error("Failed to create user")
  }
  return user
}
