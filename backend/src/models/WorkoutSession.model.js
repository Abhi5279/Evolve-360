// // // // src/models/WorkoutSession.model.js

// // // import mongoose from "mongoose";

// // // const workoutSessionSchema = new mongoose.Schema(
// // //   {
// // //     userId: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true
// // //     },

// // //     weeklyPlanId: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "WeeklyPlan",
// // //       required: true
// // //     },

// // //     date: {
// // //       type: Date,
// // //       required: true
// // //     },

// // //     // What was planned for today
// // //     plannedWorkoutType: {
// // //       type: String,
// // //       // e.g. "upper", "lower", "full", "rest"
// // //       required: true
// // //     },

// // //     // What user actually performed
// // //     actualWorkoutType: {
// // //       type: String
// // //     },

// // //     // Intensity & volume relative to plan
// // //     intensityLevelUsed: {
// // //       type: String,
// // //       enum: ["low", "moderate", "high"]
// // //     },

// // //     volumeLevelUsed: {
// // //       type: String,
// // //       enum: ["low", "moderate", "high"]
// // //     },

// // //     // Completion tracking
// // //     completed: {
// // //       type: Boolean,
// // //       default: false
// // //     },

// // //     completionPercentage: {
// // //       type: Number,
// // //       min: 0,
// // //       max: 100
// // //     },

// // //     durationMinutes: {
// // //       type: Number
// // //     },

// // //     // Safety & feedback
// // //     painReported: {
// // //       type: [String], // e.g. ["knee", "shoulder"]
// // //       default: []
// // //     },

// // //     injuryRiskFlag: {
// // //       type: Boolean,
// // //       default: false
// // //     },

// // //     perceivedExertion: {
// // //       type: Number,
// // //       min: 1,
// // //       max: 10
// // //     },

// // //     notes: {
// // //       type: String
// // //     }
// // //   },
// // //   {
// // //     timestamps: true
// // //   }
// // // );

// // // // One workout session per user per day
// // // workoutSessionSchema.index({ userId: 1, date: 1 }, { unique: true });

// // // const WorkoutSession = mongoose.model(
// // //   "WorkoutSession",
// // //   workoutSessionSchema
// // // );

// // // export default WorkoutSession;

// // import mongoose from "mongoose";

// // const workoutSessionSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       required: true,
// //       ref: "User"
// //     },

// //     weeklyPlanId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       required: true,
// //       ref: "WeeklyPlan"
// //     },

// //     date: {
// //       type: Date,
// //       required: true
// //     },

// //     plannedWorkoutType: String,
// //     actualWorkoutType: String,

// //     intensityLevelUsed: String,
// //     volumeLevelUsed: String,

// //     completed: Boolean,
// //     completionPercentage: Number,

// //     durationMinutes: Number,
// //     painReported: [String],

// //     perceivedExertion: Number,
// //     injuryRiskFlag: Boolean
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("WorkoutSession", workoutSessionSchema);

// import mongoose from "mongoose";

// const workoutSessionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true
//     },

//     weeklyPlanId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "WeeklyPlan",
//       required: true
//     },

//     // 🔥 Optional AI deep session link
//     aiSessionId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "AIDetailedSession",
//       default: null
//     },

//     date: {
//       type: Date,
//       required: true
//     },

//     // Planned vs actual
//     plannedWorkoutType: {
//       type: String,
//       required: true
//     },

//     actualWorkoutType: {
//       type: String
//     },

//     intensityLevelUsed: {
//       type: String,
//       enum: ["low", "moderate", "high"]
//     },

//     volumeLevelUsed: {
//       type: String,
//       enum: ["low", "moderate", "high"]
//     },

//     // Completion tracking
//     completed: {
//       type: Boolean,
//       default: false
//     },

//     completionPercentage: {
//       type: Number,
//       min: 0,
//       max: 100
//     },

//     durationMinutes: {
//       type: Number
//     },

//     // Feedback
//     painReported: {
//       type: [String],
//       default: []
//     },

//     perceivedExertion: {
//       type: Number,
//       min: 1,
//       max: 10
//     },

//     injuryRiskFlag: {
//       type: Boolean,
//       default: false
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// /**
//  * One workout session per user per day
//  */
// workoutSessionSchema.index(
//   { userId: 1, date: 1 },
//   { unique: true }
// );

// const WorkoutSession = mongoose.model(
//   "WorkoutSession",
//   workoutSessionSchema
// );

// export default WorkoutSession;



import mongoose from "mongoose";

const workoutSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    weeklyPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WeeklyPlan",
      required: true
    },

    aiSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIDetailedSession",
      default: null
    },

    date: {
      type: Date,
      required: true
    },

    plannedWorkoutType: {
      type: String,
      required: true
    },

    actualWorkoutType: {
      type: String
    },

    plannedIntensityLevel: {
      type: String,
      enum: ["low", "moderate", "high"]
    },

    plannedVolumeLevel: {
      type: String,
      enum: ["low", "moderate", "high"]
    },

    intensityLevelUsed: {
      type: String,
      enum: ["low", "moderate", "high"]
    },

    volumeLevelUsed: {
      type: String,
      enum: ["low", "moderate", "high"]
    },

    intensityDeviation: {
      type: Number,
      default: 0
    },

    volumeDeviation: {
      type: Number,
      default: 0
    },

    completed: {
      type: Boolean,
      default: false
    },

    completionPercentage: {
      type: Number,
      min: 0,
      max: 100
    },

    durationMinutes: {
      type: Number
    },

    painReported: {
      type: [String],
      default: []
    },

    perceivedExertion: {
      type: Number,
      min: 1,
      max: 10
    },

    injuryRiskFlag: {
      type: Boolean,
      default: false
    },

    recoveryType: {
      type: String,
      default: "none"
    },

    fatigueScore: {
      type: Number,
      default: 0
    },

    formQuality: {
      type: Number,
      min: 1,
      max: 10
    },

    energyLevel: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  { timestamps: true }
);

workoutSessionSchema.index(
  { userId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("WorkoutSession", workoutSessionSchema);