const { z } = require('zod');

const createGroupSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, 'El nombre del grupo debe tener al menos 3 caracteres')
      .max(50, 'El nombre no puede exceder los 50 caracteres'),
  }),
});

const joinGroupSchema = z.object({
  body: z.object({
    invite_code: z.string().min(1, 'El código de invitación es obligatorio'),
  }),
});

module.exports = { createGroupSchema, joinGroupSchema };