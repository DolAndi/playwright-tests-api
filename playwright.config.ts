import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html',{outputFolder: 'report'}]],
  use: {
    actionTimeout: 0,
    baseURL: 'https://serverest.dev',
    httpCredentials: {
      username: 'admin',
      password: '1234'
    },
    extraHTTPHeaders: {
      'Authorization': 'Bearer ${token}',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      //'Authorization': `token ${process.env.API_TOKEN}`,
    },
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on'
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],
};

export default config;
