// import mongoose from "mongoose";

// const aiDetailedSessionSchema = new mongoose.Schema(
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
//       required: true,
//       index: true
//     },

//     date: {
//       type: Date,
//       required: true
//     },

//     // Snapshot of base plan when AI was generated
//     workoutTypeSnapshot: {
//       type: String,
//       required: true
//     },

//     planVersionSnapshot: {
//       type: Number,
//       required: true
//     },

//     // Actual AI generated deep workout
//     aiPlanData: {
//       type: mongoose.Schema.Types.Mixed,
//       required: true
//     },

//     regenerationCount: {
//       type: Number,
//       default: 1
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// /**
//  * One AI session per:
//  * user + weeklyPlan + date + planVersion
//  */
// aiDetailedSessionSchema.index(
//   { userId: 1, weeklyPlanId: 1, date: 1, planVersionSnapshot: 1 },
//   { unique: true }
// );

// const AIDetailedSession = mongoose.model(
//   "AIDetailedSession",
//   aiDetailedSessionSchema
// );

// export default AIDetailedSession;




import mongoose from "mongoose";

const aiDetailedSessionSchema = new mongoose.Schema(
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
      required: true,
      index: true
    },

    // 🔥 NEW: Week based system
    weekNumber: {
      type: Number,
      required: true
    },

    day: {
      type: Number,
      min: 1,
      max: 7,
      required: true
    },

    // Snapshot of base plan when AI was generated
    workoutTypeSnapshot: {
      type: String,
      required: true
    },

    planVersionSnapshot: {
      type: Number,
      required: true
    },

    // AI generated workout
    aiPlanData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    regenerationCount: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

/**
 * One AI session per:
 * user + plan + week + day + version
 */
aiDetailedSessionSchema.index(
  {
    userId: 1,
    weeklyPlanId: 1,
    weekNumber: 1,
    day: 1,
    planVersionSnapshot: 1
  },
  { unique: true }
);

export default mongoose.model(
  "AIDetailedSession",
  aiDetailedSessionSchema
);
