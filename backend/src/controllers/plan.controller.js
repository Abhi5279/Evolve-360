

// // import WeeklyPlan from "../models/WeeklyPlan.model.js";
// // import { regenerateWeeklyPlan } from "../services/plan/planRegenerator.service.js";
// // import BaselineProfile from "../models/BaselineProfile.model.js";
// // import { generateWeeklyPlan } from "../services/workout/weeklyPlanner.service.js";
// // import { generateDetailedPlanWithAI } from "../services/ai/ai.services/weeklyPlanAI.service.js";

// // /**
// //  * Generate weekly plan (RULE + AI)
// //  * - RULE engine creates skeleton & DB entry
// //  * - AI fills detailed plan
// //  * - Controller merges and saves AI output
// //  */
// // export const generateWeeklyPlanController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     // 1️⃣ Fetch baseline profile
// //     const baseline = await BaselineProfile.findOne({ userId });

// //     if (!baseline) {
// //       return res.status(404).json({ message: "Baseline not found" });
// //     }

// //     // 2️⃣ Generate RULE-based weekly skeleton (DB entry created here)
// //     const weeklyPlan = await generateWeeklyPlan(baseline);

// //     // 3️⃣ Generate AI detailed plan (NO DB writes inside service)
// //     const aiDetailedPlan = await generateDetailedPlanWithAI({
// //       athleteProfile: baseline,
// //       weeklySkeleton: weeklyPlan.weeklyStructure,
// //       currentPhase: "General Physical Preparation" // default for now
// //     });

// //     // 4️⃣ Merge AI result into the SAME weekly plan
// //     weeklyPlan.detailedPlan = aiDetailedPlan;
// //     weeklyPlan.generatedBy = "rule+ai";

// //     await weeklyPlan.save();

// //     // 5️⃣ Respond with combined plan
// //     return res.status(201).json({
// //       message: "Weekly plan generated successfully",
// //       plan: weeklyPlan
// //     });

// //   } catch (error) {
// //     console.error("Weekly plan generation failed:", error);
// //     return res.status(500).json({
// //       message: "Failed to generate weekly plan",
// //       error: error.message
// //     });
// //   }
// // };


// // export const regenerateWeeklyPlanController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     // 1️⃣ Run regeneration logic
// //     const regen = await regenerateWeeklyPlan(userId);

// //     // 2️⃣ Fetch previous plan
// //     const previousPlan = await WeeklyPlan.findById(regen.previousPlanId);
// //     if (!previousPlan) {
// //       throw new Error("Previous weekly plan not found");
// //     }

// //     // 3️⃣ Archive old plan
// //     await WeeklyPlan.updateOne(
// //       { _id: previousPlan._id },
// //       { status: "archived" }
// //     );

// //     // 4️⃣ Calculate NEW BI-WEEKLY DATES (14 DAYS)
// //     const newWeekStartDate = new Date(previousPlan.weekEndDate);
// //     newWeekStartDate.setDate(newWeekStartDate.getDate() + 1);

// //     const newWeekEndDate = new Date(newWeekStartDate);
// //     newWeekEndDate.setDate(newWeekEndDate.getDate() + 13); // 🔥 14 days total

// //     // 5️⃣ Calculate workout days (exclude rest)
// //     const plannedWorkoutDays = regen.workoutSplit.filter(
// //       (d) => d !== "rest"
// //     ).length;

// //     // 6️⃣ Create new bi-weekly plan
// //     const newWeeklyPlan = await WeeklyPlan.create({
// //       userId,
// //       generatedFromBaseline: previousPlan.generatedFromBaseline,

// //       workoutSplit: regen.workoutSplit,
// //       plannedWorkoutDays,

// //       baseVolumeLevel: regen.baseVolumeLevel,
// //       baseIntensityLevel: regen.baseIntensityLevel,

// //       weekStartDate: newWeekStartDate,
// //       weekEndDate: newWeekEndDate,

// //       planVersion: previousPlan.planVersion + 1,
// //       status: "active"
// //     });

// //     return res.status(200).json({
// //       message: "Bi-weekly plan regenerated successfully",
// //       newWeeklyPlan
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to regenerate bi-weekly plan",
// //       error: error.message
// //     });
// //   }
// // };


// // export const RegenerateEditedPlanController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     // 1️⃣ Get active plan (UPDATED skeleton)
// //     const plan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!plan) {
// //       return res.status(404).json({ message: "Active plan not found" });
// //     }

// //     if (!plan.needsRegeneration) {
// //       return res.status(400).json({
// //         message: "Plan does not require regeneration"
// //       });
// //     }

