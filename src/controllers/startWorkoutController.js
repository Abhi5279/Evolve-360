'use strict';

const WeeklyPlan = require('../models/WeeklyPlan');
const { categorizeReadiness } = require('../services/readinessCalculator');

function buildWorkoutAdjustment(readinessCategory, workoutType) {
  if (workoutType === 'rest') {
    return { workoutType: 'rest', intensityModifier: 0, volumeModifier: 0, note: 'Rest day.' };
  }

  if (readinessCategory === 'high') {
    return {
      workoutType,
      intensityModifier: 0.05,
      volumeModifier: 0.05,
      note: 'High readiness: slight push within safe bounds.',
    };
  }

  if (readinessCategory === 'moderate') {
    return {
      workoutType,
      intensityModifier: -0.1,
      volumeModifier: -0.15,
      note: 'Moderate readiness: reduce volume and intensity to maintain quality.',
    };
  }

  return {
    workoutType: 'recovery',
    intensityModifier: -0.4,
    volumeModifier: -0.5,
    note: 'Low readiness: switch to recovery-focused session or full rest.',
  };
}

async function startWorkout(req, res) {
  const { userId, date, readinessScore } = req.body;
  const plan = await WeeklyPlan.findOne({ userId });

  if (!plan) {
    return res.status(404).json({ message: 'Weekly plan not found' });
  }

  const startDate = new Date(date);
  const dayOfWeek = startDate.getUTCDay() || 7; // Sunday=0, map to 7
  const dayPlan = plan.weeklyStructure.find((day) => day.day === dayOfWeek);

  if (!dayPlan) {
    return res.status(400).json({ message: 'Workout day not found in plan' });
  }

  const readinessCategory = categorizeReadiness(readinessScore);
  const adjustment = buildWorkoutAdjustment(readinessCategory, dayPlan.workoutType);

  return res.json({
    date: startDate.toISOString(),
    plannedWorkoutType: dayPlan.workoutType,
    readinessScore,
    readinessCategory,
    adjustment,
  });
}

module.exports = {
  startWorkout,
};
