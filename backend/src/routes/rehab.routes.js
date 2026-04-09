// /**
//  * src/routes/rehab.routes.js
//  *
//  * RRS 2.0 — Recovery & Rehabilitation Score
//  * Fully enhanced with:
//  *  - Logic review & bug fixes (symmetry smoothing divide-by-zero, weight normalization, RPE→intensity)
//  *  - Clinician-facing suggestion engine per domain (ROM, Pain, Symmetry, Adherence, Fatigue, Form)
//  *  - Overall recovery suggestions based on phase + weakest domain
//  *  - Safe defaults & input validation throughout
//  *
//  * Mount: app.use("/api/rehab", router)
//  */

// import express from "express";

// const router = express.Router();

// /* ═══════════════════════════════════════════════════════════
//    UTILITIES
//    ═══════════════════════════════════════════════════════════ */

// /** Clamp a value between min and max */
// const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

// /** Round to N decimal places */
// const round = (v, dp = 2) => Math.round(v * 10 ** dp) / 10 ** dp;

// /**
//  * Simple moving average over the last N elements.
//  * Returns null if array is empty.
//  */
// const movingAverage = (arr = [], windowSize = 3) => {
//   if (!Array.isArray(arr) || arr.length === 0) return null;
//   const slice = arr.slice(-windowSize);
//   const valid = slice.filter((x) => typeof x === "number" && !isNaN(x));
//   if (valid.length === 0) return null;
//   return valid.reduce((s, x) => s + x, 0) / valid.length;
// };

// /**
//  * Safe number coercion — returns defaultVal if input is not a finite number.
//  */
// const safeNum = (v, defaultVal = 0) => {
//   const n = Number(v);
//   return isFinite(n) ? n : defaultVal;
// };

// /* ═══════════════════════════════════════════════════════════
//    DOMAIN CALCULATORS
//    ═══════════════════════════════════════════════════════════ */

// /**
//  * ROM Improvement Score (0–100)
//  *
//  * BUG FIX (original): The original formula `50 + percentChange * 0.5`
//  * gave a score of 50 even when current == baseline (0% improvement),
//  * which inflates scores artificially in early sessions.
//  *
//  * REVISED LOGIC:
//  *  - If normative ROM is provided: score = (current / normative) * 100
//  *    — clinically preferred; tells us how close to full function we are.
//  *  - Otherwise: percent improvement from baseline, mapped 0→0, 100%→100.
//  *    — We cap at 100% improvement to prevent supra-normal inflated scores.
//  *  - Baseline near-zero edge case handled via normative or heuristic cap.
//  */
// const computeROMImprovementPercent = ({
//   baselineROMDeg,
//   currentROMDeg,
//   normativeROMDeg = null,
// }) => {
//   const baseline = safeNum(baselineROMDeg, 0);
//   const current = safeNum(currentROMDeg, 0);
//   const normative = normativeROMDeg != null ? safeNum(normativeROMDeg, 0) : null;

//   // Preferred path: score against normative ROM
//   if (normative && normative > 0) {
//     return clamp((current / normative) * 100);
//   }

//   // Baseline is effectively zero — use heuristic cap (150° is a generous upper bound)
//   if (Math.abs(baseline) < 1) {
//     return clamp((current / 150) * 100);
//   }

//   // Standard percent improvement from baseline, linear mapping 0–100
//   // 0% improvement → score 0; 100% improvement → score 100; capped at 100
//   const percentImprove = ((current - baseline) / Math.abs(baseline)) * 100;
//   return clamp(percentImprove);
// };

// /**
//  * Pain Reduction Score (0–100)
//  *
//  * BUG NOTE (original): Logic was correct. Retained as-is.
//  * 100 = full elimination of baseline pain, 0 = pain is same or worse.
//  *
//  * ENHANCEMENT: If current pain is *worse* than baseline we return 0
//  * (no negative scores — pain flare is captured by suggestions, not penalised twice).
//  */
// const computePainReductionPercent = ({ baselinePain, currentPain }) => {
//   const baseline = safeNum(baselinePain, 0);
//   const current = safeNum(currentPain, 0);

//   if (baseline <= 0) return 100; // No baseline pain → full credit
//   if (current >= baseline) return 0; // Pain same or worse → 0 (not negative)

//   return clamp(((baseline - current) / baseline) * 100);
// };

// /**
//  * Movement Symmetry Score (0–100) — Limb Symmetry Index (LSI)
//  *
//  * BUG FIX (original): When history was provided, the original code computed:
//  *   movingAverage([...symHistory, (injVal / uninjVal) * 100])
//  *   — but this crashes / NaNs when uninjuredValue is 0.
//  *   We guard against divide-by-zero before building the smoothed array.
//  *
//  * ENHANCEMENT: Accept optional historyPercent array (pre-computed LSI values)
//  * OR raw injured/uninjured pairs, whichever the caller provides.
//  */
// const computeSymmetryPercent = ({
//   injuredValue,
//   uninjuredValue,
//   historyPercent = [],
// }) => {
//   const inj = safeNum(injuredValue, 0);
//   const uninj = safeNum(uninjuredValue, 0);

//   let currentLSI;
//   if (Math.abs(uninj) < 1e-6) {
//     // Uninjured side is zero → symmetry is undefined or 100 if both are zero
//     currentLSI = Math.abs(inj) < 1e-6 ? 100 : 50; // Unknown → mid-score
//   } else {
//     currentLSI = clamp((inj / uninj) * 100);
//   }

//   // Smooth against history if provided
//   const validHistory = Array.isArray(historyPercent)
//     ? historyPercent.map(Number).filter((x) => isFinite(x))
//     : [];

//   if (validHistory.length > 0) {
//     const smoothed = movingAverage([...validHistory, currentLSI], 5);
//     return clamp(smoothed ?? currentLSI);
//   }

//   return currentLSI;
// };

// /**
//  * Adherence Score (0–100)
//  *
//  * BUG NOTE (original): Logic sound. Enhanced streak penalty window to be
//  * proportional to prescribedSessions, not a hard-coded 14-day window,
//  * which was arbitrary and unfair for short programs.
//  */
// const computeAdherencePercent = ({
//   completedSessions,
//   prescribedSessions,
//   longestMissedStreakDays = 0,
// }) => {
//   const completed = safeNum(completedSessions, 0);
//   const prescribed = safeNum(prescribedSessions, 0);
//   const streak = safeNum(longestMissedStreakDays, 0);

//   if (prescribed <= 0) {
//     return completed >= 1 ? 100 : 0;
//   }

//   const baseRatio = clamp((completed / prescribed) * 100);

//   // Proportional streak penalty: 7-day window gives up to 15 pts deduction.
//   // Rationale: missing >7 consecutive days is clinically significant for most rehab programs.
//   const streakPenalty = clamp((streak / 7) * 15, 0, 15);

//   return clamp(baseRatio - streakPenalty);
// };

// /**
//  * Fatigue Response Score (0–100)
//  *
//  * BUG FIX (original): The formula `90 + (10 * (1 - (1 - ratio)))` simplifies
//  * to `90 + 10 * ratio`, which means when ratio=1 (intensity == readiness) the
//  * score is 100, but when ratio is very small (very easy session) score approaches 90.
//  * This penalises light sessions unfairly.
//  *
//  * REVISED:
//  *  - ratio ≤ 1 (training at or below readiness) → score = 100. Full credit.
//  *  - ratio > 1 (overreaching) → smooth exponential drop.
//  *    Mild overreach (10–20% over): minor penalty.
//  *    Severe overreach (>50% over): large penalty approaching 0.
//  *
//  * ENHANCEMENT: If both actualIntensityPercent and actualRPE are provided,
//  * use intensity directly (more precise). RPE used as fallback only.
//  */
// const computeFatigueResponseScore = ({
//   readinessPercent = 100,
//   actualIntensityPercent = null,
//   actualRPE = null,
// }) => {
//   const readiness = clamp(safeNum(readinessPercent, 100));

//   // Resolve intensity: prefer direct percent, fall back to RPE conversion
//   let intensity = null;
//   if (typeof actualIntensityPercent === "number" && isFinite(actualIntensityPercent)) {
//     intensity = clamp(actualIntensityPercent);
//   } else if (typeof actualRPE === "number" && isFinite(actualRPE)) {
//     // RPE 1–10 → 10%–100% (Borg CR-10 linear mapping)
//     intensity = clamp(((actualRPE - 1) / 9) * 100);
//   }

//   if (intensity === null) return readiness; // No intensity data → return readiness as proxy

//   const ratio = intensity / Math.max(1, readiness);

//   if (ratio <= 1) return 100; // Training within readiness → perfect

//   // Exponential penalty for overreach
//   // ratio=1.1 → ~92, ratio=1.3 → ~75, ratio=1.5 → ~56, ratio=2.0 → ~20
//   const score = 100 * Math.exp(-2.5 * (ratio - 1));
//   return clamp(round(score));
// };

// /**
//  * Form Quality Score (0–100)
//  *
//  * ENHANCEMENT: If both formQualityPercent and poseQualityArray are provided,
//  * blend them (direct measurement takes 70% weight for recency).
//  */
// const computeFormQualityPercent = ({
//   formQualityPercent = null,
//   poseQualityArray = [],
// }) => {
//   const direct =
//     typeof formQualityPercent === "number" && isFinite(formQualityPercent)
//       ? clamp(formQualityPercent)
//       : null;

