import { test, expect } from '../fixtures/app-fixture'; import { testSettings } from '../config/test-settings';
test.describe('@regression Responsive dashboard',()=>{
  test('AT-041 Dashboard renders correctly at desktop viewport',async({page,dashboard})=>{await page.setViewportSize(testSettings.desktopViewport);await dashboard.open();await expect(dashboard.heading).toBeVisible();await expect(dashboard.queue).toBeVisible();});
  test('AT-042 Dashboard remains usable at mobile viewport',async({page,dashboard})=>{await page.setViewportSize(testSettings.mobileViewport);await dashboard.open();await expect(dashboard.heading).toBeVisible();await expect(page.getByRole('link',{name:/Create ticket/})).toBeVisible();await expect(page.getByLabel('Search title')).toBeVisible();});
});
