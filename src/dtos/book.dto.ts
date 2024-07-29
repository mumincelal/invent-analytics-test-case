import { createSelectSchema } from 'drizzle-zod';
import * as schema from '@/database/schemas';
import { z } from 'zod';

export const createBookDtoSchema = z.object({
  name: z.string().min(3).max(100)
});

export const bookDtoSchema = createSelectSchema(schema.book).pick({
  id: true,
  name: true
});

export type CreateBookDto = z.infer<typeof createBookDtoSchema>;
export type BookDto = z.infer<typeof bookDtoSchema>;
