// src/services/workout/workoutAdjuster.service.js

import { WORKOUT_ADJUSTMENTS } from "../../constants/workoutAdjustmentRules.js";

/**
 * Decide how today's workout should be adjusted
 */
export const adjustWorkoutForReadiness = ({
  readinessCategory,
  painReported = [],
  injuryRiskFlag = false
}) => {
  // Safety overrides everything
  if (injuryRiskFlag || painReported.length > 0) {
    return {
      adjustment: WORKOUT_ADJUSTMENTS.RECOVERY,
      reason: "Pain or injury risk detected"
    };
  }

  // Readiness-based decisions
  if (readinessCategory === "low") {
    return {
      adjustment: WORKOUT_ADJUSTMENTS.REDUCE_VOLUME,
      reason: "Low readiness today"
    };
  }

  if (readinessCategory === "moderate") {
    return {
      adjustment: WORKOUT_ADJUSTMENTS.REDUCE_INTENSITY,
      reason: "Moderate readiness"
    };
  }

  // High readiness
  return {
    adjustment: WORKOUT_ADJUSTMENTS.KEEP,
    reason: "High readiness"
  };
};
