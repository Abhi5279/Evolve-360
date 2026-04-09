// // // src/controllers/workout.controller.js

// // import WorkoutSession from "../models/WorkoutSession.model.js";
// // import WeeklyPlan from "../models/WeeklyPlan.model.js";
// // import DailyReadiness from "../models/DailyReadiness.model.js";
// // import ApsHistory from "../models/ApsHistory.model.js";
// // import DailyNutritionSummary from "../models/DailyNutritionSummary.model.js";
// // import { calculateReadiness } from "../services/readiness/readinessCalculator.service.js";


// // import { adjustWorkoutForReadiness } from "../services/workout/workoutAdjuster.service.js";
// // import { calculateRecovery } from "../services/recovery/recoveryCalculator.service.js";
// // import { calculateAPS } from "../services/aps/apsCalculator.service.js";
// // import { calculateRecentCompletionRate } from "../services/aps/consistencyCalculator.service.js";
// // import { predictHabitRisk } from "../services/habit/habitPredictor.service.js";
// // import { analyzeNutritionImpact } from "../services/nutrition/nutritionImpact.service.js";
// // import { adjustNextDayReadiness } from "../services/readiness/readinessAdjuster.service.js";

// // // export const startWorkoutSession = async (req, res) => {
// // //   try {
// // //     const { userId, date } = req.body;

// // //     if (!userId || !date) {
// // //       return res.status(400).json({
// // //         message: "userId and date are required"
// // //       });
// // //     }

// // //     const weeklyPlan = await WeeklyPlan.findOne({
// // //       userId,
// // //       status: "active"
// // //     });

// // //     if (!weeklyPlan) {
// // //       return res.status(404).json({
// // //         message: "No active plan found"
// // //       });
// // //     }

// // //     const readiness = await DailyReadiness.findOne({ userId, date });

// // //     if (!readiness) {
// // //       return res.status(400).json({
// // //         message: "Daily readiness not submitted"
// // //       });
// // //     }

// // //     // ✅ Correct day calculation (1–7, Monday–Sunday safe)
// // //     const jsDay = new Date(date).getDay(); // 0–6
// // //     const dayOfWeek = jsDay === 0 ? 7 : jsDay;

// // //     // ✅ Use weeklyStructure (NOT workoutSplit)
// // //     const dayPlan = weeklyPlan.weeklyStructure.find(
// // //       (d) => d.day === dayOfWeek
// // //     );

// // //     if (!dayPlan) {
// // //       return res.status(400).json({
// // //         message: "Workout not found for today"
// // //       });
// // //     }

// // //     const adjustmentDecision = adjustWorkoutForReadiness({
// // //       readinessCategory: readiness.readinessCategory,
// // //       painReported: readiness.sorenessAreas
// // //     });

// // //     return res.json({
// // //       // currentWeek: weeklyPlan.currentWeek,
// // //       // day: dayOfWeek,
// // //       // plannedWorkoutType: dayPlan.workoutType,
// // //       // isRestDay: dayPlan.isRestDay,
// // //       // adjustment: adjustmentDecision
// // //       weeklyPlanId: weeklyPlan._id,   // 🔥 ADD THIS
// // //       currentWeek: weeklyPlan.currentWeek,
// // //       day: dayOfWeek,
// // //       plannedWorkoutType: dayPlan.workoutType,
// // //       isRestDay: dayPlan.isRestDay,
// // //       adjustment: adjustmentDecision
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to start workout session",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // export const startWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       date,
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent,
// //       sorenessAreas
// //     } = req.body;

// //     /* ================= VALIDATION ================= */

// //     if (
// //       !userId ||
// //       !date ||
// //       sleepHours == null ||
// //       !stressLevel ||
// //       !subjectiveFeeling
// //     ) {
// //       return res.status(400).json({
// //         message: "Missing required readiness inputs"
// //       });
// //     }

// //     /* ================= NORMALIZE DATE ================= */

// //     const workoutDate = new Date(date);
// //     workoutDate.setHours(0, 0, 0, 0);

// //     /* ================= CALCULATE READINESS ================= */

// //     const { readinessScore, readinessCategory } =
// //       calculateReadiness({
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent
// //       });

// //     /* ================= UPSERT READINESS ================= */

// //     const readiness = await DailyReadiness.findOneAndUpdate(
// //       { userId, date: workoutDate },
// //       {
// //         userId,
// //         date: workoutDate,
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent,
// //         sorenessAreas,
// //         readinessScore,
// //         readinessCategory,
// //         autoGenerated: false
// //       },
// //       { upsert: true, new: true }
// //     );

// //     /* ================= GET ACTIVE PLAN ================= */

// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({
// //         message: "No active plan found"
// //       });
// //     }

// //     /* ================= DETERMINE DAY ================= */

// //     const jsDay = workoutDate.getDay(); // 0–6
// //     const dayOfWeek = jsDay === 0 ? 7 : jsDay;

// //     const dayPlan = weeklyPlan.weeklyStructure.find(
// //       (d) => d.day === dayOfWeek
// //     );

// //     if (!dayPlan) {
// //       return res.status(400).json({
// //         message: "Workout not found for today"
// //       });
// //     }

// //     /* ================= REST DAY BLOCK ================= */

// //     if (dayPlan.isRestDay) {
// //       return res.status(400).json({
// //         message: "Today is a rest day"
// //       });
// //     }

// //     /* ================= READINESS ADJUSTMENT ================= */

// //     const adjustmentDecision =
// //       adjustWorkoutForReadiness({
// //         readinessCategory,
// //         painReported: sorenessAreas || []
// //       });

// //     /* ================= SUCCESS RESPONSE ================= */

// //     return res.status(200).json({
// //       message: "Workout session started",

// //       weeklyPlanId: weeklyPlan._id,
// //       currentWeek: weeklyPlan.currentWeek,
// //       day: dayOfWeek,

// //       plannedWorkoutType: dayPlan.workoutType,
// //       isRestDay: false,

// //       readiness: {
// //         readinessScore,
// //         readinessCategory
// //       },

// //       adjustment: adjustmentDecision
// //     });

// //   } catch (error) {
// //     console.error("Start workout failed:", error);
// //     return res.status(500).json({
// //       message: "Failed to start workout session",
// //       error: error.message
// //     });
// //   }
// // };


// // // export const completeWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       weeklyPlanId,
// // //       date,
// // //       plannedWorkoutType,
// // //       actualWorkoutType,
// // //       intensityLevelUsed,
// // //       volumeLevelUsed,
// // //       completed,
// // //       completionPercentage,
// // //       durationMinutes,
// // //       painReported = [],
// // //       perceivedExertion,
// // //       readinessCategory,
// // //       hydrationLevelPercent,
// // //       injuryRiskFlag = false
// // //     } = req.body;

// // //     if (!userId || !weeklyPlanId || !date) {
// // //       return res.status(400).json({
// // //         message: "userId, weeklyPlanId and date are required"
// // //       });
// // //     }

// // //     // 1️⃣ Save workout session
// // //     const session = await WorkoutSession.findOneAndUpdate(
// // //       { userId, date },
// // //       {
// // //         userId,
// // //         weeklyPlanId,
// // //         date,
// // //         plannedWorkoutType,
// // //         actualWorkoutType,
// // //         intensityLevelUsed,
// // //         volumeLevelUsed,
// // //         completed,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         painReported,
// // //         perceivedExertion,
// // //         injuryRiskFlag
// // //       },
// // //       { upsert: true, new: true }
// // //     );

// // //     // 2️⃣ Get nutrition summary
// // //     const nutritionSummary = await DailyNutritionSummary.findOne({
// // //       userId,
// // //       date
// // //     });

// // //     // 3️⃣ Analyze nutrition impact
// // //     const nutritionImpact = nutritionSummary
// // //       ? analyzeNutritionImpact({
// // //         calorieDifference: nutritionSummary.calorieDifference,
// // //         proteinDifference: nutritionSummary.proteinDifference
// // //       })
// // //       : null;

// // //     // 4️⃣ Calculate recovery (NOW nutrition-aware ✅)
// // //     const recoveryDecision = calculateRecovery({
// // //       readinessCategory,
// // //       perceivedExertion,
// // //       painReported,
// // //       injuryRiskFlag,
// // //       hydrationLevelPercent,
// // //       nutritionImpact
// // //     });

// // //     // 8️⃣ Auto-adjust next day readiness
// // //     const nextDate = new Date(date);
// // //     nextDate.setDate(nextDate.getDate() + 1);

// // //     const todayReadiness = await DailyReadiness.findOne({
// // //       userId,
// // //       date
// // //     });

// // //     if (todayReadiness) {
// // //       const readinessAdjustment = adjustNextDayReadiness({
// // //         currentReadinessScore: todayReadiness.readinessScore,
// // //         recoveryType: recoveryDecision.recoveryType
// // //       });

// // //       await DailyReadiness.findOneAndUpdate(
// // //         { userId, date: nextDate },
// // //         {
// // //           userId,
// // //           date: nextDate,
// // //           readinessScore: readinessAdjustment.adjustedScore,
// // //           readinessCategory:
// // //             readinessAdjustment.adjustedScore >= 75
// // //               ? "high"
// // //               : readinessAdjustment.adjustedScore >= 50
// // //                 ? "moderate"
// // //                 : "low",
// // //           autoGenerated: true
// // //         },
// // //         { upsert: true }
// // //       );
// // //     }


// // //     // 5️⃣ Consistency
// // //     const recentCompletionRate =
// // //       await calculateRecentCompletionRate(userId, 14, date);

// // //     // 6️⃣ APS
// // //     const apsScore = calculateAPS({
// // //       completionPercentage,
// // //       perceivedExertion,
// // //       readinessCategory,
// // //       recoveryType: recoveryDecision.recoveryType,
// // //       recentCompletionRate
// // //     });

// // //     await ApsHistory.findOneAndUpdate(
// // //       { userId, date },
// // //       {
// // //         userId,
// // //         date,
// // //         apsScore,
// // //         readinessCategory,
// // //         recoveryType: recoveryDecision.recoveryType
// // //       },
// // //       { upsert: true }
// // //     );

