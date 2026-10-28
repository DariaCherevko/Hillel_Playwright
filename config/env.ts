import fs from 'fs';
import path from 'path';

const envFile = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const config = {
  baseUrls: {
    qauto: required('QAUTO_BASE_URL'),
    qauto2: required('QAUTO2_BASE_URL'),
  },
  httpCredentials: {
    username: required('HTTP_USERNAME'),
    password: required('HTTP_PASSWORD'),
  },
};
