import express from "express";
import { generateAIDetailedWeeklyPlanController } from "../controllers/aiSession.controller.js";

const router = express.Router();

/**
 * Generate AI deep workout session for a specific day
 * Body:
 * {
 *   userId,
 *   date
 * }
 */
// router.post("/generate-day", generateAIDaySessionController);

/**
 * Generate AI detailed weekly plan for a specific user
 * Params:
 * {
 *   userId
 * }
 */
router.post("/generate-weekly/:userId", generateAIDetailedWeeklyPlanController);

export default router;
