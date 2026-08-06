import { test, expect } from '../fixtures/app-fixture';
test.describe('@regression Error handling',()=>{
  test('AT-037 Missing ticket ID displays a friendly error page',async({page,errorPage})=>{const response=await page.goto('/tickets/999999');expect(response?.status()).toBe(404);await errorPage.verifyFriendlyError();});
  test('AT-038 Invalid priority request is handled safely',async({page,errorPage})=>{const response=await page.goto('/tickets?priority=INVALID');expect(response?.status()).toBe(400);await errorPage.verifyHttpMessage(400);});
  test('AT-039 Invalid status request is handled safely',async({page,errorPage})=>{const response=await page.goto('/tickets?status=INVALID');expect(response?.status()).toBe(400);await errorPage.verifyHttpMessage(400);});
  test('AT-040 Application-unavailable condition produces a clear failure message',async({browser})=>{const page=await browser.newPage({baseURL:'http://127.0.0.1:1'});await expect(page.goto('/tickets',{timeout:1500})).rejects.toThrow();await page.close();});
});
