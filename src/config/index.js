'use strict';

const config = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/evolve360',
  aiProvider: process.env.AI_PROVIDER || 'gemini',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  claudeApiKey: process.env.CLAUDE_API_KEY || '',
  appTimezone: process.env.APP_TIMEZONE || 'UTC',
};

module.exports = config;
