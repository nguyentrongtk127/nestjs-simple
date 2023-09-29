import * as dotenv from 'dotenv';
import { ENVIRONMENT, Iconfig } from './types';
dotenv.config();

const envConfig: Iconfig = process.env as any;
export const APP_CONFIG = {
  PORT: 3000,
  BASE_URL: 'http://localhost:3000',
  ENVIRONMENT: ENVIRONMENT.DEVELOPMENT,
  SECRET_KEY: 'KeyY29pbm1hcA==',
  POSTGRES_HOST: 'localhost',
  POSTGRES_PORT: 5432,
  POSTGRES_USER: 'myusername',
  POSTGRES_PASS: 'mypassword',
  POSTGRES_DB: 'postgres',

  // REDIS_HOST: 'localhost',
  // REDIS_PORT: 6379,
  // REDIS_PASS: 'SUPER_SECRET_PASSWORD',
  ...envConfig,
};