// // //     // 7️⃣ Habit risk
// // //     const habitRisk = await predictHabitRisk(userId);

// // //     return res.status(200).json({
// // //       message: "Workout session logged successfully",
// // //       session,
// // //       recovery: recoveryDecision,
// // //       aps: apsScore,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to log workout session",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // import {
// //   analyzeNutritionImpact,
// //   calculateRecovery,
// //   adjustNextDayReadiness,
// //   calculateAPS,
// //   calculateRecentCompletionRate,
// //   predictHabitRisk
// // } from "../services/yourServices.js";

// // export const completeWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       weeklyPlanId,
// //       date,
// //       plannedWorkoutType,
// //       actualWorkoutType,
// //       intensityLevelUsed,
// //       volumeLevelUsed,
// //       completed,
// //       completionPercentage,
// //       durationMinutes,
// //       painReported = [],
// //       perceivedExertion,
// //       readinessCategory,
// //       hydrationLevelPercent,
// //       injuryRiskFlag = false
// //     } = req.body;

// //     if (!userId || !weeklyPlanId || !date) {
// //       return res.status(400).json({
// //         message: "userId, weeklyPlanId and date are required"
// //       });
// //     }

// //     const normalizedDate = new Date(date);
// //     const dateKey = normalizedDate.toISOString().split("T")[0];

// //     // 1️⃣ Save Workout Session
// //     const session = await WorkoutSession.findOneAndUpdate(
// //       { userId, date: normalizedDate },
// //       {
// //         userId,
// //         weeklyPlanId,
// //         date: normalizedDate,
// //         plannedWorkoutType,
// //         actualWorkoutType,
// //         intensityLevelUsed,
// //         volumeLevelUsed,
// //         completed,
// //         completionPercentage,
// //         durationMinutes,
// //         painReported,
// //         perceivedExertion,
// //         injuryRiskFlag
// //       },
// //       { upsert: true, new: true }
// //     );

// //     // 2️⃣ 🔥 Update WeeklyPlan progress
// //     if (completed) {
// //       const plan = await WeeklyPlan.findById(weeklyPlanId);

// //       if (plan) {
// //         plan.progress.set(dateKey, {
// //           completed: true,
// //           completionPercentage,
// //           durationMinutes,
// //           perceivedExertion,
// //           completedAt: new Date()
// //         });

// //         // Calculate overall completion
// //         const totalPlanned = plan.plannedWorkoutDays || 1;

// //         const completedDays = Array.from(plan.progress.values())
// //           .filter(d => d.completed).length;

// //         plan.overallCompletionRate =
// //           (completedDays / totalPlanned) * 100;

// //         await plan.save();
// //       }
// //     }

// //     // 3️⃣ Nutrition
// //     const nutritionSummary = await DailyNutritionSummary.findOne({
// //       userId,
// //       date: normalizedDate
// //     });

// //     const nutritionImpact = nutritionSummary
// //       ? analyzeNutritionImpact({
// //         calorieDifference: nutritionSummary.calorieDifference,
// //         proteinDifference: nutritionSummary.proteinDifference
// //       })
// //       : null;

// //     // 4️⃣ Recovery
// //     const recoveryDecision = calculateRecovery({
// //       readinessCategory,
// //       perceivedExertion,
// //       painReported,
// //       injuryRiskFlag,
// //       hydrationLevelPercent,
// //       nutritionImpact
// //     });

// //     // 5️⃣ Adjust next day readiness
// //     const nextDate = new Date(normalizedDate);
// //     nextDate.setDate(nextDate.getDate() + 1);

// //     const todayReadiness = await DailyReadiness.findOne({
// //       userId,
// //       date: normalizedDate
// //     });

// //     if (todayReadiness) {
// //       const readinessAdjustment = adjustNextDayReadiness({
// //         currentReadinessScore: todayReadiness.readinessScore,
// //         recoveryType: recoveryDecision.recoveryType
// //       });

// //       await DailyReadiness.findOneAndUpdate(
// //         { userId, date: nextDate },
// //         {
// //           userId,
// //           date: nextDate,
// //           readinessScore: readinessAdjustment.adjustedScore,
// //           readinessCategory:
// //             readinessAdjustment.adjustedScore >= 75
// //               ? "high"
// //               : readinessAdjustment.adjustedScore >= 50
// //                 ? "moderate"
// //                 : "low",
// //           autoGenerated: true
// //         },
// //         { upsert: true }
// //       );
// //     }

// //     // 6️⃣ APS
// //     const recentCompletionRate =
// //       await calculateRecentCompletionRate(userId, 14, normalizedDate);

// //     const apsScore = calculateAPS({
// //       completionPercentage,
// //       perceivedExertion,
// //       readinessCategory,
// //       recoveryType: recoveryDecision.recoveryType,
// //       recentCompletionRate
// //     });

// //     await ApsHistory.findOneAndUpdate(
// //       { userId, date: normalizedDate },
// //       {
// //         userId,
// //         date: normalizedDate,
// //         apsScore,
// //         readinessCategory,
// //         recoveryType: recoveryDecision.recoveryType
// //       },
// //       { upsert: true }
// //     );

// //     // 7️⃣ Habit Risk
// //     const habitRisk = await predictHabitRisk(userId);

// //     return res.status(200).json({
// //       message: "Workout session logged successfully",
// //       session,
// //       recovery: recoveryDecision,
// //       aps: apsScore,
// //       habitRisk
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to log workout session",
// //       error: error.message
// //     });
// //   }
// // };


// // /**
// //  * Mark attendance for a specific day of the current week
// //  */
// // export const markAttendanceController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { day, status } = req.body;

// //     // Basic validation
// //     if (!day || day < 1 || day > 7) {
// //       return res.status(400).json({ message: "Day must be between 1 and 7" });
// //     }

// //     if (!["completed", "missed"].includes(status)) {
// //       return res.status(400).json({ message: "Invalid attendance status" });
// //     }

// //     // 1️⃣ Get active plan
// //     const plan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!plan) {
// //       return res.status(404).json({ message: "Active plan not found" });
// //     }

// //     const currentWeek = plan.currentWeek;

// //     // 2️⃣ Find current week attendance
// //     const weekAttendance = plan.weeklyAttendance.find(
// //       (w) => w.week === currentWeek
// //     );

// //     if (!weekAttendance) {
// //       return res.status(400).json({ message: "Week attendance not found" });
// //     }

// //     // 3️⃣ Find day entry
// //     const dayEntry = weekAttendance.days.find((d) => d.day === day);

// //     if (!dayEntry) {
// //       return res.status(400).json({ message: "Day entry not found" });
// //     }

// //     // 4️⃣ Update attendance
// //     dayEntry.status = status;
// //     dayEntry.completedAt = status === "completed" ? new Date() : null;

// //     await plan.save();

// //     return res.json({
// //       message: "Attendance updated",
// //       currentWeek,
// //       day,
// //       status
// //     });

// //   } catch (error) {
// //     console.error("Attendance update failed:", error);
// //     return res.status(500).json({
// //       message: "Failed to update attendance",
// //       error: error.message
// //     });
// //   }
// // };


// // /**
// //  * Get active workout plan details for a user
// // //  */
// // // export const getActiveWeeklyPlanController = async (req, res) => {
// // //   try {
// // //     const { userId } = req.params;

// // //     const plan = await WeeklyPlan.findOne({
// // //       userId,
// // //       status: "active"
// // //     });

// // //     if (!plan) {
// // //       return res.status(404).json({
// // //         message: "No active workout plan found"
// // //       });
// // //     }

// // //     return res.status(200).json({
// // //       message: "Active workout plan fetched successfully",
// // //       plan
// // //     });

// // //   } catch (error) {
// // //     console.error("Failed to fetch workout plan:", error);
// // //     return res.status(500).json({
// // //       message: "Failed to fetch workout plan",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // export const getActiveWeeklyPlanController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const plan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     })
// //       .sort({ planVersion: -1 })   // 🔥 VERY IMPORTANT
// //       .lean();

// //     if (!plan) {
// //       return res.status(404).json({
// //         message: "No active workout plan found"
// //       });
// //     }

// //     return res.status(200).json({
// //       message: "Active workout plan fetched successfully",
// //       plan
// //     });

// //   } catch (error) {
// //     console.error("Failed to fetch workout plan:", error);
// //     return res.status(500).json({
// //       message: "Failed to fetch workout plan",
// //       error: error.message
// //     });
// //   }
// // };



// // /**
// //  * Update workout type for a specific day in weekly structure
// //  * Example: upper → lower
// //  */
// // export const updateWorkoutDayController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { day, newWorkoutType } = req.body;

// //     if (!day || day < 1 || day > 7) {
// //       return res.status(400).json({ message: "Day must be between 1 and 7" });
// //     }

// //     if (!newWorkoutType) {
// //       return res.status(400).json({ message: "newWorkoutType is required" });
// //     }

// //     const plan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!plan) {
// //       return res.status(404).json({ message: "Active plan not found" });
// //     }

// //     // 🔒 Do not allow editing past weeks
// //     if (plan.currentWeek > 1) {
// //       return res.status(400).json({
// //         message: "Cannot modify structure after week 1 has started"
// //       });
// //     }

// //     // 1️⃣ Find day structure
// //     const dayStructure = plan.weeklyStructure.find(
// //       (d) => d.day === day
// //     );

// //     if (!dayStructure) {
// //       return res.status(400).json({ message: "Day not found in structure" });
// //     }

// //     const oldWorkoutType = dayStructure.workoutType;

// //     // 2️⃣ Update workout type
// //     dayStructure.workoutType = newWorkoutType;
// //     dayStructure.isRestDay = newWorkoutType === "rest";

// //     // 3️⃣ Reset attendance for this day in ALL weeks
// //     plan.weeklyAttendance.forEach((week) => {
// //       const dayEntry = week.days.find((d) => d.day === day);
// //       if (dayEntry) {
// //         dayEntry.status = "pending";
// //         dayEntry.completedAt = null;
// //       }
// //     });

// //     // 4️⃣ Mark AI plan as outdated
// //     plan.needsRegeneration = true;

