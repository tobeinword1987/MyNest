import { z } from 'zod';

export const createStudentSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createStudentSchema>;
