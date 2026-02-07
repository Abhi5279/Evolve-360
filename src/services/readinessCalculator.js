'use strict';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function calculateReadinessScore(input) {
  const sleepScore = clamp((input.sleepHours / 8) * 40, 0, 40);
  const stressScore = clamp((6 - input.stressLevel) * 8, 0, 40);
  const feelingScore = clamp(input.subjectiveFeeling * 6, 0, 30);
  const hydrationScore = clamp(input.hydration * 4, 0, 20);

  const sorenessPenalty = clamp((input.sorenessAreas?.length || 0) * 4, 0, 20);

  const raw = sleepScore + stressScore + feelingScore + hydrationScore - sorenessPenalty;
  return clamp(Math.round(raw), 0, 100);
}

function categorizeReadiness(score) {
  if (score >= 75) {
    return 'high';
  }
  if (score >= 50) {
    return 'moderate';
  }
  return 'low';
}

function calculateNextDayAdjustment(score, sessionExertion) {
  const exertionPenalty = sessionExertion ? clamp(sessionExertion * 2, 0, 20) : 0;
  const recoveryBonus = score >= 75 ? 5 : score >= 50 ? 2 : 0;
  return clamp(recoveryBonus - exertionPenalty, -20, 10);
}

module.exports = {
  calculateReadinessScore,
  categorizeReadiness,
  calculateNextDayAdjustment,
};
