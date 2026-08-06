export const parseDisplayDate = (value: string): Date => new Date(value.replace(/^(Created|Last updated)\s*/i, ''));