// //     // 2️⃣ Get baseline profile
// //     const baseline = await BaselineProfile.findById(
// //       plan.generatedFromBaseline
// //     );

// //     if (!baseline) {
// //       return res.status(404).json({
// //         message: "Baseline profile not found"
// //       });
// //     }

// //     // 3️⃣ Generate AI plan USING CURRENT skeleton
// //     const newDetailedPlan = await generateDetailedPlanWithAI({
// //       athleteProfile: baseline,
// //       weeklySkeleton: plan.weeklyStructure
// //     });

// //     // 4️⃣ Save new AI plan
// //     plan.detailedPlan = newDetailedPlan;
// //     plan.needsRegeneration = false;
// //     plan.generatedBy = "rule+ai";
// //     plan.planVersion += 1;

// //     await plan.save();

// //     return res.json({
// //       message: "Detailed plan regenerated using updated skeleton",
// //       plan
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to regenerate detailed plan",
// //       error: error.message
// //     });
// //   }
// // };



// import WeeklyPlan from "../models/WeeklyPlan.model.js";
// import BaselineProfile from "../models/BaselineProfile.model.js";
// import { generateWeeklyPlan } from "../services/workout/weeklyPlanner.service.js";
// import { regenerateWeeklyPlan } from "../services/plan/planRegenerator.service.js";

// /* =====================================================
//    GENERATE BASE WEEKLY PLAN (RULE ENGINE ONLY)
// ===================================================== */

// export const generateWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // 1️⃣ Fetch baseline profile
//     const baseline = await BaselineProfile.findOne({ userId });

//     if (!baseline) {
//       return res.status(404).json({ message: "Baseline not found" });
//     }

//     // 2️⃣ Generate RULE-based weekly plan
//     const weeklyPlan = await generateWeeklyPlan(baseline);

//     return res.status(201).json({
//       message: "Base weekly plan generated successfully",
//       plan: weeklyPlan
//     });

//   } catch (error) {
//     console.error("Weekly plan generation failed:", error);
//     return res.status(500).json({
//       message: "Failed to generate weekly plan",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    REGENERATE BASE PLAN (NEW VERSION)
// ===================================================== */

// export const regenerateWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // 1️⃣ Run regeneration logic
//     const regen = await regenerateWeeklyPlan(userId);

//     // 2️⃣ Fetch previous active plan
//     const previousPlan = await WeeklyPlan.findOne({
//       userId,
//       status: "active"
//     });

//     if (!previousPlan) {
//       return res.status(404).json({
//         message: "No active plan found to regenerate"
//       });
//     }

//     // 3️⃣ Archive old plan
//     previousPlan.status = "archived";
//     await previousPlan.save();

//     // 4️⃣ Calculate new week dates
//     const newWeekStartDate = new Date(previousPlan.weekEndDate);
//     newWeekStartDate.setDate(newWeekStartDate.getDate() + 1);

//     const newWeekEndDate = new Date(newWeekStartDate);
//     newWeekEndDate.setDate(newWeekEndDate.getDate() + 6);

//     // 5️⃣ Count workout days
//     const plannedWorkoutDays = regen.weeklyStructure.filter(
//       (d) => !d.isRestDay
//     ).length;

//     // 6️⃣ Create new base plan
//     const newWeeklyPlan = await WeeklyPlan.create({
//       userId,
//       generatedFromBaseline: previousPlan.generatedFromBaseline,

//       weekStartDate: newWeekStartDate,
//       weekEndDate: newWeekEndDate,

//       weeklyStructure: regen.weeklyStructure,
//       plannedWorkoutDays,

//       baseVolumeLevel: regen.baseVolumeLevel,
//       baseIntensityLevel: regen.baseIntensityLevel,

//       planVersion: previousPlan.planVersion + 1,
//       status: "active"
//     });

//     return res.status(200).json({
//       message: "Base weekly plan regenerated successfully",
//       newWeeklyPlan
//     });

//   } catch (error) {
//     console.error("Plan regeneration failed:", error);
//     return res.status(500).json({
//       message: "Failed to regenerate weekly plan",
//       error: error.message
//     });
//   }
// };

import WeeklyPlan from "../models/WeeklyPlan.model.js";
import BaselineProfile from "../models/BaselineProfile.model.js";
import { generateWeeklyPlan } from "../services/workout/weeklyPlanner.service.js";
import { regenerateWeeklyPlan } from "../services/plan/planRegenerator.service.js";

/* =====================================================
   GENERATE BASE WEEKLY PLAN (RULE ENGINE ONLY)
===================================================== */

