const { z } = require('zod');

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    password: z.string().min(6).optional(),
  })
});