import mongoose from "mongoose";

const dailyNutritionSummarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    // Target
    targetCalories: Number,
    targetProtein: Number,
    targetCarbs: Number,
    targetFat: Number,

    // Actual
    consumedCalories: Number,
    consumedProtein: Number,
    consumedCarbs: Number,
    consumedFat: Number,

    // Gaps
    calorieDifference: Number, // + surplus, - deficit
    proteinDifference: Number,

    status: {
      type: String,
      enum: ["on_track", "under", "over"],
      default: "on_track"
    }
  },
  { timestamps: true }
);

dailyNutritionSummarySchema.index(
  { userId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model(
  "DailyNutritionSummary",
  dailyNutritionSummarySchema
);