// //     await plan.save();

// //     return res.json({
// //       message: "Workout day updated successfully",
// //       day,
// //       from: oldWorkoutType,
// //       to: newWorkoutType,
// //       needsRegeneration: true
// //     });

// //   } catch (error) {
// //     console.error("Failed to update workout day:", error);
// //     return res.status(500).json({
// //       message: "Failed to update workout day",
// //       error: error.message
// //     });
// //   }
// // };

// // import WorkoutSession from "../models/WorkoutSession.model.js";
// // import WeeklyPlan from "../models/WeeklyPlan.model.js";
// // import DailyReadiness from "../models/DailyReadiness.model.js";
// // import ApsHistory from "../models/ApsHistory.model.js";
// // import DailyNutritionSummary from "../models/DailyNutritionSummary.model.js";

// // import { calculateReadiness } from "../services/readiness/readinessCalculator.service.js";
// // import { adjustWorkoutForReadiness } from "../services/workout/workoutAdjuster.service.js";
// // import { calculateRecovery } from "../services/recovery/recoveryCalculator.service.js";
// // import { calculateAPS } from "../services/aps/apsCalculator.service.js";
// // import { calculateRecentCompletionRate } from "../services/aps/consistencyCalculator.service.js";
// // import { predictHabitRisk } from "../services/habit/habitPredictor.service.js";
// // import { analyzeNutritionImpact } from "../services/nutrition/nutritionImpact.service.js";
// // import { adjustNextDayReadiness } from "../services/readiness/readinessAdjuster.service.js";


// // /* =====================================================
// //    START WORKOUT SESSION
// // ===================================================== */

// // export const startWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       date,
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent,
// //       sorenessAreas
// //     } = req.body;

// //     if (
// //       !userId ||
// //       !date ||
// //       sleepHours == null ||
// //       !stressLevel ||
// //       !subjectiveFeeling
// //     ) {
// //       return res.status(400).json({
// //         message: "Missing required readiness inputs"
// //       });
// //     }

// //     const workoutDate = new Date(date);
// //     workoutDate.setHours(0, 0, 0, 0);

// //     /* ===== Calculate Readiness ===== */
// //     const { readinessScore, readinessCategory } =
// //       calculateReadiness({
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent
// //       });

// //     /* ===== Save / Update Readiness ===== */
// //     await DailyReadiness.findOneAndUpdate(
// //       { userId, date: workoutDate },
// //       {
// //         userId,
// //         date: workoutDate,
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent,
// //         sorenessAreas,
// //         readinessScore,
// //         readinessCategory,
// //         autoGenerated: false
// //       },
// //       { upsert: true, new: true }
// //     );

// //     /* ===== Get Active Plan ===== */
// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({
// //         message: "No active plan found"
// //       });
// //     }

// //     /* ===== Determine Day ===== */
// //     const jsDay = workoutDate.getDay(); // 0–6
// //     const dayOfWeek = jsDay === 0 ? 7 : jsDay;

// //     const dayPlan = weeklyPlan.weeklyStructure.find(
// //       (d) => d.day === dayOfWeek
// //     );

// //     if (!dayPlan) {
// //       return res.status(400).json({
// //         message: "Workout not found for today"
// //       });
// //     }

// //     if (dayPlan.isRestDay) {
// //       return res.status(400).json({
// //         message: "Today is a rest day"
// //       });
// //     }

// //     /* ===== Adjust Workout ===== */
// //     const adjustmentDecision =
// //       adjustWorkoutForReadiness({
// //         readinessCategory,
// //         painReported: sorenessAreas || []
// //       });

// //     return res.status(200).json({
// //       message: "Workout session started",
// //       weeklyPlanId: weeklyPlan._id,
// //       day: dayOfWeek,
// //       plannedWorkoutType: dayPlan.workoutType,
// //       readiness: {
// //         readinessScore,
// //         readinessCategory
// //       },
// //       adjustment: adjustmentDecision
// //     });

// //   } catch (error) {
// //     console.error("Start workout failed:", error);
// //     return res.status(500).json({
// //       message: "Failed to start workout session",
// //       error: error.message
// //     });
// //   }
// // };


// // /* =====================================================
// //    COMPLETE WORKOUT SESSION
// // ===================================================== */

// // export const completeWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       weeklyPlanId,
// //       date,
// //       plannedWorkoutType,
// //       actualWorkoutType,
// //       intensityLevelUsed,
// //       volumeLevelUsed,
// //       completed,
// //       completionPercentage,
// //       durationMinutes,
// //       painReported = [],
// //       perceivedExertion,
// //       readinessCategory,
// //       hydrationLevelPercent,
// //       injuryRiskFlag = false
// //     } = req.body;

// //     if (!userId || !weeklyPlanId || !date) {
// //       return res.status(400).json({
// //         message: "userId, weeklyPlanId and date are required"
// //       });
// //     }

// //     const normalizedDate = new Date(date);
// //     normalizedDate.setHours(0, 0, 0, 0);
// //     const dateKey = normalizedDate.toISOString().split("T")[0];

// //     /* ===== Save Workout Session ===== */
// //     const session = await WorkoutSession.findOneAndUpdate(
// //       { userId, date: normalizedDate },
// //       {
// //         userId,
// //         weeklyPlanId,
// //         date: normalizedDate,
// //         plannedWorkoutType,
// //         actualWorkoutType,
// //         intensityLevelUsed,
// //         volumeLevelUsed,
// //         completed,
// //         completionPercentage,
// //         durationMinutes,
// //         painReported,
// //         perceivedExertion,
// //         injuryRiskFlag
// //       },
// //       { upsert: true, new: true }
// //     );

// //     /* ===== Update Weekly Plan Progress ===== */
// //     if (completed) {
// //       const plan = await WeeklyPlan.findById(weeklyPlanId);

// //       if (plan) {
// //         plan.progress.set(dateKey, {
// //           completed: true,
// //           completionPercentage,
// //           durationMinutes,
// //           perceivedExertion,
// //           completedAt: new Date()
// //         });

// //         const totalPlanned = plan.plannedWorkoutDays || 1;

// //         const completedDays = Array.from(plan.progress.values())
// //           .filter(d => d.completed).length;

// //         plan.overallCompletionRate =
// //           (completedDays / totalPlanned) * 100;

// //         await plan.save();
// //       }
// //     }

// //     /* ===== Nutrition Impact ===== */
// //     const nutritionSummary = await DailyNutritionSummary.findOne({
// //       userId,
// //       date: normalizedDate
// //     });

// //     const nutritionImpact = nutritionSummary
// //       ? analyzeNutritionImpact({
// //           calorieDifference: nutritionSummary.calorieDifference,
// //           proteinDifference: nutritionSummary.proteinDifference
// //         })
// //       : null;

// //     /* ===== Recovery ===== */
// //     const recoveryDecision = calculateRecovery({
// //       readinessCategory,
// //       perceivedExertion,
// //       painReported,
// //       injuryRiskFlag,
// //       hydrationLevelPercent,
// //       nutritionImpact
// //     });

// //     /* ===== Adjust Next Day Readiness ===== */
// //     const nextDate = new Date(normalizedDate);
// //     nextDate.setDate(nextDate.getDate() + 1);

// //     const todayReadiness = await DailyReadiness.findOne({
// //       userId,
// //       date: normalizedDate
// //     });

// //     if (todayReadiness) {
// //       const readinessAdjustment = adjustNextDayReadiness({
// //         currentReadinessScore: todayReadiness.readinessScore,
// //         recoveryType: recoveryDecision.recoveryType
// //       });

// //       await DailyReadiness.findOneAndUpdate(
// //         { userId, date: nextDate },
// //         {
// //           userId,
// //           date: nextDate,
// //           readinessScore: readinessAdjustment.adjustedScore,
// //           readinessCategory:
// //             readinessAdjustment.adjustedScore >= 75
// //               ? "high"
// //               : readinessAdjustment.adjustedScore >= 50
// //               ? "moderate"
// //               : "low",
// //           autoGenerated: true
// //         },
// //         { upsert: true }
// //       );
// //     }

// //     /* ===== APS ===== */
// //     const recentCompletionRate =
// //       await calculateRecentCompletionRate(userId, 14, normalizedDate);

// //     const apsScore = calculateAPS({
// //       completionPercentage,
// //       perceivedExertion,
// //       readinessCategory,
// //       recoveryType: recoveryDecision.recoveryType,
// //       recentCompletionRate
// //     });

// //     await ApsHistory.findOneAndUpdate(
// //       { userId, date: normalizedDate },
// //       {
// //         userId,
// //         date: normalizedDate,
// //         apsScore,
// //         readinessCategory,
// //         recoveryType: recoveryDecision.recoveryType
// //       },
// //       { upsert: true }
// //     );

// //     /* ===== Habit Risk ===== */
// //     const habitRisk = await predictHabitRisk(userId);

// //     return res.status(200).json({
// //       message: "Workout session logged successfully",
// //       session,
// //       recovery: recoveryDecision,
// //       aps: apsScore,
// //       habitRisk
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to log workout session",
// //       error: error.message
// //     });
// //   }
// // };


// // /* =====================================================
// //    GET ACTIVE WEEKLY PLAN
// // ===================================================== */

// // export const getActiveWeeklyPlanController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const plan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     })
// //       .sort({ planVersion: -1 })
// //       .lean();

// //     if (!plan) {
// //       return res.status(404).json({
// //         message: "No active workout plan found"
// //       });
// //     }

// //     return res.status(200).json({
// //       message: "Active workout plan fetched successfully",
// //       plan
// //     });

// //   } catch (error) {
// //     console.error("Failed to fetch workout plan:", error);
// //     return res.status(500).json({
// //       message: "Failed to fetch workout plan",
// //       error: error.message
// //     });
// //   }
// // };


// // /* =====================================================
// //    UPDATE WORKOUT DAY STRUCTURE
// // ===================================================== */

// // export const updateWorkoutDayController = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { day, newWorkoutType } = req.body;

// //     if (!day || day < 1 || day > 7) {
// //       return res.status(400).json({ message: "Day must be between 1 and 7" });
// //     }

