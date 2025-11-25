import { z } from 'zod';

export const updateCatDTO = z.object({
  name: z.string().min(1).optional(),
  age: z.number().min(1).optional(),
  breed: z.string().min(1).optional(),
});

export type UpdateCatDTO = z.infer<typeof updateCatDTO>;
