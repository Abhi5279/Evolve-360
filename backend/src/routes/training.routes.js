// import express from "express";
// import TrainingAnalysis from "../models/TrainingAnalysis.model.js";
// import { runGeminiJSON } from "../services/ai/gemini.service.js";

// const router = express.Router();

// /* =====================================================
//    POST — Analyze Training Session
// ===================================================== */
// router.post("/", async (req, res) => {
//   try {
//     const {
//       userId,
//       date,
//       plannedIntensity,
//       actualIntensity,
//       plannedVolume,
//       actualVolume,
//       completionPercent,
//     } = req.body;

//     if (
//       !userId ||
//       plannedIntensity === undefined ||
//       actualIntensity === undefined ||
//       plannedVolume === undefined ||
//       actualVolume === undefined ||
//       completionPercent === undefined
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required training inputs",
//       });
//     }

//     const intensityDelta =
//       actualIntensity - plannedIntensity;

//     const volumeDeviation =
//       ((actualVolume - plannedVolume) / plannedVolume) * 100;

//     /* =====================================================
//        Condition Logic
//     ===================================================== */
//     let condition = "Balanced Training";
//     let systemBehavior = "Normal Mode";

//     if (
//       intensityDelta >= 1 &&
//       volumeDeviation >= 15 &&
//       completionPercent >= 90
//     ) {
//       condition = "Acute Overreaching";
//       systemBehavior = "Protective Load Modulation Activated";
//     } else if (
//       completionPercent < 85 &&
//       intensityDelta >= 0
//     ) {
//       condition = "Under-Recovery";
//       systemBehavior = "Recovery Mode Triggered";
//     } else if (
//       intensityDelta >= 0 &&
//       volumeDeviation >= 10
//     ) {
//       condition = "Fatigue Accumulation";
//       systemBehavior = "Load Monitoring Mode";
//     }

//     /* =====================================================
//        Advanced Metrics
//     ===================================================== */

//     const fatigueIndex =
//       (Math.max(0, intensityDelta) * 15) +
//       Math.max(0, volumeDeviation);

//     const overloadScore =
//       (actualIntensity * actualVolume) / 10;

//     const adaptiveCapacityScore =
//       100 -
//       Math.min(
//         100,
//         fatigueIndex + (100 - completionPercent)
//       );

//     /* =====================================================
//        AI Directive
//     ===================================================== */

//     const prompt = `
// You are a high-performance sports scientist.

// Based on the following training session data,
// provide a concise directive for the NEXT session.

// Planned Intensity: ${plannedIntensity}
// Actual Intensity: ${actualIntensity}
// Planned Volume: ${plannedVolume}
// Actual Volume: ${actualVolume}
// Completion: ${completionPercent}%
// Condition: ${condition}

// Return STRICT JSON only:

// {
//   "directive": "short actionable instruction"
// }
// `;

//     const aiResponse = await runGeminiJSON({ prompt });

//     const nextSessionDirective =
//       aiResponse?.directive ||
//       "Maintain current load and monitor recovery.";

//     /* =====================================================
//        Save To DB
//     ===================================================== */

//     const record = await TrainingAnalysis.create({
//       userId,
//       date: date || new Date().toISOString().split("T")[0],
//       plannedIntensity,
//       actualIntensity,
//       plannedVolume,
//       actualVolume,
//       completionPercent,
//       intensityDelta,
//       volumeDeviation: Number(volumeDeviation.toFixed(1)),
//       condition,
//       systemBehavior,
//       fatigueIndex,
//       overloadScore,
//       adaptiveCapacityScore,
//       nextSessionDirective,
//     });

//     res.status(201).json({
//       success: true,
//       data: record,
//     });

