import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware";
import {
  favoriteGame,
  unfavoriteGame,
  listFavorites,
} from "./favorites.service";

export async function addFavoriteHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { gameId } = req.params;

    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!gameId) {
      return res.status(400).json({ error: "Game ID is required" });
    }

    await favoriteGame({
      userId: req.user.id,
      gameId,
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function removeFavoriteHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { gameId } = req.params;

    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!gameId) {
      return res.status(400).json({ error: "Game ID is required" });
    }

    await unfavoriteGame({
      userId: req.user.id,
      gameId,
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getFavoritesHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const favorites = await listFavorites(req.user.id);
    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
}
