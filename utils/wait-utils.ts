import type { Page } from '@playwright/test';
export async function waitForApplication(page: Page): Promise<void> {
  try { await page.goto('/tickets', { waitUntil: 'domcontentloaded' }); }
  catch (error) { throw new Error(`Application unavailable at ${page.url() || 'configured BASE_URL'}. Start it with mvn spring-boot:run. Cause: ${String(error)}`); }
}
