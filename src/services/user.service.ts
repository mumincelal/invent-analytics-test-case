import { getDb } from '@/utils/db.util';
import * as schema from '@/database/schemas';
import { CreateUserDto, UserDto } from '@/dtos/user.dto';
import { and, desc, eq, isNull } from 'drizzle-orm';

const createUser = async (data: CreateUserDto): Promise<void> => {
  const db = await getDb();

  await db.insert(schema.user).values({
    name: data.name
  });
};

const getUsers = async (): Promise<UserDto[]> => {
  const db = await getDb();

  const users = await db
    .select()
    .from(schema.user)
    .orderBy(desc(schema.user.created_at));

  return users.map((user) => ({
    id: user.id,
    name: user.name
  }));
};

const getUser = async (id: number): Promise<UserDto> => {
  const db = await getDb();

  const users = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, id));

  if (!users.length) {
    throw new Error('User not found');
  }

  const user = users[0] as UserDto;

  return {
    id: user.id,
    name: user.name
  };
};

export const borrowBook = async (
  userId: number,
  bookId: number
): Promise<void> => {
  const db = await getDb();

  const borrowedBooks = await db
    .select()
    .from(schema.borrowHistory)
    .where(
      and(
        eq(schema.borrowHistory.user_id, userId),
        eq(schema.borrowHistory.book_id, bookId),
        isNull(schema.borrowHistory.return_date)
      )
    );

  if (borrowedBooks.length) {
    throw new Error('Book already borrowed');
  }

  await db.insert(schema.borrowHistory).values({
    user_id: userId,
    book_id: bookId
  });
};

export const returnBook = async (
  userId: number,
  bookId: number,
  score: number
): Promise<void> => {
  const db = await getDb();

  const borrowedBooks = await db
    .select()
    .from(schema.borrowHistory)
    .where(
      and(
        eq(schema.borrowHistory.user_id, userId),
        eq(schema.borrowHistory.book_id, bookId),
        isNull(schema.borrowHistory.return_date)
      )
    );

  if (!borrowedBooks.length) {
    throw new Error('Book not borrowed');
  }

  await db
    .update(schema.borrowHistory)
    .set({
      return_date: new Date().toISOString(),
      score
    })
    .where(
      and(
        eq(schema.borrowHistory.user_id, userId),
        eq(schema.borrowHistory.book_id, bookId),
        isNull(schema.borrowHistory.return_date)
      )
    );
};

export default {
  createUser,
  getUsers,
  getUser,
  borrowBook,
  returnBook
};