// //     if (!newWorkoutType) {
// //       return res.status(400).json({ message: "newWorkoutType is required" });
// //     }

// //     const plan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!plan) {
// //       return res.status(404).json({ message: "Active plan not found" });
// //     }

// //     const dayStructure = plan.weeklyStructure.find(
// //       (d) => d.day === day
// //     );

// //     if (!dayStructure) {
// //       return res.status(400).json({ message: "Day not found in structure" });
// //     }

// //     const oldWorkoutType = dayStructure.workoutType;

// //     dayStructure.workoutType = newWorkoutType;
// //     dayStructure.isRestDay = newWorkoutType === "rest";

// //     plan.needsRegeneration = true;

// //     await plan.save();

// //     return res.json({
// //       message: "Workout day updated successfully",
// //       day,
// //       from: oldWorkoutType,
// //       to: newWorkoutType,
// // //       needsRegeneration: true
// // //     });

// // //   } catch (error) {
// // //     console.error("Failed to update workout day:", error);
// // //     return res.status(500).json({
// // //       message: "Failed to update workout day",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // import WorkoutSession from "../models/WorkoutSession.model.js";
// // import WeeklyPlan from "../models/WeeklyPlan.model.js";
// // import DailyReadiness from "../models/DailyReadiness.model.js";
// // import ApsHistory from "../models/ApsHistory.model.js";
// // import DailyNutritionSummary from "../models/DailyNutritionSummary.model.js";

// // import { calculateReadiness } from "../services/readiness/readinessCalculator.service.js";
// // import { adjustWorkoutForReadiness } from "../services/workout/workoutAdjuster.service.js";
// // import { calculateRecovery } from "../services/recovery/recoveryCalculator.service.js";
// // import { calculateAPS } from "../services/aps/apsCalculator.service.js";
// // import { calculateRecentCompletionRate } from "../services/aps/consistencyCalculator.service.js";
// // import { predictHabitRisk } from "../services/habit/habitPredictor.service.js";
// // import { analyzeNutritionImpact } from "../services/nutrition/nutritionImpact.service.js";
// // import { adjustNextDayReadiness } from "../services/readiness/readinessAdjuster.service.js";

// // // /* =====================================================
// //    START WORKOUT SESSION (READINESS REQUIRED)
// // ===================================================== */

// // // export const startWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// //       userId,
// //       date,
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent,
// //       sorenessAreas
// //     } = req.body;

// //     if (!userId || !date || sleepHours == null || !stressLevel || !subjectiveFeeling) {
// //       return res.status(400).json({ message: "Readiness data is required" });
// //     }

// //     const workoutDate = new Date(date);
// //     workoutDate.setHours(0, 0, 0, 0);

// //     /* ===== Calculate Readiness ===== */
// //     const { readinessScore, readinessCategory } = calculateReadiness({
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent
// //     });

// //     /* ===== Store Readiness ===== */
// //     await DailyReadiness.findOneAndUpdate(
// //       { userId, date: workoutDate },
// //       {
// //         userId,
// //         date: workoutDate,
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent,
// //         sorenessAreas,
// //         readinessScore,
// //         readinessCategory,
// //         autoGenerated: false
// //       },
// //       { upsert: true }
// //     );

// //     /* ===== Get Active Plan ===== */
// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({ message: "No active base plan found" });
// //     }

// //     const jsDay = workoutDate.getDay();
// //     const dayOfWeek = jsDay === 0 ? 7 : jsDay;

// //     const dayPlan = weeklyPlan.weeklyStructure.find(
// //       (d) => d.day === dayOfWeek
// //     );

// //     if (!dayPlan || dayPlan.isRestDay) {
// //       return res.status(400).json({
// //         message: "No workout scheduled for today"
// //       });
// //     }

// //     const adjustment = adjustWorkoutForReadiness({
// //       readinessCategory,
// //       painReported: sorenessAreas || []
// //     });

// //     return res.status(200).json({
// //       message: "Workout session unlocked",
// //       weeklyPlanId: weeklyPlan._id,
// //       plannedWorkoutType: dayPlan.workoutType,
// //       readiness: {
// //         readinessScore,
// //         readinessCategory
// //       },
// //       adjustment
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to start workout session",
// //       error: error.message
// //     });
// //   }
// // };
// // export const startWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       date,
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent,
// //       sorenessAreas
// //     } = req.body;

// //     if (!userId || !date || sleepHours == null || !stressLevel || !subjectiveFeeling) {
// //       return res.status(400).json({ message: "Readiness data is required" });
// //     }

// //     // 🔥 Normalize date in UTC
// //     const workoutDate = new Date(date);
// //     workoutDate.setUTCHours(0, 0, 0, 0);

// //     /* ===== Calculate Readiness ===== */
// //     const { readinessScore, readinessCategory } = calculateReadiness({
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent
// //     });

// //     /* ===== Store Readiness ===== */
// //     await DailyReadiness.findOneAndUpdate(
// //       { userId, date: workoutDate },
// //       {
// //         userId,
// //         date: workoutDate,
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent,
// //         sorenessAreas,
// //         readinessScore,
// //         readinessCategory,
// //         autoGenerated: false
// //       },
// //       { upsert: true }
// //     );

// //     /* ===== Get Active Plan ===== */
// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({ message: "No active base plan found" });
// //     }

// //     // 🔥 Use UTC weekday
// //     const jsDay = workoutDate.getUTCDay();
// //     const dayOfWeek = jsDay === 0 ? 7 : jsDay;

// //     const dayPlan = weeklyPlan.weeklyStructure.find(
// //       (d) => d.day === dayOfWeek
// //     );

// //     if (!dayPlan || dayPlan.isRestDay) {
// //       return res.status(400).json({
// //         message: "No workout scheduled for today"
// //       });
// //     }

// //     const adjustment = adjustWorkoutForReadiness({
// //       readinessCategory,
// //       painReported: sorenessAreas || []
// //     });

// //     return res.status(200).json({
// //       message: "Workout session unlocked",
// //       weeklyPlanId: weeklyPlan._id,
// //       plannedWorkoutType: dayPlan.workoutType,
// //       readiness: {
// //         readinessScore,
// //         readinessCategory
// //       },
// //       adjustment
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to start workout session",
// //       error: error.message
// //     });
// //   }
// // };

// // export const startWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       date,
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent,
// //       sorenessAreas
// //     } = req.body;

// //     if (!userId || !date || sleepHours == null || !stressLevel || !subjectiveFeeling) {
// //       return res.status(400).json({ message: "Readiness data is required" });
// //     }

// //     // 🔥 Normalize date (UTC safe)
// //     const workoutDate = new Date(date);
// //     workoutDate.setUTCHours(0, 0, 0, 0);

// //     /* ===== Get Active Plan ===== */
// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({ message: "No active base plan found" });
// //     }

// //     // 🔥 Ensure date is within plan range
// //     if (
// //       workoutDate < weeklyPlan.weekStartDate ||
// //       workoutDate > weeklyPlan.weekEndDate
// //     ) {
// //       return res.status(400).json({
// //         message: "Date is outside active plan range"
// //       });
// //     }

// //     /* ===== Calculate Day Index Properly ===== */

// //     const planStart = new Date(weeklyPlan.weekStartDate);
// //     planStart.setUTCHours(0, 0, 0, 0);

// //     const diffTime = workoutDate - planStart;
// //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// //     const structureIndex = diffDays % 7;

// //     const dayPlan = weeklyPlan.weeklyStructure[structureIndex];

// //     if (!dayPlan || dayPlan.isRestDay) {
// //       return res.status(400).json({
// //         message: "No workout scheduled for that day"
// //       });
// //     }

// //     /* ===== Calculate Readiness ===== */

// //     const { readinessScore, readinessCategory } = calculateReadiness({
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent
// //     });

// //     /* ===== Store Readiness ===== */

// //     await DailyReadiness.findOneAndUpdate(
// //       { userId, date: workoutDate },
// //       {
// //         userId,
// //         date: workoutDate,
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent,
// //         sorenessAreas,
// //         readinessScore,
// //         readinessCategory,
// //         autoGenerated: false
// //       },
// //       { upsert: true }
// //     );

// //     /* ===== Adjustment Based on Readiness ===== */

// //     const adjustment = adjustWorkoutForReadiness({
// //       readinessCategory,
// //       painReported: sorenessAreas || []
// //     });

// //     return res.status(200).json({
// //       message: "Workout session unlocked",
// //       weeklyPlanId: weeklyPlan._id,
// //       plannedWorkoutType: dayPlan.workoutType,
// //       readiness: {
// //         readinessScore,
// //         readinessCategory
// //       },
// //       adjustment
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to start workout session",
// //       error: error.message
// //     });
// //   }
// // };




// /* =====================================================
//    COMPLETE WORKOUT SESSION
// ===================================================== */

// // export const completeWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       weeklyPlanId,
// //       aiSessionId,
// //       date,
// //       plannedWorkoutType,
// //       actualWorkoutType,
// //       intensityLevelUsed,
// //       volumeLevelUsed,
// //       completed,
// //       completionPercentage,
// //       durationMinutes,
// //       painReported = [],
// //       perceivedExertion,
// //       hydrationLevelPercent,
// //       injuryRiskFlag = false
// //     } = req.body;

// //     if (!userId || !weeklyPlanId || !date) {
// //       return res.status(400).json({
// //         message: "userId, weeklyPlanId and date required"
// //       });
// //     }

// //     const normalizedDate = new Date(date);
// //     normalizedDate.setHours(0, 0, 0, 0);
// //     const dateKey = normalizedDate.toISOString().split("T")[0];

// //     /* ===== Ensure readiness was entered ===== */
// //     const readinessEntry = await DailyReadiness.findOne({
// //       userId,
// //       date: normalizedDate
// //     });

// //     if (!readinessEntry) {
// //       return res.status(400).json({
// //         message: "Readiness data must be submitted before completing workout"
// //       });
// //     }

