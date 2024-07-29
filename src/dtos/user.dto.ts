import { createSelectSchema } from 'drizzle-zod';
import * as schema from '@/database/schemas';
import { z } from 'zod';

export const createUserDtoSchema = z.object({
  name: z.string().min(3).max(100)
});

export const userDtoSchema = createSelectSchema(schema.user).pick({
  id: true,
  name: true
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
export type UserDto = z.infer<typeof userDtoSchema>;
