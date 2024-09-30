import { Envs } from './types';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env') && process.env.APP_ENVIRONMENT != 'test') {
  console.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}

export function requiredEnvVar(varName: string): string | never {
  console.error('\x1b[31m%s\x1b[0m', `??  Required environment variable "${varName}" is missing.`);
  process.exit(1);
}

export const AppConfig: Envs = {
  APPLICATION_NAME: process.env.APPLICATION_NAME || requiredEnvVar('APPLICATION_NAME'),
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
  PORT: Number(process.env.APP_PORT || 3000),
  DB_HOST: process.env.DB_HOST || requiredEnvVar('DB_HOST'),
  MYSQL_USER: process.env.MYSQL_USER || requiredEnvVar('MYSQL_USER'),
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD || requiredEnvVar('MYSQL_ROOT_PASSWORD'),
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || requiredEnvVar('MYSQL_DATABASE'),
  DB_PORT: Number(process.env.DB_PORT || requiredEnvVar('DB_PORT')),
};
