// import express from "express";
// import FunctionalTest from "../models/FunctionalTest.model.js";
// import { runGeminiJSON } from "../services/ai/gemini.service.js";

// const router = express.Router();

// /* =========================================================
//    POST — Create Functional Test Record
// ========================================================= */

// router.post("/", async (req, res) => {
//     try {
//         const { userId, userProfile, testType, userTime, date } = req.body;

//         if (!userId || !userProfile || !testType || !userTime) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Missing required fields",
//             });
//         }

//         const numericTime = Number(userTime);

//         if (isNaN(numericTime) || numericTime <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid userTime",
//             });
//         }

//         /* ======================================================
//            🔹 Improved Clinical Prompt
//         ====================================================== */

//         const prompt = `
// You are a senior physiotherapist and rehabilitation performance analyst.

// Task:
// Estimate the expected NORMAL completion time (in seconds) for the following functional mobility test.

// Test Name: ${testType}

// Patient Profile:
// - Age: ${userProfile.age}
// - Gender: ${userProfile.gender}
// - Activity Level: ${userProfile.activityLevel || "average adult"}

// Rules:
// - Consider healthy individuals without pathology.
// - Use realistic physiotherapy benchmarks.
// - Output ONLY valid JSON.
// - No explanations.
// - No text.
// - No markdown.

// Required JSON format:
// {
//   "expectedTime": number
// }
// `;

//         /* ======================================================
//            🔹 Call Gemini
//         ====================================================== */

//         const aiResponse = await runGeminiJSON(prompt);

//         const aiExpectedTime =
//             aiResponse?.expectedTime &&
//                 !isNaN(aiResponse.expectedTime)
//                 ? Number(aiResponse.expectedTime)
//                 : 12; // fallback safe value

//         /* ======================================================
//            🔹 Advanced Performance Calculations
//         ====================================================== */

//         const deviationSeconds = numericTime - aiExpectedTime;

//         const deviationPercentage =
//             (deviationSeconds / aiExpectedTime) * 100;

//         let performanceCategory;

//         if (deviationPercentage <= 0) {
//             performanceCategory = "Optimal";
//         } else if (deviationPercentage <= 15) {
//             performanceCategory = "Mild Delay";
//         } else if (deviationPercentage <= 30) {
//             performanceCategory = "Moderate Limitation";
//         } else {
//             performanceCategory = "Severe Functional Impairment";
//         }

//         let performanceScore =
//             100 - Math.max(0, deviationPercentage);

//         performanceScore = Math.max(0, Math.min(100, performanceScore));

//         const severityIndex =
//             Math.pow(Math.max(0, deviationPercentage), 1.35);

//         /* ======================================================
//            🔹 Store In DB
//         ====================================================== */

//         const saved = await FunctionalTest.create({
//             userId,
//             date: date || new Date().toISOString().split("T")[0],
//             userProfile,
//             testType,
//             userTime: numericTime,
//             aiExpectedTime,
//             deviationSeconds,
//             deviationPercentage,
//             performanceCategory,
//             performanceScore,
//             severityIndex,
//         });

//         res.status(201).json({
//             success: true,
//             data: saved,
//         });

//     } catch (error) {
//         console.error("Functional Test Error:", error.message);

//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// });
// /* =========================================================
//    GET — All Tests for a User
// ========================================================= */

// router.get("/user/:userId", async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const records = await FunctionalTest.find({ userId }).sort({
//             createdAt: -1,
//         });

//         res.json({
//             success: true,
//             count: records.length,
//             data: records,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// });

// /* =========================================================
//    GET — Specific Day Test
// ========================================================= */

// router.get("/user/:userId/:date", async (req, res) => {
//     try {
//         const { userId, date } = req.params;

//         const record = await FunctionalTest.findOne({
//             userId,
//             date,
//         });

//         if (!record) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No record found",
//             });
//         }

//         res.json({
//             success: true,
//             data: record,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// });

// export default router;

import express from "express";
import FunctionalTest from "../models/FunctionalTest.model.js";
import { runGeminiJSON } from "../services/ai/gemini.service.js";

const router = express.Router();

/* =========================================================
   POST — Create Functional Test Record
========================================================= */

router.post("/", async (req, res) => {
  try {
    const { userId, userProfile, testType, userTime, date } = req.body;

    if (!userId || !userProfile || !testType || userTime === undefined) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const numericTime = Number(userTime);

    if (isNaN(numericTime) || numericTime <= 0) {
      return res.status(400).json({
        success: false,
        error: "userTime must be a positive number",
      });
    }

    /* ======================================================
       🔹 Improved Clinical Prompt (Stable JSON Output)
    ====================================================== */

    const prompt = `
You are a senior physiotherapist and functional movement specialist.

Estimate the NORMAL expected completion time (in seconds) 
for a healthy adult performing this test.

Test: ${testType}

Patient Profile:
Age: ${userProfile.age}
Gender: ${userProfile.gender}
Activity Level: ${userProfile.activityLevel || "average"}

Rules:
- Assume no pathology
- Use clinical physiotherapy benchmarks
- Do not explain anything
- Output STRICT JSON only
- No markdown
- No extra text

Format:
{
  "expectedTime": number
}
`;

    /* ======================================================
       🔹 Gemini Call (Corrected for Your Service)
    ====================================================== */

    const aiResponse = await runGeminiJSON({
      prompt,
      model: "gemini-2.5-flash"
    });

    const aiExpectedTime =
      aiResponse?.expectedTime &&
      !isNaN(aiResponse.expectedTime)
        ? Number(aiResponse.expectedTime)
        : 12; // fallback safe baseline

    /* ======================================================
       🔹 Advanced Performance Calculations
    ====================================================== */

    const deviationSeconds = numericTime - aiExpectedTime;

    const deviationPercentage =
      (deviationSeconds / aiExpectedTime) * 100;

    let performanceCategory;

    if (deviationPercentage <= 0) {
      performanceCategory = "Optimal";
    } else if (deviationPercentage <= 15) {
      performanceCategory = "Mild Delay";
    } else if (deviationPercentage <= 30) {
      performanceCategory = "Moderate Limitation";
    } else {
      performanceCategory = "Severe Functional Impairment";
    }

    // Normalized score (0–100)
    let performanceScore = 100 - Math.max(0, deviationPercentage);
    performanceScore = Math.max(0, Math.min(100, performanceScore));

    // Nonlinear severity weight
    const severityIndex =
      Math.pow(Math.max(0, deviationPercentage), 1.35);

    /* ======================================================
       🔹 Store In Database
    ====================================================== */

    const saved = await FunctionalTest.create({
      userId,
      date: date || new Date().toISOString().split("T")[0],
      userProfile,
      testType,
      userTime: numericTime,
      aiExpectedTime,
      deviationSeconds,
      deviationPercentage,
      performanceCategory,
      performanceScore,
      severityIndex,
    });

    res.status(201).json({
      success: true,
      data: saved,
    });

  } catch (error) {
    console.error("Functional Test Error:", error.message);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   GET — All Tests For User
========================================================= */

router.get("/user/:userId", async (req, res) => {
  try {
    const records = await FunctionalTest.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: records.length,
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
   GET — Specific Date Record
========================================================= */

router.get("/user/:userId/:date", async (req, res) => {
  try {
    const record = await FunctionalTest.findOne({
      userId: req.params.userId,
      date: req.params.date,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No record found for this date",
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