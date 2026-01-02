
import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db";

async function seedGames() {
  const games = [
    {
      sport: "Cricket",
      league: "IPL",
      team_a: "Mumbai Indians",
      team_b: "Chennai Super Kings",
      start_time: "2026-01-10T14:00:00Z",
    },
    {
      sport: "Cricket",
      league: "IPL",
      team_a: "Royal Challengers Bangalore",
      team_b: "Kolkata Knight Riders",
      start_time: "2026-01-11T14:00:00Z",
    },
    {
      sport: "Football",
      league: "EPL",
      team_a: "Manchester United",
      team_b: "Liverpool",
      start_time: "2026-01-12T18:30:00Z",
    },
    {
      sport: "Football",
      league: "La Liga",
      team_a: "Barcelona",
      team_b: "Real Madrid",
      start_time: "2026-01-13T20:00:00Z",
    },
    {
      sport: "Tennis",
      league: "ATP",
      team_a: "Novak Djokovic",
      team_b: "Carlos Alcaraz",
      start_time: "2026-01-14T10:00:00Z",
    },
  ];

  for (const game of games) {
    await pool.query(
      `
      INSERT INTO games (id, sport, league, team_a, team_b, start_time)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        uuidv4(),
        game.sport,
        game.league,
        game.team_a,
        game.team_b,
        game.start_time,
      ]
    );
  }

  console.log("Games seeded successfully");
  process.exit(0);
}

seedGames().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
