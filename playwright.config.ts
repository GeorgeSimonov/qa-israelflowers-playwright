import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  retries: 2,
  timeout: 30000,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://israelflowers4u.co.il',
    headless: true,
    viewport: { width: 1280, height: 800 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
