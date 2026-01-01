import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
  }
}

const seprator = " "

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header mising" })
  }

  const [scheme, token] = authHeader.split(seprator)

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" })
  }

  try {
    const payload = verifyToken(token)

    req.user = {
      id: payload.userId,
    }

    next()

  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" })
  }
}
