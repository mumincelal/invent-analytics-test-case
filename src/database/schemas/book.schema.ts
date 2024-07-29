import { borrowHistory } from '@/database/schemas/book-borrow-history';
import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const book = pgTable('books', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  created_at: timestamp('created_at', { mode: 'string', withTimezone: true })
    .notNull()
    .defaultNow()
});

export const bookRelations = relations(book, ({ many }) => ({
  borrowHistory: many(borrowHistory)
}));
