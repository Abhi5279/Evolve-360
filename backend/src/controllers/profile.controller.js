// // src/controllers/profile.controller.js

// import BaselineProfile from "../models/BaselineProfile.model.js";
// import User from "../models/User.model.js";

// // Create or update baseline profile
// export const createBaselineProfile = async (req, res) => {
//   try {
//     const { userId, ...profileData } = req.body;

//     if (!userId) {
//       return res.status(400).json({ message: "userId is required" });
//     }

//     // Check if profile already exists
//     let profile = await BaselineProfile.findOne({ userId });

//     if (profile) {
//       profile = await BaselineProfile.findOneAndUpdate(
//         { userId },
//         profileData,
//         { new: true }
//       );
//     } else {
//       profile = await BaselineProfile.create({
//         userId,
//         ...profileData
//       });

//       // Mark user as onboarded
//       await User.findByIdAndUpdate(userId, { isOnboarded: true });
//     }

//     res.status(200).json({
//       message: "Baseline profile saved successfully",
//       profile
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to save baseline profile",
//       error: error.message
//     });
//   }
// };

// // Get baseline profile
// export const getBaselineProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const profile = await BaselineProfile.findOne({ userId });

//     // if (!profile) {
//     //   return res.status(404).json({ message: "Baseline profile not found" });
//     // }
//     if (!profile) {
//       return res.status(200).json(null);
//     }
//     res.json(profile);
//   } catch (error) {

//     res.status(500).json({
//       message: "Failed to fetch baseline profile"
//     });
//   }
// };



// /* ============================================================
//    UPDATE BASELINE PROFILE (PATCH)
// ============================================================ */
// export const updateBaselineProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const updateData = req.body;

//     const profile = await BaselineProfile.findOneAndUpdate(
//       { userId },
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!profile) {
//       return res.status(404).json({
//         message: "Baseline profile not found"
//       });
//     }

//     return res.status(200).json({
//       message: "Baseline profile updated successfully",
//       profile
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to update baseline profile",
//       error: error.message
//     });
//   }
// };

// src/controllers/profile.controller.js

import BaselineProfile from "../models/BaselineProfile.model.js";
import User from "../models/User.model.js";

/* ============================================================
   CREATE PROFILE (POST /api/profile)
   - If profile exists for userId → update it
   - If not → create new and mark user as onboarded
============================================================ */
export const createBaselineProfile = async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Sanitize number fields — empty string "" fails Mongoose Number cast
    const sanitized = {
      ...profileData,
      age:              profileData.age              ? Number(profileData.age)              : undefined,
      heightCm:         profileData.heightCm         ? Number(profileData.heightCm)         : undefined,
      weightKg:         profileData.weightKg         ? Number(profileData.weightKg)         : undefined,
      foodBudgetPerDay: profileData.foodBudgetPerDay ? Number(profileData.foodBudgetPerDay) : undefined,
      dailyTimeMinutes: profileData.dailyTimeMinutes ? Number(profileData.dailyTimeMinutes) : 45,
      workoutDaysPerWeek: profileData.workoutDaysPerWeek ? Number(profileData.workoutDaysPerWeek) : 3,
    };

    let profile = await BaselineProfile.findOne({ userId });

    if (profile) {
      // Already exists — update it
      profile = await BaselineProfile.findOneAndUpdate(
        { userId },
        sanitized,
        { new: true, runValidators: true }
      );
    } else {
      // New profile — create and onboard user
      profile = await BaselineProfile.create({ userId, ...sanitized });
      await User.findByIdAndUpdate(userId, { isOnboarded: true });
    }

    return res.status(200).json({
      message: "Baseline profile saved successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save baseline profile",
      error: error.message,
    });
  }
};

/* ============================================================
   GET PROFILE (GET /api/profile/:userId)
   FIX: return 404 (not 200+null) when no profile exists
   so the frontend catch block fires and sets isNewProfile=true
============================================================ */
export const getBaselineProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await BaselineProfile.findOne({ userId });

    if (!profile) {
      // FIX: was returning res.status(200).json(null)
      // That means axios treats it as success, catch never fires,
      // and the frontend shows "Edit Profile" even with no data.
      // Now returns 404 so frontend catch block correctly sets isNewProfile=true
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch baseline profile",
      error: error.message,
    });
  }
};

/* ============================================================
   UPDATE PROFILE (PATCH /api/profile/:userId)
============================================================ */
export const updateBaselineProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Sanitize number fields same as create
    const sanitized = {
      ...updateData,
      age:              updateData.age              ? Number(updateData.age)              : undefined,
      heightCm:         updateData.heightCm         ? Number(updateData.heightCm)         : undefined,
      weightKg:         updateData.weightKg         ? Number(updateData.weightKg)         : undefined,
      foodBudgetPerDay: updateData.foodBudgetPerDay ? Number(updateData.foodBudgetPerDay) : undefined,
      dailyTimeMinutes: updateData.dailyTimeMinutes ? Number(updateData.dailyTimeMinutes) : 45,
      workoutDaysPerWeek: updateData.workoutDaysPerWeek ? Number(updateData.workoutDaysPerWeek) : 3,
    };

    const profile = await BaselineProfile.findOneAndUpdate(
      { userId },
      sanitized,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "Baseline profile updated successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update baseline profile",
      error: error.message,
    });
  }
};