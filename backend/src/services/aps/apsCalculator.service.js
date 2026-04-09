// // src/services/aps/apsCalculator.service.js

// import { APS_WEIGHTS } from "../../constants/apsWeights.js";

// /**
//  * Normalize helpers
//  */
// const normalizeAdherence = (completionPercentage = 0) => {
//   return Math.min(100, Math.max(0, completionPercentage));
// };

// const normalizeEffort = (perceivedExertion, readinessCategory) => {
//   if (!perceivedExertion) return 60;

//   // Effort relative to readiness
//   if (readinessCategory === "low" && perceivedExertion >= 8) return 40;
//   if (readinessCategory === "high" && perceivedExertion >= 7) return 90;

//   return 70;
// };

// const normalizeRecovery = (recoveryType) => {
//   switch (recoveryType) {
//     case "rest":
//       return 100;
//     case "mobility":
//       return 85;
//     case "active_recovery":
//       return 70;
//     default:
//       return 60;
//   }
// };

// const normalizeConsistency = (recentCompletionRate = 0) => {
//   return Math.min(100, Math.max(0, recentCompletionRate));
// };

// /**
//  * MAIN APS CALCULATOR
//  */
// export const calculateAPS = ({
//   completionPercentage,
//   perceivedExertion,
//   readinessCategory,
//   recoveryType,
//   recentCompletionRate
// }) => {
//   const adherenceScore = normalizeAdherence(completionPercentage);
//   const effortScore = normalizeEffort(
//     perceivedExertion,
//     readinessCategory
//   );
//   const recoveryScore = normalizeRecovery(recoveryType);
//   const consistencyScore = normalizeConsistency(recentCompletionRate);

//   const aps =
//     adherenceScore * APS_WEIGHTS.adherence +
//     effortScore * APS_WEIGHTS.effort +
//     recoveryScore * APS_WEIGHTS.recovery +
//     consistencyScore * APS_WEIGHTS.consistency;

//   return Math.round(aps);
// };

import { APS_WEIGHTS } from "../../constants/apsWeights.js";

/* ---------------- NORMALIZERS ---------------- */

const normalizeAdherence = (completionPercentage = 0) =>
  Math.min(100, Math.max(0, completionPercentage));

const normalizeEffort = (perceivedExertion, readinessCategory) => {
  if (!perceivedExertion) return 60;

  if (readinessCategory === "low" && perceivedExertion >= 8) return 40;
  if (readinessCategory === "high" && perceivedExertion >= 7) return 90;

  return 70;
};

const normalizeRecovery = (recoveryType) => {
  switch (recoveryType) {
    case "full_rest":
      return 100;
    case "mobility":
      return 80;
    case "active":
      return 70;
    default:
      return 60;
  }
};

const normalizeConsistency = (recentCompletionRate = 0) =>
  Math.min(100, Math.max(0, recentCompletionRate));

/* ---------------- MAIN APS ---------------- */

export const calculateAPS = ({
  completionPercentage,
  perceivedExertion,
  readinessCategory,
  recoveryType,
  recentCompletionRate,
  intensityDeviation = 0,
  volumeDeviation = 0,
  formQuality = 7,
  energyLevel = 7,
  fatigueScore = 0
}) => {
  const adherenceScore = normalizeAdherence(completionPercentage);
  const effortScore = normalizeEffort(
    perceivedExertion,
    readinessCategory
  );
  const recoveryScore = normalizeRecovery(recoveryType);
  const consistencyScore = normalizeConsistency(recentCompletionRate);

  const deviationPenalty =
    Math.abs(intensityDeviation) * 5 +
    Math.abs(volumeDeviation) * 5;

  const qualityBonus =
    (formQuality * 2) +
    (energyLevel * 2);

  const fatiguePenalty = fatigueScore * 3;

  const rawAPS =
    adherenceScore * APS_WEIGHTS.adherence +
    effortScore * APS_WEIGHTS.effort +
    recoveryScore * APS_WEIGHTS.recovery +
    consistencyScore * APS_WEIGHTS.consistency +
    qualityBonus -
    deviationPenalty -
    fatiguePenalty;

  return Math.max(0, Math.min(100, Math.round(rawAPS)));
};