// export const generateWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const baseline = await BaselineProfile.findOne({ userId });
//     if (!baseline) {
//       return res.status(404).json({ message: "Baseline not found" });
//     }

//     const weeklyPlan = await generateWeeklyPlan(baseline);

//     // 🔥 Enrich weekly structure with day names & actual dates
//     const dayNames = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday"
//     ];

//     const enrichedStructure = weeklyPlan.weeklyStructure.map((dayObj) => {
//       const actualDate = new Date(weeklyPlan.weekStartDate);
//       actualDate.setDate(
//         weeklyPlan.weekStartDate.getDate() + (dayObj.day - 1)
//       );

//       return {
//         ...dayObj.toObject(),
//         dayName: dayNames[dayObj.day - 1],
//         calendarDate: actualDate.toISOString().split("T")[0]
//       };
//     });

//     return res.status(201).json({
//       message: "Base weekly plan generated successfully",
//       plan: {
//         ...weeklyPlan.toObject(),
//         weeklyStructure: enrichedStructure
//       }
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to generate weekly plan",
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    GET ACTIVE WEEKLY PLAN
// // ===================================================== */
// export const getActiveWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const plan = await WeeklyPlan.findOne({
//       userId,
//       status: "active"
//     });

//     if (!plan) {
//       return res.status(404).json({
//         message: "No active workout plan found"
//       });
//     }

//     const dayNames = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday"
//     ];

//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);

//     const enrichedStructure = plan.weeklyStructure.map((dayObj) => {
//       const actualDate = new Date(plan.weekStartDate);
//       actualDate.setUTCDate(
//         plan.weekStartDate.getUTCDate() + (dayObj.day - 1)
//       );

//       const dateKey = actualDate.toISOString().slice(0, 10);
//       const todayKey = today.toISOString().slice(0, 10);

//       return {
//         ...dayObj.toObject(),

//         // 🔥 Human readable info
//         dayName: dayNames[dayObj.day - 1],
//         calendarDate: dateKey,

//         // 🔥 Status helpers
//         isToday: dateKey === todayKey,
//         isPast: dateKey < todayKey,
//         isFuture: dateKey > todayKey,

//         // 🔥 Completion status
//         completionData: plan.progress.get(dateKey) || null
//       };
//     });

//     return res.status(200).json({
//       message: "Active workout plan fetched successfully",
//       plan: {
//         ...plan.toObject(),
//         weeklyStructure: enrichedStructure
//       }
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch workout plan",
//       error: error.message
//     });
//   }
// };



/* =====================================================
   GENERATE 3-WEEK BASE PLAN
===================================================== */

// =================================================== */

export const generateWeeklyPlanController = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Get baseline profile
    const baseline = await BaselineProfile.findOne({ userId });

    if (!baseline) {
      return res.status(404).json({
        message: "Baseline profile not found"
      });
    }

    // 2️⃣ Archive existing active plan (if any)
    await WeeklyPlan.updateMany(
      { userId, status: "active" },
      { status: "archived" }
    );

    // 3️⃣ Generate new base plan
    const newPlan = await generateWeeklyPlan(baseline);

    return res.status(201).json({
      message: "Base plan generated successfully",
      plan: newPlan
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate base plan",
      error: error.message
    });
  }
};

// export const generateWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const baseline = await BaselineProfile.findOne({ userId });
//     if (!baseline) {
//       return res.status(404).json({ message: "Baseline not found" });
//     }

//     const weeklyPlan = await generateWeeklyPlan(baseline);

//     return res.status(201).json({
//       message: "3-week base plan generated successfully",
//       plan: weeklyPlan
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to generate weekly plan",
//       error: error.message
//     });
//   }
// };


/* =====================================================
   GET ACTIVE PLAN (WEEK-AWARE)
===================================================== */

// export const getActiveWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const plan = await WeeklyPlan.findOne({
//       userId,
//       status: "active"
//     });

//     if (!plan) {
//       return res.status(404).json({
//         message: "No active workout plan found"
//       });
//     }

//     const currentWeekIndex = plan.currentWeek - 1;
//     const currentWeekProgress = plan.weeklyProgress[currentWeekIndex];

//     const dayNames = [
//       "Monday", "Tuesday", "Wednesday",
//       "Thursday", "Friday", "Saturday", "Sunday"
//     ];

//     // Calculate actual start date of current week
//     const baseStart = new Date(plan.weekStartDate);
//     baseStart.setUTCDate(
//       baseStart.getUTCDate() + (currentWeekIndex * 7)
//     );

