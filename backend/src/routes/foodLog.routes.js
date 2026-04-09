import express from "express";
import { logFood } from "../controllers/foodLog.controller.js";

const router = express.Router();

router.post("/log", logFood);

export default router;
