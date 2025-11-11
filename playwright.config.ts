import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  expect: { timeout: 5000 },
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://israelflowers4u.co.il',
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 5000,
    navigationTimeout: 15000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});