//   const validArr = Array.isArray(poseQualityArray)
//     ? poseQualityArray.map(Number).filter((x) => isFinite(x))
//     : [];

//   const historical = validArr.length > 0 ? clamp(movingAverage(validArr, 3) ?? 50) : null;

//   if (direct !== null && historical !== null) {
//     return clamp(0.7 * direct + 0.3 * historical); // Blend: current session weighted higher
//   }
//   if (direct !== null) return direct;
//   if (historical !== null) return historical;
//   return 50; // True unknown → neutral mid-score
// };

// /**
//  * Compensation Penalty (0–40 pts deducted from final score)
//  *
//  * BUG FIX (original): `Math.sqrt(raw) * 5` with `raw` being a sum of severity
//  * points means a single "severe" (18pts) gives penalty of sqrt(18)*5 ≈ 21.2.
//  * Two severe flags give sqrt(36)*5 = 30. Three give sqrt(54)*5 ≈ 36.7.
//  * This diminishing return is reasonable clinically.
//  *
//  * ENHANCEMENT: Accept severity strings consistently (mild/moderate/severe),
//  * with "moderate" matching what AI output tends to generate (original only had "mod").
//  */
// const computeCompensationPenalty = (compensationFlags = []) => {
//   if (!Array.isArray(compensationFlags) || compensationFlags.length === 0) return 0;

//   const severityMap = {
//     mild: 3,
//     moderate: 8,
//     mod: 8, // backward compat alias
//     severe: 18,
//   };

//   const raw = compensationFlags.reduce((sum, flag) => {
//     if (!flag || typeof flag !== "object") return sum;
//     const sev = flag.severity ? (severityMap[String(flag.severity).toLowerCase()] ?? 0) : 0;
//     return sum + sev;
//   }, 0);

//   const penalty = clamp(Math.sqrt(raw) * 5, 0, 40);
//   return round(penalty);
// };

// /* ═══════════════════════════════════════════════════════════
//    SUGGESTION ENGINE
//    Generates actionable, clinician-facing recommendations
//    based on each domain score and overall recovery phase.
//    ═══════════════════════════════════════════════════════════ */

// /**
//  * Per-domain suggestion: returns { status, suggestions[] }
//  * Status: "excellent" | "good" | "needs_attention" | "critical"
//  */

// const romSuggestions = ({ percent, baselineDeg, currentDeg, normativeDeg }) => {
//   const gap = normativeDeg ? normativeDeg - currentDeg : null;

//   if (percent >= 85) {
//     return {
//       status: "excellent",
//       suggestions: [
//         "ROM is near-normal. Transition focus to strength and neuromuscular control.",
//         gap !== null && gap <= 10
//           ? `Only ${Math.round(gap)}° from normative. Sport/function-specific drills are appropriate.`
//           : "Continue maintenance stretching and dynamic warm-ups.",
//       ].filter(Boolean),
//     };
//   }
//   if (percent >= 65) {
//     return {
//       status: "good",
//       suggestions: [
//         "ROM is improving but not yet at functional threshold. Maintain progressive stretching.",
//         "Consider adding low-load prolonged stretching (LLPS) 15–30 min/day for capsular restrictions.",
//         gap !== null ? `Target: close the remaining ${Math.round(gap)}° gap within 2–4 weeks.` : "Set a measurable ROM target for next reassessment.",
//       ].filter(Boolean),
//     };
//   }
//   if (percent >= 40) {
//     return {
//       status: "needs_attention",
//       suggestions: [
//         "ROM recovery is lagging. Prioritise joint mobility before loading.",
//         "Perform ROM exercises 2× daily — morning for stiffness, evening for tissue lengthening.",
//         "Add heat therapy (10 min) immediately before stretching to improve tissue extensibility.",
//         "Assess for joint effusion, capsular tightness, or scar tissue limiting range.",
//         "Consider referral for manual therapy (joint mobilisation grade III–IV) if plateau persists.",
//       ],
//     };
//   }
//   return {
//     status: "critical",
//     suggestions: [
//       "Severely restricted ROM — movement loading should be minimal until mobility improves.",
//       "Rule out post-surgical complications, heterotopic ossification, or severe fibrosis.",
//       "Hydrotherapy or continuous passive motion (CPM) may be indicated at this stage.",
//       "Daily gentle AROM within pain-free range; avoid aggressive end-range stretching.",
//       "Re-assess weekly and escalate to specialist if <40% normative ROM persists >3 weeks.",
//     ],
//   };
// };

// const painSuggestions = ({ percent, baselineNRS, currentNRS }) => {
//   if (percent >= 90) {
//     return {
//       status: "excellent",
//       suggestions: [
//         "Pain is well controlled. Maintain current analgesic/load management strategy.",
//         currentNRS <= 1
//           ? "NRS ≤1 — patient is effectively pain-free. Focus is now functional rehabilitation."
//           : "Minimal residual pain acceptable during therapeutic exercise (NRS ≤3 during activity).",
//       ],
//     };
//   }
//   if (percent >= 60) {
//     return {
//       status: "good",
//       suggestions: [
//         "Moderate pain reduction achieved. Continue current pain management approach.",
//         "Ensure patient understands the difference between hurt (protective) and harm (tissue damage).",
//         "Pain education (neurophysiology) may further reduce perceived pain and fear-avoidance.",
//         "Reassess analgesic timing relative to exercise sessions for optimal comfort.",
//       ],
//     };
//   }
//   if (percent >= 30) {
//     return {
//       status: "needs_attention",
//       suggestions: [
//         `Current NRS ${currentNRS}/10 — still significantly elevated. Revise loading strategy.`,
//         "Reduce exercise intensity by 20–30% and avoid movements that spike pain above NRS 4.",
//         "Review NSAID/analgesic schedule with prescribing clinician if pain is limiting participation.",
//         "Apply pain-gate modalities: TENS, ice/heat contrast, or gentle TENS during exercise.",
//         "Screen for psychological contributors — pain catastrophising scale (PCS) if not yet done.",
//       ],
//     };
//   }
//   return {
//     status: "critical",
//     suggestions: [
//       `NRS ${currentNRS}/10 — high pain levels are severely impeding rehabilitation.`,
//       "Suspend progressive loading. Focus on pain relief modalities only.",
//       "Urgent review of diagnosis: consider imaging, specialist referral, or medication review.",
//       "Assess yellow flags: kinesiophobia, catastrophising, depression — refer to psychologist if indicated.",
//       "Patient should not be progressed until pain is consistently below NRS 5 at rest.",
//     ],
//   };
// };

// const symmetrySuggestions = ({ percent }) => {
//   if (percent >= 90) {
//     return {
//       status: "excellent",
//       suggestions: [
//         "LSI ≥90% — criteria met for return-to-sport progression in most protocols.",
//         "Maintain bilateral symmetry training. Single-leg challenges recommended.",
//       ],
//     };
//   }
//   if (percent >= 75) {
//     return {
//       status: "good",
//       suggestions: [
//         "LSI approaching functional threshold. Continue symmetry-focused training.",
//         "Introduce single-leg strength and balance exercises (SL squat, SL RDL, SL hop).",
//         "Re-measure LSI in 2 weeks — target ≥90% before unrestricted activity clearance.",
//       ],
//     };
//   }
//   if (percent >= 50) {
//     return {
//       status: "needs_attention",
//       suggestions: [
//         "Significant asymmetry detected — compensation risk is elevated.",
//         "Increase unilateral training volume on the injured limb (2:1 ratio vs uninjured).",
//         "Use BFR (blood flow restriction) training to build strength without heavy loading if pain-limited.",
//         "Re-measure bilateral strength and ROM — identify if asymmetry is ROM-driven or strength-driven.",
//       ],
//     };
//   }
//   return {
//     status: "critical",
//     suggestions: [
//       "LSI <50% — severe limb asymmetry present. Do not progress to bilateral loading.",
//       "Focus exclusively on isolated injured-limb activation and muscle facilitation.",
//       "Neuromuscular electrical stimulation (NMES) may help re-establish motor recruitment.",
//       "Investigate cause: disuse atrophy, arthrogenic muscle inhibition (AMI), or pain inhibition.",
//     ],
//   };
// };

// const adherenceSuggestions = ({ percent, completed, prescribed, streak }) => {
//   if (percent >= 85) {
//     return {
//       status: "excellent",
//       suggestions: [
//         "Excellent adherence. Positive reinforcement — acknowledge patient effort.",
//         "Consider progressing difficulty or variety to maintain engagement.",
//       ],
//     };
//   }
//   if (percent >= 65) {
//     return {
//       status: "good",
//       suggestions: [
//         `${completed}/${prescribed} sessions completed. Good effort — identify barriers to the missed sessions.`,
//         "Use motivational interviewing to explore any logistical or psychological barriers.",
//         "Set short-term sub-goals to maintain momentum.",
//       ],
//     };
//   }
//   if (percent >= 40) {
//     return {
//       status: "needs_attention",
//       suggestions: [
//         `Only ${completed}/${prescribed} sessions completed — adherence is below therapeutic threshold.`,
//         streak > 0
//           ? `Longest missed streak: ${streak} days. Investigate the reason — work/life disruption or loss of motivation?`
//           : "",
//         "Simplify the home exercise program — reduce to 3 key exercises if full program is overwhelming.",
//         "Set a check-in reminder via phone/app. Brief 10-min daily adherence beats infrequent long sessions.",
//         "Explore patient beliefs about recovery — health literacy and self-efficacy may need addressing.",
//       ].filter(Boolean),
//     };
//   }
//   return {
//     status: "critical",
//     suggestions: [
//       "Critical adherence failure. Rehabilitation outcomes are severely compromised.",
//       "Urgent conversation required: explore fear of pain, financial barriers, or disengagement.",
//       "Consider switching to supervised sessions until self-management capacity improves.",
//       "Document non-adherence and escalate to referring clinician if pattern continues.",
//     ],
//   };
// };