// //     /* ===== Save Workout Session ===== */
// //     const session = await WorkoutSession.findOneAndUpdate(
// //       { userId, date: normalizedDate },
// //       {
// //         userId,
// //         weeklyPlanId,
// //         aiSessionId: aiSessionId || null,
// //         date: normalizedDate,
// //         plannedWorkoutType,
// //         actualWorkoutType,
// //         intensityLevelUsed,
// //         volumeLevelUsed,
// //         completed,
// //         completionPercentage,
// //         durationMinutes,
// //         painReported,
// //         perceivedExertion,
// //         injuryRiskFlag
// //       },
// //       { upsert: true, new: true }
// //     );

// //     /* ===== Update Base Plan Progress ===== */
// //     if (completed) {
// //       const plan = await WeeklyPlan.findById(weeklyPlanId);

// //       if (plan) {
// //         plan.progress.set(dateKey, {
// //           completed: true,
// //           completionPercentage,
// //           durationMinutes,
// //           perceivedExertion,
// //           completedAt: new Date()
// //         });

// //         const totalPlanned = plan.plannedWorkoutDays;
// //         const completedDays = Array.from(plan.progress.values())
// //           .filter(d => d.completed).length;

// //         plan.overallCompletionRate =
// //           (completedDays / totalPlanned) * 100;

// //         await plan.save();
// //       }
// //     }

// //     /* ===== Nutrition Impact ===== */
// //     const nutritionSummary = await DailyNutritionSummary.findOne({
// //       userId,
// //       date: normalizedDate
// //     });

// //     const nutritionImpact = nutritionSummary
// //       ? analyzeNutritionImpact({
// //         calorieDifference: nutritionSummary.calorieDifference,
// //         proteinDifference: nutritionSummary.proteinDifference
// //       })
// //       : null;

// //     /* ===== Recovery Calculation ===== */
// //     const recoveryDecision = calculateRecovery({
// //       readinessCategory: readinessEntry.readinessCategory,
// //       perceivedExertion,
// //       painReported,
// //       injuryRiskFlag,
// //       hydrationLevelPercent,
// //       nutritionImpact
// //     });

// //     /* ===== Adjust Next Day Readiness ===== */
// //     const nextDate = new Date(normalizedDate);
// //     nextDate.setDate(nextDate.getDate() + 1);

// //     const readinessAdjustment = adjustNextDayReadiness({
// //       currentReadinessScore: readinessEntry.readinessScore,
// //       recoveryType: recoveryDecision.recoveryType
// //     });

// //     await DailyReadiness.findOneAndUpdate(
// //       { userId, date: nextDate },
// //       {
// //         userId,
// //         date: nextDate,
// //         readinessScore: readinessAdjustment.adjustedScore,
// //         readinessCategory:
// //           readinessAdjustment.adjustedScore >= 75
// //             ? "high"
// //             : readinessAdjustment.adjustedScore >= 50
// //               ? "moderate"
// //               : "low",
// //         autoGenerated: true
// //       },
// //       { upsert: true }
// //     );

// //     /* ===== APS Calculation ===== */
// //     const recentCompletionRate =
// //       await calculateRecentCompletionRate(userId, 14, normalizedDate);

// //     const apsScore = calculateAPS({
// //       completionPercentage,
// //       perceivedExertion,
// //       readinessCategory: readinessEntry.readinessCategory,
// //       recoveryType: recoveryDecision.recoveryType,
// //       recentCompletionRate
// //     });

// //     await ApsHistory.findOneAndUpdate(
// //       { userId, date: normalizedDate },
// //       {
// // //         userId,
// // //         date: normalizedDate,
// // //         apsScore,
// // //         readinessCategory: readinessEntry.readinessCategory,
// // //         recoveryType: recoveryDecision.recoveryType
// // //       },
// // //       { upsert: true }
// // //     );

// // //     /* ===== Habit Risk ===== */
// // //     const habitRisk = await predictHabitRisk(userId);

// // //     return res.status(200).json({
// // //       message: "Workout completed successfully",
// // //       session,
// // //       recovery: recoveryDecision,
// // //       aps: apsScore,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to complete workout",
// // //       error: error.message
// // //     });
// // //   }
// // // };

// // export const startWorkoutSession = async (req, res) => {
// //   try {
// //     const {
// //       userId,
// //       date,
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent,
// //       sorenessAreas
// //     } = req.body;

// //     if (!userId || !date || sleepHours == null || !stressLevel || !subjectiveFeeling) {
// //       return res.status(400).json({ message: "Readiness data is required" });
// //     }

// //     /* ===========================
// //        STRICT UTC NORMALIZATION
// //     ============================ */

// //     const [year, month, day] = date.split("-").map(Number);
// //     const workoutDate = new Date(Date.UTC(year, month - 1, day));

// //     /* ===========================
// //        Get Active Plan
// //     ============================ */

// //     const weeklyPlan = await WeeklyPlan.findOne({
// //       userId,
// //       status: "active"
// //     });

// //     if (!weeklyPlan) {
// //       return res.status(404).json({ message: "No active base plan found" });
// //     }

// //     /* ===========================
// //        Ensure date within plan range
// //     ============================ */

// //     if (
// //       workoutDate < weeklyPlan.weekStartDate ||
// //       workoutDate > weeklyPlan.weekEndDate
// //     ) {
// //       return res.status(400).json({
// //         message: "Date is outside active plan range"
// //       });
// //     }

// //     /* ===========================
// //        Calculate Day Index Properly
// //     ============================ */

// //     const planStart = new Date(weeklyPlan.weekStartDate);
// //     planStart.setUTCHours(0, 0, 0, 0);

// //     const diffTime = workoutDate - planStart;
// //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// //     const structureIndex = diffDays % 7;
// //     const dayPlan = weeklyPlan.weeklyStructure[structureIndex];

// //     if (!dayPlan || dayPlan.isRestDay) {
// //       return res.status(400).json({
// //         message: "No workout scheduled for that day"
// //       });
// //     }

// //     /* ===========================
// //        Calculate Readiness
// //     ============================ */

// //     const { readinessScore, readinessCategory } = calculateReadiness({
// //       sleepHours,
// //       stressLevel,
// //       subjectiveFeeling,
// //       restingHeartRate,
// //       hydrationLevelPercent
// //     });

// //     /* ===========================
// //        Store Readiness
// //     ============================ */

// //     await DailyReadiness.findOneAndUpdate(
// //       { userId, date: workoutDate },
// //       {
// //         userId,
// //         date: workoutDate,
// //         sleepHours,
// //         stressLevel,
// //         subjectiveFeeling,
// //         restingHeartRate,
// //         hydrationLevelPercent,
// //         sorenessAreas,
// //         readinessScore,
// //         readinessCategory,
// //         autoGenerated: false
// //       },
// //       { upsert: true }
// //     );

// //     /* ===========================
// //        Adjustment
// //     ============================ */

// //     const adjustment = adjustWorkoutForReadiness({
// //       readinessCategory,
// //       painReported: sorenessAreas || []
// //     });

// //     return res.status(200).json({
// //       message: "Workout session unlocked",
// //       weeklyPlanId: weeklyPlan._id,
// //       plannedWorkoutType: dayPlan.workoutType,
// //       readiness: {
// //         readinessScore,
// //         readinessCategory
// //       },
// //       adjustment
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Failed to start workout session",
// //       error: error.message
// //     });
// //   }
// // };

// // // export const completeWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       weeklyPlanId,
// // //       aiSessionId,
// // //       date,
// // //       plannedWorkoutType,
// // //       actualWorkoutType,
// // //       intensityLevelUsed,
// // //       volumeLevelUsed,
// // //       completed,
// // //       completionPercentage,
// // //       durationMinutes,
// // //       painReported = [],
// // //       perceivedExertion,
// // //       hydrationLevelPercent,
// // //       injuryRiskFlag = false
// // //     } = req.body;

// // //     if (!userId || !weeklyPlanId || !date) {
// // //       return res.status(400).json({
// // //         message: "userId, weeklyPlanId and date required"
// // //       });
// // //     }

// // //     /* ===========================
// // //        STRICT UTC NORMALIZATION
// // //     ============================ */

// // //     const [year, month, day] = date.split("-").map(Number);
// // //     const normalizedDate = new Date(Date.UTC(year, month - 1, day));
// // //     const dateKey = normalizedDate.toISOString().slice(0, 10);

// // //     /* ===========================
// // //        Ensure readiness exists
// // //     ============================ */

// // //     const readinessEntry = await DailyReadiness.findOne({
// // //       userId,
// // //       date: normalizedDate
// // //     });

// // //     if (!readinessEntry) {
// // //       return res.status(400).json({
// // //         message: "Readiness data must be submitted before completing workout"
// // //       });
// // //     }

// // //     /* ===========================
// // //        Save Workout Session
// // //     ============================ */

// // //     const session = await WorkoutSession.findOneAndUpdate(
// // //       { userId, date: normalizedDate },
// // //       {
// // //         userId,
// // //         weeklyPlanId,
// // //         aiSessionId: aiSessionId || null,
// // //         date: normalizedDate,
// // //         plannedWorkoutType,
// // //         actualWorkoutType,
// // //         intensityLevelUsed,
// // //         volumeLevelUsed,
// // //         completed,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         painReported,
// // //         perceivedExertion,
// // //         injuryRiskFlag
// // //       },
// // //       { upsert: true, new: true }
// // //     );

// // //     /* ===========================
// // //        Update Plan Progress
// // //     ============================ */

// // //     const plan = await WeeklyPlan.findById(weeklyPlanId);

// // //     if (plan && completed) {
// // //       plan.progress.set(dateKey, {
// // //         completed: true,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         perceivedExertion,
// // //         completedAt: new Date()
// // //       });

// // //       const completedDays = Array.from(plan.progress.values())
// // //         .filter(d => d.completed === true).length;

// // //       const totalPlanned = plan.plannedWorkoutDays || 1;

// // //       plan.overallCompletionRate =
// // //         Math.round((completedDays / totalPlanned) * 100);

// // //       await plan.save();
// // //     }

// // //     /* ===========================
// // //        Nutrition Impact
// // //     ============================ */

// // //     const nutritionSummary = await DailyNutritionSummary.findOne({
// // //       userId,
// // //       date: normalizedDate
// // //     });

