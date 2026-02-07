'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', routes);

async function connectDatabase() {
  await mongoose.connect(config.mongoUri);
}

module.exports = {
  app,
  connectDatabase,
};