//   } catch (error) {
//     console.error("Training Analysis Error:", error.message);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// /* =====================================================
//    GET — All Sessions For User
// ===================================================== */
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const records = await TrainingAnalysis.find({
//       userId: req.params.userId,
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: records.length,
//       data: records,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// /* =====================================================
//    GET — Specific Date
// ===================================================== */
// router.get("/user/:userId/:date", async (req, res) => {
//   try {
//     const record = await TrainingAnalysis.findOne({
//       userId: req.params.userId,
//       date: req.params.date,
//     });

//     if (!record) {
//       return res.status(404).json({
//         success: false,
//         message: "No session found",
//       });
//     }

//     res.json({
//       success: true,
//       data: record,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// export default router;   

import express from "express";
import TrainingAnalysis from "../models/TrainingAnalysis.model.js";
import { runGeminiJSON } from "../services/ai/gemini.service.js";

const router = express.Router();

/* =========================================================
   HELPER: Convert Levels to Numeric
========================================================= */

const levelToScore = (level) => {
  if (level === "low") return 3;
  if (level === "moderate") return 6;
  if (level === "high") return 9;
  return 5;
};

/* =========================================================
   POST — Analyze Training Session
========================================================= */

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      date,
      sessionType,
      muscleGroups,
      durationMinutes,
      totalSets,
      totalReps,
      weightUsed,
      perceivedExertion,
      volumeLevel,
      intensityLevel,
      completionRate,
      energyLevel,
      sleepQuality,
      stressLevel,
      injuryFlag,
      notes,
    } = req.body;

    if (!userId || perceivedExertion === undefined || completionRate === undefined) {
      return res.status(400).json({
        success: false,
        error: "Missing required training fields",
      });
    }

    /* =====================================================
       1️⃣ Convert qualitative load into numeric metrics
    ===================================================== */

    const volumeScore = levelToScore(volumeLevel);
    const intensityScore = levelToScore(intensityLevel);

    /* =====================================================
       2️⃣ Compute Fatigue Index
    ===================================================== */

    const fatigueIndex =
      (perceivedExertion * 5) +
      (intensityScore * 4) +
      (volumeScore * 4);

    /* =====================================================
       3️⃣ Recovery Risk Calculation
    ===================================================== */

    const recoveryRisk =
      (10 - energyLevel) * 4 +
      (10 - sleepQuality) * 3 +
      stressLevel * 3 +
      (injuryFlag ? 15 : 0);

    /* =====================================================
       4️⃣ Adaptive Capacity
    ===================================================== */

    const adaptiveCapacity =
      100 -
      Math.min(100, fatigueIndex * 0.6 + recoveryRisk * 0.7);

    /* =====================================================
       5️⃣ Performance Score (0–100)
    ===================================================== */

    let performanceScore =
      (completionRate * 0.4) +
      (adaptiveCapacity * 0.4) +
      ((10 - stressLevel) * 2);

    performanceScore = Math.round(
      Math.max(0, Math.min(100, performanceScore))
    );

    /* =====================================================
       6️⃣ Condition Logic
    ===================================================== */

    let condition = "Balanced Training";

    if (fatigueIndex > 70 && recoveryRisk > 50) {
      condition = "High Fatigue Risk";
    } else if (recoveryRisk > 60) {
      condition = "Recovery Compromised";
    } else if (performanceScore >= 80) {
      condition = "Peak Adaptive Zone";
    }

    /* =====================================================
       7️⃣ AI Feedback
    ===================================================== */

    const prompt = `
You are a high-performance strength and conditioning coach.

Session Type: ${sessionType}
RPE: ${perceivedExertion}
Volume Level: ${volumeLevel}
Intensity Level: ${intensityLevel}
Completion: ${completionRate}%
Energy: ${energyLevel}
Sleep: ${sleepQuality}
Stress: ${stressLevel}
Injury Flag: ${injuryFlag}

Condition: ${condition}
Performance Score: ${performanceScore}

Provide concise feedback (2-3 sentences).
Return JSON only.

{
  "feedback": "string"
}
`;

    const aiResponse = await runGeminiJSON({ prompt });

    const feedback =
      aiResponse?.feedback ||
      "Maintain structured progression and monitor recovery.";

    /* =====================================================
       8️⃣ Save
    ===================================================== */

    const saved = await TrainingAnalysis.create({
      userId,
      date: date || new Date().toISOString().split("T")[0],
      sessionType,
      muscleGroups,
      durationMinutes,
      totalSets,
      totalReps,
      weightUsed,
      perceivedExertion,
      volumeLevel,
      intensityLevel,
      completionRate,
      energyLevel,
      sleepQuality,
      stressLevel,
      injuryFlag,
      notes,
      fatigueIndex,
      recoveryRisk,
      adaptiveCapacity,
      condition,
      performanceScore,
      feedback,
    });

    res.status(201).json({
      success: true,
      data: saved,
    });

  } catch (error) {
    console.error("Training Analysis Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   GET — All User Sessions
========================================================= */

router.get("/user/:userId", async (req, res) => {
  try {
    const records = await TrainingAnalysis.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   GET — Specific Date
========================================================= */

router.get("/user/:userId/:date", async (req, res) => {
  try {
    const record = await TrainingAnalysis.findOne({
      userId: req.params.userId,
      date: req.params.date,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No session found",
      });
    }

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;