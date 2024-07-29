import { createInsertSchema } from 'drizzle-zod';
import * as schema from '@/database/schemas';
import { z } from 'zod';

export const returnBookDtoSchema = createInsertSchema(
  schema.borrowHistory
).pick({
  score: true
});

export type ReturnBookDto = z.infer<typeof returnBookDtoSchema>;
