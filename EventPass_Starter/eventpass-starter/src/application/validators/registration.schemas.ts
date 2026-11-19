import { z } from 'zod';

const positiveId = z.number().int().positive().max(2147483647);

export const registrationIdParamSchema = z.object({
  id: z.coerce.number().int().positive().max(2147483647),
});

export const updateRegistrationSchema = z
  .object({
    sessionId: positiveId,
  })
  .strict();