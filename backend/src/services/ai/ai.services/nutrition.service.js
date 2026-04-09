import { runGeminiJSON } from "../gemini.service.js";
import { buildWeeklyNutritionPrompt } from "../gemini.prompts.js";

export async function generateAINutritionPlan({
  athleteProfile,
  workoutDayPlan,
  calorieTarget,
  macroTargets,
  foodBudgetPerDay,
  dietaryPreference
}) {
  const prompt = buildWeeklyNutritionPrompt({
    athleteProfile,
    workoutDayPlan,
    calorieTarget,
    macroTargets,
    foodBudgetPerDay,
    dietaryPreference
  });

  const aiPlan = await runGeminiJSON({
    prompt
  });

  return aiPlan;
}
