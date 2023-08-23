import { Sequelize } from 'sequelize';
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, SQL_TRACE, DB_PORT } from '../config';

// @ts-ignore
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT || 5432,
  logging: SQL_TRACE,
});

export async function initSequelize() {
  try {
    console.info('Trying to connect to the database');
    await sequelize.sync();
    console.info('DB connection has been established successfully.');
  } catch (err) {
    console.error(`Failed to establish DB conection`, { error: err });
    throw err;
  }
}
