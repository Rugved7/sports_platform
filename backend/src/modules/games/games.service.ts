
import { getGames } from "./games.repository";

export async function listGames(filters: {
  sport?: string;
  league?: string;
}) {
  const games = await getGames(filters);

  return games.map((game) => ({
    id: game.id,
    sport: game.sport,
    league: game.league,
    teamA: game.team_a,
    teamB: game.team_b,
    startTime: game.start_time,
  }));
}
