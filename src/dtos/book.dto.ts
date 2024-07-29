import { z } from 'zod';

export const createBookDtoSchema = z.object({
  name: z.string().min(3).max(100)
});

export const bookDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  score: z.number().optional()
});

export type CreateBookDto = z.infer<typeof createBookDtoSchema>;
export type BookDto = z.infer<typeof bookDtoSchema>;
