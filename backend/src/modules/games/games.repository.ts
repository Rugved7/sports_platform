import { pool } from "../../config/db";

export interface GameRow {
  id: string;
  sport: string;
  league: string;
  team_a: string;
  team_b: string;
  start_time: Date;
}

export async function getGames(filters: {
  sport?: string;
  league?: string;
}): Promise<GameRow[]> {
  const conditions: string[] = [];
  const values: any[] = [];

  if (filters.sport) {
    values.push(filters.sport);
    conditions.push(`sport = $${values.length}`);
  }

  if (filters.league) {
    values.push(filters.league);
    conditions.push(`league = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query<GameRow>(
    `
    SELECT id, sport, league, team_a, team_b, start_time
    FROM games
    ${whereClause}
    ORDER BY start_time ASC
    `,
    values
  );

  return result.rows;
}
