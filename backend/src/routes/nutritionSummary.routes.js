// import express from "express";
// import {
//   generateDailyNutritionSummary,
//   getDailyNutritionSummary
// } from "../controllers/nutritionSummary.controller.js";

// const router = express.Router();

// router.post("/summary", generateDailyNutritionSummary);

// router.get("/summary", getDailyNutritionSummary);

// export default router;

import express from "express";
import {
  generateDailyNutritionSummary,
  getDailyNutritionSummary
} from "../controllers/nutritionSummary.controller.js";

const router = express.Router();

// Generate / refresh summary
router.post("/summary", generateDailyNutritionSummary);

// Fetch existing summary
router.get("/summary", getDailyNutritionSummary);

export default router;
