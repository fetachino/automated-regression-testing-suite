import { test, expect } from '../fixtures/app-fixture';
import { createTicketData } from '../utils/data-factory';
import path from 'node:path';

async function totalTickets(dashboard: import('../pages/DashboardPage').DashboardPage): Promise<number> {
  await dashboard.open();
  return Number((await dashboard.readMetricCards())['Total tickets']);
}

async function capture(page: import('@playwright/test').Page, testInfo: import('@playwright/test').TestInfo, name: string): Promise<void> {
  const attachmentPath = testInfo.outputPath(`${name}.png`);
  const evidencePath = path.resolve('screenshots', 'validation-investigation', `${name}.png`);
  await page.screenshot({ path: attachmentPath, fullPage: true });
  await page.screenshot({ path: evidencePath, fullPage: true });
  await testInfo.attach(name, { path: attachmentPath, contentType: 'image/png' });
}
test.describe('@regression @validation Ticket validation',()=>{
  test('AT-016 Missing title is rejected',async({page,dashboard,createTicket},testInfo)=>{const before=await totalTickets(dashboard);await createTicket.open();await createTicket.fillTitle('');await createTicket.fillDescription('Valid description for AT-016');await createTicket.selectPriority('LOW');expect(await createTicket.form().getAttribute('novalidate')).not.toBeNull();expect(await createTicket.titleField().evaluate((field: HTMLInputElement)=>field.validity.valueMissing)).toBeTruthy();await expect(createTicket.descriptionField()).toHaveValue('Valid description for AT-016');await expect(createTicket.priorityField()).toHaveValue('LOW');await capture(page,testInfo,'AT-016-before-submission');await createTicket.submit();await capture(page,testInfo,'AT-016-after-submission');await createTicket.verifyServerValidation('Title is required');await expect(page).toHaveURL(/\/tickets$/);expect(await totalTickets(dashboard)).toBe(before);});
  test('AT-017 Missing description is rejected',async({page,dashboard,createTicket},testInfo)=>{const data=createTicketData('LOW');const before=await totalTickets(dashboard);await createTicket.open();await createTicket.fillTitle(data.title);await createTicket.fillDescription('');await createTicket.selectPriority(data.priority);expect(await createTicket.form().getAttribute('novalidate')).not.toBeNull();expect(await createTicket.descriptionField().evaluate((field: HTMLTextAreaElement)=>field.validity.valueMissing)).toBeTruthy();await expect(createTicket.titleField()).toHaveValue(data.title);await expect(createTicket.priorityField()).toHaveValue('LOW');await capture(page,testInfo,'AT-017-before-submission');await createTicket.submit();await capture(page,testInfo,'AT-017-after-submission');await createTicket.verifyServerValidation('Description is required');await expect(page).toHaveURL(/\/tickets$/);expect(await totalTickets(dashboard)).toBe(before);await dashboard.searchTickets(data.title);await dashboard.applyFilters();expect(await dashboard.rows().count()).toBe(0);});
  test('AT-018 Missing priority is rejected',async({page,dashboard,createTicket},testInfo)=>{const data=createTicketData('MEDIUM');const before=await totalTickets(dashboard);await createTicket.open();await createTicket.fillTitle(data.title);await createTicket.fillDescription(data.description);await createTicket.selectPriority('');expect(await createTicket.form().getAttribute('novalidate')).not.toBeNull();expect(await createTicket.priorityField().evaluate((field: HTMLSelectElement)=>field.validity.valueMissing)).toBeTruthy();await expect(createTicket.titleField()).toHaveValue(data.title);await expect(createTicket.descriptionField()).toHaveValue(data.description);await capture(page,testInfo,'AT-018-before-submission');await createTicket.submit();await capture(page,testInfo,'AT-018-after-submission');await createTicket.verifyServerValidation('Priority is required');await expect(page).toHaveURL(/\/tickets$/);expect(await totalTickets(dashboard)).toBe(before);await dashboard.searchTickets(data.title);await dashboard.applyFilters();expect(await dashboard.rows().count()).toBe(0);});
  test.beforeEach(async({createTicket})=>createTicket.open());
  test('AT-019 Overlong title is rejected',()=>test.skip(true,'The HTML maxlength prevents entering an overlong title; server-boundary validation needs an API test.'));
  test('AT-020 Overlong description is rejected',()=>test.skip(true,'The HTML maxlength prevents entering an overlong description; server-boundary validation needs an API test.'));
  test('AT-021 Multiple validation errors display together',async({createTicket})=>{await createTicket.submit();const invalid=await createTicket['page'].locator(':invalid').count();expect(invalid).toBeGreaterThanOrEqual(3);});
});
