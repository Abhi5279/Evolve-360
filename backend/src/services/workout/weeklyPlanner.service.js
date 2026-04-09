
// // // // // import WeeklyPlan from "../../models/WeeklyPlan.model.js";

// // // // // /**
// // // // //  * Generate workout split based on workout days
// // // // //  * RULE-ONLY (no AI)
// // // // //  */
// // // // // const generateWorkoutSplit = (days) => {
// // // // //   if (days <= 3) {
// // // // //     return ["full", "rest", "full", "rest", "rest", "rest", "rest"];
// // // // //   }

// // // // //   if (days === 4) {
// // // // //     return ["upper", "lower", "rest", "upper", "lower", "rest", "rest"];
// // // // //   }

// // // // //   if (days === 5) {
// // // // //     return ["upper", "lower", "rest", "upper", "lower", "rest", "full"];
// // // // //   }

// // // // //   // 6–7 days
// // // // //   return ["push", "pull", "legs", "rest", "upper", "lower", "rest"];
// // // // // };

// // // // // /**
// // // // //  * Decide base intensity & volume (global knobs)
// // // // //  */
// // // // // const decideLoadLevels = (experienceLevel) => {
// // // // //   switch (experienceLevel) {
// // // // //     case "beginner":
// // // // //       return { intensity: "low", volume: "low" };
// // // // //     case "intermediate":
// // // // //       return { intensity: "moderate", volume: "moderate" };
// // // // //     case "advanced":
// // // // //     default:
// // // // //       return { intensity: "high", volume: "moderate" };
// // // // //   }
// // // // // };

// // // // // /**
// // // // //  * Build explicit weekly structure (AI + readiness friendly)
// // // // //  */
// // // // // const buildWeeklyStructure = (split) => {
// // // // //   return split.map((type, index) => ({
// // // // //     day: index + 1,
// // // // //     workoutType: type,
// // // // //     isRestDay: type === "rest"
// // // // //   }));
// // // // // };

// // // // // /**
// // // // //  * Initialize attendance for a multi-week plan (default: 3 weeks)
// // // // //  */
// // // // // const initializeWeeklyAttendance = (weeks = 3) => {
// // // // //   return Array.from({ length: weeks }, (_, w) => ({
// // // // //     week: w + 1,
// // // // //     days: Array.from({ length: 7 }, (_, d) => ({
// // // // //       day: d + 1,
// // // // //       status: "pending",
// // // // //       completedAt: null
// // // // //     }))
// // // // //   }));
// // // // // };

// // // // // /**
// // // // //  * MAIN WEEKLY PLANNER (RULE ENGINE)
// // // // //  * Creates ONE plan spanning multiple weeks
// // // // //  */
// // // // // export const generateWeeklyPlan = async (baselineProfile) => {
// // // // //   const {
// // // // //     userId,
// // // // //     workoutDaysPerWeek,
// // // // //     experienceLevel
// // // // //   } = baselineProfile;

// // // // //   const PLAN_DURATION_WEEKS = 3;

// // // // //   // 1️⃣ Archive existing active plans
// // // // //   await WeeklyPlan.updateMany(
// // // // //     { userId, status: "active" },
// // // // //     { status: "archived" }
// // // // //   );

// // // // //   // 2️⃣ Generate rule-based structure
// // // // //   const rawSplit = generateWorkoutSplit(workoutDaysPerWeek);
// // // // //   const weeklyStructure = buildWeeklyStructure(rawSplit);
// // // // //   const { intensity, volume } = decideLoadLevels(experienceLevel);

// // // // //   // 3️⃣ Calculate plan date range (3 weeks)
// // // // //   const weekStartDate = new Date();
// // // // //   weekStartDate.setHours(0, 0, 0, 0);

// // // // //   const weekEndDate = new Date(weekStartDate);
// // // // //   weekEndDate.setDate(
// // // // //     weekStartDate.getDate() + (PLAN_DURATION_WEEKS * 7) - 1
// // // // //   );

// // // // //   // 4️⃣ Create skeleton multi-week plan
// // // // //   const weeklyPlan = await WeeklyPlan.create({
// // // // //     userId,
// // // // //     weekStartDate,
// // // // //     weekEndDate,

// // // // //     // RULE OUTPUT
// // // // //     weeklyStructure,
// // // // //     plannedWorkoutDays: workoutDaysPerWeek,
// // // // //     baseIntensityLevel: intensity,
// // // // //     baseVolumeLevel: volume,

