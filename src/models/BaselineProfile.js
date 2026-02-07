'use strict';

const mongoose = require('mongoose');

const BaselineProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    workoutDaysPerWeek: { type: Number, min: 1, max: 6, required: true },
    equipmentAvailable: { type: [String], default: [] },
    primaryGoal: {
      type: String,
      enum: ['strength', 'hypertrophy', 'endurance', 'general-fitness', 'power'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BaselineProfile', BaselineProfileSchema);
