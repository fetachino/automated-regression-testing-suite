import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class ErrorPage extends BasePage {
  constructor(page:Page){super(page);}
  async verifyFriendlyError():Promise<void>{await expect(this.page.locator('body')).toContainText(/error|not found|bad request/i);}
  async verifyHttpMessage(code:number):Promise<void>{await expect(this.page.locator('body')).toContainText(new RegExp(String(code)+'|error|not found|bad request','i'));}
  async backToDashboard():Promise<void>{const link=this.page.getByRole('link',{name:/dashboard|tickets|back/i});if(await link.count())await link.first().click();else await this.navigate('/tickets');}
}
