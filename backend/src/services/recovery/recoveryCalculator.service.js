// // src/services/recovery/recoveryCalculator.service.js

// import { RECOVERY_TYPES } from "../../constants/recoveryTypes.js";

// /**
//  * Decide recovery type after a workout
//  */
// export const calculateRecovery = ({
//   readinessCategory,
//   perceivedExertion,
//   painReported = [],
//   injuryRiskFlag = false,
//   hydrationLevelPercent
// }) => {
//   // Safety overrides
//   if (injuryRiskFlag || painReported.length > 0) {
//     return {
//       recoveryType: RECOVERY_TYPES.REST,
//       reason: "Pain or injury risk detected"
//     };
//   }

//   // Very low readiness or very high effort
//   if (
//     readinessCategory === "low" ||
//     (perceivedExertion && perceivedExertion >= 9)
//   ) {
//     return {
//       recoveryType: RECOVERY_TYPES.REST,
//       reason: "Low readiness or extreme exertion"
//     };
//   }

//   // Moderate fatigue or dehydration
//   if (
//     readinessCategory === "moderate" ||
//     (hydrationLevelPercent && hydrationLevelPercent < 60)
//   ) {
//     return {
//       recoveryType: RECOVERY_TYPES.MOBILITY,
//       reason: "Moderate fatigue or hydration deficit"
//     };
//   }

//   // Default: active recovery
//   return {
//     recoveryType: RECOVERY_TYPES.ACTIVE,
//     reason: "Normal fatigue, active recovery recommended"
//   };
// };


export const calculateRecovery = ({
  readinessCategory,
  perceivedExertion,
  painReported,
  injuryRiskFlag,
  hydrationLevelPercent,
  nutritionImpact // 👈 NEW
}) => {
  let recoveryType = "none";
  let reason = "Normal recovery";

  let fatigueScore = 0;

  // Readiness
  if (readinessCategory === "low") fatigueScore += 3;
  if (readinessCategory === "moderate") fatigueScore += 1;

  // Exertion
  if (perceivedExertion >= 8) fatigueScore += 2;

  // Pain / injury
  if (painReported?.length > 0) fatigueScore += 2;
  if (injuryRiskFlag) fatigueScore += 3;

  // Hydration
  if (hydrationLevelPercent < 60) fatigueScore += 1;

  // Nutrition impact
  if (nutritionImpact?.fatiguePenalty) {
    fatigueScore += nutritionImpact.fatiguePenalty;
  }

  // Final decision
  if (fatigueScore >= 7) {
    recoveryType = "full_rest";
    reason = "High fatigue detected across body, nutrition, and workload";
  } else if (fatigueScore >= 4) {
    recoveryType = "mobility";
    reason = "Moderate fatigue — recovery-focused session recommended";
  } else {
    recoveryType = "active";
    reason = "Body ready for active recovery";
  }

  return {
    recoveryType,
    fatigueScore,
    reason
  };
};
