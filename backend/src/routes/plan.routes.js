// // // import express from "express";
// // // import {
// // //   generateWeeklyPlanController,
// // //   regenerateWeeklyPlanController,
// // //   RegenerateEditedPlanController
// // // } from "../controllers/plan.controller.js";

// // // const router = express.Router();

// // // /**
// // //  * Generate weekly plan
// // //  * - RULE engine
// // //  * - AI detailed plan
// // //  * - Stored in DB
// // //  */
// // // router.post("/generate/:userId", generateWeeklyPlanController);

// // // /**
// // //  * Regenerate weekly plan (future use)
// // //  */
// // // router.post("/regenerate/:userId", regenerateWeeklyPlanController);

// // // router.post(
// // //   "/regenerate-ai/:userId",
// // //   RegenerateEditedPlanController
// // // );



// // // export default router;

// // import express from "express";
// // import {
// //   generateWeeklyPlanController,
// //   regenerateWeeklyPlanController
// // } from "../controllers/plan.controller.js";

// // const router = express.Router();

// // /**
// //  * Generate BASE weekly plan (Rule Engine Only)
// //  */
// // router.post("/generate/:userId", generateWeeklyPlanController);

// // /**
// //  * Regenerate BASE weekly plan
// //  */
// // router.post("/regenerate/:userId", regenerateWeeklyPlanController);

// // export default router;

// import express from "express";
// import {
//   generateWeeklyPlanController,
//   regenerateWeeklyPlanController
// } from "../controllers/plan.controller.js";

// import {
//   getActiveWeeklyPlanController,
//   updateWorkoutDayController
// } from "../controllers/workout.controller.js";
// // ⚠ If you later move these to plan.controller,
// // change this import accordingly.

// const router = express.Router();

// /**
//  * Generate BASE weekly plan
//  */
// router.post("/generate/:userId", generateWeeklyPlanController);

// /**
//  * Regenerate BASE weekly plan
//  */
// router.post("/regenerate/:userId", regenerateWeeklyPlanController);

// /**
//  * Get active base plan
//  */
// router.get("/active/:userId", getActiveWeeklyPlanController);

// /**
//  * Update workout structure (edit base plan)
//  */
// router.patch("/structure/:userId", updateWorkoutDayController);

// export default router;

import express from "express";
import {
  generateWeeklyPlanController,
  // regenerateWeeklyPlanController,
  getActiveWeeklyPlanController,
  // updateWorkoutDayController
} from "../controllers/plan.controller.js";

const router = express.Router();

router.post("/generate/:userId", generateWeeklyPlanController);
// router.post("/regenerate/:userId", regenerateWeeklyPlanController);
router.get("/active/:userId", getActiveWeeklyPlanController);
// router.patch("/structure/:userId", updateWorkoutDayController);

export default router;
