'use strict';

const mongoose = require('mongoose');

const WorkoutSessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    plannedWorkoutType: {
      type: String,
      enum: ['upper', 'lower', 'full', 'conditioning', 'recovery', 'rest'],
      required: true,
    },
    actualWorkoutType: {
      type: String,
      enum: ['upper', 'lower', 'full', 'conditioning', 'recovery', 'rest'],
      required: true,
    },
    perceivedExertion: { type: Number, min: 1, max: 10 },
    duration: { type: Number, min: 5, max: 300 },
    painReported: { type: String, default: '' },
  },
  { timestamps: true }
);

WorkoutSessionSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);
