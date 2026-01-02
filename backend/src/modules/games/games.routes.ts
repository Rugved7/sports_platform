
import { Router } from "express";
import { getGamesHandler } from "./games.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getGamesHandler);

export default router;
