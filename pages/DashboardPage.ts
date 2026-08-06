import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
export type TicketRow = { title: string; priority: string; status: string; updated: string };
export class DashboardPage extends BasePage {
  readonly heading: Locator; readonly queue: Locator; readonly metrics: Locator;
  constructor(page: Page) { super(page); this.heading = page.getByRole('heading', { name: 'Ticket dashboard' }); this.queue = page.getByRole('heading', { name: 'Ticket queue' }); this.metrics = page.getByRole('region', { name: 'Ticket summary' }); }
  async open(): Promise<void> { await this.navigate('/tickets'); }
  async verifyLoaded(): Promise<void> { await expect(this.heading, 'Dashboard heading should be visible').toBeVisible(); await this.verifyPageTitle(/Ticket Dashboard/); }
  async readMetricCards(): Promise<Record<string,string>> { const result: Record<string,string> = {}; for (const card of await this.metrics.locator('article').all()) { result[(await card.locator('.metric-label').innerText()).trim()] = (await card.locator('.metric-value').innerText()).trim(); } return result; }
  async searchTickets(title: string): Promise<void> { await this.safeFill(this.page.getByLabel('Search title'), title); }
  async selectPriority(value: string): Promise<void> { await this.page.getByLabel('Priority').selectOption(value); }
  async selectStatus(value: string): Promise<void> { await this.page.getByLabel('Status').selectOption(value); }
  async selectSorting(value: string): Promise<void> { await this.page.getByLabel('Sort by').selectOption(value); }
  async applyFilters(): Promise<void> { await this.page.getByRole('button', { name: 'Apply filters' }).click(); }
  async clearFilters(): Promise<void> { await this.page.getByRole('link', { name: 'Clear', exact: true }).click(); }
  async openTicket(title: string): Promise<void> { await this.page.getByRole('link', { name: title, exact: true }).click(); }
  async navigatePagination(direction: 'Next'|'Previous'): Promise<void> { await this.page.getByRole('link', { name: new RegExp(direction, 'i') }).click(); }
  rows(): Locator { return this.page.locator('tbody tr'); }
  async visibleRows(): Promise<TicketRow[]> { return Promise.all((await this.rows().all()).map(async row => ({ title: (await row.locator('.ticket-title').innerText()).trim(), priority: (await row.locator('.priority-badge').innerText()).trim(), status: (await row.locator('.status-badge').innerText()).trim().replace(' ', '_'), updated: (await row.locator('.date-cell').innerText()).trim() }))); }
  emptyState(): Locator { return this.page.getByText(/no tickets/i); }
}