// // //     const nutritionImpact = nutritionSummary
// // //       ? analyzeNutritionImpact({
// // //           calorieDifference: nutritionSummary.calorieDifference,
// // //           proteinDifference: nutritionSummary.proteinDifference
// // //         })
// // //       : null;

// // //     /* ===========================
// // //        Recovery
// // //     ============================ */

// // //     const recoveryDecision = calculateRecovery({
// // //       readinessCategory: readinessEntry.readinessCategory,
// // //       perceivedExertion,
// // //       painReported,
// // //       injuryRiskFlag,
// // //       hydrationLevelPercent,
// // //       nutritionImpact
// // //     });

// // //     /* ===========================
// // //        Adjust Next Day Readiness
// // //     ============================ */

// // //     const nextDate = new Date(normalizedDate);
// // //     nextDate.setUTCDate(nextDate.getUTCDate() + 1);

// // //     const readinessAdjustment = adjustNextDayReadiness({
// // //       currentReadinessScore: readinessEntry.readinessScore,
// // //       recoveryType: recoveryDecision.recoveryType
// // //     });

// // //     await DailyReadiness.findOneAndUpdate(
// // //       { userId, date: nextDate },
// // //       {
// // //         userId,
// // //         date: nextDate,
// // //         readinessScore: readinessAdjustment.adjustedScore,
// // //         readinessCategory:
// // //           readinessAdjustment.adjustedScore >= 75
// // //             ? "high"
// // //             : readinessAdjustment.adjustedScore >= 50
// // //             ? "moderate"
// // //             : "low",
// // //         autoGenerated: true
// // //       },
// // //       { upsert: true }
// // //     );

// // //     /* ===========================
// // //        APS
// // //     ============================ */

// // //     const recentCompletionRate =
// // //       await calculateRecentCompletionRate(userId, 14, normalizedDate);

// // //     const apsScore = calculateAPS({
// // //       completionPercentage,
// // //       perceivedExertion,
// // //       readinessCategory: readinessEntry.readinessCategory,
// // //       recoveryType: recoveryDecision.recoveryType,
// // //       recentCompletionRate
// // //     });

// // //     await ApsHistory.findOneAndUpdate(
// // //       { userId, date: normalizedDate },
// // //       {
// // //         userId,
// // //         date: normalizedDate,
// // //         apsScore,
// // //         readinessCategory: readinessEntry.readinessCategory,
// // //         recoveryType: recoveryDecision.recoveryType
// // //       },
// // //       { upsert: true }
// // //     );

// // //     /* ===========================
// // //        Habit Risk
// // //     ============================ */

// // //     const habitRisk = await predictHabitRisk(userId);

// // //     return res.status(200).json({
// // //       message: "Workout completed successfully",
// // //       session,
// // //       recovery: recoveryDecision,
// // //       aps: apsScore,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to complete workout",
// // //       error: error.message
// // //     });
// // //   }
// // // };

// // // export const completeWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       weeklyPlanId,
// // //       aiSessionId,
// // //       date,
// // //       plannedWorkoutType,
// // //       actualWorkoutType,
// // //       intensityLevelUsed,
// // //       volumeLevelUsed,
// // //       completed,
// // //       completionPercentage,
// // //       durationMinutes,
// // //       painReported = [],
// // //       perceivedExertion,
// // //       hydrationLevelPercent,
// // //       injuryRiskFlag = false
// // //     } = req.body;

// // //     if (!userId || !weeklyPlanId || !date) {
// // //       return res.status(400).json({
// // //         message: "userId, weeklyPlanId and date required"
// // //       });
// // //     }

// // //     /* =========================================
// // //        Normalize Date (UTC SAFE)
// // //     ========================================= */
// // //     const workoutDate = new Date(date);
// // //     workoutDate.setUTCHours(0, 0, 0, 0);
// // //     const dateKey = workoutDate.toISOString().slice(0, 10);

// // //     /* =========================================
// // //        Ensure readiness exists
// // //     ========================================= */
// // //     const readinessEntry = await DailyReadiness.findOne({
// // //       userId,
// // //       date: workoutDate
// // //     });

// // //     if (!readinessEntry) {
// // //       return res.status(400).json({
// // //         message: "Readiness must be submitted before completing workout"
// // //       });
// // //     }

// // //     /* =========================================
// // //        Save Workout Session
// // //     ========================================= */
// // //     const session = await WorkoutSession.findOneAndUpdate(
// // //       { userId, date: workoutDate },
// // //       {
// // //         userId,
// // //         weeklyPlanId,
// // //         aiSessionId: aiSessionId || null,
// // //         date: workoutDate,
// // //         plannedWorkoutType,
// // //         actualWorkoutType,
// // //         intensityLevelUsed,
// // //         volumeLevelUsed,
// // //         completed,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         painReported,
// // //         perceivedExertion,
// // //         injuryRiskFlag
// // //       },
// // //       { upsert: true, new: true }
// // //     );

// // //     /* =========================================
// // //        Update WEEKLY PROGRESS (NEW SYSTEM)
// // //     ========================================= */

// // //     const plan = await WeeklyPlan.findById(weeklyPlanId);

// // //     if (!plan) {
// // //       return res.status(404).json({
// // //         message: "Weekly plan not found"
// // //       });
// // //     }

// // //     const weekIndex = plan.currentWeek - 1;
// // //     const currentWeekBlock = plan.weeklyProgress[weekIndex];

// // //     if (!currentWeekBlock.progress) {
// // //       currentWeekBlock.progress = {};
// // //     }

// // //     if (completed) {
// // //       currentWeekBlock.progress[dateKey] = {
// // //         completed: true,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         perceivedExertion,
// // //         completedAt: new Date()
// // //       };
// // //     }

// // //     /* =========================================
// // //        Calculate Weekly Completion
// // //     ========================================= */

// // //     const completedDaysCount = Object.values(currentWeekBlock.progress)
// // //       .filter(d => d.completed).length;

// // //     currentWeekBlock.overallCompletionRate =
// // //       (completedDaysCount / plan.plannedWorkoutDays) * 100;

// // //     /* =========================================
// // //        Auto Move To Next Week
// // //     ========================================= */

// // //     if (
// // //       completedDaysCount >= plan.plannedWorkoutDays &&
// // //       plan.currentWeek < plan.planDurationWeeks
// // //     ) {
// // //       plan.currentWeek += 1;
// // //     }

// // //     await plan.save();

// // //     /* =========================================
// // //        APS & Habit (unchanged)
// // //     ========================================= */

// // //     const recentCompletionRate =
// // //       await calculateRecentCompletionRate(userId, 14, workoutDate);

// // //     const apsScore = calculateAPS({
// // //       completionPercentage,
// // //       perceivedExertion,
// // //       readinessCategory: readinessEntry.readinessCategory,
// // //       recoveryType: "active",
// // //       recentCompletionRate
// // //     });

// // //     await ApsHistory.findOneAndUpdate(
// // //       { userId, date: workoutDate },
// // //       {
// // //         userId,
// // //         date: workoutDate,
// // //         apsScore,
// // //         readinessCategory: readinessEntry.readinessCategory
// // //       },
// // //       { upsert: true }
// // //     );

// // //     const habitRisk = await predictHabitRisk(userId);

// // //     return res.status(200).json({
// // //       message: "Workout completed successfully",
// // //       session,
// // //       currentWeek: plan.currentWeek,
// // //       weeklyCompletion: currentWeekBlock.overallCompletionRate,
// // //       aps: apsScore,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to complete workout",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // // export const completeWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       weeklyPlanId,
// // //       day, // 🔥 day number (1–7)
// // //       completionPercentage = 100,
// // //       perceivedExertion = 7
// // //     } = req.body;

// // //     if (!userId || !weeklyPlanId || !day) {
// // //       return res.status(400).json({
// // //         message: "userId, weeklyPlanId and day are required"
// // //       });
// // //     }

// // //     /* =========================================
// // //        1️⃣ Get Active Plan
// // //     ========================================= */
// // //     const plan = await WeeklyPlan.findOne({
// // //       _id: weeklyPlanId,
// // //       userId,
// // //       status: "active"
// // //     });

// // //     if (!plan) {
// // //       return res.status(404).json({
// // //         message: "Active plan not found"
// // //       });
// // //     }

// // //     const currentWeek = plan.currentWeek;

// // //     const weekData = plan.weeklyAttendance.find(
// // //       w => w.week === currentWeek
// // //     );

// // //     if (!weekData) {
// // //       return res.status(400).json({
// // //         message: "Week data not found"
// // //       });
// // //     }

// // //     /* =========================================
// // //        2️⃣ Mark Day Completed
// // //     ========================================= */
// // //     const dayData = weekData.days.find(d => d.day === day);

// // //     if (!dayData) {
// // //       return res.status(400).json({
// // //         message: "Invalid day number"
// // //       });
// // //     }

// // //     if (dayData.status === "completed") {
// // //       return res.status(400).json({
// // //         message: "Workout already completed for this day"
// // //       });
// // //     }

// // //     dayData.status = "completed";
// // //     dayData.completedAt = new Date();

// // //     /* =========================================
// // //        3️⃣ Check if Week Completed
// // //     ========================================= */
// // //     const allDone = weekData.days.every(
// // //       d => d.status === "completed" || plan.weeklyStructure[d.day - 1].isRestDay
// // //     );

// // //     if (allDone) {
// // //       if (currentWeek < plan.planDurationWeeks) {
// // //         plan.currentWeek += 1; // 🔥 Move to next week
// // //       } else {
// // //         plan.status = "completed"; // 🔥 Entire plan finished
// // //       }
// // //     }

// // //     await plan.save();

// // //     /* =========================================
// // //        4️⃣ APS Calculation (Simplified)
// // //     ========================================= */
// // //     const apsScore = Math.round(
// // //       (completionPercentage * 0.6) +
// // //       (perceivedExertion * 10 * 0.4)
// // //     );

// // //     /* =========================================
// // //        5️⃣ Habit Risk (Simple Logic)
// // //     ========================================= */
// // //     let habitRisk = "low";

