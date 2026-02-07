'use strict';

const WeeklyPlan = require('../models/WeeklyPlan');

async function markAttendance(req, res) {
  const { userId, week, day, status } = req.body;

  const plan = await WeeklyPlan.findOne({ userId });
  if (!plan) {
    return res.status(404).json({ message: 'Weekly plan not found' });
  }

  const weekKey = String(week);
  const weekAttendance = plan.weeklyAttendance.get(weekKey) || [];
  const dayEntry = weekAttendance.find((entry) => entry.day === day);

  if (!dayEntry) {
    return res.status(400).json({ message: 'Day not found in attendance' });
  }

  dayEntry.status = status;
  dayEntry.updatedAt = new Date();
  plan.weeklyAttendance.set(weekKey, weekAttendance);

  await plan.save();

  return res.json({ message: 'Attendance updated', weeklyAttendance: plan.weeklyAttendance });
}

module.exports = {
  markAttendance,
};
