import { expect, type Locator, type Page } from '@playwright/test';
export class BasePage {
  constructor(readonly page: Page) {}
  async navigate(path: string): Promise<void> { await this.page.goto(path, { waitUntil: 'domcontentloaded' }); }
  async waitUntilReady(): Promise<void> { await this.page.waitForLoadState('domcontentloaded'); }
  async screenshot(name: string): Promise<void> { await this.page.screenshot({ path: `test-results/${name}.png`, fullPage: true }); }
  async verifyPageTitle(title: RegExp | string): Promise<void> { await expect(this.page).toHaveTitle(title); }
  async safeClick(locator: Locator): Promise<void> { await expect(locator).toBeVisible(); await locator.click(); }
  async safeFill(locator: Locator, value: string): Promise<void> { await expect(locator).toBeEditable(); await locator.fill(value); }
}
