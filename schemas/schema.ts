import { z } from 'zod';

export const createStudentSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type StudentDto = z.infer<typeof createStudentSchema>;
