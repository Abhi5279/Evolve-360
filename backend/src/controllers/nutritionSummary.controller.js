// import NutritionTarget from "../models/NutritionTarget.model.js";
// import FoodLog from "../models/FoodLog.model.js";
// import DailyNutritionSummary from "../models/DailyNutritionSummary.model.js";

// export const generateDailyNutritionSummary = async (req, res) => {
//   try {
//     const { userId, date } = req.query;

//     if (!userId || !date) {
//       return res.status(400).json({
//         message: "userId and date are required"
//       });
//     }

//     // 1️⃣ Fetch nutrition target for the day
//     const target = await NutritionTarget.findOne({ userId, date });

//     if (!target) {
//       return res.status(404).json({
//         message: "Nutrition target not found for this date"
//       });
//     }

//     // 2️⃣ Fetch all food logs for the day
//     const foodLogs = await FoodLog.find({ userId, date });

//     // 3️⃣ Aggregate consumed nutrition
//     const totals = foodLogs.reduce(
//       (acc, food) => {
//         acc.calories += food.calories || 0;
//         acc.protein += food.proteinGrams || 0;
//         acc.carbs += food.carbsGrams || 0;
//         acc.fat += food.fatGrams || 0;
//         return acc;
//       },
//       { calories: 0, protein: 0, carbs: 0, fat: 0 }
//     );

//     // 4️⃣ SAFE targets (prevents NaN)
//     const targetCalories = target.caloriesTarget ?? 0;
//     const targetProtein = target.proteinTarget ?? 0;
//     const targetCarbs = target.carbsTarget ?? 0;
//     const targetFat = target.fatTarget ?? 0;

//     // 5️⃣ Differences
//     const calorieDifference = totals.calories - targetCalories;
//     const proteinDifference = totals.protein - targetProtein;

//     // 6️⃣ Status logic
//     let status = "on_track";
//     if (calorieDifference < -200) status = "under";
//     if (calorieDifference > 200) status = "over";

//     // 7️⃣ Save or update daily summary
//     const summary = await DailyNutritionSummary.findOneAndUpdate(
//       { userId, date },
//       {
//         userId,
//         date,

//         // Targets
//         targetCalories,
//         targetProtein,
//         targetCarbs,
//         targetFat,

//         // Consumed
//         consumedCalories: totals.calories,
//         consumedProtein: totals.protein,
//         consumedCarbs: totals.carbs,
//         consumedFat: totals.fat,

//         // Differences
//         calorieDifference,
//         proteinDifference,
//         status
//       },
//       { upsert: true, new: true }
//     );

//     // 8️⃣ Response
//     return res.status(200).json({
//       message: "Daily nutrition summary generated",
//       summary
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to generate nutrition summary",
//       error: error.message
//     });
//   }
// };


// export const getDailyNutritionSummary = async (req, res) => {
//   try {
//     const { userId, date } = req.query;

//     if (!userId || !date) {
//       return res.status(400).json({
//         message: "userId and date are required"
//       });
//     }

//     const parsedDate = new Date(date);
//     parsedDate.setHours(0, 0, 0, 0);

//     const summary = await DailyNutritionSummary.findOne({
//       userId,
//       date: parsedDate
//     });

//     if (!summary) {
//       return res.status(404).json({
//         message: "No summary found for this date"
//       });
//     }

//     return res.status(200).json({
//       message: "Daily nutrition summary fetched",
//       summary
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch nutrition summary",
//       error: error.message
//     });
//   }
// };


import DailyNutritionPlan from "../models/NutritionTarget.model.js"; 
import FoodLog from "../models/FoodLog.model.js";
import DailyNutritionSummary from "../models/DailyNutritionSummary.model.js";

/* =========================================================
   GENERATE & SAVE DAILY SUMMARY
========================================================= */

export const generateDailyNutritionSummary = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({
        message: "userId and date are required"
      });
    }

    // ✅ Normalize date (CRITICAL)
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    /* 1️⃣ Fetch nutrition target for the day */
    const target = await DailyNutritionPlan.findOne({
      userId,
      date: parsedDate
    });

    if (!target) {
      return res.status(404).json({
        message: "Nutrition target not found for this date"
      });
    }

    /* 2️⃣ Fetch all food logs for the day */
    const foodLogs = await FoodLog.find({
      userId,
      date: parsedDate
    });

    /* 3️⃣ Aggregate consumed nutrition */
    const totals = foodLogs.reduce(
      (acc, food) => {
        acc.calories += food.calories || 0;
        acc.protein += food.proteinGrams || 0;
        acc.carbs += food.carbsGrams || 0;
        acc.fat += food.fatGrams || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    /* 4️⃣ Safe targets */
    const targetCalories = target.calorieTarget ?? 0;
    const targetProtein = target.proteinTarget ?? 0;
    const targetCarbs = target.carbsTarget ?? 0;
    const targetFat = target.fatsTarget ?? 0;

    /* 5️⃣ Differences */
    const calorieDifference = totals.calories - targetCalories;
    const proteinDifference = totals.protein - targetProtein;

    /* 6️⃣ Status Logic */
    let status = "on_track";
    if (calorieDifference < -200) status = "under";
    if (calorieDifference > 200) status = "over";

    /* 7️⃣ Save or Update Summary */
    const summary = await DailyNutritionSummary.findOneAndUpdate(
      { userId, date: parsedDate },
      {
        userId,
        date: parsedDate,

        // Targets
        targetCalories,
        targetProtein,
        targetCarbs,
        targetFat,

        // Consumed
        consumedCalories: totals.calories,
        consumedProtein: totals.protein,
        consumedCarbs: totals.carbs,
        consumedFat: totals.fat,

        // Differences
        calorieDifference,
        proteinDifference,
        status
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Daily nutrition summary generated",
      summary
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate nutrition summary",
      error: error.message
    });
  }
};


/* =========================================================
   FETCH EXISTING SUMMARY (NO REGENERATION)
========================================================= */

export const getDailyNutritionSummary = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({
        message: "userId and date are required"
      });
    }

    // ✅ Normalize date
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    const summary = await DailyNutritionSummary.findOne({
      userId,
      date: parsedDate
    });

    if (!summary) {
      return res.status(404).json({
        message: "No summary found for this date"
      });
    }

    return res.status(200).json({
      message: "Daily nutrition summary fetched",
      summary
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch nutrition summary",
      error: error.message
    });
  }
};
