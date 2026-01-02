
import { v4 as uuidv4 } from "uuid";
import {
  addFavorite,
  removeFavorite,
  getFavoritesByUser,
} from "./favorites.repository";

export async function favoriteGame(params: {
  userId: string;
  gameId: string;
}) {
  await addFavorite({
    id: uuidv4(),
    userId: params.userId,
    gameId: params.gameId,
  });
}

export async function unfavoriteGame(params: {
  userId: string;
  gameId: string;
}) {
  await removeFavorite(params);
}

export async function listFavorites(userId: string) {
  const games = await getFavoritesByUser(userId);

  return games.map((game: any) => ({
    id: game.id,
    sport: game.sport,
    league: game.league,
    teamA: game.team_a,
    teamB: game.team_b,
    startTime: game.start_time,
  }));
}
