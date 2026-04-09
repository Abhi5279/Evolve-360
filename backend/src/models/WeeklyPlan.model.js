
// // // // import mongoose from "mongoose";

// // // // const weeklyPlanSchema = new mongoose.Schema(
// // // //   {
// // // //     // --------------------
// // // //     // USER & TIME RANGE
// // // //     // --------------------
// // // //     userId: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //       index: true
// // // //     },

// // // //     weekStartDate: {
// // // //       type: Date,
// // // //       required: true
// // // //     },

// // // //     weekEndDate: {
// // // //       type: Date,
// // // //       required: true
// // // //     },

// // // //     // --------------------
// // // //     // RULE-BASED STRUCTURE
// // // //     // --------------------
// // // //     weeklyStructure: {
// // // //       type: [
// // // //         {
// // // //           day: {
// // // //             type: Number,
// // // //             min: 1,
// // // //             max: 7,
// // // //             required: true
// // // //           },
// // // //           workoutType: {
// // // //             type: String,
// // // //             required: true
// // // //           },
// // // //           isRestDay: {
// // // //             type: Boolean,
// // // //             required: true
// // // //           }
// // // //         }
// // // //       ],
// // // //       required: true
// // // //     },

// // // //     plannedWorkoutDays: {
// // // //       type: Number,
// // // //       required: true
// // // //     },

// // // //     baseIntensityLevel: {
// // // //       type: String,
// // // //       enum: ["low", "moderate", "high"],
// // // //       required: true
// // // //     },

// // // //     baseVolumeLevel: {
// // // //       type: String,
// // // //       enum: ["low", "moderate", "high"],
// // // //       required: true
// // // //     },

// // // //     // --------------------
// // // //     // AI GENERATED PLAN
// // // //     // --------------------
// // // //     detailedPlan: {
// // // //       type: mongoose.Schema.Types.Mixed,
// // // //       default: null
// // // //     },

// // // //     needsRegeneration: {
// // // //       type: Boolean,
// // // //       default: false
// // // //     },

// // // //     generatedBy: {
// // // //       type: String,
// // // //       enum: ["rule-engine", "rule+ai"],
// // // //       default: "rule-engine"
// // // //     },

// // // //     // --------------------
// // // //     // MULTI-WEEK CONTROL
// // // //     // --------------------
// // // //     planDurationWeeks: {
// // // //       type: Number,
// // // //       default: 3
// // // //     },

// // // //     currentWeek: {
// // // //       type: Number,
// // // //       default: 1
// // // //     },

// // // //     weeklyAttendance: {
// // // //       type: [
// // // //         {
// // // //           week: {
// // // //             type: Number,
// // // //             min: 1,
// // // //             required: true
// // // //           },
// // // //           days: {
// // // //             type: [
// // // //               {
// // // //                 day: {
// // // //                   type: Number,
// // // //                   min: 1,
// // // //                   max: 7,
// // // //                   required: true
// // // //                 },
// // // //                 status: {
// // // //                   type: String,
// // // //                   enum: ["pending", "completed", "missed"],
// // // //                   default: "pending"
// // // //                 },
// // // //                 completedAt: {
// // // //                   type: Date,
// // // //                   default: null
// // // //                 }
// // // //               }
// // // //             ],
// // // //             required: true
// // // //           }
// // // //         }
// // // //       ],
// // // //       default: []
// // // //     },

// // // //     // --------------------
// // // //     // METADATA
// // // //     // --------------------
// // // //     generatedFromBaseline: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "BaselineProfile",
// // // //       required: true
// // // //     },

// // // //     planVersion: {
// // // //       type: Number,
// // // //       default: 1
// // // //     },

// // // //     status: {
// // // //       type: String,
// // // //       enum: ["active", "completed", "archived"],
// // // //       default: "active"
// // // //     }
// // // //   },
// // // //   {
// // // //     timestamps: true
// // // //   }
// // // // );

// // // // // 🔹 Performance index
// // // // weeklyPlanSchema.index({ userId: 1, status: 1 });

// // // // const WeeklyPlan = mongoose.model("WeeklyPlan", weeklyPlanSchema);

// // // // export default WeeklyPlan;

// // // import mongoose from "mongoose";

// // // const progressSchema = new mongoose.Schema(
// // //   {
// // //     completed: { type: Boolean, default: false },
// // //     completionPercentage: { type: Number, default: 0 },
// // //     durationMinutes: { type: Number },
// // //     perceivedExertion: { type: Number },
// // //     completedAt: { type: Date }
// // //   },
// // //   { _id: false }
// // // );

// // // const weeklyPlanSchema = new mongoose.Schema(
// // //   {
// // //     userId: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       required: true,
// // //       ref: "User"
// // //     },

// // //     generatedFromBaseline: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "BaselineProfile"
// // //     },

// // //     workoutSplit: [String],

// // //     plannedWorkoutDays: Number,

// // //     baseVolumeLevel: String,
// // //     baseIntensityLevel: String,

