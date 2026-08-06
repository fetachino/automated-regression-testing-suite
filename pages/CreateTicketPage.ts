import { expect, type Locator, type Page } from '@playwright/test';
import type { TicketInput } from '../data/ticket-data';
import { BasePage } from './BasePage';
export class CreateTicketPage extends BasePage {
  constructor(page: Page) { super(page); }
  form(): Locator { return this.page.locator('form.ticket-form'); }
  titleField(): Locator { return this.page.getByLabel(/Title/); }
  descriptionField(): Locator { return this.page.getByLabel(/Description/); }
  priorityField(): Locator { return this.page.getByLabel(/Priority/); }
  submitButton(): Locator { return this.page.getByRole('button', { name: 'Create ticket', exact: true }); }
  async open(): Promise<void> { await this.navigate('/tickets/new'); }
  async fillTitle(v:string):Promise<void>{await this.safeFill(this.titleField(),v);}
  async fillDescription(v:string):Promise<void>{await this.safeFill(this.descriptionField(),v);}
  async selectPriority(v:string):Promise<void>{await this.priorityField().selectOption(v);}
  async fill(ticket: TicketInput):Promise<void>{await this.fillTitle(ticket.title);await this.fillDescription(ticket.description);await this.selectPriority(ticket.priority);}
  async submit():Promise<void>{await this.submitButton().click();}
  validationMessages(){return this.page.locator('.field-error, .error, [role="alert"]');}
  fieldError(message: string): Locator { return this.page.locator('.field-error', { hasText: message }); }
  async verifyServerValidation(message: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Create support ticket' })).toBeVisible();
    await expect(this.page.getByRole('alert')).toContainText('Check the form');
    await expect(this.fieldError(message)).toBeVisible();
  }
  async cancel():Promise<void>{await this.page.getByRole('link',{name:'Cancel'}).click();}
}
