import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.on("connect", () => {
  console.log("Database connected")
})

pool.on("error", (err) => {
  console.error("Unexpected Error from Postgres", err)
  process.exit(1)
})
