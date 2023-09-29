export enum ENVIRONMENT {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}
export interface Iconfig {
  PORT: number;
  BASE_URL: string;
  ENVIRONMENT: ENVIRONMENT;

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASS: string;
  POSTGRES_DB: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASS: string;

  SECRET_KEY: string;

  BINANCE_BASE_URL: string;

  TELEGRAM_TOKEN: string;

  VERSION: string;
}
