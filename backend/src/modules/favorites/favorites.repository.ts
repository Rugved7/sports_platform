
import { pool } from "../../config/db";

export interface FavoriteRow {
  id: string;
  user_id: string;
  game_id: string;
}

export async function addFavorite(params: {
  id: string;
  userId: string;
  gameId: string;
}) {
  await pool.query(
    `
    INSERT INTO favorites (id, user_id, game_id)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, game_id) DO NOTHING
    `,
    [params.id, params.userId, params.gameId]
  );
}

export async function removeFavorite(params: {
  userId: string;
  gameId: string;
}) {
  await pool.query(
    `
    DELETE FROM favorites
    WHERE user_id = $1 AND game_id = $2
    `,
    [params.userId, params.gameId]
  );
}

export async function getFavoritesByUser(userId: string) {
  const result = await pool.query(
    `
    SELECT 
      g.id,
      g.sport,
      g.league,
      g.team_a,
      g.team_b,
      g.start_time
    FROM favorites f
    JOIN games g ON g.id = f.game_id
    WHERE f.user_id = $1
    ORDER BY g.start_time ASC
    `,
    [userId]
  );

  return result.rows;
}