// // // // //     // MULTI-WEEK CONTROL
// // // // //     planDurationWeeks: PLAN_DURATION_WEEKS,
// // // // //     currentWeek: 1,
// // // // //     weeklyAttendance: initializeWeeklyAttendance(PLAN_DURATION_WEEKS),

// // // // //     // AI hooks
// // // // //     detailedPlan: null,
// // // // //     generatedBy: "rule-engine",

// // // // //     generatedFromBaseline: baselineProfile._id,
// // // // //     status: "active"
// // // // //   });

// // // // //   return weeklyPlan;
// // // // // };


// // // // import WeeklyPlan from "../../models/WeeklyPlan.model.js";

// // // // /* =====================================================
// // // //    Generate workout split based on workout days
// // // //    RULE-ONLY (no AI)
// // // // ===================================================== */
// // // // const generateWorkoutSplit = (days) => {
// // // //   if (days <= 3) {
// // // //     return ["full", "rest", "full", "rest", "rest", "rest", "rest"];
// // // //   }

// // // //   if (days === 4) {
// // // //     return ["upper", "lower", "rest", "upper", "lower", "rest", "rest"];
// // // //   }

// // // //   if (days === 5) {
// // // //     return ["upper", "lower", "rest", "upper", "lower", "rest", "full"];
// // // //   }

// // // //   return ["push", "pull", "legs", "rest", "upper", "lower", "rest"];
// // // // };

// // // // /* =====================================================
// // // //    Decide base intensity & volume
// // // // ===================================================== */
// // // // const decideLoadLevels = (experienceLevel) => {
// // // //   switch (experienceLevel) {
// // // //     case "beginner":
// // // //       return { intensity: "low", volume: "low" };
// // // //     case "intermediate":
// // // //       return { intensity: "moderate", volume: "moderate" };
// // // //     case "advanced":
// // // //     default:
// // // //       return { intensity: "high", volume: "moderate" };
// // // //   }
// // // // };

// // // // /* =====================================================
// // // //    Build weekly structure (1 = Monday ... 7 = Sunday)
// // // // ===================================================== */
// // // // const buildWeeklyStructure = (split) => {
// // // //   return split.map((type, index) => ({
// // // //     day: index + 1,
// // // //     workoutType: type,
// // // //     isRestDay: type === "rest"
// // // //   }));
// // // // };

// // // // /* =====================================================
// // // //    Get Monday of Current Week
// // // // ===================================================== */
// // // // const getMonday = () => {
// // // //   const today = new Date();
// // // //   const day = today.getDay(); // 0 = Sunday

// // // //   const diff = today.getDate() - (day === 0 ? 6 : day - 1);
// // // //   const monday = new Date(today.setDate(diff));

// // // //   monday.setHours(0, 0, 0, 0);
// // // //   return monday;
// // // // };

// // // // /* =====================================================
// // // //    MAIN WEEKLY PLANNER (RULE ENGINE)
// // // //    Single 7-day aligned week
// // // // ===================================================== */
// // // // export const generateWeeklyPlan = async (baselineProfile) => {
// // // //   const {
// // // //     userId,
// // // //     workoutDaysPerWeek,
// // // //     experienceLevel
// // // //   } = baselineProfile;

// // // //   // 1️⃣ Archive existing active plans
// // // //   await WeeklyPlan.updateMany(
// // // //     { userId, status: "active" },
// // // //     { status: "archived" }
// // // //   );

// // // //   // 2️⃣ Generate rule-based split
// // // //   const rawSplit = generateWorkoutSplit(workoutDaysPerWeek);
// // // //   const weeklyStructure = buildWeeklyStructure(rawSplit);
// // // //   const { intensity, volume } = decideLoadLevels(experienceLevel);

// // // //   // 3️⃣ Anchor plan to Monday → Sunday
// // // //   const weekStartDate = getMonday();

// // // //   const weekEndDate = new Date(weekStartDate);
// // // //   weekEndDate.setDate(weekStartDate.getDate() + 6);

// // // //   // 4️⃣ Count workout days
// // // //   const plannedWorkoutDays = weeklyStructure.filter(
// // // //     d => !d.isRestDay
// // // //   ).length;

// // // //   // 5️⃣ Create clean weekly plan
// // // //   const weeklyPlan = await WeeklyPlan.create({
// // // //     userId,
// // // //     generatedFromBaseline: baselineProfile._id,

// // // //     weekStartDate,
// // // //     weekEndDate,

// // // //     weeklyStructure,
// // // //     plannedWorkoutDays,

// // // //     baseIntensityLevel: intensity,
// // // //     baseVolumeLevel: volume,

// // // //     planVersion: 1,
// // // //     status: "active"
// // // //   });

