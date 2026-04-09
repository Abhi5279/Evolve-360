import mongoose from "mongoose";

const DailyNutritionPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    weeklyPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WeeklyPlan",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    workoutType: {
      type: String,
      required: true
    },

    calorieTarget: Number,
    proteinTarget: Number,
    carbsTarget: Number,
    fatsTarget: Number,

    aiGeneratedPlan: {
      type: Object, // full Gemini JSON response
      required: true
    },

    generatedBy: {
      type: String,
      default: "ai"
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "DailyNutritionPlan",
  DailyNutritionPlanSchema
);
