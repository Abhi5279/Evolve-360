'use strict';

const BaselineProfile = require('../models/BaselineProfile');

async function upsertBaselineProfile(req, res) {
  const {
    userId,
    experienceLevel,
    workoutDaysPerWeek,
    equipmentAvailable,
    primaryGoal,
  } = req.body;

  const profile = await BaselineProfile.findOneAndUpdate(
    { userId },
    {
      userId,
      experienceLevel,
      workoutDaysPerWeek,
      equipmentAvailable,
      primaryGoal,
    },
    { new: true, upsert: true }
  );

  return res.json({ message: 'Baseline profile saved', profile });
}

module.exports = {
  upsertBaselineProfile,
};
