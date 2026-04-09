export const calculateNutritionTargets = ({
  weightKg,
  heightCm,
  age,
  gender,
  fitnessGoal,
  dailyActivityLevel,
  foodBudgetPerDay
}) => {
  // 1️⃣ BMR – Mifflin-St Jeor
  let bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };

  let calories =
    bmr * (activityMultiplier[dailyActivityLevel] || 1.2);

  // 2️⃣ Goal calorie adjustment
  let calorieDelta = 0;

  if (fitnessGoal === "fat_loss") calorieDelta = -400;
  if (fitnessGoal === "muscle_gain") calorieDelta = 300;

  calories = Math.round(calories + calorieDelta);

  const goalType =
    calorieDelta < 0
      ? "deficit"
      : calorieDelta > 0
      ? "surplus"
      : "maintenance";

  // 3️⃣ Protein
  const proteinMultiplier =
    fitnessGoal === "muscle_gain" ? 2.0 : 1.6;

  const proteinGrams = Math.round(weightKg * proteinMultiplier);

  // 4️⃣ Fat %
  let fatPercentage = 0.25;

  if (fitnessGoal === "fat_loss") fatPercentage = 0.30;
  if (fitnessGoal === "muscle_gain") fatPercentage = 0.22;

  const fatCalories = calories * fatPercentage;
  const fatGrams = Math.round(fatCalories / 9);

  // 5️⃣ Carbs
  const remainingCalories =
    calories - proteinGrams * 4 - fatGrams * 9;

  const carbsGrams = Math.round(remainingCalories / 4);

  // 6️⃣ Carb timing hint
  let carbPriority = "balanced";
  if (fitnessGoal === "muscle_gain")
    carbPriority = "performance_high";
  if (fitnessGoal === "fat_loss")
    carbPriority = "controlled";

  // 7️⃣ Budget tier
  let budgetTier = "medium";
  if (foodBudgetPerDay < 150) budgetTier = "low";
  else if (foodBudgetPerDay > 300) budgetTier = "high";

  return {
    caloriesTarget: calories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    goalType,
    calorieDelta,
    carbPriority,
    budgetTier
  };
};
