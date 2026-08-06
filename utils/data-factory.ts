import type { Priority, TicketInput } from '../data/ticket-data';
let sequence = 0;
export function createTicketData(priority: Priority = 'MEDIUM'): TicketInput {
  sequence += 1;
  return { title: `Automated Ticket ${Date.now()}-${sequence}`, description: `Automated regression description ${Date.now()}`, priority };
}
