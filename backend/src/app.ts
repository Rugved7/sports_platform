import express from "express"


export const app = express()

// Global Middlewares

app.use(express.json())


// Health checks 
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" })
})

// Error Handler

