'use strict';

const config = require('../config');

async function requestGeminiJson(prompt) {
  if (!config.geminiApiKey) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': config.geminiApiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini error: ${response.status} ${text}`);
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned empty response');
  }

  return JSON.parse(text);
}

async function requestClaudeJson(prompt) {
  if (!config.claudeApiKey) {
    throw new Error('Claude API key not configured');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.claudeApiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 4096,
      temperature: 0.2,
      system: 'Return JSON only, no markdown, no commentary.',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Claude error: ${response.status} ${text}`);
  }

  const payload = await response.json();
  const text = payload?.content?.[0]?.text;
  if (!text) {
    throw new Error('Claude returned empty response');
  }

  return JSON.parse(text);
}

async function generateAiPlanJson(prompt) {
  if (config.aiProvider === 'claude') {
    return requestClaudeJson(prompt);
  }
  return requestGeminiJson(prompt);
}

module.exports = {
  generateAiPlanJson,
};
