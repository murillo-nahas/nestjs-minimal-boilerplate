import z from 'zod';

export const createCatDTO = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  age: z.number().min(1, { message: 'Age is required' }),
  breed: z.string().min(1, { message: 'Breed is required' }),
});

export type CreateCatDTO = z.infer<typeof createCatDTO>;
