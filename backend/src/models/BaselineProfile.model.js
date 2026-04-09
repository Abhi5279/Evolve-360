// // src/models/BaselineProfile.model.js

// import mongoose from "mongoose";

// const baselineProfileSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true
//     },

//     // Basic bio
//     age: {
//       type: Number,
//       required: true
//     },

//     gender: {
//       type: String,
//       enum: ["male", "female", "other"],
//       default: "other"
//     },

//     heightCm: Number,
//     weightKg: Number,

//     // Fitness intent
//     fitnessGoal: {
//       type: String,
//       enum: ["fat_loss", "muscle_gain", "endurance", "general_health"],
//       required: true
//     },

//     experienceLevel: {
//       type: String,
//       enum: ["beginner", "intermediate", "advanced"],
//       required: true
//     },

//     // Lifestyle constraints
//     dailyTimeMinutes: {
//       type: Number,
//       required: true
//     },

//     workoutDaysPerWeek: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 7
//     },

//     dailyActivityLevel: {
//       type: String,
//       enum: ["sedentary", "light", "moderate", "active"],
//       required: true
//     },

//     // Environment
//     gymAccess: {
//       type: Boolean,
//       default: false
//     },

//     equipmentAvailable: {
//       type: [String],
//       default: []
//     },

//     // Health & safety
//     medicalConditions: {
//       type: [String],
//       default: []
//     },

//     injuries: {
//       type: [String],
//       default: []
//     },

//     // Nutrition constraints
//     foodBudgetPerDay: {
//       type: Number,
//       required: true
//     },

//     dietPreference: {
//       type: String,
//       enum: ["veg", "non_veg", "eggetarian"],
//       required: true
//     },

//     // Geo
//     location: {
//       city: String,
//       state: String,
//       country: String
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// const BaselineProfile = mongoose.model(
//   "BaselineProfile",
//   baselineProfileSchema
// );

// export default BaselineProfile;


// src/models/BaselineProfile.model.js

import mongoose from "mongoose";

const baselineProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic bio
    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    heightCm: Number,
    weightKg: Number,

    // Fitness intent
    // FIX 1: added "flexibility" and "general_fitness" — frontend sends these, were missing from enum
    fitnessGoal: {
      type: String,
      enum: ["fat_loss", "muscle_gain", "endurance", "flexibility", "general_fitness", "general_health"],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },

    // Lifestyle constraints
    dailyTimeMinutes: {
      type: Number,
      required: true,
    },

    workoutDaysPerWeek: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },

    // FIX 2: added "very_active" — frontend sends this, was missing from enum
    dailyActivityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      required: true,
    },

    // Environment
    gymAccess: {
      type: Boolean,
      default: false,
    },

    equipmentAvailable: {
      type: [String],
      default: [],
    },

    // Health & safety
    medicalConditions: {
      type: [String],
      default: [],
    },

    injuries: {
      type: [String],
      default: [],
    },

    // Nutrition constraints
    // FIX 4: removed required:true — frontend allows empty budget, empty string fails Number cast
    foodBudgetPerDay: {
      type: Number,
    },

    // FIX 3: added "vegan","keto","paleo","mediterranean" — frontend sends these, were missing
    dietPreference: {
      type: String,
      enum: ["veg", "non_veg", "eggetarian", "vegan", "keto", "paleo", "mediterranean"],
      required: true,
    },

    // Geo
    location: {
      city: String,
      state: String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

const BaselineProfile = mongoose.model("BaselineProfile", baselineProfileSchema);

export default BaselineProfile;