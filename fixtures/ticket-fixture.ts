import { test as appTest } from './app-fixture'; import { createTicketData } from '../utils/data-factory'; import type { TicketInput } from '../data/ticket-data';
export const test=appTest.extend<{ticketData:TicketInput}>({ticketData:async({},use)=>use(createTicketData())}); export { expect } from '@playwright/test';
