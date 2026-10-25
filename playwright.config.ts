import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const envFile = path.resolve(__dirname, '.env');
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [['list'], ['html', { open: isCI ? 'never' : 'on-failure' }]],
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials:
      process.env.HTTP_USERNAME && process.env.HTTP_PASSWORD
        ? { username: process.env.HTTP_USERNAME, password: process.env.HTTP_PASSWORD }
        : undefined,
    actionTimeout: 10_000,
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
