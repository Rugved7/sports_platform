import { v4 as uuidv4 } from "uuid"
import { hashPassword, comparePassword } from "../../utils/password"
import { signToken } from "../../utils/jwt"
import { findUserByEmail, createUser } from "./auth.repository"
import { AppError } from "../../utils/AppError.ts"


export async function registerUser(params: {
  name: string
  email: string
  password: string
}) {
  const existingUser = await findUserByEmail(params.email)
  if (existingUser) {
    throw new AppError("Unauthorized", 409)
  }

  const passwordHash = await hashPassword(params.password)

  const user = await createUser({
    id: uuidv4(),
    name: params.name,
    email: params.email,
    passwordHash
  })

  const token = signToken({ userId: user.id })

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token,
  }
}


export async function loginUser(params: {
  email: string,
  password: string
}) {
  const user = await findUserByEmail(params.email)
  if (!user) {
    throw new AppError("Unauthorized", 401)
  }

  const isValid = await comparePassword(
    params.password,
    user.password_hash
  )

  if (!isValid) {
    throw new AppError("Unauthorized", 401)
  }

  const token = signToken({ userId: user.id })

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  }
}

