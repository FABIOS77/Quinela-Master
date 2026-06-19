const { z } = require('zod');

const predictionSchema = z.object({
  body: z.object({
    match_id: z.string().uuid('El ID del partido debe ser un UUID válido'),
    home_prediction: z.number().int().min(0, 'El marcador no puede ser negativo'),
    away_prediction: z.number().int().min(0, 'El marcador no puede ser negativo'),
  }),
});

module.exports = { predictionSchema };