//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);
//     const todayKey = today.toISOString().slice(0, 10);

//     const enrichedStructure = plan.weeklyStructure.map((dayObj) => {
//       const actualDate = new Date(baseStart);
//       actualDate.setUTCDate(baseStart.getUTCDate() + (dayObj.day - 1));

//       const dateKey = actualDate.toISOString().slice(0, 10);

//       return {
//         ...dayObj.toObject(),

//         dayName: dayNames[dayObj.day - 1],
//         calendarDate: dateKey,

//         isToday: dateKey === todayKey,
//         isPast: dateKey < todayKey,
//         isFuture: dateKey > todayKey,

//         completionData:
//           currentWeekProgress?.progress?.[dateKey] || null
//       };
//     });

//     return res.status(200).json({
//       message: "Active workout plan fetched successfully",
//       currentWeek: plan.currentWeek,
//       totalWeeks: plan.planDurationWeeks,
//       plan: {
//         ...plan.toObject(),
//         weeklyStructure: enrichedStructure
//       }
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch workout plan",
//       error: error.message
//     });
//   }
// };


// export const getActiveWeeklyPlanController = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const plan = await WeeklyPlan.findOne({
//       userId,
//       status: "active"
//     });

//     if (!plan) {
//       return res.status(404).json({
//         message: "No active workout plan found"
//       });
//     }

//     /* ===============================
//        1️⃣ Determine Current Week
//     ================================ */

//     const currentWeekIndex = plan.currentWeek - 1;
//     const currentWeekData =
//       plan.weeklyAttendance?.[currentWeekIndex] || null;

//     /* ===============================
//        2️⃣ Dynamically Calculate Week Start
//        (Based on Plan Creation Date)
//     ================================ */

//     const planStart = new Date(plan.createdAt);
//     planStart.setUTCHours(0, 0, 0, 0);

//     planStart.setUTCDate(
//       planStart.getUTCDate() + currentWeekIndex * 7
//     );

//     /* ===============================
//        3️⃣ Prepare Helpers
//     ================================ */

//     const dayNames = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday"
//     ];

//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);
//     const todayKey = today.toISOString().slice(0, 10);

//     /* ===============================
//        4️⃣ Build Weekly View
//     ================================ */

//     const enrichedStructure = plan.weeklyStructure.map((dayObj) => {
//       const actualDate = new Date(planStart);
//       actualDate.setUTCDate(
//         planStart.getUTCDate() + (dayObj.day - 1)
//       );

//       const dateKey = actualDate.toISOString().slice(0, 10);

//       const attendance =
//         currentWeekData?.days?.find(
//           (d) => d.day === dayObj.day
//         ) || null;

//       return {
//         ...dayObj.toObject(),
//         dayName: dayNames[dayObj.day - 1],
//         calendarDate: dateKey,
//         isToday: dateKey === todayKey,
//         isPast: dateKey < todayKey,
//         isFuture: dateKey > todayKey,
//         attendance
//       };
//     });

//     return res.status(200).json({
//       message: "Active workout plan fetched successfully",
//       currentWeek: plan.currentWeek,
//       totalWeeks: plan.planDurationWeeks,
//       plan: {
//         ...plan.toObject(),
//         weeklyStructure: enrichedStructure
//       }
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch workout plan",
//       error: error.message
//     });
//   }
// };