// // // //   return weeklyPlan;
// // // // };

// // // import WeeklyPlan from "../../models/WeeklyPlan.model.js";

// // // /* =====================================================
// // //    Generate workout split based on workout days
// // // ===================================================== */
// // // const generateWorkoutSplit = (days) => {
// // //   if (days <= 3) {
// // //     return ["full", "rest", "full", "rest", "rest", "rest", "rest"];
// // //   }

// // //   if (days === 4) {
// // //     return ["upper", "lower", "rest", "upper", "lower", "rest", "rest"];
// // //   }

// // //   if (days === 5) {
// // //     return ["upper", "lower", "rest", "upper", "lower", "rest", "full"];
// // //   }

// // //   return ["push", "pull", "legs", "rest", "upper", "lower", "rest"];
// // // };

// // // /* =====================================================
// // //    Decide base intensity & volume
// // // ===================================================== */
// // // const decideLoadLevels = (experienceLevel) => {
// // //   switch (experienceLevel) {
// // //     case "beginner":
// // //       return { intensity: "low", volume: "low" };
// // //     case "intermediate":
// // //       return { intensity: "moderate", volume: "moderate" };
// // //     case "advanced":
// // //     default:
// // //       return { intensity: "high", volume: "moderate" };
// // //   }
// // // };

// // // /* =====================================================
// // //    Build weekly structure (1 = Monday ... 7 = Sunday)
// // // ===================================================== */
// // // const buildWeeklyStructure = (split) => {
// // //   return split.map((type, index) => ({
// // //     day: index + 1,
// // //     workoutType: type,
// // //     isRestDay: type === "rest"
// // //   }));
// // // };

// // // /* =====================================================
// // //    Get Monday of Current Week (UTC SAFE)
// // // ===================================================== */
// // // const getMondayUTC = () => {
// // //   const now = new Date();

// // //   const day = now.getUTCDay(); // 👈 UTC
// // //   const diff = now.getUTCDate() - (day === 0 ? 6 : day - 1);

// // //   const monday = new Date(Date.UTC(
// // //     now.getUTCFullYear(),
// // //     now.getUTCMonth(),
// // //     diff
// // //   ));

// // //   return monday;
// // // };

// // // /* =====================================================
// // //    MAIN WEEKLY PLANNER
// // // ===================================================== */
// // // export const generateWeeklyPlan = async (baselineProfile) => {
// // //   const {
// // //     userId,
// // //     workoutDaysPerWeek,
// // //     experienceLevel
// // //   } = baselineProfile;

// // //   // Archive old active plans
// // //   await WeeklyPlan.updateMany(
// // //     { userId, status: "active" },
// // //     { status: "archived" }
// // //   );

// // //   const rawSplit = generateWorkoutSplit(workoutDaysPerWeek);
// // //   const weeklyStructure = buildWeeklyStructure(rawSplit);
// // //   const { intensity, volume } = decideLoadLevels(experienceLevel);

// // //   // UTC aligned week
// // //   const weekStartDate = getMondayUTC();

// // //   const weekEndDate = new Date(weekStartDate);
// // //   weekEndDate.setUTCDate(weekStartDate.getUTCDate() + 6);

// // //   const plannedWorkoutDays = weeklyStructure.filter(
// // //     d => !d.isRestDay
// // //   ).length;

// // //   const weeklyPlan = await WeeklyPlan.create({
// // //     userId,
// // //     generatedFromBaseline: baselineProfile._id,
// // //     weekStartDate,
// // //     weekEndDate,
// // //     weeklyStructure,
// // //     plannedWorkoutDays,
// // //     baseIntensityLevel: intensity,
// // //     baseVolumeLevel: volume,
// // //     planVersion: 1,
// // //     status: "active"
// // //   });

// // //   return weeklyPlan;
// // // };

// // import WeeklyPlan from "../../models/WeeklyPlan.model.js";

// // /* =====================================================
// //    Generate workout split based on workout days
// // ===================================================== */
// // const generateWorkoutSplit = (days) => {
// //   if (days <= 3) {
// //     return ["full", "rest", "full", "rest", "rest", "rest", "rest"];
// //   }

// //   if (days === 4) {
// //     return ["upper", "lower", "rest", "upper", "lower", "rest", "rest"];
// //   }

// //   if (days === 5) {
// //     return ["upper", "lower", "rest", "upper", "lower", "rest", "full"];
// //   }

// //   return ["push", "pull", "legs", "rest", "upper", "lower", "rest"];
// // };

