import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';
import { config } from './config/env';

export default defineConfig(baseConfig, {
  use: {
    baseURL: config.baseUrls.qauto2,
  },
});
