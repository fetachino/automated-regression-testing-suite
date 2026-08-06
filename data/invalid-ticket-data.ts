export const invalidTicketData = {
  missingTitle: { title: '', description: 'A valid description', priority: 'LOW' },
  missingDescription: { title: 'A valid title', description: '', priority: 'LOW' },
  missingPriority: { title: 'A valid title', description: 'A valid description', priority: '' },
  overlongTitle: { title: 'T'.repeat(121), description: 'A valid description', priority: 'LOW' },
  overlongDescription: { title: 'A valid title', description: 'D'.repeat(2001), priority: 'LOW' },
} as const;