// const fatigueSuggestions = ({ score, readinessPercent, intensityPercent }) => {
//   if (score >= 85) {
//     return {
//       status: "excellent",
//       suggestions: [
//         "Load management is well calibrated to readiness. Maintain current training-recovery balance.",
//         "If readiness consistently >80%, consider progressive overload in next session cycle.",
//       ],
//     };
//   }
//   if (score >= 65) {
//     return {
//       status: "good",
//       suggestions: [
//         "Slight overreach detected but within acceptable limits. Monitor for cumulative fatigue.",
//         "Ensure 48h recovery between high-intensity sessions for this muscle group.",
//         "Prioritise sleep (7–9h) and nutrition — protein 1.6–2.2g/kg body weight for tissue repair.",
//       ],
//     };
//   }
//   if (score >= 40) {
//     return {
//       status: "needs_attention",
//       suggestions: [
//         `Readiness was ${readinessPercent}% but intensity reached ${intensityPercent ?? "high"} — significant overreach.`,
//         "Reduce next session intensity by 30–40% to allow recovery.",
//         "Administer fatigue/readiness questionnaire (e.g., RESTQ-Sport or Hooper Index) before next session.",
//         "Check for signs of overtraining syndrome: poor sleep, mood changes, persistent muscle soreness.",
//       ],
//     };
//   }
//   return {
//     status: "critical",
//     suggestions: [
//       "Severe overreach relative to readiness. Rest day is clinically indicated.",
//       "Do not progress exercise volume or intensity until readiness recovers above 60%.",
//       "Screen for RED-S (Relative Energy Deficiency in Sport) if this pattern is recurring.",
//       "Consult with sports medicine physician if overtraining is suspected.",
//     ],
//   };
// };

// const formSuggestions = ({ percent, compensationFlags }) => {
//   const criticalComps = (compensationFlags || []).filter(
//     (f) => f && f.severity && ["severe", "moderate", "mod"].includes(String(f.severity).toLowerCase())
//   );

//   if (percent >= 80 && criticalComps.length === 0) {
//     return {
//       status: "excellent",
//       suggestions: [
//         "Excellent movement quality. Safe to progress load or complexity.",
//         "Introduce perturbation training or unstable surfaces to challenge neuromuscular control.",
//       ],
//     };
//   }
//   if (percent >= 60) {
//     return {
//       status: "good",
//       suggestions: [
//         "Form is adequate but refinement is needed before adding load.",
//         "Use mirror feedback or video review to improve movement self-awareness.",
//         criticalComps.length > 0
//           ? `Address compensations: ${criticalComps.map((f) => f.type).join(", ")} — cue correction before loading.`
//           : "Focus on slow eccentric control to reinforce motor patterns.",
//       ].filter(Boolean),
//     };
//   }
//   if (percent >= 40) {
//     return {
//       status: "needs_attention",
//       suggestions: [
//         "Movement quality is below threshold — do not increase load until form improves.",
//         "Regress to bodyweight or assisted versions of the exercise.",
//         criticalComps.length > 0
//           ? `Significant compensations detected (${criticalComps.map((f) => f.type).join(", ")}). Address root cause (weakness, tightness, or pain inhibition).`
//           : "Focus on movement re-education: slow tempo, tactile cueing, partial range if needed.",
//         "Consider real-time biofeedback or electromyographic (EMG) training if available.",
//       ].filter(Boolean),
//     };
//   }
//   return {
//     status: "critical",
//     suggestions: [
//       "Poor movement quality — exercise is likely reinforcing compensatory patterns.",
//       "Stop current exercise prescription and regress to activation-level exercises.",
//       "Perform detailed movement screen (FMS or similar) to identify root dysfunction.",
//       criticalComps.length > 0
//         ? `Severe compensations present: ${criticalComps.map((f) => f.type).join(", ")}. Manual therapy or dry needling may be required before re-loading.`
//         : "Manual therapy and neuromuscular re-education indicated before progressive loading.",
//     ].filter(Boolean),
//   };
// };

// /**
//  * Overall recovery suggestions based on phase + weakest domain(s)
//  */
// const overallSuggestions = ({ recoveryPhase, score, domainScores, domainStatuses }) => {
//   const suggestions = [];

//   // Phase-based headline
//   const phaseMessages = {
//     "Acute Recovery": "Patient is in acute recovery. Prioritise pain control, oedema management, and protecting healing tissue. Avoid aggressive loading.",
//     "Controlled Loading": "Patient is transitioning to controlled loading. Introduce progressive exercises within pain-free range. Monitor response closely.",
//     "Strength Rebuild": "Strength rebuilding phase — progressive resistance training is the priority. Monitor symmetry and form quality at each session.",
//     "Performance Ready": "Patient is approaching performance readiness. Sport/work-specific functional tasks can be introduced. Plan discharge criteria.",
//   };
//   suggestions.push(phaseMessages[recoveryPhase] || "Continue monitoring recovery progress.");

//   // Flag the weakest domain(s)
//   const critical = Object.entries(domainStatuses).filter(([, s]) => s === "critical").map(([k]) => k);
//   const needsAttention = Object.entries(domainStatuses).filter(([, s]) => s === "needs_attention").map(([k]) => k);

//   if (critical.length > 0) {
//     suggestions.push(`⚠️ Critical areas requiring immediate attention: ${critical.join(", ").toUpperCase()}. Address these before progressing other domains.`);
//   }
//   if (needsAttention.length > 0) {
//     suggestions.push(`Areas needing focused work: ${needsAttention.join(", ")}. Review specific domain recommendations below.`);
//   }

//   // Score-band guidance
//   if (score >= 80) {
//     suggestions.push("Overall RRS is strong. Begin planning return-to-function/sport criteria with the patient.");
//   } else if (score >= 60) {
//     suggestions.push("Moderate recovery progress. Maintain structured program and reassess in 1–2 weeks.");
//   } else if (score >= 40) {
//     suggestions.push("Recovery is below expected trajectory. Review program design and patient engagement barriers.");
//   } else {
//     suggestions.push("RRS is critically low. A comprehensive clinical review is strongly recommended. Consider multidisciplinary input.");
//   }

//   // Reassessment frequency guidance
//   const reassessFreq =
//     score < 40 ? "every 3–5 days" : score < 65 ? "weekly" : "every 2 weeks";
//   suggestions.push(`Recommended reassessment frequency: ${reassessFreq}.`);

//   return suggestions;
// };

// /* ═══════════════════════════════════════════════════════════
//    ROUTE: POST /rrs/calculate
//    ═══════════════════════════════════════════════════════════ */

// router.post("/rrs/calculate", async (req, res) => {
//   try {
//     const body = req.body || {};

//     // ── Input extraction with safe defaults ──
//     const romInput = body.rom || {};
//     const painInput = body.pain || {};
//     const symInput = body.symmetry || {};
//     const adherenceInput = body.adherence || {};
//     const fatigueInput = body.fatigue || {};
//     const formInput = body.form || {};
//     const compensationFlags = Array.isArray(body.compensations) ? body.compensations : [];

//     // ── ROM ──
//     const romBaseline = safeNum(romInput.baselineDeg ?? romInput.baseline, 0);
//     const romCurrent = safeNum(romInput.currentDeg ?? romInput.current, 0);
//     const romNormative = romInput.normativeDeg ? safeNum(romInput.normativeDeg) : null;
//     const romHistory = (Array.isArray(romInput.history) ? romInput.history : [])
//       .map(Number)
//       .filter((x) => isFinite(x));

//     // Smooth current ROM using session history (last 5 values)
//     const romCurrentSmoothed = romHistory.length > 0
//       ? (movingAverage([...romHistory, romCurrent], 5) ?? romCurrent)
//       : romCurrent;

//     const romPercent = computeROMImprovementPercent({
//       baselineROMDeg: romBaseline,
//       currentROMDeg: romCurrentSmoothed,
//       normativeROMDeg: romNormative,
//     });

//     // ── Pain ──
//     const baselinePain = safeNum(painInput.baselineNRS ?? painInput.baseline, 0);
//     const currentPain = safeNum(painInput.currentNRS ?? painInput.current, 0);
//     const painPercent = computePainReductionPercent({ baselinePain, currentPain });

//     // ── Symmetry ──
//     const injuredValue = safeNum(symInput.injuredValue, 0);
//     const uninjuredValue = safeNum(symInput.uninjuredValue, 0);
//     const symHistoryPercent = (Array.isArray(symInput.historyPercent) ? symInput.historyPercent : 
//                                Array.isArray(symInput.history) ? symInput.history : [])
//       .map(Number)
//       .filter((x) => isFinite(x));

//     const symmetryPercent = computeSymmetryPercent({
//       injuredValue,
//       uninjuredValue,
//       historyPercent: symHistoryPercent,
//     });

//     // ── Adherence ──
//     const completedSessions = safeNum(adherenceInput.completedSessions, 0);
//     const prescribedSessions = safeNum(adherenceInput.prescribedSessions, 0);
//     const longestMissedStreak = safeNum(adherenceInput.longestMissedStreakDays, 0);
//     const adherencePercent = computeAdherencePercent({
//       completedSessions,
//       prescribedSessions,
//       longestMissedStreakDays: longestMissedStreak,
//     });

