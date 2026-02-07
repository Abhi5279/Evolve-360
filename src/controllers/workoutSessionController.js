'use strict';

const WorkoutSession = require('../models/WorkoutSession');

async function logWorkoutSession(req, res) {
  const {
    userId,
    date,
    plannedWorkoutType,
    actualWorkoutType,
    perceivedExertion,
    duration,
    painReported,
  } = req.body;

  const session = await WorkoutSession.findOneAndUpdate(
    { userId, date: new Date(date) },
    {
      userId,
      date: new Date(date),
      plannedWorkoutType,
      actualWorkoutType,
      perceivedExertion,
      duration,
      painReported,
    },
    { new: true, upsert: true }
  );

  return res.json({ message: 'Workout session logged', session });
}

module.exports = {
  logWorkoutSession,
};