// // //     weeklyStructure: Object,
// // //     detailedPlan: Object,

// // //     weekStartDate: Date,
// // //     weekEndDate: Date,

// // //     planVersion: { type: Number, default: 1 },

// // //     status: {
// // //       type: String,
// // //       enum: ["active", "archived"],
// // //       default: "active"
// // //     },

// // //     generatedBy: {
// // //       type: String,
// // //       enum: ["rule", "rule+ai"],
// // //       default: "rule"
// // //     },

// // //     // 🔥 NEW PROGRESS MAP
// // //     progress: {
// // //       type: Map,
// // //       of: progressSchema,
// // //       default: {}
// // //     },

// // //     overallCompletionRate: {
// // //       type: Number,
// // //       default: 0
// // //     },

// // //     needsRegeneration: {
// // //       type: Boolean,
// // //       default: false
// // //     }
// // //   },
// // //   { timestamps: true }
// // // );

// // // export default mongoose.model("WeeklyPlan", weeklyPlanSchema);

// // import mongoose from "mongoose";

// // /* =========================================
// //    Weekly Structure (Rule-Based Only)
// // ========================================= */

// // const weeklyStructureSchema = new mongoose.Schema(
// //   {
// //     day: {
// //       type: Number,
// //       min: 1,
// //       max: 7,
// //       required: true
// //     },

// //     workoutType: {
// //       type: String,
// //       required: true
// //     },

// //     isRestDay: {
// //       type: Boolean,
// //       required: true
// //     }
// //   },
// //   { _id: false }
// // );

// // /* =========================================
// //    Progress Schema (Execution Tracking)
// // ========================================= */

// // const progressSchema = new mongoose.Schema(
// //   {
// //     completed: { type: Boolean, default: false },
// //     completionPercentage: { type: Number, default: 0 },
// //     durationMinutes: { type: Number },
// //     perceivedExertion: { type: Number },
// //     completedAt: { type: Date }
// //   },
// //   { _id: false }
// // );

// // /* =========================================
// //    Weekly Plan Schema (BASE PLAN ONLY)
// // ========================================= */

// // const weeklyPlanSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //       index: true
// //     },

// //     generatedFromBaseline: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "BaselineProfile",
// //       required: true
// //     },

// //     weekStartDate: {
// //       type: Date,
// //       required: true
// //     },

// //     weekEndDate: {
// //       type: Date,
// //       required: true
// //     },

// //     weeklyStructure: {
// //       type: [weeklyStructureSchema],
// //       required: true
// //     },

// //     plannedWorkoutDays: {
// //       type: Number,
// //       required: true
// //     },

// //     baseVolumeLevel: {
// //       type: String,
// //       enum: ["low", "moderate", "high"],
// //       required: true
// //     },

// //     baseIntensityLevel: {
// //       type: String,
// //       enum: ["low", "moderate", "high"],
// //       required: true
// //     },

// //     // 🔥 Progress Tracking
// //     progress: {
// //       type: Map,
// //       of: progressSchema,
// //       default: {}
// //     },

// //     overallCompletionRate: {
// //       type: Number,
// //       default: 0
// //     },

// //     // 🔥 Regeneration Flag (for base edits)
// //     needsRegeneration: {
// //       type: Boolean,
// //       default: false
// //     },

// //     planVersion: {
// //       type: Number,
// //       default: 1
// //     },

// //     status: {
// //       type: String,
// //       enum: ["active", "archived"],
// //       default: "active"
// //     }
// //   },
// //   {
// //     timestamps: true
// //   }
// // );

// // /* =========================================
// //    Indexes
// // ========================================= */

// // // One active plan per user
// // weeklyPlanSchema.index({ userId: 1, status: 1 });

// // const WeeklyPlan = mongoose.model("WeeklyPlan", weeklyPlanSchema);

// // export default WeeklyPlan;


// import mongoose from "mongoose";

// /* =========================================
//    Weekly Structure
// ========================================= */
// const weeklyStructureSchema = new mongoose.Schema(
//   {
//     day: { type: Number, min: 1, max: 7, required: true },
//     workoutType: { type: String, required: true },
//     isRestDay: { type: Boolean, required: true }
//   },
//   { _id: false }
// );

// /* =========================================
//    Progress Schema
// ========================================= */
// const progressSchema = new mongoose.Schema(
//   {
//     completed: { type: Boolean, default: false },
//     completionPercentage: { type: Number, default: 0 },
//     durationMinutes: Number,
//     perceivedExertion: Number,
//     completedAt: Date
//   },
//   { _id: false }
// );

// /* =========================================
//    Weekly Progress Block
// ========================================= */
// const weeklyProgressSchema = new mongoose.Schema(
//   {
//     weekNumber: { type: Number, required: true },
//     progress: {
//       type: Map,
//       of: progressSchema,
//       default: {}
//     },
//     overallCompletionRate: {
//       type: Number,
//       default: 0
//     }
//   },
//   { _id: false }
// );

