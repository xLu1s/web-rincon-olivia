import { defineConfig, devices } from '@playwright/test';

const port = 4321;
const baseURL = `http://127.0.0.1:${port}/web-rincon-olivia/`;

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: process.env.PW_SKIP_BUILD
      ? `npm run preview -- --host 127.0.0.1 --port ${port}`
      : `npm run build && npm run preview -- --host 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 360_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
