
import type { Request, Response, NextFunction } from "express";
import { listGames } from "./games.service";

export async function getGamesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { sport, league } = req.query;

    const games = await listGames({
      sport: sport as string | undefined,
      league: league as string | undefined,
    });

    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
}
