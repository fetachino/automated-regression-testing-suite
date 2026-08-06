import { test, expect } from '../fixtures/app-fixture';
test.describe('@smoke Dashboard smoke',()=>{
  test.beforeEach(async({dashboard})=>dashboard.open());
  test('AT-001 Dashboard loads successfully',async({dashboard})=>dashboard.verifyLoaded());
  test('AT-002 Dashboard metric cards are visible',async({dashboard})=>{const cards=await dashboard.readMetricCards();expect(Object.keys(cards)).toEqual(expect.arrayContaining(['Total tickets','Open','Resolved','Critical']));});
  test('AT-003 Ticket queue is visible',async({dashboard})=>expect(dashboard.queue).toBeVisible());
});
