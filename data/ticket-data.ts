export const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export type Priority = (typeof priorities)[number];
export type TicketInput = { title: string; description: string; priority: Priority };
export const searchData = { existingTitle: 'VPN connection fails', caseVariant: 'vpn CONNECTION' } as const;
export const filterData = { priority: 'HIGH' as Priority, status: 'IN_PROGRESS' } as const;