// /* =========================================
//    Weekly Plan Schema
// ========================================= */
// const weeklyPlanSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     generatedFromBaseline: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "BaselineProfile",
//       required: true
//     },

//     weekStartDate: {
//       type: Date,
//       required: true
//     },

//     planDurationWeeks: {
//       type: Number,
//       default: 3
//     },

//     currentWeek: {
//       type: Number,
//       default: 1
//     },

//     weeklyStructure: {
//       type: [weeklyStructureSchema],
//       required: true
//     },

//     plannedWorkoutDays: {
//       type: Number,
//       required: true
//     },

//     baseVolumeLevel: {
//       type: String,
//       enum: ["low", "moderate", "high"],
//       required: true
//     },

//     baseIntensityLevel: {
//       type: String,
//       enum: ["low", "moderate", "high"],
//       required: true
//     },

//     weeklyProgress: {
//       type: [weeklyProgressSchema],
//       default: []
//     },

//     planVersion: {
//       type: Number,
//       default: 1
//     },

//     status: {
//       type: String,
//       enum: ["active", "archived"],
//       default: "active"
//     }
//   },
//   { timestamps: true }
// );

// weeklyPlanSchema.index({ userId: 1, status: 1 });

// export default mongoose.model("WeeklyPlan", weeklyPlanSchema);


// import mongoose from "mongoose";

// /* =========================================
//    Weekly Structure (Rule-Based Only)
// ========================================= */

// const weeklyStructureSchema = new mongoose.Schema(
//   {
//     day: {
//       type: Number,
//       min: 1,
//       max: 7,
//       required: true
//     },
//     workoutType: {
//       type: String,
//       required: true
//     },
//     isRestDay: {
//       type: Boolean,
//       required: true
//     }
//   },
//   { _id: false }
// );

// /* =========================================
//    Attendance Tracking
// ========================================= */

// const attendanceSchema = new mongoose.Schema(
//   {
//     week: {
//       type: Number,
//       required: true
//     },
//     days: [
//       {
//         day: { type: Number, min: 1, max: 7 },
//         status: {
//           type: String,
//           enum: ["pending", "completed", "missed"],
//           default: "pending"
//         },
//         completedAt: Date
//       }
//     ]
//   },
//   { _id: false }
// );

// /* =========================================
//    Weekly Plan Schema
// ========================================= */

// const weeklyPlanSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true
//     },

//     generatedFromBaseline: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "BaselineProfile",
//       required: true
//     },

//     // 🔹 Structure Only
//     weeklyStructure: {
//       type: [weeklyStructureSchema],
//       required: true
//     },

//     plannedWorkoutDays: {
//       type: Number,
//       required: true
//     },

//     baseVolumeLevel: {
//       type: String,
//       enum: ["low", "moderate", "high"],
//       required: true
//     },

//     baseIntensityLevel: {
//       type: String,
//       enum: ["low", "moderate", "high"],
//       required: true
//     },

//     // 🔹 Plan Duration
//     planDurationWeeks: {
//       type: Number,
//       default: 3
//     },

//     currentWeek: {
//       type: Number,
//       default: 1
//     },

//     weeklyAttendance: {
//       type: [attendanceSchema],
//       default: []
//     },

//     // 🔹 AI Detailed Plan (optional)
//     detailedPlan: {
//       type: mongoose.Schema.Types.Mixed,
//       default: null
//     },

//     generatedBy: {
//       type: String,
//       enum: ["rule", "rule+ai"],
//       default: "rule"
//     },

//     planVersion: {
//       type: Number,
//       default: 1
//     },

//     status: {
//       type: String,
//       enum: ["active", "archived","completed"],
//       default: "active"
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// // 🔥 Ensure only one active plan per user
// weeklyPlanSchema.index({ userId: 1, status: 1 });

// export default mongoose.model("WeeklyPlan", weeklyPlanSchema);


import mongoose from "mongoose";

/* =========================================
   Weekly Structure (Rule-Based Only)
========================================= */

const weeklyStructureSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      min: 1,
      max: 7,
      required: true
    },
    workoutType: {
      type: String,
      required: true
    },
    isRestDay: {
      type: Boolean,
      required: true
    }
  },
  { _id: false }
);

/* =========================================
   Weekly Plan Schema (CLEAN VERSION)
========================================= */

const weeklyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    generatedFromBaseline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BaselineProfile",
      required: true
    },

    // 🔹 Rule-Based Structure Only
    weeklyStructure: {
      type: [weeklyStructureSchema],
      required: true
    },

    plannedWorkoutDays: {
      type: Number,
      required: true
    },

    baseVolumeLevel: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true
    },

    baseIntensityLevel: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true
    },

    // 🔹 AI Detailed Weekly Plan
    detailedPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    generatedBy: {
      type: String,
      enum: ["rule", "rule+ai"],
      default: "rule"
    },

    planVersion: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

// One active plan per user
weeklyPlanSchema.index({ userId: 1, status: 1 });

export default mongoose.model("WeeklyPlan", weeklyPlanSchema);