export const getActiveWeeklyPlanController = async (req, res) => {
  try {
    const { userId } = req.params;

    const plan = await WeeklyPlan.findOne({
      userId,
      status: "active"
    });

    if (!plan) {
      return res.status(404).json({
        message: "No active workout plan found"
      });
    }

    /* ===============================
       1️⃣ Determine Current Week
    ================================ */

    const currentWeekIndex = (plan.currentWeek || 1) - 1;
    const currentWeekData =
      plan.weeklyAttendance?.[currentWeekIndex] || null;

    /* ===============================
       2️⃣ Safe Plan Start Date
       (Using createdAt safely)
    ================================ */

    if (!plan.createdAt) {
      return res.status(400).json({
        message: "Plan missing creation date"
      });
    }

    const planStart = new Date(plan.createdAt);

    if (isNaN(planStart.getTime())) {
      return res.status(400).json({
        message: "Invalid plan creation date"
      });
    }

    planStart.setUTCHours(0, 0, 0, 0);
    planStart.setUTCDate(
      planStart.getUTCDate() + currentWeekIndex * 7
    );

    /* ===============================
       3️⃣ Helpers
    ================================ */

    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayKey = today.toISOString().slice(0, 10);

    /* ===============================
       4️⃣ Build Weekly View
    ================================ */

    const enrichedStructure = plan.weeklyStructure.map((dayObj) => {
      const actualDate = new Date(planStart);
      actualDate.setUTCDate(
        planStart.getUTCDate() + (dayObj.day - 1)
      );

      const dateKey = actualDate.toISOString().slice(0, 10);

      const attendance =
        currentWeekData?.days?.find(
          (d) => d.day === dayObj.day
        ) || null;

      return {
        ...dayObj.toObject(),
        dayName: dayNames[dayObj.day - 1],
        calendarDate: dateKey,
        isToday: dateKey === todayKey,
        isPast: dateKey < todayKey,
        isFuture: dateKey > todayKey,
        attendance
      };
    });

    return res.status(200).json({
      message: "Active workout plan fetched successfully",
      currentWeek: plan.currentWeek,
      totalWeeks: plan.planDurationWeeks,
      plan: {
        ...plan.toObject(),
        weeklyStructure: enrichedStructure
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch workout plan",
      error: error.message
    });
  }
};


/* =====================================================
   MANUAL MOVE TO NEXT WEEK (Optional Utility)
===================================================== */

export const moveToNextWeekController = async (req, res) => {
  try {
    const { userId } = req.params;

    const plan = await WeeklyPlan.findOne({
      userId,
      status: "active"
    });

    if (!plan) {
      return res.status(404).json({
        message: "No active plan found"
      });
    }

    if (plan.currentWeek >= plan.planDurationWeeks) {
      return res.status(400).json({
        message: "Plan already completed"
      });
    }

    plan.currentWeek += 1;
    await plan.save();

    return res.status(200).json({
      message: "Moved to next week successfully",
      currentWeek: plan.currentWeek
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to move week",
      error: error.message
    });
  }
};


/* =====================================================
   UPDATE WORKOUT DAY STRUCTURE
===================================================== */
export const updateWorkoutDayController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { day, newWorkoutType } = req.body;

    if (!day || day < 1 || day > 7) {
      return res.status(400).json({ message: "Day must be between 1 and 7" });
    }

    const plan = await WeeklyPlan.findOne({
      userId,
      status: "active"
    });

    if (!plan) {
      return res.status(404).json({ message: "Active plan not found" });
    }

    const dayStructure = plan.weeklyStructure.find(d => d.day === day);

    if (!dayStructure) {
      return res.status(400).json({ message: "Day not found in structure" });
    }

    dayStructure.workoutType = newWorkoutType;
    dayStructure.isRestDay = newWorkoutType === "rest";

    plan.needsRegeneration = true;

    await plan.save();

    return res.status(200).json({
      message: "Workout day updated successfully",
      plan
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to update workout day",
      error: error.message
    });
  }
};

/* =====================================================
   REGENERATE BASE PLAN (NEW VERSION)
// ===================================================== */

export const regenerateWeeklyPlanController = async (req, res) => {
  try {
    const { userId } = req.params;

    /* ===========================
       1️⃣ Run regeneration logic
    ============================ */

    const regen = await regenerateWeeklyPlan(userId);

    const previousPlan = regen.previousPlan;

    /* ===========================
       2️⃣ Archive old plan
    ============================ */

    previousPlan.status = "archived";
    await previousPlan.save();

    /* ===========================
       3️⃣ Create NEW week dates
    ============================ */

    const newStartDate = new Date(previousPlan.weekEndDate);
    newStartDate.setUTCDate(newStartDate.getUTCDate() + 1);

    const newEndDate = new Date(newStartDate);
    newEndDate.setUTCDate(newStartDate.getUTCDate() + 6);

    /* ===========================
       4️⃣ Count workout days
    ============================ */

    const plannedWorkoutDays =
      regen.newStructure.filter(d => !d.isRestDay).length;

    /* ===========================
       5️⃣ Create NEW plan
    ============================ */

    const newPlan = await WeeklyPlan.create({
      userId,
      generatedFromBaseline: previousPlan.generatedFromBaseline,

      weekStartDate: newStartDate,
      weekEndDate: newEndDate,

      weeklyStructure: regen.newStructure,
      plannedWorkoutDays,

      baseVolumeLevel: regen.baseVolumeLevel,
      baseIntensityLevel: regen.baseIntensityLevel,

      progress: {},
      overallCompletionRate: 0,

      planVersion: previousPlan.planVersion + 1,
      status: "active"
    });

    return res.status(200).json({
      message: "New weekly plan generated successfully",
      reason: regen.reason,
      newPlan
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to regenerate weekly plan",
      error: error.message
    });
  }
};
