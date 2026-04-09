import mongoose from "mongoose";

const functionalTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    userProfile: {
      age: Number,
      gender: String,
      height: Number,
      weight: Number,
      activityLevel: String,
    },

    testType: {
      type: String,
      required: true,
    },

    userTime: {
      type: Number,
      required: true,
    },

    aiExpectedTime: {
      type: Number,
      required: true,
    },

    deviationSeconds: Number,
    deviationPercentage: Number,

    performanceCategory: String,

    performanceScore: Number, // 0–100 normalized

    severityIndex: Number, // weighted impairment indicator
  },
  { timestamps: true }
);

export default mongoose.model("FunctionalTest", functionalTestSchema);