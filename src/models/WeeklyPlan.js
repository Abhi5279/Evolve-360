'use strict';

const mongoose = require('mongoose');

const WeeklyStructureSchema = new mongoose.Schema(
  {
    day: { type: Number, min: 1, max: 7, required: true },
    workoutType: {
      type: String,
      enum: ['upper', 'lower', 'full', 'conditioning', 'recovery', 'rest'],
      required: true,
    },
    rest: { type: Boolean, default: false },
  },
  { _id: false }
);

const AttendanceDaySchema = new mongoose.Schema(
  {
    day: { type: Number, min: 1, max: 7, required: true },
    status: { type: String, enum: ['completed', 'missed', 'pending'], required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const WeeklyPlanSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    weeklyStructure: { type: [WeeklyStructureSchema], required: true },
    baseIntensityLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: true,
    },
    baseVolumeLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: true,
    },
    detailedPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    planDurationWeeks: { type: Number, default: 3, min: 1, max: 12 },
    currentWeek: { type: Number, default: 1, min: 1 },
    weeklyAttendance: {
      type: Map,
      of: [AttendanceDaySchema],
      default: {},
    },
    needsRegeneration: { type: Boolean, default: false },
    generatedBy: {
      type: String,
      enum: ['rule-engine', 'rule+ai'],
      default: 'rule-engine',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WeeklyPlan', WeeklyPlanSchema);
