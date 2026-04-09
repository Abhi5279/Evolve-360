// src/services/readiness/readinessCalculator.service.js

import {
  READINESS_WEIGHTS,
  READINESS_CATEGORIES
} from "../../constants/readinessThresholds.js";

/**
 * Convert raw inputs to normalized score (0–100)
 */
const normalizeSleep = (hours) => {
  if (hours >= 8) return 100;
  if (hours >= 6) return 75;
  if (hours >= 4) return 40;
  return 20;
};

const normalizeStress = (level) => {
  switch (level) {
    case "low":
      return 100;
    case "medium":
      return 60;
    case "high":
      return 30;
    default:
      return 50;
  }
};

const normalizeFeeling = (feeling) => {
  switch (feeling) {
    case "fresh":
      return 100;
    case "normal":
      return 70;
    case "tired":
      return 30;
    default:
      return 50;
  }
};

const normalizeHeartRate = (hr) => {
  if (!hr) return 70; // neutral if not provided
  if (hr < 60) return 90;
  if (hr <= 75) return 70;
  return 40;
};

const normalizeHydration = (percent) => {
  if (!percent) return 70;
  if (percent >= 80) return 100;
  if (percent >= 60) return 70;
  return 40;
};

/**
 * MAIN READINESS CALCULATOR
 */
export const calculateReadiness = ({
  sleepHours,
  stressLevel,
  subjectiveFeeling,
  restingHeartRate,
  hydrationLevelPercent
}) => {
  const sleepScore = normalizeSleep(sleepHours);
  const stressScore = normalizeStress(stressLevel);
  const feelingScore = normalizeFeeling(subjectiveFeeling);
  const hrScore = normalizeHeartRate(restingHeartRate);
  const hydrationScore = normalizeHydration(hydrationLevelPercent);

  const readinessScore =
    sleepScore * READINESS_WEIGHTS.sleep +
    stressScore * READINESS_WEIGHTS.stress +
    feelingScore * READINESS_WEIGHTS.feeling +
    hrScore * READINESS_WEIGHTS.heartRate +
    hydrationScore * READINESS_WEIGHTS.hydration;

  let readinessCategory = READINESS_CATEGORIES.MODERATE;

  if (readinessScore < 45) {
    readinessCategory = READINESS_CATEGORIES.LOW;
  } else if (readinessScore >= 75) {
    readinessCategory = READINESS_CATEGORIES.HIGH;
  }

  return {
    readinessScore: Math.round(readinessScore),
    readinessCategory
  };
};