// // //     const missedDays = weekData.days.filter(
// // //       d => d.status === "missed"
// // //     ).length;

// // //     if (missedDays >= 3) habitRisk = "high";
// // //     else if (missedDays >= 1) habitRisk = "medium";

// // //     return res.status(200).json({
// // //       message: "Workout marked successfully",
// // //       currentWeek: plan.currentWeek,
// // //       planStatus: plan.status,
// // //       aps: apsScore,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to complete workout",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // // export const completeWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       weeklyPlanId,
// // //       date,
// // //       plannedWorkoutType,
// // //       actualWorkoutType,
// // //       intensityLevelUsed,
// // //       volumeLevelUsed,
// // //       completed = true,
// // //       completionPercentage = 100,
// // //       durationMinutes,
// // //       perceivedExertion = 7,
// // //       painReported = [],
// // //       injuryRiskFlag = false
// // //     } = req.body;

// // //     if (!userId || !weeklyPlanId || !date) {
// // //       return res.status(400).json({
// // //         message: "userId, weeklyPlanId and date required"
// // //       });
// // //     }

// // //     /* ============================
// // //        STRICT DATE NORMALIZATION
// // //     ============================= */

// // //     const [year, month, day] = date.split("-").map(Number);
// // //     const normalizedDate = new Date(Date.UTC(year, month - 1, day));

// // //     /* ============================
// // //        CHECK READINESS EXISTS
// // //     ============================= */

// // //     const readinessEntry = await DailyReadiness.findOne({
// // //       userId,
// // //       date: normalizedDate
// // //     });

// // //     if (!readinessEntry) {
// // //       return res.status(400).json({
// // //         message: "Submit readiness before completing workout"
// // //       });
// // //     }

// // //     /* ============================
// // //        SAVE WORKOUT SESSION
// // //     ============================= */

// // //     const session = await WorkoutSession.findOneAndUpdate(
// // //       { userId, date: normalizedDate },
// // //       {
// // //         userId,
// // //         weeklyPlanId,
// // //         date: normalizedDate,
// // //         plannedWorkoutType,
// // //         actualWorkoutType,
// // //         intensityLevelUsed,
// // //         volumeLevelUsed,
// // //         completed,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         perceivedExertion,
// // //         painReported,
// // //         injuryRiskFlag
// // //       },
// // //       { upsert: true, new: true }
// // //     );

// // //     /* ============================
// // //        CALCULATE APS (REAL LOGIC)
// // //     ============================= */

// // //     const recentCompletionRate =
// // //       await calculateRecentCompletionRate(userId, 14, normalizedDate);

// // //     const apsScore = calculateAPS({
// // //       completionPercentage,
// // //       perceivedExertion,
// // //       readinessCategory: readinessEntry.readinessCategory,
// // //       recoveryType: "normal",
// // //       recentCompletionRate
// // //     });

// // //     await ApsHistory.findOneAndUpdate(
// // //       { userId, date: normalizedDate },
// // //       {
// // //         userId,
// // //         date: normalizedDate,
// // //         apsScore,
// // //         readinessCategory: readinessEntry.readinessCategory,
// // //         recoveryType: "normal"
// // //       },
// // //       { upsert: true }
// // //     );

// // //     /* ============================
// // //        HABIT RISK
// // //     ============================= */

// // //     const habitRisk = await predictHabitRisk(userId);

// // //     return res.status(200).json({
// // //       message: "Workout completed successfully",
// // //       session,
// // //       aps: apsScore,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to complete workout",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// // // export const completeWorkoutSession = async (req, res) => {
// // //   try {
// // //     const {
// // //       userId,
// // //       weeklyPlanId,
// // //       date,
// // //       plannedWorkoutType,
// // //       actualWorkoutType,
// // //       plannedIntensityLevel,
// // //       plannedVolumeLevel,
// // //       intensityLevelUsed,
// // //       volumeLevelUsed,
// // //       completed = true,
// // //       completionPercentage = 100,
// // //       durationMinutes = 60,
// // //       perceivedExertion = 7,
// // //       painReported = [],
// // //       injuryRiskFlag = false,
// // //       formQuality = 7,
// // //       energyLevel = 7
// // //     } = req.body;

// // //     if (!userId || !weeklyPlanId || !date) {
// // //       return res.status(400).json({
// // //         message: "userId, weeklyPlanId and date required"
// // //       });
// // //     }

// // //     /* ============================
// // //        STRICT DATE NORMALIZATION
// // //     ============================= */

// // //     const [year, month, day] = date.split("-").map(Number);
// // //     const normalizedDate = new Date(Date.UTC(year, month - 1, day));

// // //     /* ============================
// // //        CHECK READINESS EXISTS
// // //     ============================= */

// // //     const readinessEntry = await DailyReadiness.findOne({
// // //       userId,
// // //       date: normalizedDate
// // //     });

// // //     if (!readinessEntry) {
// // //       return res.status(400).json({
// // //         message: "Submit readiness before completing workout"
// // //       });
// // //     }

// // //     /* ============================
// // //        INTENSITY & VOLUME DEVIATION
// // //     ============================= */

// // //     const deviationMap = { low: 1, moderate: 2, high: 3 };

// // //     const intensityDeviation =
// // //       deviationMap[intensityLevelUsed] -
// // //       deviationMap[plannedIntensityLevel];

// // //     const volumeDeviation =
// // //       deviationMap[volumeLevelUsed] -
// // //       deviationMap[plannedVolumeLevel];

// // //     /* ============================
// // //        RECOVERY TYPE DERIVATION
// // //     ============================= */

// // //     let recoveryType = "normal";

// // //     if (perceivedExertion >= 9 && readinessEntry.readinessCategory === "low") {
// // //       recoveryType = "overreached";
// // //     } else if (perceivedExertion <= 5 && completionPercentage === 100) {
// // //       recoveryType = "efficient";
// // //     } else if (painReported.length > 0 || injuryRiskFlag) {
// // //       recoveryType = "risk";
// // //     }

// // //     /* ============================
// // //        SAVE WORKOUT SESSION
// // //     ============================= */

// // //     const session = await WorkoutSession.findOneAndUpdate(
// // //       { userId, date: normalizedDate },
// // //       {
// // //         userId,
// // //         weeklyPlanId,
// // //         date: normalizedDate,
// // //         plannedWorkoutType,
// // //         actualWorkoutType,
// // //         plannedIntensityLevel,
// // //         plannedVolumeLevel,
// // //         intensityLevelUsed,
// // //         volumeLevelUsed,
// // //         intensityDeviation,
// // //         volumeDeviation,
// // //         completed,
// // //         completionPercentage,
// // //         durationMinutes,
// // //         perceivedExertion,
// // //         painReported,
// // //         injuryRiskFlag,
// // //         recoveryType,
// // //         formQuality,
// // //         energyLevel
// // //       },
// // //       { upsert: true, new: true }
// // //     );

// // //     /* ============================
// // //        RECENT COMPLETION RATE
// // //     ============================= */

// // //     const recentCompletionRate =
// // //       await calculateRecentCompletionRate(userId, 14, normalizedDate);

// // //     /* ============================
// // //        APS CALCULATION
// // //     ============================= */

// // //     const apsScore = calculateAPS({
// // //       completionPercentage,
// // //       perceivedExertion,
// // //       readinessCategory: readinessEntry.readinessCategory,
// // //       recoveryType,
// // //       recentCompletionRate,
// // //       intensityDeviation,
// // //       volumeDeviation,
// // //       formQuality,
// // //       energyLevel,
// // //       painCount: painReported.length
// // //     });

// // //     /* ============================
// // //        STORE APS HISTORY
// // //     ============================= */

// // //     await ApsHistory.findOneAndUpdate(
// // //       { userId, date: normalizedDate },
// // //       {
// // //         userId,
// // //         date: normalizedDate,
// // //         apsScore,
// // //         readinessCategory: readinessEntry.readinessCategory,
// // //         recoveryType
// // //       },
// // //       { upsert: true }
// // //     );

// // //     /* ============================
// // //        HABIT RISK
// // //     ============================= */

// // //     const habitRisk = await predictHabitRisk(userId);

// // //     return res.status(200).json({
// // //       message: "Workout completed successfully",
// // //       session,
// // //       aps: apsScore,
// // //       recoveryType,
// // //       habitRisk
// // //     });

// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       message: "Failed to complete workout",
// // //       error: error.message
// // //     });
// // //   }
// // // };


// //  import { adjustWorkoutForReadiness } from "../services/workout/workoutAdjuster.service.js";
// // import { calculateRecovery } from "../services/recovery/recoveryCalculator.service.js";
// // import { calculateAPS } from "../services/aps/apsCalculator.service.js";
// // import { calculateRecentCompletionRate } from "../services/aps/consistencyCalculator.service.js";
// // import { predictHabitRisk } from "../services/habit/habitPredictor.service.js";
// // import { analyzeNutritionImpact } from "../services/nutrition/nutritionImpact.service.js";
// // import { adjustNextDayReadiness } from "../services/readiness/readinessAdjuster.service.js";



// import WorkoutSession from "../models/WorkoutSession.model.js";
// import DailyReadiness from "../models/DailyReadiness.model.js";
// import ApsHistory from "../models/ApsHistory.model.js";

// import { calculateAPS } from "../services/aps/apsCalculator.service.js";
// import { calculateRecovery } from "../services/recovery/recoveryCalculator.service.js";
// import { calculateRecentCompletionRate } from "../services/aps/consistencyCalculator.service.js";
//  import { predictHabitRisk } from "../services/habit/habitPredictor.service.js";

// export const completeWorkoutSession = async (req, res) => {
//   try {
//     const {
//       userId,
//       weeklyPlanId,
//       date,
//       plannedWorkoutType,
//       actualWorkoutType,
//       plannedIntensityLevel,
//       plannedVolumeLevel,
//       intensityLevelUsed,
//       volumeLevelUsed,
//       completed = true,
//       completionPercentage = 100,
//       durationMinutes,
//       perceivedExertion = 7,
//       painReported = [],
//       injuryRiskFlag = false,
//       formQuality = 7,
//       energyLevel = 7
//     } = req.body;

