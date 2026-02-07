'use strict';

const BaselineProfile = require('../models/BaselineProfile');
const WeeklyPlan = require('../models/WeeklyPlan');
const { generateWeeklyPlanSkeleton, initializeAttendance } = require('../services/ruleEngine');
const { buildAiPrompt } = require('../services/aiPromptBuilder');
const { generateAiPlanJson } = require('../services/aiClient');

async function createWeeklyPlan(req, res) {
  const { userId } = req.body;
  const profile = await BaselineProfile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({ message: 'Baseline profile not found' });
  }

  const skeleton = generateWeeklyPlanSkeleton(profile);
  const planDurationWeeks = 3;
  const attendance = initializeAttendance(skeleton.weeklyStructure, planDurationWeeks);

  const plan = await WeeklyPlan.findOneAndUpdate(
    { userId },
    {
      userId,
      weeklyStructure: skeleton.weeklyStructure,
      baseIntensityLevel: skeleton.baseIntensityLevel,
      baseVolumeLevel: skeleton.baseVolumeLevel,
      detailedPlan: null,
      planDurationWeeks,
      currentWeek: 1,
      weeklyAttendance: attendance,
      needsRegeneration: false,
      generatedBy: 'rule-engine',
    },
    { new: true, upsert: true }
  );

  return res.json({ message: 'Weekly plan created', plan });
}

async function enrichWeeklyPlanWithAi(req, res) {
  const { userId } = req.body;
  const profile = await BaselineProfile.findOne({ userId });
  const plan = await WeeklyPlan.findOne({ userId });

  if (!profile || !plan) {
    return res.status(404).json({ message: 'Profile or plan not found' });
  }

  const prompt = buildAiPrompt({
    baselineProfile: {
      experienceLevel: profile.experienceLevel,
      workoutDaysPerWeek: profile.workoutDaysPerWeek,
      equipmentAvailable: profile.equipmentAvailable,
      primaryGoal: profile.primaryGoal,
    },
    weeklyStructure: plan.weeklyStructure,
    baseIntensityLevel: plan.baseIntensityLevel,
    baseVolumeLevel: plan.baseVolumeLevel,
  });

  const detailedPlan = await generateAiPlanJson(prompt);

  plan.detailedPlan = detailedPlan;
  plan.generatedBy = 'rule+ai';
  plan.needsRegeneration = false;

  await plan.save();

  return res.json({ message: 'Weekly plan enriched', plan });
}

module.exports = {
  createWeeklyPlan,
  enrichWeeklyPlanWithAi,
};