// // /* =====================================================
// //    Decide base intensity & volume
// // ===================================================== */
// // const decideLoadLevels = (experienceLevel) => {
// //   switch (experienceLevel) {
// //     case "beginner":
// //       return { intensity: "low", volume: "low" };
// //     case "intermediate":
// //       return { intensity: "moderate", volume: "moderate" };
// //     case "advanced":
// //     default:
// //       return { intensity: "high", volume: "moderate" };
// //   }
// // };

// // /* =====================================================
// //    Build weekly structure (1 = Monday ... 7 = Sunday)
// // ===================================================== */
// // const buildWeeklyStructure = (split) => {
// //   return split.map((type, index) => ({
// //     day: index + 1,
// //     workoutType: type,
// //     isRestDay: type === "rest"
// //   }));
// // };

// // /* =====================================================
// //    Get Monday of Current Week (UTC SAFE)
// // ===================================================== */
// // const getMondayUTC = () => {
// //   const now = new Date();
// //   const day = now.getUTCDay();
// //   const diff = now.getUTCDate() - (day === 0 ? 6 : day - 1);

// //   return new Date(Date.UTC(
// //     now.getUTCFullYear(),
// //     now.getUTCMonth(),
// //     diff
// //   ));
// // };

// // /* =====================================================
// //    Initialize weekly progress blocks
// // ===================================================== */
// // const initializeWeeklyProgress = (weeks) => {
// //   return Array.from({ length: weeks }, (_, i) => ({
// //     weekNumber: i + 1,
// //     progress: {},
// //     overallCompletionRate: 0
// //   }));
// // };

// // /* =====================================================
// //    MAIN WEEKLY PLANNER (3-WEEK SYSTEM)
// // ===================================================== */
// // export const generateWeeklyPlan = async (baselineProfile) => {
// //   const {
// //     userId,
// //     workoutDaysPerWeek,
// //     experienceLevel
// //   } = baselineProfile;

// //   const PLAN_DURATION_WEEKS = 3;

// //   // Archive old active plans
// //   await WeeklyPlan.updateMany(
// //     { userId, status: "active" },
// //     { status: "archived" }
// //   );

// //   const rawSplit = generateWorkoutSplit(workoutDaysPerWeek);
// //   const weeklyStructure = buildWeeklyStructure(rawSplit);
// //   const { intensity, volume } = decideLoadLevels(experienceLevel);

// //   const weekStartDate = getMondayUTC();

// //   const plannedWorkoutDays = weeklyStructure.filter(
// //     d => !d.isRestDay
// //   ).length;

// //   const weeklyPlan = await WeeklyPlan.create({
// //     userId,
// //     generatedFromBaseline: baselineProfile._id,

// //     weekStartDate,

// //     planDurationWeeks: PLAN_DURATION_WEEKS,
// //     currentWeek: 1,

// //     weeklyStructure,
// //     plannedWorkoutDays,

// //     baseIntensityLevel: intensity,
// //     baseVolumeLevel: volume,

// //     weeklyProgress: initializeWeeklyProgress(PLAN_DURATION_WEEKS),

// //     planVersion: 1,
// //     status: "active"
// //   });

// //   return weeklyPlan;
// // };


// import WeeklyPlan from "../../models/WeeklyPlan.model.js";

// /* =====================================================
//    Generate workout split based on workout days
// ===================================================== */
// const generateWorkoutSplit = (days) => {
//   if (days <= 3) {
//     return ["full", "rest", "full", "rest", "rest", "rest", "rest"];
//   }

//   if (days === 4) {
//     return ["upper", "lower", "rest", "upper", "lower", "rest", "rest"];
//   }

//   if (days === 5) {
//     return ["upper", "lower", "rest", "upper", "lower", "rest", "full"];
//   }

//   return ["push", "pull", "legs", "rest", "upper", "lower", "rest"];
// };

// /* =====================================================
//    Decide base intensity & volume
// ===================================================== */
// const decideLoadLevels = (experienceLevel) => {
//   switch (experienceLevel) {
//     case "beginner":
//       return { intensity: "low", volume: "low" };
//     case "intermediate":
//       return { intensity: "moderate", volume: "moderate" };
//     case "advanced":
//     default:
//       return { intensity: "high", volume: "moderate" };
//   }
// };

// /* =====================================================
//    Build weekly structure (1–7 only)
// ===================================================== */
// const buildWeeklyStructure = (split) => {
//   return split.map((type, index) => ({
//     day: index + 1,
//     workoutType: type,
//     isRestDay: type === "rest"
//   }));
// };

