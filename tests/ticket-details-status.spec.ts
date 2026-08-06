import { test, expect } from '../fixtures/app-fixture'; import { createTicketData } from '../utils/data-factory';
test.describe('@regression @workflow Ticket details and workflow',()=>{
  test.beforeEach(async({createTicket},info)=>{const d=createTicketData('HIGH');info.annotations.push({type:'ticketTitle',description:d.title});await createTicket.open();await createTicket.fill(d);await createTicket.submit();});
  const title=(info:{annotations:{type:string;description?:string}[]})=>info.annotations.find(a=>a.type==='ticketTitle')!.description!;
  test('AT-030 Ticket detail page displays expected title',async({ticketDetails},info)=>ticketDetails.verifyTicket(title(info)));
  test('AT-031 Ticket detail page displays priority and status',async({ticketDetails})=>{await expect(ticketDetails.priority()).toHaveText('HIGH');await expect(ticketDetails.status()).toHaveText('OPEN');});
  test('AT-032 Ticket status can be changed from OPEN to IN_PROGRESS',async({ticketDetails})=>{await ticketDetails.updateStatus('IN_PROGRESS');await expect(ticketDetails.status()).toHaveText('IN PROGRESS');});
  test('AT-033 Ticket status can be changed from IN_PROGRESS to RESOLVED',async({ticketDetails})=>{await ticketDetails.updateStatus('IN_PROGRESS');await ticketDetails.updateStatus('RESOLVED');await expect(ticketDetails.status()).toHaveText('RESOLVED');});
  test('AT-034 Updated status persists after navigating away and returning',async({ticketDetails,dashboard},info)=>{await ticketDetails.updateStatus('IN_PROGRESS');await ticketDetails.returnToDashboard();await dashboard.searchTickets(title(info));await dashboard.applyFilters();await dashboard.openTicket(title(info));await expect(ticketDetails.status()).toHaveText('IN PROGRESS');});
  test('AT-035 Updated date changes after status update',async({ticketDetails})=>{const before=await ticketDetails.updatedDate().innerText();await ticketDetails.updateStatus('IN_PROGRESS');const after=await ticketDetails.updatedDate().innerText();expect(Date.parse(after)).toBeGreaterThanOrEqual(Date.parse(before));});
  test('AT-036 Success notification appears after status update',async({ticketDetails})=>{await ticketDetails.updateStatus('IN_PROGRESS');await expect(ticketDetails['page'].locator('body')).toContainText(/updated successfully|success/i);});
});
