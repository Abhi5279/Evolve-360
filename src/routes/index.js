'use strict';

const express = require('express');
const { upsertBaselineProfile } = require('../controllers/profileController');
const { createWeeklyPlan, enrichWeeklyPlanWithAi } = require('../controllers/planController');
const { markAttendance } = require('../controllers/attendanceController');
const { startWorkout } = require('../controllers/startWorkoutController');
const { logWorkoutSession } = require('../controllers/workoutSessionController');

const router = express.Router();

router.post('/profiles', upsertBaselineProfile);
router.post('/plans', createWeeklyPlan);
router.post('/plans/enrich', enrichWeeklyPlanWithAi);
router.post('/attendance', markAttendance);
router.post('/workouts/start', startWorkout);
router.post('/workouts/session', logWorkoutSession);

module.exports = router;
