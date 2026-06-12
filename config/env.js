// config/env.js
'use strict';

module.exports = {
  baseURL: process.env.BASE_URL || 'https://demoqa.com',
  headless: process.env.HEADLESS !== 'false',
  timeout: 30000,
};
