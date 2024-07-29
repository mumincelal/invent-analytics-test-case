import express from 'express';
import dotenv from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { errorMiddleware } from '@/middlewares/error.middleware';
import userRoutes from '@/routes/user.route';
import bookRoutes from '@/routes/book.route';

dotenv.config();

const port = process.env.PORT;
const dbHost = process.env.DATABASE_HOST ?? 'localhost';
const dbPort = parseInt(process.env.DATABASE_PORT?.toString() || '5432', 10);
const dbUser = process.env.DATABASE_USER ?? 'postgres';
const dbPassword = process.env.DATABASE_PASSWORD ?? '';
const dbName = process.env.DATABASE_NAME ?? 'postgres';
const autoMigration = process.env.AUTO_MIGRATION === 'true';

const runDbCreation = async (
  dbHost: string,
  dbPort: number,
  dbUser: string,
  dbPassword: string,
  dbName: string
) => {
  const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`;

  const sql = postgres(connectionString);

  try {
    const response =
      await sql`SELECT * FROM pg_database WHERE datname = ${dbName}`;

    if (!response.length) {
      await sql.unsafe(`CREATE DATABASE "${dbName}"`);
      console.info(`Database ${dbName} is successfully created`);
    } else {
      console.info(`Database ${dbName} already exists`);
    }
  } catch (error) {
    console.error(error);
  }
};

const runDbMigration = async (
  dbHost: string,
  dbPort: number,
  dbUser: string,
  dbPassword: string,
  dbName: string
) => {
  const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`;

  let sql = postgres(connectionString);

  const databases =
    await sql`SELECT * FROM pg_database WHERE datname = ${dbName}`;

  if (!databases.length) {
    console.error(`Database ${dbName} does not exist`);
    process.exit(0);
  }

  sql = postgres(`${connectionString}/${dbName}`, { max: 1 });

  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder: 'migrations' });
    console.info('Migrations are successfully applied');
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

const bootstrap = async () => {
  const app = express();
  await runDbCreation(dbHost, dbPort, dbUser, dbPassword, dbName);

  if (autoMigration) {
    await runDbMigration(dbHost, dbPort, dbUser, dbPassword, dbName);
  }

  app.use(express.json());
  app.use('/users', userRoutes);
  app.use('/books', bookRoutes);
  app.use(errorMiddleware);

  app
    .listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    })
    .on('error', (error) => {
      throw new Error(error.message);
    });
};

bootstrap();
