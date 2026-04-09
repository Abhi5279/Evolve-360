// // src/routes/profile.routes.js

// import express from "express";
// import {
//   createBaselineProfile,
//   getBaselineProfile
// } from "../controllers/profile.controller.js";

// const router = express.Router();

// // Create or update baseline profile
// router.post("/", createBaselineProfile);

// // Get baseline profile for user
// router.get("/:userId", getBaselineProfile);

// export default router;


import express from "express";
import {
  createBaselineProfile,
  updateBaselineProfile,
  getBaselineProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

/* ============================================================
   CREATE PROFILE
============================================================ */
router.post("/", createBaselineProfile);

/* ============================================================
   UPDATE PROFILE (EDIT)
============================================================ */
router.patch("/:userId", updateBaselineProfile);

/* ============================================================
   GET PROFILE
============================================================ */
router.get("/:userId", getBaselineProfile);

export default router;
