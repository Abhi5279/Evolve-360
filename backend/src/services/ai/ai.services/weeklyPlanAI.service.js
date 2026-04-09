import { runGeminiJSON } from "../gemini.service.js";
import { buildWeeklyWorkoutPrompt } from "../gemini.prompts.js";


export async function generateDetailedPlanWithAI({
  athleteProfile,
  weeklySkeleton,
  currentPhase
}) {
  const prompt = buildWeeklyWorkoutPrompt({
    athleteProfile,
    weeklySkeleton,
    currentPhase
  });

  const aiPlan = await runGeminiJSON({
    prompt
  });

  return aiPlan;
}
