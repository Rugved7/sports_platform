import express from "express"
import authRoutes from "../src/modules/auth/auth.routes.ts"
import gamesRoutes from "./modules/games/games.routes.ts"
import favoritesRoutes from "./modules/favorites/favorites.routes";
import { errorMiddleware } from "./middlewares/error.middleware.ts"

export const app = express()

// Global Middlewares

app.use(express.json())


// routes
// Health checks routes
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" })
})

// Auth routes
app.use("/auth", authRoutes)

// games routes
app.use("/games", gamesRoutes)

// favorite routes
app.use("/favorites", favoritesRoutes)

// Error Handler
app.use(errorMiddleware);
