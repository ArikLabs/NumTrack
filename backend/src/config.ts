require('dotenv').config();
import env from 'env-var';

export const SERVICE_NAME = env.get('SERVICE_NAME').default('frontend-app').asString();
export const NODE_ENV = env.get('NODE_ENV').default('local').asString();
export const PORT = env.get('PORT').default('8080').asPortNumber();

export const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const DB_PORT = env.get('DB_PORT').default('5432').asInt();
export const SQL_TRACE = env.get('SQL_TRACE').default('false').asBool();

export const isProd = NODE_ENV.includes('prod');
export const isDev = !isProd;
