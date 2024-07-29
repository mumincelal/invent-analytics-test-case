import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const getDb = async () => {
  const dbHost = process.env.DATABASE_HOST ?? 'localhost';
  const dbPort = parseInt(process.env.DATABASE_PORT?.toString() || '5432', 10);
  const dbUser = process.env.DATABASE_USER ?? 'postgres';
  const dbPassword = process.env.DATABASE_PASSWORD ?? '';
  const dbName = process.env.DATABASE_NAME ?? 'postgres';

  const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`;

  const sql = postgres(`${connectionString}/${dbName}`, { max: 1 });

  const db = drizzle(sql);

  return db;
};
