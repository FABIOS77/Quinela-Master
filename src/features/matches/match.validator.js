const { z } = require('zod');

const createMatchSchema = z.object({
  body: z.object({
    home_team: z.string().min(2, 'El equipo local es obligatorio'),
    away_team: z.string().min(2, 'El equipo visitante es obligatorio'),
    match_date: z.string().datetime({ message: 'Debe ser una fecha y hora válida en formato ISO (ej. 2026-06-11T20:00:00Z)' }),
    city: z.string().optional(),
    stadium: z.string().optional(),
  }),
});

module.exports = { createMatchSchema };