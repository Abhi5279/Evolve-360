// src/routes/aps.routes.js

import express from "express";
import ApsHistory from "../models/ApsHistory.model.js";

const router = express.Router();

/**
 * GET /api/aps/history/:userId
 * Query params:
 *  - days (optional, default = 30)
 */
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const days = Number(req.query.days) || 30;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const history = await ApsHistory.find({
      userId,
      date: { $gte: fromDate }
    })
      .sort({ date: 1 }) // ascending for charts
      .select("date apsScore readinessCategory recoveryType");

    return res.json({
      rangeDays: days,
      points: history
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch APS history",
      error: error.message
    });
  }
});

export default router;
