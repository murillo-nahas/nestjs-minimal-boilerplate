import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const catDTO = z.object({
  id: z.uuid(),
  name: z.string(),
  age: z.number(),
  breed: z.string(),
});

export type CatDTO = z.infer<typeof catDTO>;

export class CatResponseDTO extends createZodDto(catDTO) {}
