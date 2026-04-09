// src/routes/readiness.routes.js

import express from "express";
import {
  submitDailyReadiness,
  getDailyReadiness
} from "../controllers/readiness.controller.js";

const router = express.Router();

// Submit daily readiness (one per day)
router.post("/", submitDailyReadiness);

// Get readiness history for a user
router.get("/:userId", getDailyReadiness);

export default router;
