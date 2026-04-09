// src/constants/readinessThresholds.js

export const READINESS_WEIGHTS = Object.freeze({
  sleep: 0.35,
  stress: 0.25,
  feeling: 0.2,
  heartRate: 0.1,
  hydration: 0.1
});

export const READINESS_CATEGORIES = {
  LOW: "low",
  MODERATE: "moderate",
  HIGH: "high"
};
