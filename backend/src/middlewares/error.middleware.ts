import type { Request, Response, NextFunction } from "express"

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)

  const status = err.statusCode || 500
  const message = err.message || "Internal Server error"

  res.status(status).json({
    error: message,
  })
}
