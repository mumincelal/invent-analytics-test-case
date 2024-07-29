import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: './src/database/schemas/*',
  schemaFilter: ['public'],
  breakpoints: false,
  strict: true,
  out: './migrations',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'postgres'
  }
} satisfies Config;
