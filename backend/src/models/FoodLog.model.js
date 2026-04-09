import mongoose from "mongoose";

const foodLogSchema = new mongoose.Schema(
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

    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true
    },

    foodName: {
      type: String,
      required: true
    },

    quantity: {
      type: String
    },

    calories: {
      type: Number,
      required: true
    },

    proteinGrams: {
      type: Number,
      default: 0
    },

    carbsGrams: {
      type: Number,
      default: 0
    },

    fatGrams: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("FoodLog", foodLogSchema);