//     // ── Fatigue ──
//     const readinessPercent = safeNum(fatigueInput.readinessPercent, 100);
//     const actualIntensityPercent = isFinite(Number(fatigueInput.actualIntensityPercent))
//       ? Number(fatigueInput.actualIntensityPercent)
//       : null;
//     const actualRPE = isFinite(Number(fatigueInput.actualRPE))
//       ? Number(fatigueInput.actualRPE)
//       : null;
//     const fatigueScore = computeFatigueResponseScore({
//       readinessPercent,
//       actualIntensityPercent,
//       actualRPE,
//     });

//     // ── Form Quality ──
//     const formQualityPercent = computeFormQualityPercent({
//       formQualityPercent: formInput.formQualityPercent,
//       poseQualityArray: formInput.poseQualityArray,
//     });

//     // ── Compensation Penalty ──
//     const compensationPenalty = computeCompensationPenalty(compensationFlags);

//     // ── Weights — normalize to sum to 1 ──
//     const defaultWeights = {
//       rom: 0.20,
//       pain: 0.20,
//       symmetry: 0.15,
//       adherence: 0.15,
//       fatigue: 0.10,
//       form: 0.20, // BUG FIX: original had form at 0.10, total = 0.90. Default now sums to 1.0
//     };
//     const rawWeights = Object.assign({}, defaultWeights, body.weights || {});

//     // Only use the 6 known domain keys to avoid user injecting extra weight keys
//     const domainKeys = ["rom", "pain", "symmetry", "adherence", "fatigue", "form"];
//     const filteredWeights = Object.fromEntries(
//       domainKeys.map((k) => [k, safeNum(rawWeights[k], defaultWeights[k])])
//     );
//     const weightSum = Object.values(filteredWeights).reduce((s, w) => s + w, 0);
//     const normalizedWeights =
//       Math.abs(weightSum - 1) > 1e-6 && weightSum > 0
//         ? Object.fromEntries(Object.entries(filteredWeights).map(([k, v]) => [k, v / weightSum]))
//         : filteredWeights;

//     // ── Core Weighted Score ──
//     const domainScores = {
//       rom: romPercent,
//       pain: painPercent,
//       symmetry: symmetryPercent,
//       adherence: adherencePercent,
//       fatigue: fatigueScore,
//       form: formQualityPercent,
//     };

//     const weightedScore = domainKeys.reduce(
//       (sum, k) => sum + domainScores[k] * (normalizedWeights[k] || 0),
//       0
//     );

//     const finalScore = clamp(round(weightedScore - compensationPenalty));

//     // ── Recovery Phase ──
//     let recoveryPhase;
//     if (finalScore < 35) recoveryPhase = "Acute Recovery";
//     else if (finalScore < 55) recoveryPhase = "Controlled Loading";
//     else if (finalScore < 75) recoveryPhase = "Strength Rebuild";
//     else recoveryPhase = "Performance Ready";

//     // ── Suggestions per domain ──
//     const romSug = romSuggestions({
//       percent: romPercent,
//       baselineDeg: romBaseline,
//       currentDeg: romCurrentSmoothed,
//       normativeDeg: romNormative,
//     });
//     const painSug = painSuggestions({
//       percent: painPercent,
//       baselineNRS: baselinePain,
//       currentNRS: currentPain,
//     });
//     const symSug = symmetrySuggestions({ percent: symmetryPercent });
//     const adhereSug = adherenceSuggestions({
//       percent: adherencePercent,
//       completed: completedSessions,
//       prescribed: prescribedSessions,
//       streak: longestMissedStreak,
//     });
//     const fatigueSug = fatigueSuggestions({
//       score: fatigueScore,
//       readinessPercent,
//       intensityPercent: actualIntensityPercent ?? (actualRPE ? clamp(((actualRPE - 1) / 9) * 100) : null),
//     });
//     const formSug = formSuggestions({
//       percent: formQualityPercent,
//       compensationFlags,
//     });

//     const domainStatuses = {
//       rom: romSug.status,
//       pain: painSug.status,
//       symmetry: symSug.status,
//       adherence: adhereSug.status,
//       fatigue: fatigueSug.status,
//       form: formSug.status,
//     };

//     const overallSug = overallSuggestions({
//       recoveryPhase,
//       score: finalScore,
//       domainScores,
//       domainStatuses,
//     });

//     // ── Response ──
//     return res.status(200).json({
//       message: "RRS calculated",
//       rrs: {
//         score: finalScore,
//         recoveryPhase,

//         // Overall suggestions first — the clinician's quick-read summary
//         suggestions: {
//           overall: overallSug,
//           byDomain: {
//             rom: { status: romSug.status, suggestions: romSug.suggestions },
//             pain: { status: painSug.status, suggestions: painSug.suggestions },
//             symmetry: { status: symSug.status, suggestions: symSug.suggestions },
//             adherence: { status: adhereSug.status, suggestions: adhereSug.suggestions },
//             fatigue: { status: fatigueSug.status, suggestions: fatigueSug.suggestions },
//             form: { status: formSug.status, suggestions: formSug.suggestions },
//           },
//         },

//         // Detailed breakdown for dashboards/charts
//         breakdown: {
//           rom: {
//             baselineDeg: romBaseline,
//             currentDeg: round(romCurrentSmoothed),
//             normativeDeg: romNormative,
//             improvementPercent: round(romPercent),
//             weight: round(normalizedWeights.rom, 4),
//           },
//           pain: {
//             baselineNRS: baselinePain,
//             currentNRS: currentPain,
//             reductionPercent: round(painPercent),
//             weight: round(normalizedWeights.pain, 4),
//           },
//           symmetry: {
//             injuredValue,
//             uninjuredValue,
//             lsiPercent: round(symmetryPercent),
//             weight: round(normalizedWeights.symmetry, 4),
//           },
//           adherence: {
//             completedSessions,
//             prescribedSessions,
//             longestMissedStreakDays: longestMissedStreak,
//             adherencePercent: round(adherencePercent),
//             weight: round(normalizedWeights.adherence, 4),
//           },
//           fatigue: {
//             readinessPercent,
//             actualIntensityPercent: actualIntensityPercent ?? null,
//             actualRPE: actualRPE ?? null,
//             fatigueResponseScore: round(fatigueScore),
//             weight: round(normalizedWeights.fatigue, 4),
//           },
//           form: {
//             formQualityPercent: round(formQualityPercent),
//             weight: round(normalizedWeights.form, 4),
//           },
//           compensation: {
//             flags: compensationFlags,
//             penaltyApplied: compensationPenalty,
//           },
//           weightedScoreBeforePenalty: round(weightedScore),
//         },
//       },
//     });
//   } catch (err) {
//     console.error("RRS route error:", err);
//     return res.status(500).json({ message: "Server error calculating RRS", error: err.message });
//   }
// });

// /* ─────────────────────────────────────────────────────────
//    Convenience: GET /rrs/phases
//    Returns the four phase definitions so the frontend can
//    display them without hard-coding them client-side.
//    ───────────────────────────────────────────────────────── */
// router.get("/rrs/phases", (_req, res) => {
//   return res.json({
//     phases: [
//       { phase: "Acute Recovery",     minScore: 0,  maxScore: 34, description: "Focus on pain control, oedema reduction, and tissue protection." },
//       { phase: "Controlled Loading", minScore: 35, maxScore: 54, description: "Introduce pain-free ROM and light progressive loading." },
//       { phase: "Strength Rebuild",   minScore: 55, maxScore: 74, description: "Progressive resistance training and symmetry restoration." },
//       { phase: "Performance Ready",  minScore: 75, maxScore: 100, description: "Sport/work-specific functional training and discharge planning." },
//     ],
//     weights: {
//       rom: 0.20, pain: 0.20, symmetry: 0.15,
//       adherence: 0.15, fatigue: 0.10, form: 0.20,
//     },
//   });
// });

// export default router;
/**
 * src/routes/rehab.routes.js
 *
 * RRS 2.0 — Recovery & Rehabilitation Score
 * Fully enhanced with:
 *  - Logic review & bug fixes (symmetry smoothing divide-by-zero, weight normalization, RPE→intensity)
 *  - Clinician-facing suggestion engine per domain (ROM, Pain, Symmetry, Adherence, Fatigue, Form)
 *  - Overall recovery suggestions based on phase + weakest domain
 *  - Safe defaults & input validation throughout
 *
 * Mount: app.use("/api/rehab", router)
 */

import express from "express";
import mongoose from "mongoose";
import RehabSession from "../models/rehabSession.model.js";

const router = express.Router();

/* ═══════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════ */

/** Clamp a value between min and max */
const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

/** Round to N decimal places */
const round = (v, dp = 2) => Math.round(v * 10 ** dp) / 10 ** dp;

/**
 * Simple moving average over the last N elements.
 * Returns null if array is empty.
 */
const movingAverage = (arr = [], windowSize = 3) => {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const slice = arr.slice(-windowSize);
  const valid = slice.filter((x) => typeof x === "number" && !isNaN(x));
  if (valid.length === 0) return null;
  return valid.reduce((s, x) => s + x, 0) / valid.length;
};

/**
 * Safe number coercion — returns defaultVal if input is not a finite number.
 */
const safeNum = (v, defaultVal = 0) => {
  const n = Number(v);
  return isFinite(n) ? n : defaultVal;
};

