import { getDb } from '@/utils/db.util';
import * as schema from '@/database/schemas';
import { BookDto, CreateBookDto } from '@/dtos/book.dto';
import { desc, eq } from 'drizzle-orm';

const createBook = async (data: CreateBookDto): Promise<void> => {
  const db = await getDb();

  await db.insert(schema.book).values({
    name: data.name
  });
};

const getBooks = async (): Promise<BookDto[]> => {
  const db = await getDb();

  const books = await db
    .select()
    .from(schema.book)
    .orderBy(desc(schema.book.created_at));

  return books.map((Book) => ({
    id: Book.id,
    name: Book.name
  }));
};

const getBook = async (id: number): Promise<BookDto> => {
  const db = await getDb();

  const books = await db
    .select()
    .from(schema.book)
    .where(eq(schema.book.id, id));

  if (!books.length) {
    throw new Error('Book not found');
  }

  const book = books[0] as BookDto;

  return {
    id: book.id,
    name: book.name
  };
};

export default {
  createBook,
  getBooks,
  getBook
};
