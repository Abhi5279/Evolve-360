const statusEl = document.getElementById('status');
const outputEl = document.getElementById('output');

const todayIso = new Date().toISOString().slice(0, 10);
document.getElementById('readinessDate').value = todayIso;
document.getElementById('sessionDate').value = todayIso;

const setStatus = (message, tone = 'ready') => {
  statusEl.textContent = `Status: ${message}`;
  statusEl.dataset.tone = tone;
};

const setOutput = (payload) => {
  outputEl.textContent = JSON.stringify(payload, null, 2);
};

const getValue = (id) => document.getElementById(id).value.trim();

const apiFetch = async (path, payload) => {
  const response = await fetch(`/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const readinessMath = (input) => {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const sleepScore = clamp((input.sleepHours / 8) * 40, 0, 40);
  const stressScore = clamp((6 - input.stressLevel) * 8, 0, 40);
  const feelingScore = clamp(input.subjectiveFeeling * 6, 0, 30);
  const hydrationScore = clamp(input.hydration * 4, 0, 20);
  const sorenessPenalty = clamp(input.sorenessAreas.length * 4, 0, 20);
  const raw = sleepScore + stressScore + feelingScore + hydrationScore - sorenessPenalty;
  return clamp(Math.round(raw), 0, 100);
};

const parseEquipment = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const saveProfile = async () => {
  const payload = {
    userId: getValue('userId'),
    experienceLevel: getValue('experienceLevel'),
    workoutDaysPerWeek: Number(getValue('workoutDays')),
    equipmentAvailable: parseEquipment(getValue('equipment')),
    primaryGoal: getValue('primaryGoal'),
  };

  setStatus('Saving profile...', 'working');
  const response = await apiFetch('/profiles', payload);
  setOutput(response);
  setStatus('Profile saved');
};

const createPlan = async () => {
  const payload = { userId: getValue('userId') };
  setStatus('Creating plan...', 'working');
  const response = await apiFetch('/plans', payload);
  setOutput(response);
  setStatus('Plan created');
};

const enrichPlan = async () => {
  const payload = { userId: getValue('userId') };
  setStatus('Enriching plan...', 'working');
  const response = await apiFetch('/plans/enrich', payload);
  setOutput(response);
  setStatus('Plan enriched');
};

const calculateReadiness = async () => {
  const sorenessAreas = parseEquipment(getValue('sorenessAreas'));
  const readinessInput = {
    userId: getValue('userId'),
    date: getValue('readinessDate'),
    sleepHours: Number(getValue('sleepHours')),
    stressLevel: Number(getValue('stressLevel')),
    subjectiveFeeling: Number(getValue('subjectiveFeeling')),
    hydration: Number(getValue('hydration')),
    sorenessAreas,
  };

  const score = readinessMath(readinessInput);
  setOutput({
    ...readinessInput,
    readinessScore: score,
  });
  setStatus('Readiness calculated');
};

const startWorkout = async () => {
  const sorenessAreas = parseEquipment(getValue('sorenessAreas'));
  const readinessInput = {
    userId: getValue('userId'),
    date: getValue('readinessDate'),
    sleepHours: Number(getValue('sleepHours')),
    stressLevel: Number(getValue('stressLevel')),
    subjectiveFeeling: Number(getValue('subjectiveFeeling')),
    hydration: Number(getValue('hydration')),
    sorenessAreas,
  };
  const readinessScore = readinessMath(readinessInput);

  setStatus('Starting workout...', 'working');
  const response = await apiFetch('/workouts/start', {
    userId: readinessInput.userId,
    date: readinessInput.date,
    readinessScore,
  });
  setOutput({ readinessInput, readinessScore, ...response });
  setStatus('Workout ready');
};

const updateAttendance = async () => {
  const payload = {
    userId: getValue('userId'),
    week: Number(getValue('attendanceWeek')),
    day: Number(getValue('attendanceDay')),
    status: getValue('attendanceStatus'),
  };
  setStatus('Updating attendance...', 'working');
  const response = await apiFetch('/attendance', payload);
  setOutput(response);
  setStatus('Attendance updated');
};

const logSession = async () => {
  const payload = {
    userId: getValue('userId'),
    date: getValue('sessionDate'),
    plannedWorkoutType: getValue('plannedWorkoutType'),
    actualWorkoutType: getValue('actualWorkoutType'),
    perceivedExertion: Number(getValue('perceivedExertion')),
    duration: Number(getValue('sessionDuration')),
    painReported: getValue('painReported'),
  };

  setStatus('Logging session...', 'working');
  const response = await apiFetch('/workouts/session', payload);
  setOutput(response);
  setStatus('Session logged');
};

document.getElementById('saveProfile').addEventListener('click', () =>
  saveProfile().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);

document.getElementById('createPlan').addEventListener('click', () =>
  createPlan().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);

document.getElementById('enrichPlan').addEventListener('click', () =>
  enrichPlan().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);

document.getElementById('calculateReadiness').addEventListener('click', () =>
  calculateReadiness().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);

document.getElementById('startWorkout').addEventListener('click', () =>
  startWorkout().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);

document.getElementById('markAttendance').addEventListener('click', () =>
  updateAttendance().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);

// Optional session logging

document.getElementById('logSession').addEventListener('click', () =>
  logSession().catch((error) => {
    setStatus(error.message || 'Failed', 'error');
    setOutput({ error: error.message });
  })
);