/* ═══════════════════════════════════════════════════════════
   DOMAIN CALCULATORS
   ═══════════════════════════════════════════════════════════ */

/**
 * ROM Improvement Score (0–100)
 *
 * BUG FIX (original): The original formula `50 + percentChange * 0.5`
 * gave a score of 50 even when current == baseline (0% improvement),
 * which inflates scores artificially in early sessions.
 *
 * REVISED LOGIC:
 *  - If normative ROM is provided: score = (current / normative) * 100
 *    — clinically preferred; tells us how close to full function we are.
 *  - Otherwise: percent improvement from baseline, mapped 0→0, 100%→100.
 *    — We cap at 100% improvement to prevent supra-normal inflated scores.
 *  - Baseline near-zero edge case handled via normative or heuristic cap.
 */
const computeROMImprovementPercent = ({
  baselineROMDeg,
  currentROMDeg,
  normativeROMDeg = null,
}) => {
  const baseline = safeNum(baselineROMDeg, 0);
  const current = safeNum(currentROMDeg, 0);
  const normative = normativeROMDeg != null ? safeNum(normativeROMDeg, 0) : null;

  // Preferred path: score against normative ROM
  if (normative && normative > 0) {
    return clamp((current / normative) * 100);
  }

  // Baseline is effectively zero — use heuristic cap (150° is a generous upper bound)
  if (Math.abs(baseline) < 1) {
    return clamp((current / 150) * 100);
  }

  // Standard percent improvement from baseline, linear mapping 0–100
  // 0% improvement → score 0; 100% improvement → score 100; capped at 100
  const percentImprove = ((current - baseline) / Math.abs(baseline)) * 100;
  return clamp(percentImprove);
};

/**
 * Pain Reduction Score (0–100)
 *
 * BUG NOTE (original): Logic was correct. Retained as-is.
 * 100 = full elimination of baseline pain, 0 = pain is same or worse.
 *
 * ENHANCEMENT: If current pain is *worse* than baseline we return 0
 * (no negative scores — pain flare is captured by suggestions, not penalised twice).
 */
const computePainReductionPercent = ({ baselinePain, currentPain }) => {
  const baseline = safeNum(baselinePain, 0);
  const current = safeNum(currentPain, 0);

  if (baseline <= 0) return 100; // No baseline pain → full credit
  if (current >= baseline) return 0; // Pain same or worse → 0 (not negative)

  return clamp(((baseline - current) / baseline) * 100);
};

/**
 * Movement Symmetry Score (0–100) — Limb Symmetry Index (LSI)
 *
 * BUG FIX (original): When history was provided, the original code computed:
 *   movingAverage([...symHistory, (injVal / uninjVal) * 100])
 *   — but this crashes / NaNs when uninjuredValue is 0.
 *   We guard against divide-by-zero before building the smoothed array.
 *
 * ENHANCEMENT: Accept optional historyPercent array (pre-computed LSI values)
 * OR raw injured/uninjured pairs, whichever the caller provides.
 */
const computeSymmetryPercent = ({
  injuredValue,
  uninjuredValue,
  historyPercent = [],
}) => {
  const inj = safeNum(injuredValue, 0);
  const uninj = safeNum(uninjuredValue, 0);

  let currentLSI;
  if (Math.abs(uninj) < 1e-6) {
    // Uninjured side is zero → symmetry is undefined or 100 if both are zero
    currentLSI = Math.abs(inj) < 1e-6 ? 100 : 50; // Unknown → mid-score
  } else {
    currentLSI = clamp((inj / uninj) * 100);
  }

  // Smooth against history if provided
  const validHistory = Array.isArray(historyPercent)
    ? historyPercent.map(Number).filter((x) => isFinite(x))
    : [];

  if (validHistory.length > 0) {
    const smoothed = movingAverage([...validHistory, currentLSI], 5);
    return clamp(smoothed ?? currentLSI);
  }

  return currentLSI;
};

/**
 * Adherence Score (0–100)
 *
 * BUG NOTE (original): Logic sound. Enhanced streak penalty window to be
 * proportional to prescribedSessions, not a hard-coded 14-day window,
 * which was arbitrary and unfair for short programs.
 */
const computeAdherencePercent = ({
  completedSessions,
  prescribedSessions,
  longestMissedStreakDays = 0,
}) => {
  const completed = safeNum(completedSessions, 0);
  const prescribed = safeNum(prescribedSessions, 0);
  const streak = safeNum(longestMissedStreakDays, 0);

  if (prescribed <= 0) {
    return completed >= 1 ? 100 : 0;
  }

  const baseRatio = clamp((completed / prescribed) * 100);

  // Proportional streak penalty: 7-day window gives up to 15 pts deduction.
  // Rationale: missing >7 consecutive days is clinically significant for most rehab programs.
  const streakPenalty = clamp((streak / 7) * 15, 0, 15);

  return clamp(baseRatio - streakPenalty);
};

/**
 * Fatigue Response Score (0–100)
 *
 * BUG FIX (original): The formula `90 + (10 * (1 - (1 - ratio)))` simplifies
 * to `90 + 10 * ratio`, which means when ratio=1 (intensity == readiness) the
 * score is 100, but when ratio is very small (very easy session) score approaches 90.
 * This penalises light sessions unfairly.
 *
 * REVISED:
 *  - ratio ≤ 1 (training at or below readiness) → score = 100. Full credit.
 *  - ratio > 1 (overreaching) → smooth exponential drop.
 *    Mild overreach (10–20% over): minor penalty.
 *    Severe overreach (>50% over): large penalty approaching 0.
 *
 * ENHANCEMENT: If both actualIntensityPercent and actualRPE are provided,
 * use intensity directly (more precise). RPE used as fallback only.
 */
const computeFatigueResponseScore = ({
  readinessPercent = 100,
  actualIntensityPercent = null,
  actualRPE = null,
}) => {
  const readiness = clamp(safeNum(readinessPercent, 100));

  // Resolve intensity: prefer direct percent, fall back to RPE conversion
  let intensity = null;
  if (typeof actualIntensityPercent === "number" && isFinite(actualIntensityPercent)) {
    intensity = clamp(actualIntensityPercent);
  } else if (typeof actualRPE === "number" && isFinite(actualRPE)) {
    // RPE 1–10 → 10%–100% (Borg CR-10 linear mapping)
    intensity = clamp(((actualRPE - 1) / 9) * 100);
  }

  if (intensity === null) return readiness; // No intensity data → return readiness as proxy

  const ratio = intensity / Math.max(1, readiness);

  if (ratio <= 1) return 100; // Training within readiness → perfect

  // Exponential penalty for overreach
  // ratio=1.1 → ~92, ratio=1.3 → ~75, ratio=1.5 → ~56, ratio=2.0 → ~20
  const score = 100 * Math.exp(-2.5 * (ratio - 1));
  return clamp(round(score));
};

/**
 * Form Quality Score (0–100)
 *
 * ENHANCEMENT: If both formQualityPercent and poseQualityArray are provided,
 * blend them (direct measurement takes 70% weight for recency).
 */
const computeFormQualityPercent = ({
  formQualityPercent = null,
  poseQualityArray = [],
}) => {
  const direct =
    typeof formQualityPercent === "number" && isFinite(formQualityPercent)
      ? clamp(formQualityPercent)
      : null;

  const validArr = Array.isArray(poseQualityArray)
    ? poseQualityArray.map(Number).filter((x) => isFinite(x))
    : [];

  const historical = validArr.length > 0 ? clamp(movingAverage(validArr, 3) ?? 50) : null;

  if (direct !== null && historical !== null) {
    return clamp(0.7 * direct + 0.3 * historical); // Blend: current session weighted higher
  }
  if (direct !== null) return direct;
  if (historical !== null) return historical;
  return 50; // True unknown → neutral mid-score
};

/**
 * Compensation Penalty (0–40 pts deducted from final score)
 *
 * BUG FIX (original): `Math.sqrt(raw) * 5` with `raw` being a sum of severity
 * points means a single "severe" (18pts) gives penalty of sqrt(18)*5 ≈ 21.2.
 * Two severe flags give sqrt(36)*5 = 30. Three give sqrt(54)*5 ≈ 36.7.
 * This diminishing return is reasonable clinically.
 *
 * ENHANCEMENT: Accept severity strings consistently (mild/moderate/severe),
 * with "moderate" matching what AI output tends to generate (original only had "mod").
 */
const computeCompensationPenalty = (compensationFlags = []) => {
  if (!Array.isArray(compensationFlags) || compensationFlags.length === 0) return 0;

  const severityMap = {
    mild: 3,
    moderate: 8,
    mod: 8, // backward compat alias
    severe: 18,
  };

  const raw = compensationFlags.reduce((sum, flag) => {
    if (!flag || typeof flag !== "object") return sum;
    const sev = flag.severity ? (severityMap[String(flag.severity).toLowerCase()] ?? 0) : 0;
    return sum + sev;
  }, 0);

  const penalty = clamp(Math.sqrt(raw) * 5, 0, 40);
  return round(penalty);
};

/* ═══════════════════════════════════════════════════════════
   SUGGESTION ENGINE
   Generates actionable, clinician-facing recommendations
   based on each domain score and overall recovery phase.
   ═══════════════════════════════════════════════════════════ */

/**
 * Per-domain suggestion: returns { status, suggestions[] }
 * Status: "excellent" | "good" | "needs_attention" | "critical"
 */

