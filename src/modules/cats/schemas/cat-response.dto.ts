import z from 'zod';

export const catDTO = z.object({
  id: z.uuid(),
  name: z.string(),
  age: z.number(),
  breed: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CatDTO = z.infer<typeof catDTO>;
