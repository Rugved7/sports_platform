import { type Response, type Request, type NextFunction, request } from "express";
import { registerUser, loginUser } from "./auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await registerUser({ name, email, password })
    res.status(201).json(result)

  } catch (error) {
    next(error)
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await loginUser({ email, password })
    res.status(200).json(result)

  } catch (error) {
    next(error)
  }
}
