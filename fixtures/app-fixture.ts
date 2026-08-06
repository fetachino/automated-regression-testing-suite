import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage'; import { CreateTicketPage } from '../pages/CreateTicketPage'; import { TicketDetailsPage } from '../pages/TicketDetailsPage'; import { ErrorPage } from '../pages/ErrorPage';
type AppFixtures={dashboard:DashboardPage;createTicket:CreateTicketPage;ticketDetails:TicketDetailsPage;errorPage:ErrorPage};
export const test=base.extend<AppFixtures>({dashboard:async({page},use)=>use(new DashboardPage(page)),createTicket:async({page},use)=>use(new CreateTicketPage(page)),ticketDetails:async({page},use)=>use(new TicketDetailsPage(page)),errorPage:async({page},use)=>use(new ErrorPage(page))});
export { expect } from '@playwright/test';
