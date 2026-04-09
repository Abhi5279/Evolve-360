// // import WeeklyPlan from "../models/WeeklyPlan.model.js";
// // import BaselineProfile from "../models/BaselineProfile.model.js";
// // import AIDetailedSession from "../models/AIDetailedSession.model.js";
// // import { generateDetailedPlanWithAI } from "../services/ai/ai.services/weeklyPlanAI.service.js";

// // /* =====================================================
// //    GENERATE AI SESSION FOR A SPECIFIC DAY
// // ===================================================== */

// // export const generateAIDaySessionController = async (req, res) => {
// //   try {
// //     const { userId, date } = req.body;

// //     if (!userId || !date) {
// //       return res.status(400).json({
// //         message: "userId and date are required"
// //       });
// //     }

// //     const normalizedDate = new Date(date);
// //     normalizedDate.setHours(0, 0, 0, 0);

// //     // 1️⃣ Get active base plan
// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({
// //         message: "No active base plan found"
// //       });
// //     }

// //     // 2️⃣ Find correct day structure
// //     const jsDay = normalizedDate.getDay();
// //     const dayOfWeek = jsDay === 0 ? 7 : jsDay;

// //     const dayStructure = weeklyPlan.weeklyStructure.find(
// //       (d) => d.day === dayOfWeek
// //     );

// //     if (!dayStructure) {
// //       return res.status(400).json({
// //         message: "Workout not found for this day"
// //       });
// //     }

// //     if (dayStructure.isRestDay) {
// //       return res.status(400).json({
// //         message: "Cannot generate AI session for rest day"
// //       });
// //     }

// //     // 3️⃣ Check existing AI session
// //     const existingSession = await AIDetailedSession.findOne({
// //       userId,
// //       weeklyPlanId: weeklyPlan._id,
// //       date: normalizedDate,
// //       planVersionSnapshot: weeklyPlan.planVersion
// //     });

// //     if (existingSession) {
// //       return res.status(200).json({
// //         message: "AI session already exists",
// //         session: existingSession
// //       });
// //     }

// //     // 4️⃣ Fetch baseline profile
// //     const baseline = await BaselineProfile.findOne({ userId });

// //     if (!baseline) {
// //       return res.status(404).json({
// //         message: "Baseline profile not found"
// //       });
// //     }

// //     // 5️⃣ Generate AI deep workout
// //     const aiPlan = await generateDetailedPlanWithAI({
// //       athleteProfile: baseline,
// //       daySkeleton: dayStructure
// //     });

// //     // 6️⃣ Save AI session
// //     const newSession = await AIDetailedSession.create({
// //       userId,
// //       weeklyPlanId: weeklyPlan._id,
// //       date: normalizedDate,
// //       workoutTypeSnapshot: dayStructure.workoutType,
// //       planVersionSnapshot: weeklyPlan.planVersion,
// //       aiPlanData: aiPlan
// //     });

// //     return res.status(201).json({
// //       message: "AI workout session generated successfully",
// //       session: newSession
// //     });

// //   } catch (error) {
// //     console.error("AI session generation failed:", error);
// //     return res.status(500).json({
// //       message: "Failed to generate AI workout session",
// //       error: error.message
// //     });
// //   }
// // };


// import WeeklyPlan from "../models/WeeklyPlan.model.js";
// import BaselineProfile from "../models/BaselineProfile.model.js";
// import AIDetailedSession from "../models/AIDetailedSession.model.js";
// import { generateDetailedPlanWithAI } from "../services/ai/ai.services/weeklyPlanAI.service.js";

// /* =====================================================
//    GENERATE AI SESSION (WEEK + DAY BASED)
// ===================================================== */

// export const generateAIDaySessionController = async (req, res) => {
//   try {
//     const { userId, weeklyPlanId, day } = req.body;

//     if (!userId || !weeklyPlanId || !day) {
//       return res.status(400).json({
//         message: "userId, weeklyPlanId and day are required"
//       });
//     }

//     /* =========================================
//        1️⃣ Get Active Plan
//     ========================================= */
//     const weeklyPlan = await WeeklyPlan.findOne({
//       _id: weeklyPlanId,
//       userId,
//       status: "active"
//     });

//     if (!weeklyPlan) {
//       return res.status(404).json({
//         message: "Active base plan not found"
//       });
//     }

