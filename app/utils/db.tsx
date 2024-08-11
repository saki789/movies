import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/app/sharedCode/common';

const dbSettings = GetDBSettings();

export const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: dbSettings.host,
    port: dbSettings.port,
    user: dbSettings.user,
    password: dbSettings.password,
    database: dbSettings.database,
  });

  return connection;
};
