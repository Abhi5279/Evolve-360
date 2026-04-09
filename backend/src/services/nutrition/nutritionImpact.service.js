/**
 * Analyze nutrition impact on recovery & readiness
 */
export const analyzeNutritionImpact = ({
  calorieDifference,
  proteinDifference
}) => {
  let impact = {
    nutritionStatus: "adequate",
    fatiguePenalty: 0,
    reason: "Nutrition intake adequate"
  };

  // Severe calorie deficit
  if (calorieDifference < -500) {
    impact.nutritionStatus = "calorie_deficit";
    impact.fatiguePenalty += 2;
    impact.reason = "Significant calorie deficit";
  }

  // Protein deficit
  if (proteinDifference < -20) {
    impact.nutritionStatus = "protein_deficit";
    impact.fatiguePenalty += 2;
    impact.reason = "Protein intake insufficient for recovery";
  }

  // Combined deficit
  if (calorieDifference < -500 && proteinDifference < -20) {
    impact.nutritionStatus = "severe_deficit";
    impact.fatiguePenalty += 4;
    impact.reason = "Severe calorie and protein deficit";
  }

  return impact;
};
