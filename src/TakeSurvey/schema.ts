import { z } from 'zod';

export const optionSchema = z.object({
  option: z.string().min(3, { message: 'Längre' }),
});
