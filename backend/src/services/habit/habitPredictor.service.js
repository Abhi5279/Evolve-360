// // src/services/habits/habitPredictor.service.js

// import WorkoutSession from "../../models/WorkoutSession.model.js";
// import { HABIT_RISK_LEVELS, HABIT_THRESHOLDS } from "../../constants/habitRules.js";

// /**
//  * Predict habit drop-off risk
//  */
// export const predictHabitRisk = async (userId, days = 7) => {
//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - days);

//   const sessions = await WorkoutSession.find({
//     userId,
//     date: { $gte: fromDate }
//   }).sort({ date: -1 });

//   if (sessions.length === 0) {
//     return {
//       riskLevel: HABIT_RISK_LEVELS.HIGH,
//       reason: "No recent activity"
//     };
//   }

//   // Count consecutive missed workouts
//   let consecutiveMisses = 0;
//   for (const session of sessions) {
//     if (session.completed === false) {
//       consecutiveMisses++;
//     } else {
//       break;
//     }
//   }

//   // Risk evaluation
//   if (consecutiveMisses >= HABIT_THRESHOLDS.consecutiveMissesHigh) {
//     return {
//       riskLevel: HABIT_RISK_LEVELS.HIGH,
//       reason: "Multiple consecutive missed workouts"
//     };
//   }

//   if (consecutiveMisses >= HABIT_THRESHOLDS.consecutiveMissesMedium) {
//     return {
//       riskLevel: HABIT_RISK_LEVELS.MEDIUM,
//       reason: "Early signs of inconsistency"
//     };
//   }

//   return {
//     riskLevel: HABIT_RISK_LEVELS.LOW,
//     reason: "Workout consistency stable"
//   };
// };


import WeeklyPlan from "../../models/WeeklyPlan.model.js";
import { HABIT_RISK_LEVELS } from "../../constants/habitRules.js";

/**
 * Predict habit drop-off risk based on planned workouts
 */
export const predictHabitRisk = async (userId, days = 7) => {
  const plan = await WeeklyPlan.findOne({
    userId,
    status: "active"
  });

  if (!plan) {
    return {
      riskLevel: HABIT_RISK_LEVELS.HIGH,
      reason: "No active plan"
    };
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let consecutiveMisses = 0;

  for (let i = 0; i < days; i++) {
    const checkDate = new Date(today);
    checkDate.setUTCDate(today.getUTCDate() - i);

    if (
      checkDate < plan.weekStartDate ||
      checkDate > plan.weekEndDate
    ) continue;

    const diffDays =
      Math.floor((checkDate - plan.weekStartDate) / (1000 * 60 * 60 * 24));

    const structureIndex = diffDays % 7;
    const dayPlan = plan.weeklyStructure[structureIndex];

    if (!dayPlan || dayPlan.isRestDay) continue;

    const dateKey = checkDate.toISOString().slice(0, 10);
    const progressEntry = plan.progress.get(dateKey);

    if (!progressEntry || progressEntry.completed !== true) {
      consecutiveMisses++;
    } else {
      break;
    }
  }

  if (consecutiveMisses >= 3) {
    return {
      riskLevel: HABIT_RISK_LEVELS.HIGH,
      reason: "Multiple consecutive missed workouts"
    };
  }

  if (consecutiveMisses >= 2) {
    return {
      riskLevel: HABIT_RISK_LEVELS.MEDIUM,
      reason: "Early signs of inconsistency"
    };
  }

  return {
    riskLevel: HABIT_RISK_LEVELS.LOW,
    reason: "Workout consistency stable"
  };
};