// /* =====================================================
//    Initialize Attendance for Multi-Week Plan
// ===================================================== */
// const initializeAttendance = (weeks = 3) => {
//   return Array.from({ length: weeks }, (_, w) => ({
//     week: w + 1,
//     days: Array.from({ length: 7 }, (_, d) => ({
//       day: d + 1,
//       status: "pending",
//       completedAt: null
//     }))
//   }));
// };

// /* =====================================================
//    MAIN PLAN GENERATOR (STRUCTURE ONLY)
// ===================================================== */
// export const generateWeeklyPlan = async (baselineProfile) => {
//   const {
//     userId,
//     workoutDaysPerWeek,
//     experienceLevel
//   } = baselineProfile;

//   const PLAN_DURATION_WEEKS = 3;

//   const rawSplit = generateWorkoutSplit(workoutDaysPerWeek);
//   const weeklyStructure = buildWeeklyStructure(rawSplit);
//   const { intensity, volume } = decideLoadLevels(experienceLevel);

//   const plannedWorkoutDays = weeklyStructure.filter(
//     (d) => !d.isRestDay
//   ).length;

//   const newPlan = await WeeklyPlan.create({
//     userId,
//     generatedFromBaseline: baselineProfile._id,

//     weeklyStructure,
//     plannedWorkoutDays,

//     baseIntensityLevel: intensity,
//     baseVolumeLevel: volume,

//     planDurationWeeks: PLAN_DURATION_WEEKS,
//     currentWeek: 1,

//     weeklyAttendance: initializeAttendance(PLAN_DURATION_WEEKS),

//     generatedBy: "rule",
//     status: "active"
//   });

//   return newPlan;
// };

import WeeklyPlan from "../../models/WeeklyPlan.model.js";

/* =====================================================
   Generate workout split based on workout days
===================================================== */
const generateWorkoutSplit = (days) => {
  if (days <= 3) {
    return ["full", "rest", "full", "rest", "rest", "rest", "rest"];
  }

  if (days === 4) {
    return ["upper", "lower", "rest", "upper", "lower", "rest", "rest"];
  }

  if (days === 5) {
    return ["upper", "lower", "rest", "upper", "lower", "rest", "full"];
  }

  return ["push", "pull", "legs", "rest", "upper", "lower", "rest"];
};

/* =====================================================
   Decide base intensity & volume
===================================================== */
const decideLoadLevels = (experienceLevel) => {
  switch (experienceLevel) {
    case "beginner":
      return { intensity: "low", volume: "low" };
    case "intermediate":
      return { intensity: "moderate", volume: "moderate" };
    case "advanced":
    default:
      return { intensity: "high", volume: "moderate" };
  }
};

/* =====================================================
   Build weekly structure (1–7)
===================================================== */
const buildWeeklyStructure = (split) => {
  return split.map((type, index) => ({
    day: index + 1,
    workoutType: type,
    isRestDay: type === "rest"
  }));
};

/* =====================================================
   Initialize Weekly Attendance
===================================================== */
const initializeAttendance = (weeks) => {
  return Array.from({ length: weeks }, (_, weekIndex) => ({
    week: weekIndex + 1,
    days: Array.from({ length: 7 }, (_, dayIndex) => ({
      day: dayIndex + 1,
      status: "pending",
      completedAt: null
    }))
  }));
};

/* =====================================================
   MAIN BASE PLAN GENERATOR
===================================================== */
export const generateWeeklyPlan = async (baselineProfile) => {
  const {
    userId,
    workoutDaysPerWeek,
    experienceLevel
  } = baselineProfile;

  const PLAN_DURATION_WEEKS = 3;

  // 1️⃣ Archive existing active plans
  await WeeklyPlan.updateMany(
    { userId, status: "active" },
    { status: "archived" }
  );

  // 2️⃣ Generate structure
  const rawSplit = generateWorkoutSplit(workoutDaysPerWeek);
  const weeklyStructure = buildWeeklyStructure(rawSplit);
  const { intensity, volume } = decideLoadLevels(experienceLevel);

  const plannedWorkoutDays = weeklyStructure.filter(
    d => !d.isRestDay
  ).length;

  // 3️⃣ Create plan (NO DATES)
  const weeklyPlan = await WeeklyPlan.create({
    userId,
    generatedFromBaseline: baselineProfile._id,

    weeklyStructure,
    plannedWorkoutDays,

    baseIntensityLevel: intensity,
    baseVolumeLevel: volume,

    planDurationWeeks: PLAN_DURATION_WEEKS,
    currentWeek: 1,
    weeklyAttendance: initializeAttendance(PLAN_DURATION_WEEKS),

    generatedBy: "rule",
    planVersion: 1,
    status: "active"
  });

  return weeklyPlan;
};
