// // // src/routes/workout.routes.js

// // import express from "express";
// // import {
// //   startWorkoutSession,
// //   completeWorkoutSession,
// //     getActiveWeeklyPlanController,
// //     updateWorkoutDayController
// // } from "../controllers/workout.controller.js";

// // const router = express.Router();

// // // Decide & start today's workout
// // router.post("/start", startWorkoutSession);

// // // Complete & log today's workout
// // router.post("/complete", completeWorkoutSession);

// // // router.post("/attendance/:userId", markAttendanceController);

// // router.get("/active/:userId", getActiveWeeklyPlanController);

// // router.patch("/structure/:userId", updateWorkoutDayController);




// // export default router;


// // src/routes/workout.routes.js

// import express from "express";
// import {
//   // startWorkoutSession,
//   completeWorkoutSession
// } from "../controllers/workout.controller.js";

// const router = express.Router();

// /**
//  * Submit readiness & unlock today's workout
//  */
// // router.post("/start", startWorkoutSession);

// /**
//  * Complete workout & mark attendance
//  */
// router.post("/complete", completeWorkoutSession);

// export default router;



import express from "express";
import {
  completeWorkoutSession,
  getWorkoutByDate,
  getWorkoutHistory
} from "../controllers/workout.controller.js";

const router = express.Router();

// POST — Complete workout
router.post("/complete", completeWorkoutSession);

// GET — Get workout by specific date
router.get("/:userId", getWorkoutByDate);

// GET — Get workout history
router.get("/history/:userId", getWorkoutHistory);

export default router;