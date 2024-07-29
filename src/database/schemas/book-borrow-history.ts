import { book } from '@/database/schemas/book.schema';
import { user } from '@/database/schemas/user.schema';
import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp
} from 'drizzle-orm/pg-core';

export const borrowHistory = pgTable(
  'borrow_history',
  {
    id: serial('id').primaryKey().notNull(),
    book_id: serial('book_id').notNull(),
    user_id: serial('user_id').notNull(),
    score: integer('score'),
    borrow_date: timestamp('borrow_date', {
      mode: 'string',
      withTimezone: true
    })
      .notNull()
      .defaultNow(),
    return_date: timestamp('return_date', {
      mode: 'string',
      withTimezone: true
    }),
    created_at: timestamp('created_at', { mode: 'string', withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => {
    return {
      bookIndex: index('borrow_history_book_id_user_id_at_index').on(
        table.book_id,
        table.user_id
      )
    };
  }
);

export const borrowHistoryRelations = relations(borrowHistory, ({ one }) => ({
  book: one(book, {
    fields: [borrowHistory.book_id],
    references: [book.id]
  }),
  user: one(user, {
    fields: [borrowHistory.user_id],
    references: [user.id]
  })
}));
