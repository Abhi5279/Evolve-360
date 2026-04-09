import mongoose from "mongoose";

const painAnalysisSchema = new mongoose.Schema(
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

    painLocation: String,
    painIntensity: Number,
    painIncreaseAfterActivity: Boolean,
    morningStiffnessMinutes: Number,

    protectiveMode: Boolean,
    protectiveAction: String,
    clinicalFlags: [String],

    aiInsight: String,

    riskScore: Number,        // 0–100
    inflammationIndex: Number,
    overloadIndex: Number,
  },
  { timestamps: true }
);

export default mongoose.model("PainAnalysis", painAnalysisSchema);