//     if (!userId || !weeklyPlanId || !date) {
//       return res.status(400).json({
//         message: "userId, weeklyPlanId and date required"
//       });
//     }

//     const [year, month, day] = date.split("-").map(Number);
//     const normalizedDate = new Date(Date.UTC(year, month - 1, day));

//     const readinessEntry = await DailyReadiness.findOne({
//       userId,
//       date: normalizedDate
//     });

//     if (!readinessEntry) {
//       return res.status(400).json({
//         message: "Submit readiness before completing workout"
//       });
//     }

//     const map = { low: 1, moderate: 2, high: 3 };

//     const intensityDeviation =
//       map[intensityLevelUsed] - map[plannedIntensityLevel];

//     const volumeDeviation =
//       map[volumeLevelUsed] - map[plannedVolumeLevel];

//     const recoveryResult = calculateRecovery({
//       readinessCategory: readinessEntry.readinessCategory,
//       perceivedExertion,
//       painReported,
//       injuryRiskFlag,
//       hydrationLevelPercent: readinessEntry.hydrationLevelPercent,
//       nutritionImpact: null
//     });

//     const session = await WorkoutSession.findOneAndUpdate(
//       { userId, date: normalizedDate },
//       {
//         userId,
//         weeklyPlanId,
//         date: normalizedDate,
//         plannedWorkoutType,
//         actualWorkoutType,
//         plannedIntensityLevel,
//         plannedVolumeLevel,
//         intensityLevelUsed,
//         volumeLevelUsed,
//         intensityDeviation,
//         volumeDeviation,
//         completed,
//         completionPercentage,
//         durationMinutes,
//         perceivedExertion,
//         painReported,
//         injuryRiskFlag,
//         recoveryType: recoveryResult.recoveryType,
//         fatigueScore: recoveryResult.fatigueScore,
//         formQuality,
//         energyLevel
//       },
//       { upsert: true, new: true }
//     );

//     const recentCompletionRate =
//       await calculateRecentCompletionRate(userId, 14, normalizedDate);

//     const apsScore = calculateAPS({
//       completionPercentage,
//       perceivedExertion,
//       readinessCategory: readinessEntry.readinessCategory,
//       recoveryType: recoveryResult.recoveryType,
//       recentCompletionRate,
//       intensityDeviation,
//       volumeDeviation,
//       formQuality,
//       energyLevel,
//       fatigueScore: recoveryResult.fatigueScore
//     });

//     await ApsHistory.findOneAndUpdate(
//       { userId, date: normalizedDate },
//       {
//         userId,
//         date: normalizedDate,
//         apsScore,
//         readinessCategory: readinessEntry.readinessCategory,
//         recoveryType: recoveryResult.recoveryType
//       },
//       { upsert: true }
//     );

//     const habitRisk = await predictHabitRisk(userId);

//     return res.status(200).json({
//       message: "Workout completed successfully",
//       session,
//       aps: apsScore,
//       recovery: recoveryResult,
//       habitRisk
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to complete workout",
//       error: error.message
//     });
//   }
// };

// export const getWorkoutByDate = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { date } = req.query;

//     if (!userId || !date) {
//       return res.status(400).json({
//         message: "userId and date required"
//       });
//     }

//     const [year, month, day] = date.split("-").map(Number);
//     const normalizedDate = new Date(Date.UTC(year, month - 1, day));

//     const session = await WorkoutSession.findOne({
//       userId,
//       date: normalizedDate
//     });

//     if (!session) {
//       return res.status(404).json({
//         message: "Workout session not found"
//       });
//     }

//     const apsEntry = await ApsHistory.findOne({
//       userId,
//       date: normalizedDate
//     });

//     return res.status(200).json({
//       session,
//       aps: apsEntry?.apsScore ?? null,
//       recoveryType: session.recoveryType,
//       fatigueScore: session.fatigueScore
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch workout",
//       error: error.message
//     });
//   }
// };

// export const getWorkoutHistory = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { days = 30 } = req.query;

//     const fromDate = new Date();
//     fromDate.setUTCDate(fromDate.getUTCDate() - Number(days));

//     const sessions = await WorkoutSession.find({
//       userId,
//       date: { $gte: fromDate }
//     }).sort({ date: -1 });

//     return res.status(200).json(sessions);

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch workout history",
//       error: error.message
//     });
//   }
// };

import WorkoutSession from "../models/WorkoutSession.model.js";
import DailyReadiness from "../models/DailyReadiness.model.js";
import ApsHistory from "../models/ApsHistory.model.js";

import { calculateAPS } from "../services/aps/apsCalculator.service.js";
import { calculateRecovery } from "../services/recovery/recoveryCalculator.service.js";
import { calculateRecentCompletionRate } from "../services/aps/consistencyCalculator.service.js";
import { predictHabitRisk } from "../services/habit/habitPredictor.service.js";

/* ==========================================================
   INTERNAL DATE HELPERS (kept inside same file)
========================================================== */

const normalizeToUTCDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const getUTCDateRange = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const end = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

  return { start, end };
};

/* ==========================================================
   COMPLETE WORKOUT SESSION
========================================================== */

export const completeWorkoutSession = async (req, res) => {
  try {
    const {
      userId,
      weeklyPlanId,
      date,
      plannedWorkoutType,
      actualWorkoutType,
      plannedIntensityLevel,
      plannedVolumeLevel,
      intensityLevelUsed,
      volumeLevelUsed,
      completed = true,
      completionPercentage = 100,
      durationMinutes,
      perceivedExertion = 7,
      painReported = [],
      injuryRiskFlag = false,
      formQuality = 7,
      energyLevel = 7
    } = req.body;

    /* ---------- Basic Validation ---------- */

    if (!userId || !weeklyPlanId || !date) {
      return res.status(400).json({
        message: "userId, weeklyPlanId and date required"
      });
    }

    /* ---------- Date Handling (FIXED) ---------- */

    const normalizedDate = normalizeToUTCDate(date);
    const { start, end } = getUTCDateRange(date);

    /* ---------- Fetch Readiness (Range Match) ---------- */

    const readinessEntry = await DailyReadiness.findOne({
      userId,
      date: { $gte: start, $lte: end }
    });

    if (!readinessEntry) {
      return res.status(400).json({
        message: "Submit readiness before completing workout"
      });
    }

    /* ---------- Deviation Calculation ---------- */

    const map = { low: 1, moderate: 2, high: 3 };

    const intensityDeviation =
      (map[intensityLevelUsed] || 2) -
      (map[plannedIntensityLevel] || 2);

    const volumeDeviation =
      (map[volumeLevelUsed] || 2) -
      (map[plannedVolumeLevel] || 2);

    /* ---------- Recovery Calculation ---------- */

    const recoveryResult = calculateRecovery({
      readinessCategory: readinessEntry.readinessCategory,
      perceivedExertion,
      painReported,
      injuryRiskFlag,
      hydrationLevelPercent: readinessEntry.hydrationLevelPercent,
      nutritionImpact: null
    });

    /* ---------- Upsert Workout Session ---------- */

    const session = await WorkoutSession.findOneAndUpdate(
      { userId, date: normalizedDate },
      {
        userId,
        weeklyPlanId,
        date: normalizedDate,
        plannedWorkoutType,
        actualWorkoutType,
        plannedIntensityLevel,
        plannedVolumeLevel,
        intensityLevelUsed,
        volumeLevelUsed,
        intensityDeviation,
        volumeDeviation,
        completed,
        completionPercentage,
        durationMinutes,
        perceivedExertion,
        painReported,
        injuryRiskFlag,
        recoveryType: recoveryResult.recoveryType,
        fatigueScore: recoveryResult.fatigueScore,
        formQuality,
        energyLevel
      },
      { upsert: true, new: true }
    );

    /* ---------- Consistency + APS ---------- */

    const recentCompletionRate =
      await calculateRecentCompletionRate(userId, 14, normalizedDate);

    const apsScore = calculateAPS({
      completionPercentage,
      perceivedExertion,
      readinessCategory: readinessEntry.readinessCategory,
      recoveryType: recoveryResult.recoveryType,
      recentCompletionRate,
      intensityDeviation,
      volumeDeviation,
      formQuality,
      energyLevel,
      fatigueScore: recoveryResult.fatigueScore
    });

    /* ---------- Save APS History ---------- */

    await ApsHistory.findOneAndUpdate(
      { userId, date: normalizedDate },
      {
        userId,
        date: normalizedDate,
        apsScore,
        readinessCategory: readinessEntry.readinessCategory,
        recoveryType: recoveryResult.recoveryType
      },
      { upsert: true }
    );

    /* ---------- Habit Risk ---------- */

    const habitRisk = await predictHabitRisk(userId);

    return res.status(200).json({
      message: "Workout completed successfully",
      session,
      aps: apsScore,
      recovery: recoveryResult,
      habitRisk
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to complete workout",
      error: error.message
    });
  }
};

/* ==========================================================
   GET WORKOUT BY DATE
========================================================== */

export const getWorkoutByDate = async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({
        message: "userId and date required"
      });
    }

    const normalizedDate = normalizeToUTCDate(date);

    const session = await WorkoutSession.findOne({
      userId,
      date: normalizedDate
    });

    if (!session) {
      return res.status(404).json({
        message: "Workout session not found"
      });
    }

    const apsEntry = await ApsHistory.findOne({
      userId,
      date: normalizedDate
    });

    return res.status(200).json({
      session,
      aps: apsEntry?.apsScore ?? null,
      recoveryType: session.recoveryType,
      fatigueScore: session.fatigueScore
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch workout",
      error: error.message
    });
  }
};

/* ==========================================================
   GET WORKOUT HISTORY
========================================================== */

export const getWorkoutHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 30 } = req.query;

    const fromDate = new Date();
    fromDate.setUTCDate(fromDate.getUTCDate() - Number(days));

    const sessions = await WorkoutSession.find({
      userId,
      date: { $gte: fromDate }
    }).sort({ date: -1 });

    return res.status(200).json(sessions);

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch workout history",
      error: error.message
    });
  }
};