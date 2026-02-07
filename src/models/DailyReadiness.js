'use strict';

const mongoose = require('mongoose');

const DailyReadinessSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    readinessScore: { type: Number, min: 0, max: 100, required: true },
    readinessCategory: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: true,
    },
    sleepHours: { type: Number, min: 0, max: 16, required: true },
    stressLevel: { type: Number, min: 1, max: 5, required: true },
    subjectiveFeeling: { type: Number, min: 1, max: 5, required: true },
    hydration: { type: Number, min: 1, max: 5, required: true },
    sorenessAreas: { type: [String], default: [] },
  },
  { timestamps: true }
);

DailyReadinessSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyReadiness', DailyReadinessSchema);