const romSuggestions = ({ percent, baselineDeg, currentDeg, normativeDeg }) => {
  const gap = normativeDeg ? normativeDeg - currentDeg : null;

  if (percent >= 85) {
    return {
      status: "excellent",
      suggestions: [
        "ROM is near-normal. Transition focus to strength and neuromuscular control.",
        gap !== null && gap <= 10
          ? `Only ${Math.round(gap)}° from normative. Sport/function-specific drills are appropriate.`
          : "Continue maintenance stretching and dynamic warm-ups.",
      ].filter(Boolean),
    };
  }
  if (percent >= 65) {
    return {
      status: "good",
      suggestions: [
        "ROM is improving but not yet at functional threshold. Maintain progressive stretching.",
        "Consider adding low-load prolonged stretching (LLPS) 15–30 min/day for capsular restrictions.",
        gap !== null ? `Target: close the remaining ${Math.round(gap)}° gap within 2–4 weeks.` : "Set a measurable ROM target for next reassessment.",
      ].filter(Boolean),
    };
  }
  if (percent >= 40) {
    return {
      status: "needs_attention",
      suggestions: [
        "ROM recovery is lagging. Prioritise joint mobility before loading.",
        "Perform ROM exercises 2× daily — morning for stiffness, evening for tissue lengthening.",
        "Add heat therapy (10 min) immediately before stretching to improve tissue extensibility.",
        "Assess for joint effusion, capsular tightness, or scar tissue limiting range.",
        "Consider referral for manual therapy (joint mobilisation grade III–IV) if plateau persists.",
      ],
    };
  }
  return {
    status: "critical",
    suggestions: [
      "Severely restricted ROM — movement loading should be minimal until mobility improves.",
      "Rule out post-surgical complications, heterotopic ossification, or severe fibrosis.",
      "Hydrotherapy or continuous passive motion (CPM) may be indicated at this stage.",
      "Daily gentle AROM within pain-free range; avoid aggressive end-range stretching.",
      "Re-assess weekly and escalate to specialist if <40% normative ROM persists >3 weeks.",
    ],
  };
};

const painSuggestions = ({ percent, baselineNRS, currentNRS }) => {
  if (percent >= 90) {
    return {
      status: "excellent",
      suggestions: [
        "Pain is well controlled. Maintain current analgesic/load management strategy.",
        currentNRS <= 1
          ? "NRS ≤1 — patient is effectively pain-free. Focus is now functional rehabilitation."
          : "Minimal residual pain acceptable during therapeutic exercise (NRS ≤3 during activity).",
      ],
    };
  }
  if (percent >= 60) {
    return {
      status: "good",
      suggestions: [
        "Moderate pain reduction achieved. Continue current pain management approach.",
        "Ensure patient understands the difference between hurt (protective) and harm (tissue damage).",
        "Pain education (neurophysiology) may further reduce perceived pain and fear-avoidance.",
        "Reassess analgesic timing relative to exercise sessions for optimal comfort.",
      ],
    };
  }
  if (percent >= 30) {
    return {
      status: "needs_attention",
      suggestions: [
        `Current NRS ${currentNRS}/10 — still significantly elevated. Revise loading strategy.`,
        "Reduce exercise intensity by 20–30% and avoid movements that spike pain above NRS 4.",
        "Review NSAID/analgesic schedule with prescribing clinician if pain is limiting participation.",
        "Apply pain-gate modalities: TENS, ice/heat contrast, or gentle TENS during exercise.",
        "Screen for psychological contributors — pain catastrophising scale (PCS) if not yet done.",
      ],
    };
  }
  return {
    status: "critical",
    suggestions: [
      `NRS ${currentNRS}/10 — high pain levels are severely impeding rehabilitation.`,
      "Suspend progressive loading. Focus on pain relief modalities only.",
      "Urgent review of diagnosis: consider imaging, specialist referral, or medication review.",
      "Assess yellow flags: kinesiophobia, catastrophising, depression — refer to psychologist if indicated.",
      "Patient should not be progressed until pain is consistently below NRS 5 at rest.",
    ],
  };
};

const symmetrySuggestions = ({ percent }) => {
  if (percent >= 90) {
    return {
      status: "excellent",
      suggestions: [
        "LSI ≥90% — criteria met for return-to-sport progression in most protocols.",
        "Maintain bilateral symmetry training. Single-leg challenges recommended.",
      ],
    };
  }
  if (percent >= 75) {
    return {
      status: "good",
      suggestions: [
        "LSI approaching functional threshold. Continue symmetry-focused training.",
        "Introduce single-leg strength and balance exercises (SL squat, SL RDL, SL hop).",
        "Re-measure LSI in 2 weeks — target ≥90% before unrestricted activity clearance.",
      ],
    };
  }
  if (percent >= 50) {
    return {
      status: "needs_attention",
      suggestions: [
        "Significant asymmetry detected — compensation risk is elevated.",
        "Increase unilateral training volume on the injured limb (2:1 ratio vs uninjured).",
        "Use BFR (blood flow restriction) training to build strength without heavy loading if pain-limited.",
        "Re-measure bilateral strength and ROM — identify if asymmetry is ROM-driven or strength-driven.",
      ],
    };
  }
  return {
    status: "critical",
    suggestions: [
      "LSI <50% — severe limb asymmetry present. Do not progress to bilateral loading.",
      "Focus exclusively on isolated injured-limb activation and muscle facilitation.",
      "Neuromuscular electrical stimulation (NMES) may help re-establish motor recruitment.",
      "Investigate cause: disuse atrophy, arthrogenic muscle inhibition (AMI), or pain inhibition.",
    ],
  };
};

const adherenceSuggestions = ({ percent, completed, prescribed, streak }) => {
  if (percent >= 85) {
    return {
      status: "excellent",
      suggestions: [
        "Excellent adherence. Positive reinforcement — acknowledge patient effort.",
        "Consider progressing difficulty or variety to maintain engagement.",
      ],
    };
  }
  if (percent >= 65) {
    return {
      status: "good",
      suggestions: [
        `${completed}/${prescribed} sessions completed. Good effort — identify barriers to the missed sessions.`,
        "Use motivational interviewing to explore any logistical or psychological barriers.",
        "Set short-term sub-goals to maintain momentum.",
      ],
    };
  }
  if (percent >= 40) {
    return {
      status: "needs_attention",
      suggestions: [
        `Only ${completed}/${prescribed} sessions completed — adherence is below therapeutic threshold.`,
        streak > 0
          ? `Longest missed streak: ${streak} days. Investigate the reason — work/life disruption or loss of motivation?`
          : "",
        "Simplify the home exercise program — reduce to 3 key exercises if full program is overwhelming.",
        "Set a check-in reminder via phone/app. Brief 10-min daily adherence beats infrequent long sessions.",
        "Explore patient beliefs about recovery — health literacy and self-efficacy may need addressing.",
      ].filter(Boolean),
    };
  }
  return {
    status: "critical",
    suggestions: [
      "Critical adherence failure. Rehabilitation outcomes are severely compromised.",
      "Urgent conversation required: explore fear of pain, financial barriers, or disengagement.",
      "Consider switching to supervised sessions until self-management capacity improves.",
      "Document non-adherence and escalate to referring clinician if pattern continues.",
    ],
  };
};

const fatigueSuggestions = ({ score, readinessPercent, intensityPercent }) => {
  if (score >= 85) {
    return {
      status: "excellent",
      suggestions: [
        "Load management is well calibrated to readiness. Maintain current training-recovery balance.",
        "If readiness consistently >80%, consider progressive overload in next session cycle.",
      ],
    };
  }
  if (score >= 65) {
    return {
      status: "good",
      suggestions: [
        "Slight overreach detected but within acceptable limits. Monitor for cumulative fatigue.",
        "Ensure 48h recovery between high-intensity sessions for this muscle group.",
        "Prioritise sleep (7–9h) and nutrition — protein 1.6–2.2g/kg body weight for tissue repair.",
      ],
    };
  }
  if (score >= 40) {
    return {
      status: "needs_attention",
      suggestions: [
        `Readiness was ${readinessPercent}% but intensity reached ${intensityPercent ?? "high"} — significant overreach.`,
        "Reduce next session intensity by 30–40% to allow recovery.",
        "Administer fatigue/readiness questionnaire (e.g., RESTQ-Sport or Hooper Index) before next session.",
        "Check for signs of overtraining syndrome: poor sleep, mood changes, persistent muscle soreness.",
      ],
    };
  }
  return {
    status: "critical",
    suggestions: [
      "Severe overreach relative to readiness. Rest day is clinically indicated.",
      "Do not progress exercise volume or intensity until readiness recovers above 60%.",
      "Screen for RED-S (Relative Energy Deficiency in Sport) if this pattern is recurring.",
      "Consult with sports medicine physician if overtraining is suspected.",
    ],
  };
};

