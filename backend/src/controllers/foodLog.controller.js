import FoodLog from "../models/FoodLog.model.js";

export const logFood = async (req, res) => {
  try {
    const {
      userId,
      date,
      mealType,
      foodName,
      quantity,
      calories,
      proteinGrams = 0,
      carbsGrams = 0,
      fatGrams = 0
    } = req.body;

    if (!userId || !date || !mealType || !foodName || calories == null) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const foodLog = await FoodLog.create({
      userId,
      date,
      mealType,
      foodName,
      quantity,
      calories,
      proteinGrams,
      carbsGrams,
      fatGrams
    });

    return res.status(201).json({
      message: "Food logged successfully",
      foodLog
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to log food",
      error: error.message
    });
  }
};
