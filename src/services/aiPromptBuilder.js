'use strict';

function buildAiPrompt({ baselineProfile, weeklyStructure, baseIntensityLevel, baseVolumeLevel }) {
  return [
    'You are an elite strength and conditioning coach.',
    'Your task: fill in exercises, sets, reps, tempo, and rest for each workout day.',
    'STRICT RULES:',
    '- Return JSON only. No markdown, no commentary.',
    '- Do NOT change the weekly structure or add/remove days.',
    '- Respect rest days as empty sessions with "rest": true.',
    '- Keep the plan realistic and safe.',
    '- Use only equipment listed.',
    '',
    'Athlete profile:',
    JSON.stringify(baselineProfile, null, 2),
    '',
    'Weekly structure (immutable):',
    JSON.stringify(weeklyStructure, null, 2),
    '',
    'Base intensity level:',
    baseIntensityLevel,
    'Base volume level:',
    baseVolumeLevel,
    '',
    'Return JSON with this exact schema:',
    JSON.stringify(
      {
        weeks: [
          {
            week: 1,
            days: [
              {
                day: 1,
                workoutType: 'upper',
                rest: false,
                focus: 'strength',
                exercises: [
                  {
                    name: 'string',
                    sets: 3,
                    reps: '5-8',
                    tempo: '3-1-1',
                    restSeconds: 120,
                    notes: 'string',
                  },
                ],
              },
            ],
          },
        ],
      },
      null,
      2
    ),
  ].join('\n');
}

module.exports = {
  buildAiPrompt,
};
