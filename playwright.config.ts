import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environments';

export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  timeout: 30_000, expect: { timeout: environment.timeout },
  retries: environment.isCI ? 2 : 0,
  outputDir: 'test-results',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['allure-playwright', { resultsDir: 'allure-results' }]],
  use: {
    baseURL: environment.baseURL, headless: environment.isCI ? true : environment.headless,
    actionTimeout: environment.timeout, navigationTimeout: environment.timeout,
    trace: 'on-first-retry', screenshot: 'only-on-failure', video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
