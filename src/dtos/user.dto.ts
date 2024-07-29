import { z } from 'zod';

export const createUserDtoSchema = z.object({
  name: z.string().min(3).max(100)
});

export const userDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  books: z
    .object({
      past: z.array(
        z.object({
          name: z.string(),
          userScore: z.number().nullable()
        })
      ),
      present: z.array(
        z.object({
          name: z.string()
        })
      )
    })
    .optional()
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
export type UserDto = z.infer<typeof userDtoSchema>;
