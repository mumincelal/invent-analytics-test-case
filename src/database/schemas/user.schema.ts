import { borrowHistory } from '@/database/schemas/book-borrow-history';
import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  created_at: timestamp('created_at', { mode: 'string', withTimezone: true })
    .notNull()
    .defaultNow()
});

export const userRelations = relations(user, ({ many }) => ({
  borrowHistory: many(borrowHistory)
}));
