// import express from "express";
// import { generateDailyNutritionTarget } from "../controllers/nutrition.controller.js";

// const router = express.Router();

// router.post("/target", generateDailyNutritionTarget);
// router.get("/today", getDailyNutritionTarget);

// export default router;


import express from "express";
import {
  generateDailyNutritionTarget,
  getDailyNutritionTarget
} from "../controllers/nutrition.controller.js";

const router = express.Router();

router.post("/target", generateDailyNutritionTarget);
router.get("/today", getDailyNutritionTarget);

export default router;
