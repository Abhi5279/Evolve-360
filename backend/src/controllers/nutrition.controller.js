import BaselineProfile from "../models/BaselineProfile.model.js";
import WeeklyPlan from "../models/WeeklyPlan.model.js";
import DailyNutritionPlan from "../models/NutritionTarget.model.js";
import { calculateNutritionTargets } from "../services/nutrition/nutritionTarget.service.js";
import { generateAINutritionPlan } from "../services/ai/ai.services/nutrition.service.js";

export const generateDailyNutritionTarget = async (req, res) => {
  try {
    const { userId, date } = req.body;

    if (!userId || !date) {
      return res.status(400).json({
        message: "userId and date are required"
      });
    }

    const baseline = await BaselineProfile.findOne({ userId });
    if (!baseline) {
      return res.status(404).json({
        message: "Baseline profile not found"
      });
    }

    const weeklyPlan = await WeeklyPlan.findOne({
      userId,
      status: "active"
    });

    if (!weeklyPlan) {
      return res.status(404).json({
        message: "No active workout plan found"
      });
    }

    // ✅ Determine day index
    const jsDay = new Date(date).getDay();
    const dayOfWeek = jsDay === 0 ? 7 : jsDay;

    const workoutDayPlan = weeklyPlan.weeklyStructure.find(
      (d) => d.day === dayOfWeek
    );

    if (!workoutDayPlan) {
      return res.status(400).json({
        message: "Workout structure not found for this day"
      });
    }

    // ✅ Base macro calculation
    const targets = calculateNutritionTargets({
      weightKg: baseline.weightKg,
      heightCm: baseline.heightCm,
      age: baseline.age,
      gender: baseline.gender,
      fitnessGoal: baseline.fitnessGoal,
      dailyActivityLevel: baseline.dailyActivityLevel,
      foodBudgetPerDay: baseline.foodBudgetPerDay
    });

    // 🔥 Workout-based calorie cycling
    let calorieAdjustment = 0;

    switch (workoutDayPlan.workoutType) {
      case "lower":
      case "full":
        calorieAdjustment = 150;
        break;
      case "push":
      case "pull":
      case "upper":
        calorieAdjustment = 100;
        break;
      case "rest":
        calorieAdjustment = -250;
        break;
    }

    const adjustedCalories =
      targets.caloriesTarget + calorieAdjustment;

    const aiNutritionPlan = await generateAINutritionPlan({
      athleteProfile: baseline,
      workoutDayPlan,
      calorieTarget: adjustedCalories,
      macroTargets: {
        protein: targets.proteinGrams,
        carbs: targets.carbsGrams,
        fats: targets.fatGrams
      },
      foodBudgetPerDay: baseline.foodBudgetPerDay,
      dietaryPreference: baseline.dietaryPreference
    });

    // ✅ Save or update nutrition plan
    const savedPlan = await DailyNutritionPlan.findOneAndUpdate(
      { userId, date },
      {
        userId,
        weeklyPlanId: weeklyPlan._id,
        date,
        workoutType: workoutDayPlan.workoutType,
        calorieTarget: adjustedCalories,
        proteinTarget: targets.proteinGrams,
        carbsTarget: targets.carbsGrams,
        fatsTarget: targets.fatGrams,
        aiGeneratedPlan: aiNutritionPlan,
        generatedBy: "rule+ai"
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Workout-aligned AI nutrition plan generated & saved",
      nutritionPlan: savedPlan
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate AI nutrition plan",
      error: error.message
    });
  }
};

export const getDailyNutritionTarget = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({
        message: "userId and date are required"
      });
    }

    const parsedDate = new Date(date);

    const nutritionPlan = await DailyNutritionPlan.findOne({
      userId,
      date: parsedDate
    });

    if (!nutritionPlan) {
      return res.status(404).json({
        message: "Nutrition plan not found for this date"
      });
    }

    return res.status(200).json({
      message: "Nutrition plan fetched successfully",
      nutritionPlan
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch nutrition plan",
      error: error.message
    });
  }
};
