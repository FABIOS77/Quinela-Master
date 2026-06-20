const { z } = require('zod');

const createMatchSchema = z.object({
  body: z.object({
    home_team: z.string().min(2, 'El equipo local es obligatorio'),
    away_team: z.string().min(2, 'El equipo visitante es obligatorio'),
    match_date: z.string().datetime({ message: 'Debe ser una fecha y hora válida en formato ISO' }),
    city: z.string().min(2, 'La ciudad es obligatoria'),
    stadium: z.string().min(2, 'El estadio es obligatorio'),
  }),
});

const updateMatchSchema = z.object({
  body: z.object({
    home_team: z.string().min(2).optional(),
    away_team: z.string().min(2).optional(),
    match_date: z.string().datetime().optional(),
    city: z.string().min(2).optional(),
    stadium: z.string().min(2).optional(),
    phase: z.string().min(2).optional(),
    external_api_id: z.string().optional(),
  }),
});

module.exports = { createMatchSchema, updateMatchSchema };