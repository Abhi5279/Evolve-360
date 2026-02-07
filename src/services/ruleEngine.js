'use strict';

const WORKOUT_TYPES = ['upper', 'lower', 'full', 'conditioning', 'recovery'];

function buildWeeklyStructure({ workoutDaysPerWeek, primaryGoal, experienceLevel }) {
  const days = Array.from({ length: 7 }, (_, index) => ({
    day: index + 1,
    workoutType: 'rest',
    rest: true,
  }));

  const templates = {
    3: ['full', 'rest', 'full', 'rest', 'conditioning', 'rest', 'rest'],
    4: ['upper', 'lower', 'rest', 'upper', 'lower', 'rest', 'rest'],
    5: ['upper', 'lower', 'conditioning', 'upper', 'lower', 'rest', 'rest'],
    6: ['upper', 'lower', 'conditioning', 'upper', 'lower', 'conditioning', 'rest'],
  };

  const baseTemplate = templates[workoutDaysPerWeek] || templates[3];

  baseTemplate.forEach((type, idx) => {
    const isRest = type === 'rest';
    days[idx] = {
      day: idx + 1,
      workoutType: type,
      rest: isRest,
    };
  });

  if (primaryGoal === 'endurance') {
    days.forEach((day) => {
      if (day.workoutType === 'full') {
        day.workoutType = 'conditioning';
        day.rest = false;
      }
    });
  }

  if (primaryGoal === 'power' && workoutDaysPerWeek >= 4) {
    const firstFull = days.find((day) => day.workoutType === 'conditioning');
    if (firstFull) {
      firstFull.workoutType = 'full';
      firstFull.rest = false;
    }
  }

  if (experienceLevel === 'beginner') {
    days.forEach((day) => {
      if (day.workoutType === 'conditioning') {
        day.workoutType = 'recovery';
      }
    });
  }

  return days;
}

function inferBaseIntensity(experienceLevel) {
  if (experienceLevel === 'advanced') {
    return 'high';
  }
  if (experienceLevel === 'intermediate') {
    return 'moderate';
  }
  return 'low';
}

function inferBaseVolume(primaryGoal, workoutDaysPerWeek) {
  if (primaryGoal === 'hypertrophy') {
    return workoutDaysPerWeek >= 5 ? 'high' : 'moderate';
  }
  if (primaryGoal === 'strength' || primaryGoal === 'power') {
    return workoutDaysPerWeek >= 4 ? 'moderate' : 'low';
  }
  return workoutDaysPerWeek >= 4 ? 'moderate' : 'low';
}

function generateWeeklyPlanSkeleton(profile) {
  const weeklyStructure = buildWeeklyStructure(profile);
  return {
    weeklyStructure,
    baseIntensityLevel: inferBaseIntensity(profile.experienceLevel),
    baseVolumeLevel: inferBaseVolume(profile.primaryGoal, profile.workoutDaysPerWeek),
  };
}

function initializeAttendance(weeklyStructure, planDurationWeeks) {
  const attendance = {};
  for (let week = 1; week <= planDurationWeeks; week += 1) {
    attendance[week] = weeklyStructure.map((day) => ({
      day: day.day,
      status: 'pending',
      updatedAt: new Date(),
    }));
  }
  return attendance;
}

module.exports = {
  WORKOUT_TYPES,
  generateWeeklyPlanSkeleton,
  initializeAttendance,
};
