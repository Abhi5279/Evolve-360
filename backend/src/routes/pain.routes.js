import express from "express";
import PainAnalysis from "../models/PainAnalysis.model.js";
import { runGeminiJSON } from "../services/ai/gemini.service.js";

const router = express.Router();

/* =====================================
   Protective Mapping
===================================== */
const protectiveActions = {
  left_knee: "Reduce squat depth",
  right_shoulder: "Avoid overhead loading",
  lower_back: "Limit spinal flexion",
  ankle: "Reduce plyometrics",
};

/* =====================================
   POST — Pain Evaluation
===================================== */
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      date,
      painLocation,
      painIntensity,
      painIncreaseAfterActivity,
      morningStiffnessMinutes,
    } = req.body;

    if (
      !userId ||
      !painLocation ||
      painIntensity === undefined ||
      morningStiffnessMinutes === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const numericIntensity = Number(painIntensity);

    /* =====================================
       1️⃣ Rule-Based Evaluation
    ====================================== */

    let flags = [];
    let protectiveMode = false;

    if (numericIntensity >= 6 && painIncreaseAfterActivity) {
      flags.push("Active Tissue Overload");
      protectiveMode = true;
    }

    if (morningStiffnessMinutes > 20 && numericIntensity >= 5) {
      flags.push("Inflammatory Pattern");
      protectiveMode = true;
    }

    const protectiveAction =
      protectiveActions[painLocation] ||
      "Modify training intensity";

    /* =====================================
       2️⃣ Advanced Risk Calculations
    ====================================== */

    const overloadIndex =
      numericIntensity * (painIncreaseAfterActivity ? 1.3 : 1);

    const inflammationIndex =
      morningStiffnessMinutes > 0
        ? (morningStiffnessMinutes / 60) * 100
        : 0;

    let riskScore =
      (numericIntensity * 10) +
      overloadIndex +
      inflammationIndex;

    riskScore = Math.min(100, Math.round(riskScore));

    /* =====================================
       3️⃣ AI Clinical Insight
    ====================================== */

    const prompt = `
You are a sports rehabilitation specialist.

Provide a short clinical insight (2-3 sentences max)
based on:

Location: ${painLocation}
Pain Intensity: ${numericIntensity}/10
Pain Increase After Activity: ${painIncreaseAfterActivity}
Morning Stiffness (minutes): ${morningStiffnessMinutes}

Be concise.
No markdown.
No formatting.
Return JSON only.

Format:
{
  "insight": "string"
}
`;

    const aiResponse = await runGeminiJSON({ prompt });

    const aiInsight =
      aiResponse?.insight || "No AI insight generated.";

    /* =====================================
       4️⃣ Save To Database
    ====================================== */

    const record = await PainAnalysis.create({
      userId,
      date: date || new Date().toISOString().split("T")[0],
      painLocation,
      painIntensity: numericIntensity,
      painIncreaseAfterActivity,
      morningStiffnessMinutes,
      protectiveMode,
      protectiveAction,
      clinicalFlags: flags,
      aiInsight,
      riskScore,
      inflammationIndex,
      overloadIndex,
    });

    res.status(201).json({
      success: true,
      data: record,
    });

  } catch (error) {
    console.error("Pain Analysis Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =====================================
   GET — All Pain Records For User
===================================== */
router.get("/user/:userId", async (req, res) => {
  try {
    const records = await PainAnalysis.find({
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

/* =====================================
   GET — Specific Date
===================================== */
router.get("/user/:userId/:date", async (req, res) => {
  try {
    const record = await PainAnalysis.findOne({
      userId: req.params.userId,
      date: req.params.date,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "No record found",
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