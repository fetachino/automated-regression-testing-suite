import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class TicketDetailsPage extends BasePage {
  constructor(page:Page){super(page);}
  title():Locator{return this.page.locator('.detail-heading h1');}
  description():Locator{return this.page.locator('.description-block p');}
  priority():Locator{return this.page.locator('.priority-badge');}
  status():Locator{return this.page.locator('.detail-heading .status-badge');}
  createdDate():Locator{return this.page.locator('.metadata > div').filter({hasText:'Created'}).locator('strong');}
  updatedDate():Locator{return this.page.locator('.metadata > div').filter({hasText:'Last updated'}).locator('strong');}
  async verifyTicket(title:string):Promise<void>{await expect(this.title()).toHaveText(title);}
  async updateStatus(status:string):Promise<void>{await this.page.getByLabel('New status').selectOption(status);await this.page.getByRole('button',{name:'Save status'}).click();}
  successNotification():Locator{return this.page.getByText(/success|updated/i).first();}
  async returnToDashboard():Promise<void>{await this.page.getByRole('link',{name:/Back to dashboard/}).click();}
}
