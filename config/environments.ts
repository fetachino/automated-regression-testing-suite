import 'dotenv/config';

const toBoolean = (value: string | undefined, fallback: boolean): boolean =>
  value === undefined ? fallback : value.toLowerCase() === 'true';

export const environment = {
  baseURL: process.env.BASE_URL ?? 'http://localhost:8080',
  headless: toBoolean(process.env.HEADLESS, true),
  timeout: Number(process.env.DEFAULT_TIMEOUT ?? 10_000),
  isCI: Boolean(process.env.CI),
} as const;
