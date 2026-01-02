
import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import {
  addFavoriteHandler,
  removeFavoriteHandler,
  getFavoritesHandler,
} from "./favorites.controller";

const router = Router();

router.post("/:gameId", authMiddleware, addFavoriteHandler);
router.delete("/:gameId", authMiddleware, removeFavoriteHandler);
router.get("/", authMiddleware, getFavoritesHandler);

export default router;