const formSuggestions = ({ percent, compensationFlags }) => {
  const criticalComps = (compensationFlags || []).filter(
    (f) => f && f.severity && ["severe", "moderate", "mod"].includes(String(f.severity).toLowerCase())
  );

  if (percent >= 80 && criticalComps.length === 0) {
    return {
      status: "excellent",
      suggestions: [
        "Excellent movement quality. Safe to progress load or complexity.",
        "Introduce perturbation training or unstable surfaces to challenge neuromuscular control.",
      ],
    };
  }
  if (percent >= 60) {
    return {
      status: "good",
      suggestions: [
        "Form is adequate but refinement is needed before adding load.",
        "Use mirror feedback or video review to improve movement self-awareness.",
        criticalComps.length > 0
          ? `Address compensations: ${criticalComps.map((f) => f.type).join(", ")} — cue correction before loading.`
          : "Focus on slow eccentric control to reinforce motor patterns.",
      ].filter(Boolean),
    };
  }
  if (percent >= 40) {
    return {
      status: "needs_attention",
      suggestions: [
        "Movement quality is below threshold — do not increase load until form improves.",
        "Regress to bodyweight or assisted versions of the exercise.",
        criticalComps.length > 0
          ? `Significant compensations detected (${criticalComps.map((f) => f.type).join(", ")}). Address root cause (weakness, tightness, or pain inhibition).`
          : "Focus on movement re-education: slow tempo, tactile cueing, partial range if needed.",
        "Consider real-time biofeedback or electromyographic (EMG) training if available.",
      ].filter(Boolean),
    };
  }
  return {
    status: "critical",
    suggestions: [
      "Poor movement quality — exercise is likely reinforcing compensatory patterns.",
      "Stop current exercise prescription and regress to activation-level exercises.",
      "Perform detailed movement screen (FMS or similar) to identify root dysfunction.",
      criticalComps.length > 0
        ? `Severe compensations present: ${criticalComps.map((f) => f.type).join(", ")}. Manual therapy or dry needling may be required before re-loading.`
        : "Manual therapy and neuromuscular re-education indicated before progressive loading.",
    ].filter(Boolean),
  };
};

/**
 * Overall recovery suggestions based on phase + weakest domain(s)
 */
const overallSuggestions = ({ recoveryPhase, score, domainScores, domainStatuses }) => {
  const suggestions = [];

  // Phase-based headline
  const phaseMessages = {
    "Acute Recovery": "Patient is in acute recovery. Prioritise pain control, oedema management, and protecting healing tissue. Avoid aggressive loading.",
    "Controlled Loading": "Patient is transitioning to controlled loading. Introduce progressive exercises within pain-free range. Monitor response closely.",
    "Strength Rebuild": "Strength rebuilding phase — progressive resistance training is the priority. Monitor symmetry and form quality at each session.",
    "Performance Ready": "Patient is approaching performance readiness. Sport/work-specific functional tasks can be introduced. Plan discharge criteria.",
  };
  suggestions.push(phaseMessages[recoveryPhase] || "Continue monitoring recovery progress.");

  // Flag the weakest domain(s)
  const critical = Object.entries(domainStatuses).filter(([, s]) => s === "critical").map(([k]) => k);
  const needsAttention = Object.entries(domainStatuses).filter(([, s]) => s === "needs_attention").map(([k]) => k);

  if (critical.length > 0) {
    suggestions.push(`⚠️ Critical areas requiring immediate attention: ${critical.join(", ").toUpperCase()}. Address these before progressing other domains.`);
  }
  if (needsAttention.length > 0) {
    suggestions.push(`Areas needing focused work: ${needsAttention.join(", ")}. Review specific domain recommendations below.`);
  }

  // Score-band guidance
  if (score >= 80) {
    suggestions.push("Overall RRS is strong. Begin planning return-to-function/sport criteria with the patient.");
  } else if (score >= 60) {
    suggestions.push("Moderate recovery progress. Maintain structured program and reassess in 1–2 weeks.");
  } else if (score >= 40) {
    suggestions.push("Recovery is below expected trajectory. Review program design and patient engagement barriers.");
  } else {
    suggestions.push("RRS is critically low. A comprehensive clinical review is strongly recommended. Consider multidisciplinary input.");
  }

  // Reassessment frequency guidance
  const reassessFreq =
    score < 40 ? "every 3–5 days" : score < 65 ? "weekly" : "every 2 weeks";
  suggestions.push(`Recommended reassessment frequency: ${reassessFreq}.`);

  return suggestions;
};

/* ═══════════════════════════════════════════════════════════
   ROUTE: POST /rrs/calculate
   ═══════════════════════════════════════════════════════════ */

router.post("/rrs/calculate", async (req, res) => {
  try {
    const body = req.body || {};

    // ── Input extraction with safe defaults ──
    const romInput = body.rom || {};
    const painInput = body.pain || {};
    const symInput = body.symmetry || {};
    const adherenceInput = body.adherence || {};
    const fatigueInput = body.fatigue || {};
    const formInput = body.form || {};
    const compensationFlags = Array.isArray(body.compensations) ? body.compensations : [];

    // ── ROM ──
    const romBaseline = safeNum(romInput.baselineDeg ?? romInput.baseline, 0);
    const romCurrent = safeNum(romInput.currentDeg ?? romInput.current, 0);
    const romNormative = romInput.normativeDeg ? safeNum(romInput.normativeDeg) : null;
    const romHistory = (Array.isArray(romInput.history) ? romInput.history : [])
      .map(Number)
      .filter((x) => isFinite(x));

    // Smooth current ROM using session history (last 5 values)
    const romCurrentSmoothed = romHistory.length > 0
      ? (movingAverage([...romHistory, romCurrent], 5) ?? romCurrent)
      : romCurrent;

    const romPercent = computeROMImprovementPercent({
      baselineROMDeg: romBaseline,
      currentROMDeg: romCurrentSmoothed,
      normativeROMDeg: romNormative,
    });

    // ── Pain ──
    const baselinePain = safeNum(painInput.baselineNRS ?? painInput.baseline, 0);
    const currentPain = safeNum(painInput.currentNRS ?? painInput.current, 0);
    const painPercent = computePainReductionPercent({ baselinePain, currentPain });

    // ── Symmetry ──
    const injuredValue = safeNum(symInput.injuredValue, 0);
    const uninjuredValue = safeNum(symInput.uninjuredValue, 0);
    const symHistoryPercent = (Array.isArray(symInput.historyPercent) ? symInput.historyPercent : 
                               Array.isArray(symInput.history) ? symInput.history : [])
      .map(Number)
      .filter((x) => isFinite(x));

    const symmetryPercent = computeSymmetryPercent({
      injuredValue,
      uninjuredValue,
      historyPercent: symHistoryPercent,
    });

    // ── Adherence ──
    const completedSessions = safeNum(adherenceInput.completedSessions, 0);
    const prescribedSessions = safeNum(adherenceInput.prescribedSessions, 0);
    const longestMissedStreak = safeNum(adherenceInput.longestMissedStreakDays, 0);
    const adherencePercent = computeAdherencePercent({
      completedSessions,
      prescribedSessions,
      longestMissedStreakDays: longestMissedStreak,
    });

    // ── Fatigue ──
    const readinessPercent = safeNum(fatigueInput.readinessPercent, 100);
    const actualIntensityPercent = isFinite(Number(fatigueInput.actualIntensityPercent))
      ? Number(fatigueInput.actualIntensityPercent)
      : null;
    const actualRPE = isFinite(Number(fatigueInput.actualRPE))
      ? Number(fatigueInput.actualRPE)
      : null;
    const fatigueScore = computeFatigueResponseScore({
      readinessPercent,
      actualIntensityPercent,
      actualRPE,
    });

    // ── Form Quality ──
    const formQualityPercent = computeFormQualityPercent({
      formQualityPercent: formInput.formQualityPercent,
      poseQualityArray: formInput.poseQualityArray,
    });

    // ── Compensation Penalty ──
    const compensationPenalty = computeCompensationPenalty(compensationFlags);

    // ── Weights — normalize to sum to 1 ──
    const defaultWeights = {
      rom: 0.20,
      pain: 0.20,
      symmetry: 0.15,
      adherence: 0.15,
      fatigue: 0.10,
      form: 0.20, // BUG FIX: original had form at 0.10, total = 0.90. Default now sums to 1.0
    };
    const rawWeights = Object.assign({}, defaultWeights, body.weights || {});

    // Only use the 6 known domain keys to avoid user injecting extra weight keys
    const domainKeys = ["rom", "pain", "symmetry", "adherence", "fatigue", "form"];
    const filteredWeights = Object.fromEntries(
      domainKeys.map((k) => [k, safeNum(rawWeights[k], defaultWeights[k])])
    );
    const weightSum = Object.values(filteredWeights).reduce((s, w) => s + w, 0);
    const normalizedWeights =
      Math.abs(weightSum - 1) > 1e-6 && weightSum > 0
        ? Object.fromEntries(Object.entries(filteredWeights).map(([k, v]) => [k, v / weightSum]))
        : filteredWeights;

    // ── Core Weighted Score ──
    const domainScores = {
      rom: romPercent,
      pain: painPercent,
      symmetry: symmetryPercent,
      adherence: adherencePercent,
      fatigue: fatigueScore,
      form: formQualityPercent,
    };

    const weightedScore = domainKeys.reduce(
      (sum, k) => sum + domainScores[k] * (normalizedWeights[k] || 0),
      0
    );

    const finalScore = clamp(round(weightedScore - compensationPenalty));

    // ── Recovery Phase ──
    let recoveryPhase;
    if (finalScore < 35) recoveryPhase = "Acute Recovery";
    else if (finalScore < 55) recoveryPhase = "Controlled Loading";
    else if (finalScore < 75) recoveryPhase = "Strength Rebuild";
    else recoveryPhase = "Performance Ready";

    // ── Suggestions per domain ──
    const romSug = romSuggestions({
      percent: romPercent,
      baselineDeg: romBaseline,
      currentDeg: romCurrentSmoothed,
      normativeDeg: romNormative,
    });
    const painSug = painSuggestions({
      percent: painPercent,
      baselineNRS: baselinePain,
      currentNRS: currentPain,
    });
    const symSug = symmetrySuggestions({ percent: symmetryPercent });
    const adhereSug = adherenceSuggestions({
      percent: adherencePercent,
      completed: completedSessions,
      prescribed: prescribedSessions,
      streak: longestMissedStreak,
    });
    const fatigueSug = fatigueSuggestions({
      score: fatigueScore,
      readinessPercent,
      intensityPercent: actualIntensityPercent ?? (actualRPE ? clamp(((actualRPE - 1) / 9) * 100) : null),
    });
    const formSug = formSuggestions({
      percent: formQualityPercent,
      compensationFlags,
    });

    const domainStatuses = {
      rom: romSug.status,
      pain: painSug.status,
      symmetry: symSug.status,
      adherence: adhereSug.status,
      fatigue: fatigueSug.status,
      form: formSug.status,
    };

    const overallSug = overallSuggestions({
      recoveryPhase,
      score: finalScore,
      domainScores,
      domainStatuses,
    });

    // ── Validate userId (required for DB save) ──
    const { userId } = body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required in the request body." });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "userId must be a valid MongoDB ObjectId." });
    }

    // ── Build suggestions and breakdown objects ──
    const suggestions = {
      overall: overallSug,
      byDomain: {
        rom:       { status: romSug.status,     suggestions: romSug.suggestions },
        pain:      { status: painSug.status,    suggestions: painSug.suggestions },
        symmetry:  { status: symSug.status,     suggestions: symSug.suggestions },
        adherence: { status: adhereSug.status,  suggestions: adhereSug.suggestions },
        fatigue:   { status: fatigueSug.status, suggestions: fatigueSug.suggestions },
        form:      { status: formSug.status,    suggestions: formSug.suggestions },
      },
    };

    const breakdown = {
      rom:      { baselineDeg: romBaseline, currentDeg: round(romCurrentSmoothed), normativeDeg: romNormative, improvementPercent: round(romPercent), weight: round(normalizedWeights.rom, 4) },
      pain:     { baselineNRS: baselinePain, currentNRS: currentPain, reductionPercent: round(painPercent), weight: round(normalizedWeights.pain, 4) },
      symmetry: { injuredValue, uninjuredValue, lsiPercent: round(symmetryPercent), weight: round(normalizedWeights.symmetry, 4) },
      adherence:{ completedSessions, prescribedSessions, longestMissedStreakDays: longestMissedStreak, adherencePercent: round(adherencePercent), weight: round(normalizedWeights.adherence, 4) },
      fatigue:  { readinessPercent, actualIntensityPercent: actualIntensityPercent ?? null, actualRPE: actualRPE ?? null, fatigueResponseScore: round(fatigueScore), weight: round(normalizedWeights.fatigue, 4) },
      form:     { formQualityPercent: round(formQualityPercent), weight: round(normalizedWeights.form, 4) },
      compensation: { flags: compensationFlags, penaltyApplied: compensationPenalty },
      weightedScoreBeforePenalty: round(weightedScore),
    };

    // ── Save to MongoDB ──
    const session = await RehabSession.create({
      userId,
      sessionType:         body.sessionType        || "Treatment Session",
      bodyRegion:          body.bodyRegion          || null,
      rehabilitationPhase: body.rehabilitationPhase || null,
      patientDescription:  body.patientDescription  || null,
      notes:               body.notes               || null,
      score:               finalScore,
      recoveryPhase,
      suggestions,
      breakdown,
      rawInput: {
        rom:           body.rom           || {},
        pain:          body.pain          || {},
        symmetry:      body.symmetry      || {},
        adherence:     body.adherence     || {},
        fatigue:       body.fatigue       || {},
        form:          body.form          || {},
        compensations: body.compensations || [],
        weights:       body.weights       || {},
      },
    });

    return res.status(201).json({
      message:   "RRS calculated and saved successfully.",
      sessionId: session._id,
      rrs: { score: finalScore, recoveryPhase, suggestions, breakdown },
    });

  } catch (err) {
    console.error("RRS route error:", err);
    return res.status(500).json({ message: "Server error calculating RRS.", error: err.message });
  }
});

