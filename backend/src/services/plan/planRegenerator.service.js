
// // import WeeklyPlan from "../../models/WeeklyPlan.model.js";
// // import ApsHistory from "../../models/ApsHistory.model.js";
// // import { predictHabitRisk } from "../habit/habitPredictor.service.js";

// // export const regenerateWeeklyPlan = async (userId) => {
// //   // 1️⃣ Get current active plan
// //   const currentPlan = await WeeklyPlan.findOne({
// //     userId,
// //     status: "active"
// //   });

// //   if (!currentPlan) {
// //     throw new Error("No active weekly plan found");
// //   }

// //   // 2️⃣ Fetch APS history (last 14 days)
// //   const apsRecords = await ApsHistory.find({ userId })
// //     .sort({ date: -1 })
// //     .limit(14);

// //   const avgAPS =
// //     apsRecords.reduce((sum, r) => sum + r.apsScore, 0) /
// //     (apsRecords.length || 1);

// //   // 3️⃣ Habit risk
// //   const habitRisk = await predictHabitRisk(userId);

// //   // 4️⃣ Defaults from current plan
// //   let regenSplit = [...currentPlan.workoutSplit];
// //   let regenVolume = currentPlan.baseVolumeLevel;
// //   let regenIntensity = currentPlan.baseIntensityLevel;
// //   let reason = "Maintained existing structure";

// //   // 5️⃣ Bi-weekly adaptation logic
// //   if (avgAPS >= 80 && habitRisk.riskLevel === "low") {
// //     regenVolume = "high";
// //     reason = "High performance across last 2 weeks";
// //   } 
// //   else if (avgAPS < 60) {
// //     regenVolume = "low";
// //     regenIntensity = "low";
// //     regenSplit = regenSplit.slice(0, Math.max(3, regenSplit.length - 1));
// //     reason = "Reduced load due to low consistency over 2 weeks";
// //   }

// //   return {
// //     previousPlanId: currentPlan._id,
// //     workoutSplit: regenSplit,
// //     baseVolumeLevel: regenVolume,
// //     baseIntensityLevel: regenIntensity,
// //     reason
// //   };
// // };


// import WeeklyPlan from "../../models/WeeklyPlan.model.js";
// import ApsHistory from "../../models/ApsHistory.model.js";
// import { predictHabitRisk } from "../habit/habitPredictor.service.js";

// export const regenerateWeeklyPlan = async (userId) => {
//   // 1️⃣ Get current active plan
//   const currentPlan = await WeeklyPlan.findOne({
//     userId,
//     status: "active"
//   });

//   if (!currentPlan) {
//     throw new Error("No active weekly plan found");
//   }

//   // 2️⃣ Fetch APS history (last 14 days)
//   const apsRecords = await ApsHistory.find({ userId })
//     .sort({ date: -1 })
//     .limit(14);

//   const avgAPS =
//     apsRecords.reduce((sum, r) => sum + r.apsScore, 0) /
//     (apsRecords.length || 1);

//   // 3️⃣ Habit risk
//   const habitRisk = await predictHabitRisk(userId);

//   // 4️⃣ Defaults from current plan
//   let regenSplit = [...currentPlan.workoutSplit];
//   let regenVolume = currentPlan.baseVolumeLevel;
//   let regenIntensity = currentPlan.baseIntensityLevel;
//   let reason = "Maintained existing structure";

//   // 5️⃣ Bi-weekly adaptation logic
//   if (avgAPS >= 80 && habitRisk.riskLevel === "low") {
//     regenVolume = "high";
//     reason = "High performance across last 2 weeks";
//   } 
//   else if (avgAPS < 60) {
//     regenVolume = "low";
//     regenIntensity = "low";
//     regenSplit = regenSplit.slice(0, Math.max(3, regenSplit.length - 1));
//     reason = "Reduced load due to low consistency over 2 weeks";
//   }

//   return {
//     previousPlanId: currentPlan._id,
//     workoutSplit: regenSplit,
//     baseVolumeLevel: regenVolume,
//     baseIntensityLevel: regenIntensity,
//     reason
//   };
// };

import WeeklyPlan from "../../models/WeeklyPlan.model.js";
import ApsHistory from "../../models/ApsHistory.model.js";
import { predictHabitRisk } from "../habit/habitPredictor.service.js";

export const regenerateWeeklyPlan = async (userId) => {

  // 1️⃣ Get current active plan
  const currentPlan = await WeeklyPlan.findOne({
    userId,
    status: "active"
  });

  if (!currentPlan) {
    throw new Error("No active weekly plan found");
  }

  // 2️⃣ Fetch APS history (last 14 days)
  const apsRecords = await ApsHistory.find({ userId })
    .sort({ date: -1 })
    .limit(14);

  const avgAPS =
    apsRecords.reduce((sum, r) => sum + r.apsScore, 0) /
    (apsRecords.length || 1);

  // 3️⃣ Habit risk
  const habitRisk = await predictHabitRisk(userId);

  // 4️⃣ Clone existing weeklyStructure (NOT workoutSplit)
  let regenStructure = [...currentPlan.weeklyStructure];

  let regenVolume = currentPlan.baseVolumeLevel;
  let regenIntensity = currentPlan.baseIntensityLevel;
  let reason = "Maintained existing structure";

  // 5️⃣ Adaptation logic
  if (avgAPS >= 80 && habitRisk.riskLevel === "low") {
    regenVolume = "high";
    reason = "Increased volume due to strong performance";
  } 
  else if (avgAPS < 60) {
    regenVolume = "low";
    regenIntensity = "low";
    reason = "Reduced load due to low consistency";

    // reduce one workout day safely
    const workoutIndexes = regenStructure
      .map((d, i) => (!d.isRestDay ? i : -1))
      .filter(i => i !== -1);

    if (workoutIndexes.length > 3) {
      const lastIndex = workoutIndexes[workoutIndexes.length - 1];

      regenStructure[lastIndex] = {
        ...regenStructure[lastIndex],
        workoutType: "rest",
        isRestDay: true
      };
    }
  }

  return {
    previousPlan: currentPlan,
    newStructure: regenStructure,
    baseVolumeLevel: regenVolume,
    baseIntensityLevel: regenIntensity,
    reason
  };
};
