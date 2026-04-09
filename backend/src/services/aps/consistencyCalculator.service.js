// // src/services/aps/consistencyCalculator.service.js

// import WorkoutSession from "../../models/WorkoutSession.model.js";

// export const calculateRecentCompletionRate = async (
//   userId,
//   days = 14,
//   excludeDate
// ) => {
//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - days);

//   const query = {
//     userId,
//     date: { $gte: fromDate }
//   };

//   if (excludeDate) {
//     query.date.$ne = new Date(excludeDate);
//   }

//   const sessions = await WorkoutSession.find(query);

//   if (sessions.length === 0) return 0;

//   const completedCount = sessions.filter(
//     (s) => s.completed === true
//   ).length;

//   return Math.round((completedCount / sessions.length) * 100);
// };


import WeeklyPlan from "../../models/WeeklyPlan.model.js";

/**
 * Calculate consistency based on planned workout days
 * NOT based on logged sessions only
 */
export const calculateRecentCompletionRate = async (
  userId,
  days = 14,
  todayDate
) => {
  const plan = await WeeklyPlan.findOne({
    userId,
    status: "active"
  });

  if (!plan) return 0;

  const today = new Date(todayDate);
  today.setUTCHours(0, 0, 0, 0);

  const fromDate = new Date(today);
  fromDate.setUTCDate(today.getUTCDate() - days);

  let plannedCount = 0;
  let completedCount = 0;

  for (let i = 0; i < days; i++) {
    const checkDate = new Date(fromDate);
    checkDate.setUTCDate(fromDate.getUTCDate() + i);

    if (
      checkDate < plan.weekStartDate ||
      checkDate > plan.weekEndDate
    ) continue;

    const diffDays =
      Math.floor((checkDate - plan.weekStartDate) / (1000 * 60 * 60 * 24));

    const structureIndex = diffDays % 7;
    const dayPlan = plan.weeklyStructure[structureIndex];

    if (!dayPlan || dayPlan.isRestDay) continue;

    plannedCount++;

    const dateKey = checkDate.toISOString().slice(0, 10);
    const progressEntry = plan.progress.get(dateKey);

    if (progressEntry && progressEntry.completed === true) {
      completedCount++;
    }
  }

  if (plannedCount === 0) return 100;

  return Math.round((completedCount / plannedCount) * 100);
};
