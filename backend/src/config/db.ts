import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
})

pool.on("connect", () => {
  console.log("Database connected")
})

pool.on("error", (err) => {
  console.error("Unexpected Error from Postgres", err)
  process.exit(1)
})