/* =======================================================
   GET /rrs/sessions/:userId
   All sessions for a user - paginated and filterable.

   Query params (all optional):
     ?limit=10                  - results per page (max 100, default 10)
     ?page=1                    - page number (default 1)
     ?phase=Controlled+Loading  - filter by recoveryPhase
     ?sort=asc                  - sort direction (default desc = newest first)

   Example:
     GET /api/rehab/rrs/sessions/6661234abcd1234abcd12345?limit=5&page=2
   ======================================================= */

router.get("/rrs/sessions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    const limit   = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const page    = Math.max(parseInt(req.query.page) || 1, 1);
    const skip    = (page - 1) * limit;
    const sortDir = req.query.sort === "asc" ? 1 : -1;

    const filter = { userId, isArchived: false };
    if (req.query.phase) filter.recoveryPhase = req.query.phase;

    const [sessions, total] = await Promise.all([
      RehabSession.find(filter)
        .sort({ sessionDate: sortDir })
        .skip(skip)
        .limit(limit)
        .select("-rawInput")  // rawInput excluded from list - use single-session route for full detail
        .lean(),
      RehabSession.countDocuments(filter),
    ]);

    return res.status(200).json({
      message: "Sessions fetched successfully.",
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
      sessions,
    });

  } catch (err) {
    console.error("Fetch sessions error:", err);
    return res.status(500).json({ message: "Server error fetching sessions.", error: err.message });
  }
});

/* =======================================================
   GET /rrs/sessions/:userId/:sessionId
   Single session with full detail including rawInput for audit/replay.

   Example:
     GET /api/rehab/rrs/sessions/6661234abcd1234abcd12345/6679999abcd0000abcd99999
   ======================================================= */

router.get("/rrs/sessions/:userId/:sessionId", async (req, res) => {
  try {
    const { userId, sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid sessionId." });
    }

    // userId check ensures a user can only fetch their own sessions
    const session = await RehabSession.findOne({ _id: sessionId, userId }).lean();

    if (!session) {
      return res.status(404).json({ message: "Session not found or does not belong to this user." });
    }

    return res.status(200).json({ message: "Session fetched successfully.", session });

  } catch (err) {
    console.error("Fetch single session error:", err);
    return res.status(500).json({ message: "Server error fetching session.", error: err.message });
  }
});

/* =======================================================
   GET /rrs/summary/:userId
   Progress summary across all sessions:
     - latestScore + latestPhase + latestDate
     - bestScore ever recorded
     - scoreDirection: "improving" | "declining" | "stable"
     - trend: last 5 sessions oldest to newest (chart-ready)
     - totalSessions count

   Example:
     GET /api/rehab/rrs/summary/6661234abcd1234abcd12345
   ======================================================= */

router.get("/rrs/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId." });
    }

    const [sessions, totalSessions] = await Promise.all([
      RehabSession.find({ userId, isArchived: false })
        .sort({ sessionDate: -1 })
        .limit(10)
        .select("score recoveryPhase sessionDate sessionType bodyRegion")
        .lean(),
      RehabSession.countDocuments({ userId, isArchived: false }),
    ]);

    if (sessions.length === 0) {
      return res.status(200).json({ message: "No sessions found for this user.", summary: null });
    }

    const scores = sessions.map((s) => s.score);
    const latest = sessions[0];
    const best   = Math.max(...scores);

    // Oldest to newest so frontend can pass directly into a line chart
    const trend = sessions.slice(0, 5).reverse().map((s) => ({
      date: s.sessionDate, score: s.score, recoveryPhase: s.recoveryPhase,
    }));

    // Direction: >2 point difference vs previous session is considered meaningful
    let scoreDirection = "stable";
    if (sessions.length >= 2) {
      const diff = sessions[0].score - sessions[1].score;
      if (diff > 2)       scoreDirection = "improving";
      else if (diff < -2) scoreDirection = "declining";
    }

    return res.status(200).json({
      message: "Summary fetched successfully.",
      summary: {
        totalSessions,
        latestScore:    latest.score,
        latestPhase:    latest.recoveryPhase,
        latestDate:     latest.sessionDate,
        bestScore:      best,
        scoreDirection,
        trend,
      },
    });

  } catch (err) {
    console.error("Summary error:", err);
    return res.status(500).json({ message: "Server error fetching summary.", error: err.message });
  }
});

/* ─────────────────────────────────────────────────────────
   Convenience: GET /rrs/phases
   Returns the four phase definitions so the frontend can
   display them without hard-coding them client-side.
   ───────────────────────────────────────────────────────── */
router.get("/rrs/phases", (_req, res) => {
  return res.json({
    phases: [
      { phase: "Acute Recovery",     minScore: 0,  maxScore: 34, description: "Focus on pain control, oedema reduction, and tissue protection." },
      { phase: "Controlled Loading", minScore: 35, maxScore: 54, description: "Introduce pain-free ROM and light progressive loading." },
      { phase: "Strength Rebuild",   minScore: 55, maxScore: 74, description: "Progressive resistance training and symmetry restoration." },
      { phase: "Performance Ready",  minScore: 75, maxScore: 100, description: "Sport/work-specific functional training and discharge planning." },
    ],
    weights: {
      rom: 0.20, pain: 0.20, symmetry: 0.15,
      adherence: 0.15, fatigue: 0.10, form: 0.20,
    },
  });
});

export default router;