//     const currentWeek = weeklyPlan.currentWeek;

//     /* =========================================
//        2️⃣ Get Day Structure
//     ========================================= */
//     const dayStructure = weeklyPlan.weeklyStructure.find(
//       d => d.day === day
//     );

//     if (!dayStructure) {
//       return res.status(400).json({
//         message: "Workout not found for this day"
//       });
//     }

//     if (dayStructure.isRestDay) {
//       return res.status(400).json({
//         message: "Cannot generate AI session for rest day"
//       });
//     }

//     /* =========================================
//        3️⃣ Check Existing AI Session
//     ========================================= */
//     const existingSession = await AIDetailedSession.findOne({
//       userId,
//       weeklyPlanId: weeklyPlan._id,
//       weekNumber: currentWeek,
//       day,
//       planVersionSnapshot: weeklyPlan.planVersion
//     });

//     if (existingSession) {
//       return res.status(200).json({
//         message: "AI session already exists",
//         session: existingSession
//       });
//     }

//     /* =========================================
//        4️⃣ Fetch Baseline Profile
//     ========================================= */
//     const baseline = await BaselineProfile.findOne({ userId });

//     if (!baseline) {
//       return res.status(404).json({
//         message: "Baseline profile not found"
//       });
//     }

//     /* =========================================
//        5️⃣ Generate AI Plan
//     ========================================= */
//     const aiPlan = await generateDetailedPlanWithAI({
//       athleteProfile: baseline,
//       daySkeleton: dayStructure
//     });

//     /* =========================================
//        6️⃣ Save AI Session
//     ========================================= */
//     const newSession = await AIDetailedSession.create({
//       userId,
//       weeklyPlanId: weeklyPlan._id,
//       weekNumber: currentWeek,
//       day,
//       workoutTypeSnapshot: dayStructure.workoutType,
//       planVersionSnapshot: weeklyPlan.planVersion,
//       aiPlanData: aiPlan
//     });

//     return res.status(201).json({
//       message: "AI workout session generated successfully",
//       session: newSession
//     });

//   } catch (error) {
//     console.error("AI session generation failed:", error);
//     return res.status(500).json({
//       message: "Failed to generate AI workout session",
//       error: error.message
//     });
//   }
// };


import WeeklyPlan from "../models/WeeklyPlan.model.js";
import BaselineProfile from "../models/BaselineProfile.model.js";
import { generateDetailedPlanWithAI } from "../services/ai/ai.services/weeklyPlanAI.service.js";

/* =====================================================
   GENERATE AI DETAILED PLAN (FULL WEEK)
===================================================== */

export const generateAIDetailedWeeklyPlanController = async (req, res) => {
  try {
    const { userId } = req.params;

    /* ===============================
       1️⃣ Get Active Base Plan
    ================================ */
    const weeklyPlan = await WeeklyPlan.findOne({
      userId,
      status: "active"
    });

    if (!weeklyPlan) {
      return res.status(404).json({
        message: "No active base plan found"
      });
    }

    /* ===============================
       2️⃣ Prevent Duplicate AI Generation
    ================================ */
    if (weeklyPlan.detailedPlan) {
      return res.status(200).json({
        message: "AI detailed plan already exists",
        plan: weeklyPlan
      });
    }

    /* ===============================
       3️⃣ Get Baseline Profile
    ================================ */
    const baseline = await BaselineProfile.findOne({ userId });

    if (!baseline) {
      return res.status(404).json({
        message: "Baseline profile not found"
      });
    }

    /* ===============================
       4️⃣ Generate AI Weekly Plan
    ================================ */
    const aiPlan = await generateDetailedPlanWithAI({
      athleteProfile: baseline,
      weeklySkeleton: weeklyPlan.weeklyStructure
    });

    /* ===============================
       5️⃣ Save Inside WeeklyPlan
    ================================ */
    weeklyPlan.detailedPlan = aiPlan;
    weeklyPlan.generatedBy = "rule+ai";

    await weeklyPlan.save();

    return res.status(201).json({
      message: "AI weekly detailed plan generated successfully",
      plan: weeklyPlan
    });

  } catch (error) {
    console.error("AI weekly generation failed:", error);
    return res.status(500).json({
      message: "Failed to generate AI weekly plan",
      error: error.message
    });
  }
};
