// import mongoose from "mongoose";

// const trainingAnalysisSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       index: true,
//     },

//     date: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     plannedIntensity: Number,
//     actualIntensity: Number,
//     plannedVolume: Number,
//     actualVolume: Number,
//     completionPercent: Number,

//     intensityDelta: Number,
//     volumeDeviation: Number,

//     condition: String,
//     systemBehavior: String,

//     fatigueIndex: Number,
//     overloadScore: Number,
//     adaptiveCapacityScore: Number,

//     nextSessionDirective: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("TrainingAnalysis", trainingAnalysisSchema);

import mongoose from "mongoose";

const trainingAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
      index: true,
    },

    sessionType: String,
    muscleGroups: [String],
    durationMinutes: Number,
    totalSets: Number,
    totalReps: Number,
    weightUsed: Number,

    perceivedExertion: Number,
    volumeLevel: String,
    intensityLevel: String,
    completionRate: Number,

    energyLevel: Number,
    sleepQuality: Number,
    stressLevel: Number,
    injuryFlag: Boolean,
    notes: String,

    fatigueIndex: Number,
    recoveryRisk: Number,
    adaptiveCapacity: Number,
    condition: String,

    performanceScore: Number,
    feedback: String,
  },
  { timestamps: true }
);

export default mongoose.model("TrainingAnalysis", trainingAnalysisSchema);